import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DreamCard({ dream }) {
  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition transform duration-200">
      <h3 className="text-xl font-semibold text-white mb-2">{dream.title}</h3>

      <p className="text-gray-300 text-sm line-clamp-3 mb-3">
        {dream.content && dream.content.length > 100
          ? dream.content.slice(0, 100) + "..."
          : dream.content || "No description"}
      </p>

      <p className="text-xs text-gray-400 mb-4">
        <span className="font-semibold">Date:</span>{" "}
        {dream.dateOfDream
          ? new Date(dream.dateOfDream).toLocaleDateString()
          : "No date"}
      </p>

      <Link
        to={`/dream/${dream._id}`}
        className="group inline-flex items-center gap-1 text-indigo-400 font-medium hover:text-indigo-300 transition"
      >
        View Details
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
