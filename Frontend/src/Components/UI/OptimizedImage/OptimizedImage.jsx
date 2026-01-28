import { useState, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  placeholder = "blur",
  quality = 75,
  format = "auto",
  sizes = "100vw",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  const generateSrcSet = (baseSrc) => {
    if (!baseSrc) return "";

    const widths = [320, 640, 768, 1024, 1280, 1536];
    return widths
      .map((w) => `${baseSrc}?w=${w}&q=${quality}&f=${format} ${w}w`)
      .join(", ");
  };

  const getOptimizedSrc = (baseSrc) => {
    if (!baseSrc) return "";

    const params = new URLSearchParams({
      q: quality.toString(),
      f: format,
      auto: "format,compress",
    });

    if (width) params.set("w", width.toString());
    if (height) params.set("h", height.toString());

    return `${baseSrc}?${params.toString()}`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const fallbackSrc = "/src/assets/placeholder.webp";

  if (priority) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          ref={imgRef}
          src={getOptimizedSrc(src)}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading="eager"
          onLoad={handleLoad}
          onError={handleError}
          className={`
            transition-opacity duration-300 
            ${isLoaded ? "opacity-100" : "opacity-0"}
            ${hasError ? "hidden" : ""}
          `}
          {...props}
        />
        {hasError && (
          <img
            src={fallbackSrc}
            alt={alt || "Image not available"}
            width={width}
            height={height}
            className="object-cover w-full h-full"
            {...props}
          />
        )}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <LazyLoadImage
        ref={imgRef}
        src={getOptimizedSrc(src)}
        placeholderSrc={
          placeholder === "blur" ? `${src}?w=20&h=20&blur=10&q=30` : undefined
        }
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        effect={placeholder}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300 
          ${isLoaded ? "opacity-100" : "opacity-0"}
          ${hasError ? "hidden" : ""}
        `}
        {...props}
      />
      {hasError && (
        <img
          src={fallbackSrc}
          alt={alt || "Image not available"}
          width={width}
          height={height}
          className="object-cover w-full h-full absolute inset-0"
          {...props}
        />
      )}
      {!isLoaded && !hasError && placeholder !== "blur" && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export const ProductImage = ({ src, alt, className = "", ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={`object-cover ${className}`}
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    quality={80}
    format="webp"
    {...props}
  />
);

export const BannerImage = ({ src, alt, className = "", ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={`object-cover ${className}`}
    sizes="100vw"
    quality={85}
    format="webp"
    priority={true}
    {...props}
  />
);

export const ThumbnailImage = ({ src, alt, className = "", ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    className={`object-cover ${className}`}
    sizes="(max-width: 640px) 80px, 120px"
    quality={60}
    format="webp"
    {...props}
  />
);

export default OptimizedImage;
