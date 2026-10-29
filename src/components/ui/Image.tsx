'use client';

import NextImage from 'next/image';
import { useState } from 'react';
import { FiImage } from 'react-icons/fi';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

/**
 * Next Image wrapper with a graceful fallback if an asset fails to load.
 * Website Flow §7 edge case: a failed image shows a neutral placeholder.
 */
export function Image({
  src,
  alt,
  width,
  height,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw',
  priority = false,
  quality = 80,
}: ImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-concrete-light p-4 text-center ${className}`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <span className="flex flex-col items-center gap-2 text-xs font-medium text-concrete-dark">
          <FiImage className="h-6 w-6 text-concrete" aria-hidden="true" />
          {alt}
        </span>
      </div>
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      quality={quality}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
