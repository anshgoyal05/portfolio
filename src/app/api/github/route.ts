import { NextResponse } from 'next/server';
import { VERIFIED_PROJECTS, ProjectItem } from '@/data/github-projects';

// 15-minute in-memory cache to respect GitHub API rate limits
let cachedProjects: ProjectItem[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 15 * 60 * 1000;

interface GitHubRepoResponse {
  name: string;
  stargazers_count: number;
  forks_count: number;
  homepage?: string | null;
  html_url: string;
  description?: string | null;
  language?: string | null;
}

export async function GET() {
  const now = Date.now();

  if (cachedProjects && now - lastCacheTime < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      source: 'cache',
      projects: cachedProjects,
    });
  }

  try {
    // Attempt to fetch public repos for user anshgoyal05
    const res = await fetch('https://api.github.com/users/anshgoyal05/repos?per_page=100&sort=updated', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'AnshGoyal-Portfolio-Site',
      },
      // Next.js caching strategy
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}. Using verified repository fallbacks.`);
      return NextResponse.json({
        success: true,
        source: 'fallback',
        projects: VERIFIED_PROJECTS,
      });
    }

    const repos: GitHubRepoResponse[] = await res.json();
    const repoMap = new Map<string, GitHubRepoResponse>();
    for (const r of repos) {
      repoMap.set(r.name.toLowerCase(), r);
    }

    // Merge verified projects with live star, fork, and demo links
    const enriched: ProjectItem[] = VERIFIED_PROJECTS.map((proj) => {
      const match = repoMap.get(proj.repoName.toLowerCase());
      if (match) {
        return {
          ...proj,
          stars: match.stargazers_count,
          forks: match.forks_count,
          demo: (match.homepage && match.homepage.trim().length > 0) ? match.homepage.trim() : proj.demo,
        };
      }
      return proj;
    });

    cachedProjects = enriched;
    lastCacheTime = now;

    return NextResponse.json({
      success: true,
      source: 'live',
      projects: enriched,
    });
  } catch (error) {
    console.warn('Failed to query GitHub API. Returning verified fallbacks:', error);
    return NextResponse.json({
      success: true,
      source: 'fallback',
      projects: VERIFIED_PROJECTS,
    });
  }
}
