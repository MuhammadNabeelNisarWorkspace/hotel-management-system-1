import React from "react";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-xl modal-pop-up">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Are you sure you want to delete this guest?
            </h2>
            <div className="flex justify-center">
              <button
                onClick={onConfirm}
                className="px-6 py-2 bg-blue-600 text-white rounded-md mr-2 border border-blue-900 hover:bg-blue-800 transition-effect hover:scale-105"
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                className="px-6 py-2 bg-gray-400 text-white rounded-md border border-gray-900 hover:bg-gray-600 transition-effect hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
