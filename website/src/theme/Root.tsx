import type { Props } from "@theme/Root";
import Head from "@docusaurus/Head";
import Root from "@theme-original/Root";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AgentPlane",
  url: "https://agentplane.org",
  logo: "https://agentplane.org/img/logo.svg",
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

export default function RootWrapper(props: Props) {
  const { siteConfig } = useDocusaurusContext();
  const customFields = siteConfig.customFields as Record<string, unknown> | undefined;
  const gtmContainerId =
    typeof customFields?.gtmContainerId === "string" ? customFields.gtmContainerId : "";
  const gaMeasurementId =
    typeof customFields?.gaMeasurementId === "string" ? customFields.gaMeasurementId : "";

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
        {gaMeasurementId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
              `}
            </script>
          </>
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
      <Root {...props} />
    </>
  );
}
