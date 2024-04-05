import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full mt-auto text-gray-300">
      <p>
        © {new Date().getFullYear()} Birbla.com, a Hacker News reader ·{" "}
        <a href="/content">Content</a> · <a href="/terms">Terms</a> ·{" "}
        <a href="/privacy">Privacy</a> ·{" "}
        <a href="mailto:ferhat@ekofi.science">Support</a>
      </p>
    </footer>
  );
}
