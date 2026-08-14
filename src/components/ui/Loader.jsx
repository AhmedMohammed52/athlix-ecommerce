export default function Loader({ fullScreen = false, className = "", size }) {
  const circle = (
    <span
      role="status"
      aria-label="Loading"
      className={`athlix-loader ${className}`}
      style={size ? { "--loader-size": `${size}px` } : undefined}
    />
  );

  if (!fullScreen) {
    return circle;
  }

  return (
    <div
      className="flex min-h-dvh items-center justify-center bg-background"
      role="status"
      aria-label="Loading page"
    >
      {circle}
    </div>
  );
}
