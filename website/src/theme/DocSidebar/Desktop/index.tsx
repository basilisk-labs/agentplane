import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import clsx from "clsx";
import CollapseButton from "@theme/DocSidebar/Desktop/CollapseButton";
import Content from "@theme/DocSidebar/Desktop/Content";
import Logo from "@theme/Logo";
import type { Props } from "@theme/DocSidebar/Desktop";

import styles from "./styles.module.css";

function DocSidebarDesktop({ path, sidebar, onCollapse, isHidden }: Props) {
  const {
    navbar: { hideOnScroll },
    docs: {
      sidebar: { hideable },
    },
  } = useThemeConfig();

  return (
    <div
      className={clsx(
        styles.sidebar,
        "ap-doc-sidebar-desktop",
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}
    >
      {hideOnScroll ? <Logo tabIndex={-1} className={styles.sidebarLogo} /> : null}
      <Content path={path} sidebar={sidebar} />
      {hideable ? <CollapseButton onClick={onCollapse} /> : null}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
