import { BookOpen, BarChart3, Users } from "lucide-react";

export default function Features() {
  return (
    <section className="bg-gradient-to-b from-black/40 via-indigo-900/20 to-black/60 py-20 px-8 md:px-20 relative">
      <h2 className="text-4xl font-extrabold text-center mb-14 text-white">
        Why <span className="text-indigo-400">Dream Journal?</span>
      </h2>

      <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
        {/* Reflect */}
        <div className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-indigo-500/20 transition-all hover:-translate-y-2">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
            <BookOpen size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-white">✨ Reflect</h3>
          <p className="text-gray-300 leading-relaxed">
            Write down your dreams in detail and revisit them anytime to gain
            deeper insights into your thoughts.
          </p>
        </div>

        {/* Analyze */}
        <div className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-purple-500/20 transition-all hover:-translate-y-2">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-purple-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
            <BarChart3 size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-white">📊 Analyze</h3>
          <p className="text-gray-300 leading-relaxed">
            Spot patterns, track moods, and uncover subconscious themes using
            visual insights and data analytics.
          </p>
        </div>

        {/* Connect */}
        <div className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-lg hover:shadow-pink-500/20 transition-all hover:-translate-y-2">
          <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-pink-600 text-white mb-6 shadow-lg group-hover:scale-110 transition-transform">
            <Users size={28} />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-white">🌍 Connect</h3>
          <p className="text-gray-300 leading-relaxed">
            Share your dreams and explore collective subconscious journeys with
            a growing community of dreamers.
          </p>
        </div>
      </div>
    </section>
  );
}
