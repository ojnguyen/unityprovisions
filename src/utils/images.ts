import type { ImageMetadata } from 'astro';

/**
 * Resolves the real dimensions to request from ResponsiveImage
 * (astro:assets) for an image prop typed `ImageMetadata | string`.
 *
 * A local `src/assets/...` import (ImageMetadata) already carries its
 * own real width/height — read directly off it, so ResponsiveImage
 * generates from the image's true, full native resolution rather than
 * a shared guessed size (see PartnersAndSupporters/StaffCard/
 * ProjectSection, §7 — sizing the request to the display box instead
 * of the source's real size caused visible upscale blur; letting
 * width default to "auto" caused uneven layout spacing). Display size
 * is a separate, per-component CSS concern — this only governs what
 * Astro generates.
 *
 * A plain string src (a non-imported path/URL) has no such metadata to
 * read — Astro can't infer its size without fetching it — so the
 * caller supplies a fallback box for that case. Not currently exercised
 * by any real data (every real logo/photo/screenshot in this project
 * is a local import), but kept type-correct for the day one isn't.
 */
export function getImageDimensions(
  src: ImageMetadata | string,
  fallback: { width: number; height: number }
): { width: number; height: number } {
  return typeof src === 'string' ? fallback : { width: src.width, height: src.height };
}