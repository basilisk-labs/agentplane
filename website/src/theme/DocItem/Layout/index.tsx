import React, { type ReactNode } from "react";
import Head from "@docusaurus/Head";
import { useLocation } from "@docusaurus/router";
import OriginalDocItemLayout from "@theme-original/DocItem/Layout";
import type { Props } from "@theme/DocItem/Layout";

const siteUrl = "https://agentplane.org";

function socialImageUrlFromPathname(pathname: string): string | null {
  const normalizedPathname = pathname.replace(/\/$/, "");

  if (!normalizedPathname.startsWith("/docs")) {
    return null;
  }

  return `${siteUrl}/img/social${normalizedPathname}.png`;
}

export default function DocItemLayout(props: Props): ReactNode {
  const { pathname } = useLocation();
  const socialImageUrl = socialImageUrlFromPathname(pathname);

  return (
    <div className="ap-doc-layout-wrap">
      <OriginalDocItemLayout {...props} />
      {socialImageUrl ? (
        <Head
          children={
            // Docusaurus Head requires an explicit children prop under this React 19 TS config.
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            <>
              <meta property="og:image" content={socialImageUrl} />
              <meta property="og:image:width" content="1280" />
              <meta property="og:image:height" content="640" />
              <meta name="twitter:image" content={socialImageUrl} />
              <meta name="twitter:card" content="summary_large_image" />
            </>
          }
        />
      ) : null}
    </div>
  );
}
