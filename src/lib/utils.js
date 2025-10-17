import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// Multiple fallback placeholder images for better reliability
export const PLACEHOLDER_IMAGES = [
  'https://via.placeholder.com/400x600/1a1a1a/ffffff?text=Movie+Poster',
  'https://dummyimage.com/400x600/1a1a1a/ffffff&text=Movie+Poster',
  'data:image/svg+xml;base64,' + btoa(`
    <svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="600" fill="#1a1a1a"/>
      <text x="200" y="280" font-family="Arial" font-size="24" fill="#ffffff" text-anchor="middle">Movie</text>
      <text x="200" y="320" font-family="Arial" font-size="24" fill="#ffffff" text-anchor="middle">Poster</text>
      <rect x="150" y="200" width="100" height="60" fill="none" stroke="#ffffff" stroke-width="2" rx="5"/>
      <circle cx="170" cy="220" r="5" fill="#ffffff"/>
      <path d="m180,240 l20,-10 l10,15 l-30,5 z" fill="#ffffff"/>
    </svg>
  `)
];

export const PLACEHOLDER_IMAGE = PLACEHOLDER_IMAGES[0];

// Image loading utility functions
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

export const preloadImageWithFallback = async (src, fallbacks = PLACEHOLDER_IMAGES) => {
  try {
    await preloadImage(src);
    return src;
  } catch (error) {
    console.warn(`Primary image failed to load: ${src}`);
    
    for (const fallback of fallbacks) {
      try {
        await preloadImage(fallback);
        return fallback;
      } catch (fallbackError) {
        console.warn(`Fallback image failed to load: ${fallback}`);
      }
    }
    
    // Return the SVG fallback as last resort
    return PLACEHOLDER_IMAGES[PLACEHOLDER_IMAGES.length - 1];
  }
};

export const isImageUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url) || 
         url.includes('picsum.photos') || 
         url.includes('unsplash.com') || 
         url.includes('placeholder.com') || 
         url.includes('dummyimage.com') ||
         url.startsWith('data:image/');
};
