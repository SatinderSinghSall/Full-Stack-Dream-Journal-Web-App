import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Loader2 } from "lucide-react";
import { useState } from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, friendName }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl max-w-sm w-full p-6 relative"
          >
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 text-red-500 p-3 rounded-2xl mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Remove Friend?
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Are you sure you want to remove{" "}
                <span className="font-medium text-gray-800">{friendName}</span>{" "}
                from your friends list?
              </p>

              <div className="flex justify-center gap-3 w-full">
                <button
                  onClick={onClose}
                  disabled={isDeleting}
                  className="flex-1 py-2 rounded-xl border border-gray-300 bg-white/70 text-gray-600 hover:bg-gray-100 transition font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={isDeleting}
                  className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold shadow-md transition-all ${
                    isDeleting
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-gradient-to-br from-red-500 to-pink-500 hover:opacity-90"
                  }`}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <span>Delete</span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
