# 🌌 Ansh Goyal — Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15-green?style=flat-square&logo=greensock)](https://greensock.com/gsap/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-black?style=flat-square&logo=framer-motion)](https://www.framer.com/motion/)

Welcome to the repository of my official developer portfolio website. Built with cutting-edge web technologies, high-performance smooth animations, and a responsive, modern dark-mode aesthetic.

🌐 **Live Website:** [goyalansh.in](https://goyalansh.in)

---

## ✨ Features

*   **⚡ Premium Performance:** Bootstrapped with Next.js 16 (App Router) and React 19 for server-side rendering, instant page transitions, and image optimizations.
*   **🌊 Fluid Scrolling & Animations:** Integrates **GSAP**, **Framer Motion**, and **Lenis** for smooth kinetic scrolling, fade-reveals, and micro-interactions.
*   **🎨 Ambient & Immersive UI:** Sleek glassmorphism effects, a dynamic custom interactive cursor, and an animated preloader layer.
*   **✉️ Seamless Contact Form:** Integrated contact form powered by a Next.js API route using **Nodemailer** for secure, automated email dispatch.
*   **📱 Responsive & Modular:** Designed mobile-first using the utility classes of **Tailwind CSS v4** and broken down into isolated, reusable React components.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, PostCSS |
| **Animations** | GSAP, Framer Motion, Lenis Smooth Scroll |
| **Icons** | Lucide React |
| **Email Service** | Nodemailer |

---

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (pages & API routes)
│   ├── api/contact/      # API route for handling contact form submission
│   ├── layout.tsx        # Global layout, fonts, metadata, and providers
│   └── page.tsx          # Main entry page assembling all sections
├── components/           # Modular React UI components
│   ├── About.tsx         # About section
│   ├── Achievements.tsx  # Achievements timeline/cards
│   ├── Certifications.tsx# Professional credentials
│   ├── Contact.tsx       # Interactive contact form
│   ├── CustomCursor.tsx  # Custom follow-along cursor
│   ├── Education.tsx     # Academic history
│   ├── Experience.tsx    # Professional career history
│   ├── Header.tsx        # Responsive site navigation
│   ├── Hero.tsx          # Interactive intro with visual animations
│   ├── Preloader.tsx     # Intro screen animation
│   ├── Projects.tsx      # Showcasing build portfolio
│   ├── Skills.tsx        # Skill badges and grid
│   └── SmoothScroll.tsx  # Lenis smooth-scrolling wrapper
└── globals.css           # Global stylesheet and custom CSS properties
```

---

## 🚀 Getting Started

To run a local instance of the portfolio on your machine:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) installed (v18.x or higher recommended) and `npm` or `yarn`.

### 2. Clone the Repository
```bash
git clone https://github.com/anshgoyal05/portfolio.git
cd portfolio
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Environment Configuration
Create a `.env.local` file in the root directory by copying the example environment variables:
```bash
cp .env.example .env.local
```
Open `.env.local` and add your SMTP credentials (e.g., Gmail App Password) to allow the contact form to send emails:
```env
SMTP_PASSWORD=your_gmail_app_password_here
```

### 5. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 6. Build for Production
```bash
npm run build
npm run start
```

---

## 📝 License

This project is open-source. Feel free to use the code as inspiration or a reference for your own portfolio.
