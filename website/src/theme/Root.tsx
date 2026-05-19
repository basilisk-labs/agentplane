import { useLocation } from "@docusaurus/router";
import type { Props } from "@theme/Root";
import Head from "@docusaurus/Head";
import Root from "@theme-original/Root";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";

const gtmContainerId = "GTM-P4FNLHQF";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Agentplane",
  url: "https://agentplane.org",
  logo: "https://agentplane.org/img/android-chrome-512x512.png",
  sameAs: ["https://github.com/basilisk-labs/agentplane"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Agentplane",
  url: "https://agentplane.org",
  description:
    "CLI-first operational workflows, traces, context, recipes, and artifacts for AI agents.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://agentplane.org/docs?query={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const ThemeRoot = Root as (props: Props) => ReactElement;

function BlogReadingProgress(): ReactElement | null {
  const { pathname } = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!pathname.startsWith("/blog/") || pathname === "/blog") {
      setProgress(0);
      return;
    }

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollHeight <= 0 ? 0 : Math.max(0, Math.min(1, scrollTop / scrollHeight));
      setProgress(nextProgress);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [pathname]);

  if (!pathname.startsWith("/blog/") || pathname === "/blog") {
    return null;
  }

  return (
    <div className="blog-reading-progress" aria-hidden="true">
      <span className="blog-reading-progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

function NavbarScrollState(): null {
  useEffect(() => {
    const root = document.documentElement;
    let lastScrollY = window.scrollY;
    let floatingVisible = false;
    let ticking = false;

    const updateState = () => {
      ticking = false;
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY;
      const threshold = window.innerHeight * 0.12;

      root.classList.toggle("nav-scrolled", currentScrollY > 20);

      if (currentScrollY < threshold || delta < -4) {
        floatingVisible = false;
      } else if (delta > 4) {
        floatingVisible = true;
      }

      root.classList.toggle("nav-floating-visible", floatingVisible);
      lastScrollY = currentScrollY;
    };

    updateState();
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateState);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateState);
      root.classList.remove("nav-scrolled");
      root.classList.remove("nav-floating-visible");
    };
  }, []);

  return null;
}

async function copyNavbarInstallCommand(
  installLink: HTMLAnchorElement,
  initialLabel: string,
  installCommand: string,
): Promise<void> {
  await navigator.clipboard.writeText(installCommand);
  trackNavEvent("copy_install_command");
  installLink.textContent = "Copied";
  globalThis.setTimeout(() => {
    installLink.textContent = initialLabel;
  }, 1800);
}

function trackNavEvent(eventName: string): void {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", eventName, { event_category: "navbar" });
}

type GitHubRepoResponse = {
  stargazers_count: number;
};

const githubStarsCacheKey = "agentplane.github.stargazers";
const githubStarsCacheTtlMs = 60 * 60 * 1000;

function formatStars(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return String(count);
}

function readCachedStars(): number | null {
  const raw = window.localStorage.getItem(githubStarsCacheKey);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { value?: number; expiresAt?: number };
    if (typeof parsed.value !== "number" || typeof parsed.expiresAt !== "number") return null;
    if (parsed.expiresAt < Date.now()) return null;
    return parsed.value;
  } catch {
    window.localStorage.removeItem(githubStarsCacheKey);
    return null;
  }
}

function writeCachedStars(value: number): void {
  window.localStorage.setItem(
    githubStarsCacheKey,
    JSON.stringify({ value, expiresAt: Date.now() + githubStarsCacheTtlMs }),
  );
}

function NavbarInstallCopy(): null {
  useEffect(() => {
    const installLink = document.querySelector<HTMLAnchorElement>(".navbar-install-command");

    if (!installLink) {
      return;
    }

    const installCommand = "npm i -g agentplane";
    const initialLabel = installLink.textContent ?? installCommand;

    installLink.setAttribute("href", "#");
    installLink.setAttribute("role", "button");
    installLink.setAttribute("aria-label", `Copy command: ${installCommand}`);

    const handleClick = (event: MouseEvent) => {
      event.preventDefault();
      void copyNavbarInstallCommand(installLink, initialLabel, installCommand);
    };

    installLink.addEventListener("click", handleClick);

    return () => {
      installLink.removeEventListener("click", handleClick);
      installLink.textContent = initialLabel;
    };
  }, []);

  return null;
}

function NavbarGithubTracking(): null {
  useEffect(() => {
    const githubLink = document.querySelector<HTMLAnchorElement>(".navbar-github-cta");
    if (!githubLink) return;

    githubLink.setAttribute("aria-label", "Star Agentplane on GitHub");
    githubLink.textContent = "GitHub";

    const cached = readCachedStars();
    if (cached !== null) {
      githubLink.textContent = `Star ${formatStars(cached)}`;
    } else {
      const controller = new AbortController();
      fetch("https://api.github.com/repos/basilisk-labs/agentplane", { signal: controller.signal })
        .then((response) => {
          if (!response.ok) throw new Error(`GitHub API failed: ${response.status}`);
          return response.json() as Promise<GitHubRepoResponse>;
        })
        .then((data) => {
          writeCachedStars(data.stargazers_count);
          githubLink.textContent = `Star ${formatStars(data.stargazers_count)}`;
        })
        .catch(() => {
          githubLink.textContent = "Star";
        });
    }

    const handleClick = () => {
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      gtag?.("event", "navbar_github_star_click", {
        event_category: "navbar",
        location: "navbar",
        repo: "basilisk-labs/agentplane",
      });
    };
    githubLink.addEventListener("click", handleClick);

    return () => {
      githubLink.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

export default function RootWrapper(props: Props): ReactElement {
  return (
    <>
      <Head>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
        {gtmContainerId ? (
          <script>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmContainerId}');
            `}
          </script>
        ) : null}
      </Head>
      {gtmContainerId ? (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      ) : null}
      <NavbarScrollState />
      <NavbarInstallCopy />
      <NavbarGithubTracking />
      <BlogReadingProgress />
      <ThemeRoot {...props} />
    </>
  );
}
