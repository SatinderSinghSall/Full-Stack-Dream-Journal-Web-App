import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const DreamDetailModal = ({ dream, onClose }) => {
  if (!dream) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl shadow-2xl w-full max-w-lg relative border border-white/50 overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 break-words">
              {dream.title}
            </h2>

            {/* Scrollable content area */}
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4 break-words text-gray-700">
              <p className="whitespace-pre-line">{dream.content}</p>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(dream.dateOfDream).toLocaleDateString()}
                </p>
                <p>
                  <strong>Mood:</strong> {dream.mood}
                </p>
                {dream.tags?.length > 0 && (
                  <p>
                    <strong>Tags:</strong> {dream.tags.join(", ")}
                  </p>
                )}
                {dream.rating && (
                  <p>
                    <strong>Rating:</strong> {dream.rating}/5 ⭐
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DreamDetailModal;
