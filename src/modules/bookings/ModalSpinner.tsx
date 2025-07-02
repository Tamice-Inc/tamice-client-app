import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

export const ModalSpinner = ({ children, onClose, disabled }: any) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal-overlay-spinner" >
      <div className={disabled ? 'modal-content-disable' : 'modal-content-spinner'} ref={modalRef}>
        {children}
      </div>
    </div>,
    document.body
  );
};

// import React, { useEffect } from "react";
// import ReactDOM from "react-dom";
// import './styles.css';

// export const Modal = ({ children }: any) => {
//   const el = document.createElement("div");

//   useEffect(() => {
//     document.body.appendChild(el);
//     return () => {
//       document.body.removeChild(el);
//     };
//   }, [el]);

//   return ReactDOM.createPortal(
//     <div className="modal-overlay">
//       <div className="modal-content">     
//       {children}</div>
//     </div>,
//     el
//   );
// };
