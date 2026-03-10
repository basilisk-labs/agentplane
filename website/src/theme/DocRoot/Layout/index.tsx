import React, { type ReactNode } from "react";
import OriginalDocRootLayout from "@theme-original/DocRoot/Layout";
import type { Props } from "@theme/DocRoot/Layout";

export default function DocRootLayout({ children }: Props): ReactNode {
  return (
    <div className="ap-docs-wrapper">
      <OriginalDocRootLayout>{children}</OriginalDocRootLayout>
    </div>
  );
}
