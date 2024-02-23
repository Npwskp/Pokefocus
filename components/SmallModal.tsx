import React, { useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { Button } from "./ui/button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onDelete: () => void;
};

const SmallModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  text,
  onDelete,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="absolute flex items-center justify-center bg-black bg-opacity-0 top-0 left-0 w-full h-full"
      ref={modalRef}
    >
      <Button
        className="text-white"
        variant={"destructive"}
        onClick={() => {
          onDelete();
          onClose();
        }}
      >
        {text}
      </Button>
    </div>
  );
};

export default SmallModal;
