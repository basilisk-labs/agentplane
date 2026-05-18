import { type ReactNode, useEffect, useState } from "react";
import { site } from "../data/site";
import styles from "./GitHubStarsButton.module.css";

type GitHubRepoResponse = {
  stargazers_count: number;
};

const cacheKey = "agentplane.github.stargazers";
const cacheTtlMs = 60 * 60 * 1000;

function formatStars(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

function readCachedStars(): number | null {
  if (globalThis.window === undefined) return null;
  const raw = window.localStorage.getItem(cacheKey);
  if (!raw) return null;
  const parsed = JSON.parse(raw) as { value?: number; expiresAt?: number };
  if (typeof parsed.value !== "number" || typeof parsed.expiresAt !== "number") return null;
  if (parsed.expiresAt < Date.now()) return null;
  return parsed.value;
}

function writeCachedStars(value: number): void {
  window.localStorage.setItem(
    cacheKey,
    JSON.stringify({ value, expiresAt: Date.now() + cacheTtlMs }),
  );
}

function trackClick(): void {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", "navbar_github_star_click", {
    event_category: "navbar",
    location: "navbar",
    repo: site.repo,
  });
}

export default function GitHubStarsButton(): ReactNode {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const cached = readCachedStars();
    if (cached !== null) {
      setStars(cached);
      return;
    }

    const controller = new AbortController();
    fetch(`https://api.github.com/repos/${site.repo}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub API failed: ${response.status}`);
        return response.json() as Promise<GitHubRepoResponse>;
      })
      .then((data) => {
        setStars(data.stargazers_count);
        writeCachedStars(data.stargazers_count);
      })
      .catch(() => setStars(null));

    return () => controller.abort();
  }, []);

  return (
    <a
      className={styles.button}
      href={site.githubUrl}
      aria-label="Star Agentplane on GitHub"
      onClick={trackClick}
    >
      <svg className={styles.icon} viewBox="0 0 16 16" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.57 7.57 0 0 1 8 3.86c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
        />
      </svg>
      <span>{stars === null ? "Star" : `Star ${formatStars(stars)}`}</span>
    </a>
  );
}
