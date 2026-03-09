import React, { type ReactNode } from "react";
import OriginalDocItemLayout from "@theme-original/DocItem/Layout";
import type { Props } from "@theme/DocItem/Layout";

export default function DocItemLayout(props: Props): ReactNode {
  return (
    <div className="ap-doc-layout-wrap">
      <OriginalDocItemLayout {...props} />
    </div>
  );
}
