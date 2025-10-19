import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Users, UserX2, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getFriends,
  sendRequest,
  getFriendProgress,
  findUserByEmail,
  deleteFriend,
} from "../api/api";

import FriendRequests from "../components/FriendRequests";
import SentRequests from "../components/SentRequests";
import ProgressModal from "../components/ProgressModal";
import Skeleton from "../components/Skeleton";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailToAdd, setEmailToAdd] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addMessage, setAddMessage] = useState(null);
  const [selectedFriendProgress, setSelectedFriendProgress] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    friend: null,
  });

  const navigate = useNavigate();

  const fetchFriends = async () => {
    try {
      const { data } = await getFriends();
      setFriends(data);
    } catch (err) {
      console.error("Failed to load friends", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleAddFriend = async () => {
    if (!emailToAdd) return;

    try {
      setAddLoading(true);
      const { data: user } = await findUserByEmail(emailToAdd);

      if (!user || !user._id) {
        setAddMessage({
          type: "error",
          text: "No user found with this email.",
        });
        return;
      }

      const { data } = await sendRequest(user._id);
      setAddMessage({ type: "success", text: data.message });
      setEmailToAdd("");

      // Wait a moment to show success, then reload once
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (err) {
      console.error("Add friend error:", err);
      setAddMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to send request",
      });
    } finally {
      setAddLoading(false);
    }
  };

  const handleFriendClick = async (friendId) => {
    try {
      const { data } = await getFriendProgress(friendId);
      setSelectedFriendProgress(data);
    } catch (err) {
      console.error("Failed to fetch friend's progress", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-16">
      <div className="mb-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white/50 backdrop-blur-lg border border-white/30 rounded-full px-4 py-2 hover:bg-white/70 hover:text-indigo-600 shadow transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center bg-gradient-to-br from-indigo-300 to-purple-300 text-white w-20 h-20 rounded-3xl shadow-lg ring-4 ring-white/40"
        >
          <Users className="w-8 h-8" />
        </motion.div>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900">
          Friends & Dreams
        </h1>
        <p className="mt-3 text-gray-500 text-lg max-w-md mx-auto">
          Stay connected in your dream journey — share, reflect, and grow
          together.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12"
      >
        <FriendRequests />
        <SentRequests />
      </motion.div>

      {/* Add Friend Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl p-8 max-w-2xl mx-auto shadow-lg mb-16"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add a New Dream Mate
        </h2>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter friend’s email"
            value={emailToAdd}
            onChange={(e) => setEmailToAdd(e.target.value)}
            className="flex-1 w-full px-5 py-3 rounded-xl border border-white/50 bg-white/60 shadow-inner focus:ring-2 focus:ring-indigo-400 focus:outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={handleAddFriend}
            disabled={addLoading}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-200 ${
              addLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:shadow-xl hover:scale-[1.02]"
            }`}
          >
            {addLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <User className="w-4 h-4" />
                <span>Send Request</span>
              </>
            )}
          </button>
        </div>
        {addMessage && (
          <p
            className={`mt-3 text-sm ${
              addMessage.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {addMessage.text}
          </p>
        )}
      </motion.div>

      {/* Friends Grid */}
      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 py-10">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 shadow-md border border-white/40"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : friends.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-500 flex flex-col items-center py-10"
        >
          <UserX2 className="h-10 w-10 mb-2 text-gray-400" />
          <p className="text-lg font-medium">
            No dream companions yet. Add someone to begin!
          </p>
        </motion.div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {friends.map((friend, i) => (
            <motion.div
              key={friend._id || i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="relative group bg-white/70 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/40 hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div
                onClick={() => handleFriendClick(friend._id)}
                className="flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-300 to-purple-300 text-white font-bold shadow-inner">
                  {friend.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition">
                    {friend.name}
                  </h3>
                  <p
                    className="text-sm text-gray-500 truncate"
                    title={friend.email}
                  >
                    {friend.email}
                  </p>
                </div>
              </div>

              {/* 🗑️ Delete Friend Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete({ open: true, friend });
                }}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                title="Remove friend"
              >
                <UserX2 className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {selectedFriendProgress && (
        <ProgressModal
          isOpen={!!selectedFriendProgress}
          progressData={selectedFriendProgress}
          onClose={() => setSelectedFriendProgress(null)}
        />
      )}

      {confirmDelete.open && (
        <ConfirmDeleteModal
          isOpen={confirmDelete.open}
          friendName={confirmDelete.friend?.name}
          onClose={() => setConfirmDelete({ open: false, friend: null })}
          onConfirm={async () => {
            try {
              await deleteFriend(confirmDelete.friend._id);
              setFriends((prev) =>
                prev.filter((f) => f._id !== confirmDelete.friend._id)
              );
            } catch (err) {
              alert(err.response?.data?.message || "Failed to delete friend");
            } finally {
              setConfirmDelete({ open: false, friend: null });
            }
          }}
        />
      )}
    </div>
  );
};

export default FriendsPage;
