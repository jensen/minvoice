import type { PropsWithChildren } from "react";

import "./modal.css";

interface IModalProps extends PropsWithChildren {
  onClose: () => void;
}

export default function Modal(props: IModalProps) {
  return (
    <section className="modal__container">
      <div className="modal__backdrop"></div>
      <div className="modal__card">{props.children}</div>
    </section>
  );
}
