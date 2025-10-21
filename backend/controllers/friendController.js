const User = require("../models/User");
const Dream = require("../models/Dream");
const { sendEmail } = require("../utils/email");
const { friendRequestTemplate } = require("../utils/emailTemplates");

// 📤 Send friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const fromUserId = req.user.id;
    const toUserId = req.params.id;

    if (!toUserId || toUserId === "undefined") {
      return res.status(400).json({ message: "Invalid or missing user ID" });
    }

    if (fromUserId === toUserId) {
      return res.status(400).json({ message: "You cannot add yourself." });
    }

    const sender = await User.findById(fromUserId);
    const recipient = await User.findById(toUserId);

    if (!recipient) {
      return res.status(404).json({ message: "User not found." });
    }

    if (sender.friends.includes(toUserId)) {
      return res.status(400).json({ message: "Already friends." });
    }

    if (recipient.friendRequests.includes(fromUserId)) {
      return res.status(400).json({ message: "Request already sent." });
    }

    sender.sentRequests.push(toUserId);
    recipient.friendRequests.push(fromUserId);

    await sender.save();
    await recipient.save();

    // 💌 Send email notification
    try {
      await sendEmail({
        to: recipient.email,
        subject: `${sender.name} wants to be your DreamMate! 🌙`,
        html: friendRequestTemplate(sender.name),
      });
    } catch (emailErr) {
      console.error("Failed to send friend request email:", emailErr);
    }

    res.status(200).json({ message: "Friend request sent!" });
  } catch (err) {
    console.error("Send friend request error:", err);
    res
      .status(500)
      .json({ message: "Server error. Could not send friend request." });
  }
};

// ✅ Accept friend request
exports.acceptFriendRequest = async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  const senderId = req.params.id;

  if (!currentUser.friendRequests.includes(senderId))
    return res.status(400).json({ message: "No request from this user." });

  // Add each other as friends
  currentUser.friends.push(senderId);
  currentUser.friendRequests = currentUser.friendRequests.filter(
    (id) => id.toString() !== senderId
  );
  await currentUser.save();

  const sender = await User.findById(senderId);
  sender.friends.push(req.user.id);
  sender.sentRequests = sender.sentRequests.filter(
    (id) => id.toString() !== req.user.id
  );
  await sender.save();

  res.status(200).json({ message: "Friend request accepted." });
};

// ❌ Reject friend request
exports.rejectFriendRequest = async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  const senderId = req.params.id;

  currentUser.friendRequests = currentUser.friendRequests.filter(
    (id) => id.toString() !== senderId
  );
  await currentUser.save();

  res.status(200).json({ message: "Friend request rejected." });
};

// 👥 Get user's friends
exports.getFriendsList = async (req, res) => {
  const user = await User.findById(req.user.id).populate(
    "friends",
    "name email"
  );
  res.status(200).json(user.friends);
};

// 📬 Get incoming friend requests
exports.getPendingRequests = async (req, res) => {
  const user = await User.findById(req.user.id).populate(
    "friendRequests",
    "name email"
  );
  res.status(200).json(user.friendRequests);
};

// 🕒 Get sent friend requests
exports.getSentRequests = async (req, res) => {
  const user = await User.findById(req.user.id).populate(
    "sentRequests",
    "name email"
  );
  res.status(200).json(user.sentRequests);
};

// ❌ Cancel a sent request
exports.cancelFriendRequest = async (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.id;

  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver)
    return res.status(404).json({ message: "User not found" });

  sender.sentRequests.pull(receiverId);
  receiver.friendRequests.pull(senderId);

  await sender.save();
  await receiver.save();

  res.status(200).json({ message: "Friend request canceled" });
};

// 🧠 Get friend's dream progress
exports.getFriendProgress = async (req, res) => {
  try {
    const friendId = req.params.id;
    const dreams = await Dream.find({ user: friendId });
    res.status(200).json(dreams);
  } catch (err) {
    console.error("Error fetching friend progress:", err);
    res.status(500).json({ message: "Failed to fetch friend's progress" });
  }
};

// 🗑️ Delete (unfriend) a friend
exports.deleteFriend = async (req, res) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.id;

    // Find both users
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend)
      return res.status(404).json({ message: "User not found" });

    // Check if they are actually friends
    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: "This user is not your friend." });
    }

    // Remove each other from friends list
    user.friends.pull(friendId);
    friend.friends.pull(userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: "Friend removed successfully." });
  } catch (err) {
    console.error("Error deleting friend:", err);
    res.status(500).json({ message: "Failed to delete friend." });
  }
};

// 🔍 Search users by name or email
exports.searchUsers = async (req, res) => {
  try {
    const query = req.query.q?.trim();
    const currentUserId = req.user.id;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Search by name or email, exclude yourself
    const users = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
          ],
        },
      ],
    })
      .select("name email") // only return needed fields
      .limit(5);

    res.status(200).json(users);
  } catch (err) {
    console.error("Search users error:", err);
    res.status(500).json({ message: "Failed to search users" });
  }
};
