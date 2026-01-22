import { Loader2 } from "lucide-react";

const LoadingSpinner = ({
  size = "md",
  className = "",
  text = "Cargando...",
  showText = false,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const containerClasses = {
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
    xl: "p-8",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center ${containerClasses[size]} ${className}`}
      role="status"
      aria-label={text}
    >
      <Loader2
        className={`animate-spin text-blue-600 ${sizeClasses[size]}`}
        aria-hidden="true"
      />
      {showText && (
        <span className="mt-2 text-sm text-gray-600 animate-pulse">{text}</span>
      )}
      <span className="sr-only">{text}</span>
    </div>
  );
};
export default LoadingSpinner;
