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
  name: "AgentPlane",
  url: "https://agentplane.org",
  logo: "https://agentplane.org/img/android-chrome-512x512.png",
  sameAs: ["https://github.com/basilisk-labs/agentplane"],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AgentPlane",
  url: "https://agentplane.org",
  description:
    "Deterministic workflow framework for policy-driven agent execution in repositories.",
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

    const updateScrolled = () => {
      root.classList.toggle("nav-scrolled", window.scrollY > 20);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    window.addEventListener("resize", updateScrolled);

    return () => {
      window.removeEventListener("scroll", updateScrolled);
      window.removeEventListener("resize", updateScrolled);
      root.classList.remove("nav-scrolled");
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
  trackNavEvent("copy_install_clicked");
  installLink.textContent = "Copied";
  globalThis.setTimeout(() => {
    installLink.textContent = initialLabel;
  }, 1800);
}

function trackNavEvent(eventName: string): void {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", eventName, { event_category: "navbar" });
}

function configureGithubStarButton(link: HTMLAnchorElement): void {
  link.classList.add("github-button");
  link.setAttribute("data-color-scheme", "no-preference: light; light: light; dark: dark;");
  link.setAttribute("data-icon", "octicon-star");
  link.setAttribute("data-size", "large");
  link.setAttribute("data-show-count", "true");
  link.setAttribute("aria-label", "Star basilisk-labs/agentplane on GitHub");
  link.textContent = "Star";
}

function refreshGithubButtons(): void {
  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = "https://buttons.github.io/buttons.js";
  script.dataset.agentplaneGithubButtons = "true";
  document.body.append(script);
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

    const handleClick = () => trackNavEvent("github_star_nav_clicked");
    githubLink.addEventListener("click", handleClick);
    configureGithubStarButton(githubLink);
    refreshGithubButtons();

    return () => {
      githubLink.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

function MobileNavbarGithubCta(): null {
  useEffect(() => {
    const navbarInner = document.querySelector<HTMLElement>(".navbar__inner");

    if (!navbarInner || navbarInner.querySelector(".navbar-mobile-github-cta")) {
      return;
    }

    const githubLink = document.createElement("a");
    githubLink.className = "navbar-mobile-github-cta";
    githubLink.href = "https://github.com/basilisk-labs/agentplane";
    configureGithubStarButton(githubLink);
    githubLink.addEventListener("click", () => trackNavEvent("github_star_nav_clicked"));
    navbarInner.append(githubLink);
    refreshGithubButtons();

    return () => {
      githubLink.remove();
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
        <script async defer src="https://buttons.github.io/buttons.js" />
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
      <MobileNavbarGithubCta />
      <BlogReadingProgress />
      <ThemeRoot {...props} />
    </>
  );
}
