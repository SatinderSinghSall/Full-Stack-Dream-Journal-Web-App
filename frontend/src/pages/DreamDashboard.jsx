import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Smile, Star, Tag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  format,
  parseISO,
  differenceInDays,
  eachDayOfInterval,
} from "date-fns";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import api from "../api/api";

const COLORS = ["#6366F1", "#82ca9d", "#facc15", "#f97316", "#06b6d4"];

export default function AnalyticsDashboard() {
  const [dreams, setDreams] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [recurringDreams, setRecurringDreams] = useState([]);
  const [streak, setStreak] = useState(0);
  const [topInsights, setTopInsights] = useState({});
  const [loading, setLoading] = useState(true);
  const [dailyHeatmap, setDailyHeatmap] = useState([]);
  const [tagCloud, setTagCloud] = useState([]);
  const [moodTrend, setMoodTrend] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDreams();
  }, []);

  const fetchDreams = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/dreams");
      setDreams(data);
      processAnalytics(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const processAnalytics = (dreams) => {
    if (!dreams || dreams.length === 0) return;

    // 1️⃣ Weekly data
    const weeksMap = {};
    dreams.forEach((d) => {
      const week = format(parseISO(d.createdAt), "yyyy-ww");
      weeksMap[week] = (weeksMap[week] || 0) + 1;
    });
    setWeeklyData(
      Object.entries(weeksMap).map(([week, count]) => ({ week, count }))
    );

    // 2️⃣ Mood data
    const moodsMap = {};
    dreams.forEach((d) => {
      moodsMap[d.mood] = (moodsMap[d.mood] || 0) + 1;
    });
    setMoodData(
      Object.entries(moodsMap).map(([name, value]) => ({ name, value }))
    );

    // 3️⃣ Recurring dreams
    const fuse = new Fuse(dreams, {
      keys: ["title", "content"],
      threshold: 0.4,
    });
    const keywords = ["flying", "chased", "falling", "school", "water"];
    const recurring = keywords
      .map((k) => ({
        keyword: k,
        matches: fuse.search(k).map((res) => res.item),
      }))
      .filter((r) => r.matches.length > 1);
    setRecurringDreams(recurring);

    // 4️⃣ Streak
    const sortedDates = dreams
      .map((d) => parseISO(d.createdAt))
      .sort((a, b) => b - a);
    let currentStreak = 0;
    const today = new Date();
    for (let d of sortedDates) {
      const diff = Math.floor((today - d) / (1000 * 60 * 60 * 24));
      if (diff === currentStreak) currentStreak++;
      else break;
    }
    setStreak(currentStreak);

    // 5️⃣ Top insights
    const moodEntries = Object.entries(moodsMap);
    const topMood =
      moodEntries.length > 0
        ? moodEntries.sort((a, b) => b[1] - a[1])[0][0]
        : "Neutral";

    const tags = dreams.flatMap((d) => d.tags || []);
    const tagCounts = {};
    tags.forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1));
    const frequentTag =
      Object.keys(tagCounts).length > 0
        ? Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0][0]
        : "None";

    const avgRating =
      dreams.reduce((sum, d) => sum + (d.rating || 0), 0) / dreams.length || 0;

    const lastDreamDate = parseISO(dreams[0].createdAt);
    const daysAgo = differenceInDays(new Date(), lastDreamDate);

    setTopInsights({
      topMood,
      frequentTag,
      daysAgo,
      avgRating: avgRating.toFixed(1),
    });

    // 🌟 Daily Heatmap
    const start = parseISO(dreams[dreams.length - 1].createdAt);
    const allDays = eachDayOfInterval({ start, end: new Date() });
    const heatmap = allDays.map((day) => {
      const count = dreams.filter(
        (d) =>
          format(parseISO(d.createdAt), "yyyy-MM-dd") ===
          format(day, "yyyy-MM-dd")
      ).length;
      return { date: day, count };
    });
    setDailyHeatmap(heatmap);

    // 🌟 Tag Cloud
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([name, count]) => ({ name, count }));
    setTagCloud(topTags);

    // 🌟 Mood Trend
    const moodMap = { Happy: 4, Neutral: 3, Sad: 2, Anxious: 1, Excited: 5 }; // example mapping
    const trend = dreams
      .map((d) => ({
        date: format(parseISO(d.createdAt), "yyyy-MM-dd"),
        moodValue: moodMap[d.mood] || 3,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setMoodTrend(trend);
  };

  const MotionCard = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
    >
      {children}
    </motion.div>
  );

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading analytics...
      </div>
    );

  if (dreams.length === 0)
    return (
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center text-gray-700 bg-gradient-to-br from-indigo-50 via-white to-indigo-50 px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 p-2 rounded-full bg-white shadow hover:shadow-md transition transform hover:-translate-y-1"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-6xl mb-6"
        >
          🌙
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-2xl font-bold mb-2"
        >
          No dreams yet
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-gray-500 mb-6"
        >
          Log your dreams to unlock insights.
        </motion.p>

        {/* Add Dream Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link
            to="/dream/new"
            className="inline-flex items-center gap-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition"
          >
            <FiPlus className="text-xl" />
            Add New Dream
          </Link>
        </motion.div>
      </div>
    );

  return (
    <div className="p-6 sm:p-8 lg:p-10 max-w-7xl mx-auto space-y-8 bg-white text-gray-800">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
          Dream Insights Dashboard
        </h1>
      </div>

      {/* Top Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MotionCard>
          <div className="flex items-center gap-3">
            <Smile className="text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Most Common Mood</p>
              <p className="text-lg font-semibold">{topInsights.topMood}</p>
            </div>
          </div>
        </MotionCard>

        <MotionCard>
          <div className="flex items-center gap-3">
            <Tag className="text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Most Frequent Tag</p>
              <p className="text-lg font-semibold">{topInsights.frequentTag}</p>
            </div>
          </div>
        </MotionCard>

        <MotionCard>
          <div className="flex items-center gap-3">
            <CalendarDays className="text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Last Dream Logged</p>
              <p className="text-lg font-semibold">
                {topInsights.daysAgo} days ago
              </p>
            </div>
          </div>
        </MotionCard>

        <MotionCard>
          <div className="flex items-center gap-3">
            <Star className="text-indigo-500" />
            <div>
              <p className="text-sm text-gray-500">Avg Rating</p>
              <p className="text-lg font-semibold">{topInsights.avgRating}/5</p>
            </div>
          </div>
        </MotionCard>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Dreams", value: dreams.length },
          { label: "Current Streak", value: `${streak} days` },
          { label: "Longest Streak", value: "TBD" },
          { label: "Avg Vividness", value: "TBD" },
        ].map((stat, i) => (
          <MotionCard key={i}>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </MotionCard>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MotionCard>
          <h3 className="font-semibold mb-4">Dreams per Week</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </MotionCard>

        <MotionCard>
          <h3 className="font-semibold mb-4">Mood Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moodData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {moodData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </MotionCard>
      </div>

      {/* 🌟 Mood Trend Line */}
      <MotionCard>
        <h3 className="font-semibold mb-4">Mood Trend Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={moodTrend}>
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" domain={[0, 5]} />
            <Tooltip />
            <Line type="monotone" dataKey="moodValue" stroke="#6366F1" />
          </LineChart>
        </ResponsiveContainer>
      </MotionCard>

      {/* 🌟 Daily Heatmap */}
      <MotionCard>
        <h3 className="font-semibold mb-4">Dream Frequency Heatmap</h3>
        <div className="grid grid-cols-7 gap-1">
          {dailyHeatmap.map((day, idx) => {
            // Dynamic color based on count
            const intensity = Math.min(day.count / 5, 1); // 0 → 1 scale
            const colors = [
              "#E0E7FF",
              "#C7D2FE",
              "#A5B4FC",
              "#818CF8",
              "#4F46E5",
            ];
            const bgColor = colors[Math.floor(intensity * (colors.length - 1))];

            return (
              <motion.div
                key={idx}
                className="w-6 h-6 rounded-full cursor-pointer shadow-sm"
                style={{ backgroundColor: bgColor }}
                whileHover={{
                  scale: 1.3,
                  boxShadow: "0 0 8px rgba(79, 70, 229, 0.6)",
                }}
                transition={{ duration: 0.2 }}
                title={`${format(day.date, "yyyy-MM-dd")}: ${day.count} dreams`}
              />
            );
          })}
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Darker cells indicate more dreams logged that day.
        </p>
      </MotionCard>

      {/* 🌟 Tag Cloud */}
      <MotionCard>
        <h3 className="font-semibold mb-4">Top Tags Cloud</h3>
        <div className="flex flex-wrap gap-3">
          {tagCloud.map((tag, i) => {
            const fontSize = 12 + tag.count * 2;
            const hue = 240 + (i % tagCloud.length) * 20;
            return (
              <motion.span
                key={i}
                className="cursor-pointer"
                style={{
                  fontSize: `${fontSize}px`,
                  color: `hsl(${hue}, 70%, 50%)`,
                }}
                whileHover={{ scale: 1.3, rotate: (Math.random() - 0.5) * 10 }}
              >
                {tag.name}
              </motion.span>
            );
          })}
        </div>
      </MotionCard>

      {/* Recurring Dreams */}
      <MotionCard>
        <h3 className="font-semibold mb-3">Recurring Dreams</h3>
        {recurringDreams.length === 0 ? (
          <p className="text-gray-500">No recurring dreams detected.</p>
        ) : (
          <div className="space-y-2">
            {recurringDreams.map((r) => (
              <div
                key={r.keyword}
                className="p-3 bg-gray-50 rounded-lg text-sm"
              >
                <span className="font-semibold text-indigo-600">
                  {r.keyword}:
                </span>{" "}
                {r.matches.map((d) => d.title).join(", ")}
              </div>
            ))}
          </div>
        )}
      </MotionCard>
    </div>
  );
}
