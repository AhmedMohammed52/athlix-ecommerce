export default function MenuOverlay({ isMenuOpen, setIsMenuOpen }) {
  return (
    <div
      onClick={() => setIsMenuOpen(false)}
      className={`fixed inset-0 z-40 bg-black transition-opacity duration-300
      ${isMenuOpen ? "opacity-80 visible" : "opacity-0 invisible"}`}
    />
  );
}
