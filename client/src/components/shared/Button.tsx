import { PropsWithChildren } from "react";
import cx from "classnames";

import "./button.css";

interface IButtonProps
  extends PropsWithChildren<JSX.IntrinsicElements["button"]> {
  variant: "primary" | "secondary" | "danger";
}

export default function Button(props: IButtonProps) {
  return (
    <button
      {...props}
      className={cx("button", {
        "button--primary": props.variant === "primary",
        "button--secondary": props.variant === "secondary",
        "button--danger": props.variant === "danger",
      })}
    >
      {props.children}
    </button>
  );
}

Button.defaultProps = {
  variant: "primary",
  type: "button",
};
