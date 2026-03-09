import React, { type ReactNode, useCallback, useState } from "react";
import { useLocation } from "@docusaurus/router";
import { ThemeClassNames, prefersReducedMotion } from "@docusaurus/theme-common";
import clsx from "clsx";
import DocSidebar from "@theme/DocSidebar";
import ExpandButton from "@theme/DocRoot/Layout/Sidebar/ExpandButton";
import type { Props } from "@theme/DocRoot/Layout/Sidebar";

import styles from "./styles.module.css";

function ResetOnSidebarChange({ children }: { children: ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}

export default function DocRootLayoutSidebar({
  sidebar,
  hiddenSidebarContainer,
  setHiddenSidebarContainer,
}: Props): ReactNode {
  const { pathname } = useLocation();
  const [hiddenSidebar, setHiddenSidebar] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }
    if (!hiddenSidebar && prefersReducedMotion()) {
      setHiddenSidebar(true);
    }
    setHiddenSidebarContainer((value) => !value);
  }, [hiddenSidebar, setHiddenSidebarContainer]);

  return (
    <aside
      className={clsx(
        ThemeClassNames.docs.docSidebarContainer,
        styles.docSidebarContainer,
        "ap-doc-sidebar-shell",
        hiddenSidebarContainer && styles.docSidebarContainerHidden,
      )}
      onTransitionEnd={(event) => {
        if (!event.currentTarget.classList.contains(styles.docSidebarContainer)) {
          return;
        }

        if (hiddenSidebarContainer) {
          setHiddenSidebar(true);
        }
      }}
    >
      <ResetOnSidebarChange>
        <div
          className={clsx(
            styles.sidebarViewport,
            "ap-doc-sidebar-viewport",
            hiddenSidebar && styles.sidebarViewportHidden,
          )}
          key={pathname}
        >
          <DocSidebar
            sidebar={sidebar}
            path={pathname}
            onCollapse={toggleSidebar}
            isHidden={hiddenSidebar}
          />
          {hiddenSidebar ? <ExpandButton toggleSidebar={toggleSidebar} /> : null}
        </div>
      </ResetOnSidebarChange>
    </aside>
  );
}
