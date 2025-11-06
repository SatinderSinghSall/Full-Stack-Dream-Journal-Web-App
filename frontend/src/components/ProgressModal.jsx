import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import DreamDetailModal from "./DreamDetailModal"; // import new modal

const ProgressModal = ({ isOpen, progressData, onClose }) => {
  const [selectedDream, setSelectedDream] = useState(null);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-6 relative border border-white/50"
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

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Friend’s Dream Progress
          </h2>

          {progressData.length === 0 ? (
            <p className="text-gray-600 text-center py-10">
              No dreams shared yet.
            </p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {progressData.map((dream) => (
                <div
                  key={dream._id}
                  onClick={() => setSelectedDream(dream)}
                  className="p-4 bg-white/70 backdrop-blur rounded-xl border border-white/40 hover:bg-white/90 transition cursor-pointer"
                >
                  <h3 className="font-semibold text-gray-800">
                    {dream.title || "Untitled Dream"}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {dream.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Nested modal for dream details */}
        <DreamDetailModal
          dream={selectedDream}
          onClose={() => setSelectedDream(null)}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default ProgressModal;
