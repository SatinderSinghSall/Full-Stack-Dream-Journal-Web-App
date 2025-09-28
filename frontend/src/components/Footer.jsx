import { Github, Linkedin, Twitter, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">
            🌙 Dream Journal
          </h2>
          <p className="text-gray-400 mb-4 leading-relaxed">
            Track, analyze, and reflect on your dreams to uncover hidden
            patterns in your subconscious mind.
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Dream Journal. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", path: "/" },
              { name: "Login", path: "/login" },
              { name: "Sign Up", path: "/signup" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.path}
                  className="hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Connect with Us
          </h3>
          <div className="flex space-x-4">
            {[
              { Icon: Github, href: "https://github.com/SatinderSinghSall" },
              {
                Icon: Linkedin,
                href: "https://www.linkedin.com/in/satinder-singh-sall-b62049204/",
              },
              { Icon: Youtube, href: "https://youtube.com/yourchannel" },
              { Icon: Twitter, href: "https://x.com/SallSatinder" },
              { Icon: Mail, href: "mailto:satindersinghsall111@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
        Made with ❤️ by Satinder Singh Sall.
      </div>
    </footer>
  );
}
