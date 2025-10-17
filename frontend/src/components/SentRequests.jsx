import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, XCircle } from "lucide-react";
import { getSent, cancelRequest } from "../api/api";

const SentRequests = () => {
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSent = async () => {
    try {
      const { data } = await getSent();
      setSent(data);
    } catch (err) {
      console.error("Failed to load sent requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSent();
  }, []);

  const handleCancel = async (id) => {
    await cancelRequest(id);
    setSent((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-6">
        <Loader2 className="animate-spin h-5 w-5 text-indigo-600" />
      </div>
    );

  if (sent.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-lg mb-10"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Sent Friend Requests
      </h2>
      <div className="space-y-4">
        {sent.map((req) => (
          <div
            key={req._id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl shadow-sm"
          >
            <div>
              <p className="font-semibold text-gray-800">{req.name}</p>
              <p className="text-sm text-gray-500">{req.email}</p>
            </div>
            <button
              onClick={() => handleCancel(req._id)}
              className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-2 rounded-xl text-sm font-medium hover:bg-red-200 transition"
            >
              <XCircle className="w-4 h-4" /> Cancel
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SentRequests;
