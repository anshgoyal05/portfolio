import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);
const resolve4 = promisify(dns.resolve4);

// Simple in-memory rate limiter configuration
interface RateLimitRecord {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // Max 3 requests per window

// Helper function to validate email format
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

async function checkDomainExists(email: string): Promise<boolean> {
  const domain = email.split('@')[1];
  if (!domain) return false;
  
  try {
    const mxRecords = await resolveMx(domain);
    if (mxRecords && mxRecords.length > 0) return true;
  } catch (error) {
    // Ignore, try resolving A records
  }
  
  try {
    const aRecords = await resolve4(domain);
    if (aRecords && aRecords.length > 0) return true;
  } catch (error) {
    // Ignore
  }
  
  return false;
}

async function verifyEmailWithAI(email: string): Promise<{ isValid: boolean; reason?: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not configured. Skipping AI semantic email check.');
    return { isValid: true };
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Analyze the email address "${email}". Verify if it appears to be a legitimate, valid, active-looking personal or professional email, rather than a fake, temporary, spam, disposable (e.g. mailinator, tempmail, yopmail), or completely random/gibberish string (e.g. asdfghjkl@gmail.com, a123b456@xyz.com). Respond ONLY with a raw JSON object matching this schema: { "valid": boolean, "reason": "brief user-facing explanation in 1 sentence why it is valid or invalid" }. Do not add markdown code blocks.`
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json'
        }
      })
    });

    if (!response.ok) {
      console.error(`Gemini API error status: ${response.status}`);
      return { isValid: true };
    }

    const data = await response.json();
    const textContent = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!textContent) {
      return { isValid: true };
    }

    const parsed = JSON.parse(textContent.trim());
    return {
      isValid: parsed.valid,
      reason: parsed.reason
    };
  } catch (err) {
    console.error('Error during AI email validation:', err);
    return { isValid: true };
  }
}

// Helper function to escape HTML special characters to prevent HTML/XSS injection
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    // 1. IP-based Rate Limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : (request.headers.get('x-real-ip') || '127.0.0.1');

    const now = Date.now();
    const limitRecord = rateLimitMap.get(ip) || { timestamps: [] };
    
    // Evict expired timestamps
    limitRecord.timestamps = limitRecord.timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
    
    if (limitRecord.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Record current request
    limitRecord.timestamps.push(now);
    rateLimitMap.set(ip, limitRecord);

    // 2. Parse request body safely
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    // 3. Input Validation
    if (
      typeof name !== 'string' || 
      typeof email !== 'string' || 
      typeof message !== 'string'
    ) {
      return NextResponse.json(
        { success: false, message: 'Fields must be string values' },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { success: false, message: 'Missing name, email, or message' },
        { status: 400 }
      );
    }

    // Input Length Validation
    if (trimmedName.length > 100) {
      return NextResponse.json(
        { success: false, message: 'Name cannot exceed 100 characters' },
        { status: 400 }
      );
    }

    if (trimmedEmail.length > 254) {
      return NextResponse.json(
        { success: false, message: 'Email address is too long' },
        { status: 400 }
      );
    }

    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Real-world domain check (DNS MX/A record validation)
    const domainExists = await checkDomainExists(trimmedEmail);
    if (!domainExists) {
      return NextResponse.json(
        { success: false, message: 'This email domain does not exist in the world.' },
        { status: 400 }
      );
    }

    // AI Semantic Verification
    const aiCheck = await verifyEmailWithAI(trimmedEmail);
    if (!aiCheck.isValid) {
      return NextResponse.json(
        { success: false, message: aiCheck.reason || 'This email address appears to be invalid or fake.' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { success: false, message: 'Message cannot exceed 5000 characters' },
        { status: 400 }
      );
    }

    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpPassword) {
      console.error('SMTP_PASSWORD environment variable is missing.');
      return NextResponse.json(
        { success: false, message: 'Server email sending is not configured' },
        { status: 500 }
      );
    }

    // 4. HTML Escape input data before embedding in email template
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage);

    // Configure SMTP transport using noreply.anshgoyal@gmail.com
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'noreply.anshgoyal@gmail.com',
        pass: smtpPassword // Gmail App Password
      }
    });

    const mailOptions = {
      from: `"Ansh Goyal Portfolio" <noreply.anshgoyal@gmail.com>`,
      to: 'goyalansh.in@gmail.com', // Your personal email address
      replyTo: trimmedEmail, // Sets reply-to to the visitor's email
      subject: `New Portfolio Message from ${trimmedName}`,
      text: `You have received a new contact form message from your portfolio website.\n\nSender Details:\nName: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMessage:\n${trimmedMessage}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #0b0b0f; color: #ffffff; border: 1px solid #1f1f2e; border-radius: 20px;">
          <h2 style="color: #2dd4bf; font-size: 20px; font-weight: bold; letter-spacing: -0.025em; border-bottom: 1px solid #1f1f2e; padding-bottom: 15px; margin-top: 0;">
            New Contact Message
          </h2>
          
          <div style="margin-vertical: 20px;">
            <p style="margin: 5px 0; font-size: 13px; color: #8f90a6;"><strong>Sender Name:</strong></p>
            <p style="margin: 0 0 15px 0; font-size: 15px; font-weight: 600; color: #ffffff;">${safeName}</p>
            
            <p style="margin: 5px 0; font-size: 13px; color: #8f90a6;"><strong>Sender Email:</strong></p>
            <p style="margin: 0 0 20px 0; font-size: 15px; font-weight: 600; color: #ffffff;">
              <a href="mailto:${safeEmail}" style="color: #2dd4bf; text-decoration: none;">${safeEmail}</a>
            </p>
          </div>
          
          <div style="margin-top: 25px;">
            <p style="margin: 5px 0; font-size: 13px; color: #8f90a6;"><strong>Message Details:</strong></p>
            <div style="background-color: #14141c; padding: 20px; border-radius: 12px; border-left: 4px solid #a855f7; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0; margin-top: 8px;">${safeMessage}</div>
          </div>
          
          <div style="font-size: 10px; color: #5f607a; margin-top: 35px; border-top: 1px solid #1f1f2e; padding-top: 15px; text-align: center; letter-spacing: 0.05em; text-transform: uppercase;">
            Forwarded automatically via noreply.anshgoyal@gmail.com
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Message sent successfully' });
  } catch (error: any) {
    // Log the detailed error internally
    console.error('Error forwarding email:', error);
    
    // Return a generic error message to prevent information disclosure
    return NextResponse.json(
      { success: false, message: 'Failed to send message' },
      { status: 500 }
    );
  }
}
