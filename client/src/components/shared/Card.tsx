import type { PropsWithChildren } from "react";
import cx from "classnames";

import "./card.css";

interface ICardProps extends PropsWithChildren {
  padding: boolean;
}

export default function Card(props: ICardProps) {
  return (
    <div
      className={cx("card__container", {
        "card__container--padded": props.padding,
      })}
    >
      {props.children}
    </div>
  );
}

Card.defaultProps = {
  padding: true,
};

interface ICardHeader extends PropsWithChildren {}

export const CardHeader = (props: ICardHeader) => {
  return <h2 className="card__header">{props.children}</h2>;
};
