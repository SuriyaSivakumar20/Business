import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  alt?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt = 'Image' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewerOpen, setViewerOpen] = useState(false);

  const openImageViewer = (index: number) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  const closeImageViewer = () => {
    setViewerOpen(false);
  };

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  if (!images.length) return null;

  if (images.length === 1) {
    return (
      <div className="overflow-hidden rounded-lg mt-3">
        <img 
          src={images[0]} 
          alt={alt} 
          className="w-full h-auto object-cover cursor-pointer hover:opacity-95 transition-opacity"
          onClick={() => openImageViewer(0)}
          onError={(e) => {
            // If image fails to load, hide it
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="grid grid-cols-2 gap-2">
        {images.map((src, index) => (
          <div key={index} className="overflow-hidden rounded-lg aspect-square">
            <img
              src={src}
              alt={`${alt} ${index + 1}`}
              className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
              onClick={() => openImageViewer(index)}
              onError={(e) => {
                // If image fails to load, hide it
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        ))}
      </div>

      {viewerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeImageViewer}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none z-10"
            onClick={closeImageViewer}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button 
            className="absolute left-4 text-white hover:text-gray-300 focus:outline-none z-10"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          
          <img
            src={images[currentIndex]}
            alt={`${alt} ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onError={(e) => {
              // If image fails to load in viewer, show a message
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.insertAdjacentHTML('afterend', '<div class="text-white text-xl">Image failed to load</div>');
            }}
          />
          
          <button 
            className="absolute right-4 text-white hover:text-gray-300 focus:outline-none z-10"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;