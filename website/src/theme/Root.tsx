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
      <BlogReadingProgress />
      <ThemeRoot {...props} />
    </>
  );
}
