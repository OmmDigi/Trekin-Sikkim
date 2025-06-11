"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
} from "lucide-react";
import { GalleryDialogProps } from "@/types";
import Image from "next/image";

export const AiGalleryDialog: React.FC<GalleryDialogProps> = ({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Reset states when dialog opens
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(1);
      setRotation(0);
      setDragOffset({ x: 0, y: 0 });
    }
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Home":
          setCurrentIndex(0);
          break;
        case "End":
          setCurrentIndex(images.length - 1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isOpen, currentIndex, images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoom(1);
    setRotation(0);
    setDragOffset({ x: 0, y: 0 });
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoom(1);
    setRotation(0);
    setDragOffset({ x: 0, y: 0 });
  }, [images.length]);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setZoom(1);
    setRotation(0);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleDownload = async () => {
    const currentImage = images[currentIndex];
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = currentImage.title || `image-${currentImage.id}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  console.log(zoom);

  // Handle mouse drag for zoomed images
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom >= 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom >= 1) {
      e.preventDefault();
      setDragOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle touch drag for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom >= 1 && e.touches.length === 1) {
      setIsDragging(true);
      const touch = e.touches[0];
      setDragStart({
        x: touch.clientX - dragOffset.x,
        y: touch.clientY - dragOffset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom >= 1 && e.touches.length === 1) {
      e.preventDefault();
      const touch = e.touches[0];
      setDragOffset({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Reset drag offset when zoom changes
  useEffect(() => {
    if (zoom === 1) {
      setDragOffset({ x: 0, y: 0 });
    }
  }, [zoom]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center select-none">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-2 sm:p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-xs sm:text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </span>
            {currentImage.title && (
              <h3 className="text-sm sm:text-lg font-semibold truncate max-w-32 sm:max-w-none">
                {currentImage.title}
              </h3>
            )}
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-1.5 sm:p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={16} className="sm:w-5 sm:h-5" />
            </button>

            <span className="text-xs sm:text-sm px-1 sm:px-2 hidden sm:inline">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={handleZoomIn}
              className="p-1.5 sm:p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={16} className="sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={handleRotate}
              className="p-1.5 sm:p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              title="Rotate"
            >
              <RotateCw size={16} className="sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={handleDownload}
              className="p-1.5 sm:p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors hidden sm:flex"
              title="Download"
            >
              <Download size={16} className="sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm transition-colors ${
                showThumbnails
                  ? "bg-blue-600 text-white"
                  : "bg-black/30 hover:bg-black/50 text-white"
              }`}
            >
              Grid
            </button>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
              title="Close"
            >
              <X size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-16 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-white"></div>
          </div>
        )}

        <div
          className={`relative ${
            zoom >= 1 ? "cursor-grab" : "cursor-default"
          } ${isDragging ? "cursor-grabbing" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
          }}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-full object-contain transition-all duration-300 ease-in-out"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              filter: isLoading ? "blur(4px)" : "none",
              userSelect: "none",
              pointerEvents: zoom >= 1 ? "none" : "auto",
            }}
            height={1920}
            width={1080}
            sizes="100vw"
            onLoad={() => setIsLoading(false)}
            onLoadStart={() => setIsLoading(true)}
            draggable={false}
          />
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200 hover:scale-110 z-10"
              title="Previous Image"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200 hover:scale-110 z-10"
              title="Next Image"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>

      {/* Image Description */}
      {currentImage.description && (
        <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-2 sm:p-4">
          <p className="text-white text-center max-w-2xl mx-auto text-sm sm:text-base px-4">
            {currentImage.description}
          </p>
        </div>
      )}

      {/* Thumbnail Strip */}
      {showThumbnails && images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/70 p-2 sm:p-4">
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 justify-start sm:justify-center">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 relative group ${
                  index === currentIndex ? "ring-1 sm:ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded transition-opacity duration-200 group-hover:opacity-75"
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-blue-500/20 rounded"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress Dots */}
      {!showThumbnails && images.length > 1 && (
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-1 sm:space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
