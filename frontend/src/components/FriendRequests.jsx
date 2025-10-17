import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, UserCheck2, UserX2 } from "lucide-react";
import { getRequests, acceptRequest, rejectRequest } from "../api/api";

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data } = await getRequests();
      setRequests(data);
    } catch (err) {
      console.error("Failed to load friend requests", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = async (id) => {
    await acceptRequest(id);
    setRequests((prev) => prev.filter((r) => r._id !== id));
  };

  const handleReject = async (id) => {
    await rejectRequest(id);
    setRequests((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-6">
        <Loader2 className="animate-spin h-5 w-5 text-indigo-600" />
      </div>
    );

  if (requests.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl p-6 shadow-lg mb-10"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Incoming Friend Requests
      </h2>
      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req._id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl shadow-sm"
          >
            <div>
              <p className="font-semibold text-gray-800">{req.name}</p>
              <p className="text-sm text-gray-500">{req.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(req._id)}
                className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-green-600 transition"
              >
                <UserCheck2 className="w-4 h-4" /> Accept
              </button>
              <button
                onClick={() => handleReject(req._id)}
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-2 rounded-xl text-sm font-medium hover:bg-red-600 transition"
              >
                <UserX2 className="w-4 h-4" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FriendRequests;
