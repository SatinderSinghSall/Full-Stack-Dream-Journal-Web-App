import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { XCircle, Loader2 } from "lucide-react";

import { getSent, cancelRequest } from "../api/api";
import Skeleton from "./Skeleton";

const SentRequests = () => {
  const [sent, setSent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(null);

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
    setCanceling(id);
    try {
      await cancelRequest(id);
      setSent((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to cancel request:", err);
    } finally {
      setCanceling(null);
    }
  };

  if (loading)
    return (
      <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-lg mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Sent Friend Requests
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-xl shadow-sm"
            >
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-8 w-20 rounded-xl" />
            </div>
          ))}
        </div>
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
              disabled={canceling === req._id}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium transition ${
                canceling === req._id
                  ? "bg-red-200 text-red-500 cursor-not-allowed"
                  : "bg-red-100 text-red-600 hover:bg-red-200"
              }`}
            >
              {canceling === req._id ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Canceling...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" /> Cancel
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SentRequests;
