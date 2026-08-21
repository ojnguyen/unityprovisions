import type { ImageMetadata } from 'astro';

/*
 * Resolves the image dimensions Astro should generate for a responsive image.
 *
 * Local imports already include width and height, so we use those instead of
 * guessing. For string URLs, the caller provides a fallback size because Astro
 * cannot infer dimensions without fetching the asset.
*/
export function getImageDimensions(
  src: ImageMetadata | string,
  fallback: { width: number; height: number }
): { width: number; height: number } {
  return typeof src === 'string' ? fallback : { width: src.width, height: src.height };
}