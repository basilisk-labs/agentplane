import type { ReactNode } from "react";
import Layout from "@theme/Layout";

export default function PresentationPage(): ReactNode {
  return (
    <Layout
      title="AgentPlane presentation"
      description="AgentPlane presentation for AIMindset 2026-03-25."
    >
      <main
        style={{
          margin: 0,
          width: "100%",
          minHeight: "100vh",
          background: "#fff",
        }}
      >
        <iframe
          src="/presentation/aimindset20260325/index.html"
          title="AgentPlane presentation"
          style={{
            border: 0,
            width: "100%",
            height: "100vh",
            display: "block",
          }}
        />
      </main>
    </Layout>
  );
}
