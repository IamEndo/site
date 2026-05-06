import type * as React from "react";

type EspWebInstallButtonProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement> & {
    manifest?: string;
    "erase-first"?: boolean;
  },
  HTMLElement
>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "esp-web-install-button": EspWebInstallButtonProps;
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "esp-web-install-button": EspWebInstallButtonProps;
    }
  }
}

export {};
