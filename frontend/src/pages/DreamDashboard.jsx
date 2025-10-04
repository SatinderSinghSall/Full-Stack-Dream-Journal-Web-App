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
} from "recharts";
import api from "../api/api";
import { format, parseISO } from "date-fns";
import Fuse from "fuse.js";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00bfff"];

export default function AnalyticsDashboard() {
  const [dreams, setDreams] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [moodData, setMoodData] = useState([]);
  const [recurringDreams, setRecurringDreams] = useState([]);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
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

    // 1️⃣ Dreams per week (Bar Chart)
    const weeksMap = {};
    dreams.forEach((d) => {
      const week = format(parseISO(d.createdAt), "yyyy-ww");
      weeksMap[week] = (weeksMap[week] || 0) + 1;
    });
    setWeeklyData(
      Object.entries(weeksMap).map(([week, count]) => ({ week, count }))
    );

    // 2️⃣ Mood Pie Chart
    const moodsMap = {};
    dreams.forEach((d) => {
      moodsMap[d.mood] = (moodsMap[d.mood] || 0) + 1;
    });
    setMoodData(
      Object.entries(moodsMap).map(([name, value]) => ({ name, value }))
    );

    // 3️⃣ Recurring Dreams (using keywords)
    const fuse = new Fuse(dreams, {
      keys: ["title", "description"],
      threshold: 0.4,
    });
    const keywords = ["flying", "chased", "falling"];
    const recurring = keywords
      .map((k) => ({
        keyword: k,
        matches: fuse.search(k).map((res) => res.item),
      }))
      .filter((r) => r.matches.length > 1);
    setRecurringDreams(recurring);

    // 4️⃣ Streak calculation
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
  };

  // 🦴 Skeleton Loader Component
  const SkeletonCard = () => (
    <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
      <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto" />
    </div>
  );

  const SkeletonChart = () => (
    <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow animate-pulse h-[340px]" />
  );

  // 🧘 Empty state UI
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center bg-white/60 rounded-2xl shadow">
      <div className="text-5xl mb-4">🌙</div>
      <h3 className="text-xl font-semibold mb-2">No data to analyze yet</h3>
      <p className="text-gray-500 max-w-sm">
        Start logging your dreams to unlock insights, trends, and patterns.
      </p>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
      </div>

      {/* If still loading */}
      {loading ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SkeletonChart />
            <SkeletonChart />
          </div>
          <SkeletonChart />
        </>
      ) : dreams.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow hover:shadow-lg transition text-center">
              <p className="text-sm text-gray-500">Total Dreams</p>
              <p className="text-2xl font-bold">{dreams.length}</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow hover:shadow-lg transition text-center">
              <p className="text-sm text-gray-500">Current Streak</p>
              <p className="text-2xl font-bold">{streak} days</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow hover:shadow-lg transition text-center">
              <p className="text-sm text-gray-500">Longest Streak</p>
              <p className="text-2xl font-bold">TBD</p>
            </div>
            <div className="bg-white/80 backdrop-blur p-5 rounded-2xl shadow hover:shadow-lg transition text-center">
              <p className="text-sm text-gray-500">Avg Vividness</p>
              <p className="text-2xl font-bold">TBD</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold mb-4">Dreams per Week</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow hover:shadow-lg transition">
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
            </div>
          </div>

          {/* Recurring Dreams */}
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow hover:shadow-lg transition space-y-3">
            <h3 className="font-semibold">Recurring Dreams</h3>
            {recurringDreams.length === 0 && (
              <p className="text-gray-500">No recurring dreams detected yet.</p>
            )}
            {recurringDreams.map((r) => (
              <div
                key={r.keyword}
                className="p-3 bg-gray-50 rounded-lg text-sm shadow-sm"
              >
                <strong className="text-indigo-600">{r.keyword}:</strong>{" "}
                {r.matches.map((d) => d.title).join(", ")}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
