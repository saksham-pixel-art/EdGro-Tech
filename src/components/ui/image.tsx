import { useState, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function Image({
  src,
  alt,
  className,
  containerClassName,
  fallbackSrc,
  priority = false,
  ...props
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted flex items-center justify-center",
        containerClassName
      )}
    >
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-0 bg-muted/80 skeleton-pulse flex items-center justify-center"
          >
             {/* Optional: Add a subtle loading indicator here if needed */}
          </motion.div>
        )}
      </AnimatePresence>

      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 text-muted-foreground z-10">
          <ImageIcon className="h-8 w-8 mb-2 opacity-50" />
          <span className="text-xs font-medium">Image unavailable</span>
        </div>
      ) : null}

      <motion.img
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        src={hasError ? fallbackSrc || "" : src}
        alt={alt || "Image"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "w-full h-full object-cover",
          !isLoaded && "invisible", 
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        {...props}
      />
    </div>
  );
}
