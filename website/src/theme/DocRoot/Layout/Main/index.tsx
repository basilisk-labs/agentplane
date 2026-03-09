import React, { type ReactNode } from "react";
import OriginalDocRootLayoutMain from "@theme-original/DocRoot/Layout/Main";
import type { Props } from "@theme/DocRoot/Layout/Main";

export default function DocRootLayoutMain(props: Props): ReactNode {
  return (
    <div className="ap-doc-main-shell">
      <OriginalDocRootLayoutMain {...props} />
    </div>
  );
}
