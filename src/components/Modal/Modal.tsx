import { FC, ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ReactModal from "react-modal";

interface ModalProps {
  children: ReactNode;
  show: boolean;
}

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement('#modal');

export const Modal: FC<ModalProps> = ({ children, show }) => {
  const [isOpen, setIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  if (!show) {
    return <></>;
  }

  return createPortal(
    <ReactModal isOpen={isOpen} style={customStyles}>
      {children}
    </ReactModal>,
    document.getElementById("modal")!
  );
};
