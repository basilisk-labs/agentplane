import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { type ReactNode, useEffect } from "react";

type RedirectToProps = {
  to: string;
};

export default function RedirectTo({ to }: RedirectToProps): ReactNode {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);

  return (
    <main style={{ padding: "8rem 1.5rem" }}>
      <Head>
        <meta name="robots" content="noindex,follow" />
        <meta httpEquiv="refresh" content={`0;url=${to}`} />
      </Head>
      <p>
        This page moved to <Link to={to}>{to}</Link>.
      </p>
    </main>
  );
}
