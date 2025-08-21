/**
 * Utilities for handling profile images, especially Google profile images
 */

// Common Google profile image URL patterns and their optimizations
const GOOGLE_IMAGE_DOMAINS = [
  'lh3.googleusercontent.com',
  'lh4.googleusercontent.com',
  'lh5.googleusercontent.com',
  'lh6.googleusercontent.com'
]

/**
 * Optimizes Google profile image URLs for better reliability
 * @param url Original image URL
 * @param size Desired size (optional)
 * @returns Optimized URL
 */
export function optimizeGoogleImageUrl(url: string, size?: number): string {
  if (!url) return url

  try {
    const urlObj = new URL(url)
    
    // Check if it's a Google image
    const isGoogleImage = GOOGLE_IMAGE_DOMAINS.some(domain => 
      urlObj.hostname.includes(domain)
    )
    
    if (!isGoogleImage) return url
    
    // Remove existing size parameters to avoid conflicts
    const cleanUrl = url.split('=')[0]
    
    // Add optimized size parameter if requested
    if (size) {
      return `${cleanUrl}=s${size}-c`
    }
    
    // Return clean URL without size parameters for better browser handling
    return cleanUrl
    
  } catch (error) {
    console.warn('Error optimizing Google image URL:', error)
    return url
  }
}

/**
 * Generates multiple fallback URLs for a Google image
 * @param url Original image URL
 * @returns Array of fallback URLs to try
 */
export function generateImageFallbacks(url: string): string[] {
  if (!url) return []
  
  const fallbacks: string[] = []
  
  // Original URL
  fallbacks.push(url)
  
  // Optimized version without size parameters
  const optimized = optimizeGoogleImageUrl(url)
  if (optimized !== url) {
    fallbacks.push(optimized)
  }
  
  // Try different size variations for Google images
  if (url.includes('googleusercontent.com')) {
    const baseUrl = url.split('=')[0]
    // Add common sizes that tend to work well
    const sizes = [96, 128, 256]
    sizes.forEach(size => {
      fallbacks.push(`${baseUrl}=s${size}-c`)
    })
  }
  
  return [...new Set(fallbacks)] // Remove duplicates
}

/**
 * Validates if an image URL is likely to be accessible
 * @param url Image URL to validate
 * @returns Boolean indicating if URL seems valid
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false
  
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Preloads an image to check if it's accessible
 * @param url Image URL to preload
 * @returns Promise that resolves if image loads successfully
 */
export function preloadImage(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isValidImageUrl(url)) {
      resolve(false)
      return
    }
    
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
    
    // Timeout after 5 seconds
    setTimeout(() => resolve(false), 5000)
  })
}
