import React from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2D1B4C] rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-[#FFE1A8] transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="text-white whitespace-pre-wrap mb-6">{content}</div>
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-[#FFE1A8] text-[#2D1B4C] rounded hover:bg-[#1DB954] hover:text-white transition-colors"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
