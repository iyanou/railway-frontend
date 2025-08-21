'use client'

import React, { useState, useRef, useCallback } from 'react'
import { optimizeGoogleImageUrl, generateImageFallbacks, isValidImageUrl } from '../lib/imageUtils'

interface ProfileImageProps {
  src?: string | null
  alt?: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showOnlineIndicator?: boolean
  fallbackSrc?: string
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  alt = 'Profile',
  className = '',
  size = 'md',
  showOnlineIndicator = false,
  fallbackSrc = '/default-avatar.svg'
}) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [currentSrc, setCurrentSrc] = useState<string>(
    src && isValidImageUrl(src) ? optimizeGoogleImageUrl(src) : fallbackSrc
  )
  const imageRef = useRef<HTMLImageElement>(null)
  const fallbackUrlsRef = useRef<string[]>([])
  const fallbackIndexRef = useRef(0)

  // Size configurations
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const indicatorSizes = {
    sm: 'w-2 h-2 -bottom-0 -right-0',
    md: 'w-3 h-3 -bottom-1 -right-1',
    lg: 'w-4 h-4 -bottom-1 -right-1', 
    xl: 'w-5 h-5 -bottom-1 -right-1'
  }

  // Enhanced error handling with multiple fallback URLs
  const handleImageError = useCallback(() => {
    console.log(`Profile image failed to load: ${currentSrc}`)
    
    // If we haven't generated fallback URLs yet, do it now
    if (fallbackUrlsRef.current.length === 0 && src && isValidImageUrl(src)) {
      fallbackUrlsRef.current = [...generateImageFallbacks(src), fallbackSrc]
      fallbackIndexRef.current = 0
    }
    
    // Try next fallback URL
    fallbackIndexRef.current++
    
    if (fallbackIndexRef.current < fallbackUrlsRef.current.length) {
      const nextUrl = fallbackUrlsRef.current[fallbackIndexRef.current]
      console.log(`Trying fallback URL ${fallbackIndexRef.current + 1}/${fallbackUrlsRef.current.length}: ${nextUrl}`)
      setCurrentSrc(nextUrl)
    } else {
      // All fallbacks exhausted, use default avatar
      console.log('All fallbacks exhausted, using default avatar')
      setImageState('error')
      setCurrentSrc(fallbackSrc)
    }
  }, [src, currentSrc, fallbackSrc])

  const handleImageLoad = useCallback(() => {
    console.log('Profile image loaded successfully')
    setImageState('loaded')
    fallbackIndexRef.current = 0
  }, [])

  // Reset state when src prop changes
  React.useEffect(() => {
    if (src && src !== currentSrc) {
      setImageState('loading')
      setCurrentSrc(src && isValidImageUrl(src) ? optimizeGoogleImageUrl(src) : fallbackSrc)
      fallbackUrlsRef.current = []
      fallbackIndexRef.current = 0
    }
  }, [src])

  return (
    <div className="relative inline-block">
      {/* Loading placeholder */}
      {imageState === 'loading' && (
        <div className={`${sizeClasses[size]} rounded-full bg-gray-200 animate-pulse ${className}`}>
          <div className="w-full h-full rounded-full bg-gray-300"></div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        ref={imageRef}
        src={currentSrc}
        alt={alt}
        className={`
          ${sizeClasses[size]} 
          rounded-full 
          ring-2 ring-gray-100 
          transition-all duration-200 
          ${imageState === 'loading' ? 'opacity-0 absolute' : 'opacity-100'}
          ${className}
        `}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
        // Add referrer policy for Google images
        referrerPolicy="no-referrer"
      />
      
      {/* Online indicator */}
      {showOnlineIndicator && imageState !== 'loading' && (
        <div className={`
          absolute ${indicatorSizes[size]}
          bg-green-500 
          border-2 border-white 
          rounded-full
        `}></div>
      )}
    </div>
  )
}

export default ProfileImage