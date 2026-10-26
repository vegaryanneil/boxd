
import { useEffect, useState } from "react";

export default function FoodImage({
  src,
  alt,
  className = "",
  ...props
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex h-full w-full items-center justify-center bg-coral p-6 text-center font-display text-charcoal ${className}`}
      >
        FRESHLY BOXD.
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
}
