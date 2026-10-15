// Artwork added for the hybrid page, hosted on Vercel Blob rather than in /public.
// The "-v2" files are resized to ~3x their largest display width and palette-compressed (1.9 MB -> 141 KB in total).
const BLOB = "https://neeuv3c4wu4qzcdw.public.blob.vercel-storage.com/katkin/mouse-lp";

export const blobAssets = {
  catPouncingFull: `${BLOB}/cat-pouncing-full-v2.png`, // 600×398
  // Phone hero: white-filled, transparent surround; the cat bleeds off its left edge.
  catReachingMobile: `${BLOB}/cat-reaching-mobile-v2.png`, // 390×399
  mouseSignMobile: `${BLOB}/mouse-sign-mobile-v2.png`, // 435×405
  mouseSignFull: `${BLOB}/mouse-sign-full-v2.png`, // 420×416
  mouseSignTrimmed: `${BLOB}/mouse-sign-trimmed.png`, // 601×585, transparent, trimmed to the drawing
  mousePeekingBlankSign: `${BLOB}/mouse-peeking-blank-sign.png`, // 1247×1261
  // Cropped flat along the body so it can peek over an edge; the paw hangs below the cut.
  mousePeeking: `${BLOB}/mouse-peeking-v2.png`, // 320×209
  mouseFootprintTrail: `${BLOB}/mouse-footprint-trail.png`, // 1254×1254
  // Single print cut from the trail; used as the letter's bullet in mouse-lp.css (CSS can't import this file).
  mousePawPrint: `${BLOB}/mouse-paw-print.png`, // 51×73
  // All 12 prints of the trail, rotated to walk right and slightly down; transparent.
  mousePawTrail: `${BLOB}/mouse-paw-trail-12-v2.png`, // 870×338
  mousePointingAtCta: `${BLOB}/mouse-pointing-at-cta.png`, // 1448×1086
  mousePointingAtCtaCut: `${BLOB}/mouse-pointing-at-cta-cut-v2.png`, // 330×292, white body, transparent surround, trimmed
  handwrittenCaret: `${BLOB}/handwritten-caret.png`, // 171×201
  handwrittenSecond: `${BLOB}/handwritten-second.png`, // 576×300
};
