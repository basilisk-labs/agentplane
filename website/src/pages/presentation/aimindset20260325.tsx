import type { ReactNode } from "react";

export default function PresentationPage(): ReactNode {
  return (
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
  );
}
