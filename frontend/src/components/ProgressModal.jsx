import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ProgressModal = ({ isOpen, progressData, onClose }) => {
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
          className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-6 relative"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Friend’s Progress
          </h2>

          {progressData.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No progress to show yet.
            </p>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {progressData.map((habit) => (
                <div
                  key={habit._id}
                  className="p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <h3 className="font-semibold text-gray-800">
                    {habit.title || "Untitled Habit"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Status: {habit.status || "Ongoing"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProgressModal;
