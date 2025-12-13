import { useState } from "react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showName, setShowName] = useState(false);

  const footerLinks = [
    { href: "#about", label: "About" },
    { href: "#academics", label: "Academics" },
    { href: "#beyond", label: "Beyond Academics" },
    { href: "#admissions", label: "Admission" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <footer className="border-t border-slate-300/80 py-8 mt-8 text-xs text-gray-600 bg-gray-50/85 backdrop-blur-xl">
      <div className="container">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="text-sm">
            © {currentYear} The Scholar&apos;s Academy, Pithoragarh. All rights
            reserved.
          </div>
          <div className="flex flex-wrap gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs text-gray-700 hover:text-blue-900 transition-colors font-semibold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          className="mt-6 text-center cursor-pointer"
          onMouseEnter={() => setShowName(true)}
          onClick={() => setShowName(true)}
          onMouseLeave={() => setShowName(false)} // optional: hide on leaving
        >
          <span className="block text-sm text-gray-700 font-semibold mb-2">
            Made with ❤️ by :
          </span>
          <a
            href="https://www.linkedin.com/in/atul-oli27-intech/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-lg font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {showName ? "Atul Oli" : ""}
          </a>
        </div>
      </div>
    </footer>
  );
}
