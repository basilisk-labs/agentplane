declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "@theme/Root" {
  import type { ComponentType, ReactNode } from "react";

  export type Props = {
    children?: ReactNode;
  };

  const RootComponent: ComponentType<Props>;
  export default RootComponent;
}

declare module "@theme-original/Root" {
  import type { ComponentType } from "react";
  import type { Props } from "@theme/Root";

  const RootOriginal: ComponentType<Props>;
  export default RootOriginal;
}
