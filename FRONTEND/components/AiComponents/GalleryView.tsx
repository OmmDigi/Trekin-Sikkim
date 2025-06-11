import React, { useState } from "react";
import { ZoomIn } from "lucide-react";
import { AiGalleryDialog } from "./AiGalleryDialog";

// Example usage component
const GalleryExample: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sample images - replace with your actual image data
  const sampleImages: any[] = [
    {
      id: "1",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      alt: "Mountain landscape",
      title: "Mountain Peak",
      description: "A beautiful mountain landscape with snow-capped peaks.",
    },
    {
      id: "2",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      alt: "Forest path",
      title: "Forest Trail",
      description: "A winding path through a lush green forest.",
    },
    {
      id: "3",
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop",
      alt: "Ocean waves",
      title: "Ocean View",
      description: "Peaceful ocean waves meeting the sandy shore.",
    },
    {
      id: "4",
      src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",
      alt: "Autumn forest",
      title: "Autumn Colors",
      description: "Vibrant fall colors in a peaceful forest setting.",
    },
  ];

  const openDialog = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setIsDialogOpen(true);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Gallery System with Dialog View
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {sampleImages.map((image, index) => (
          <div
            key={image.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            onClick={() => openDialog(index)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ZoomIn className="text-white" size={32} />
              </div>
            </div>
            {image.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-semibold">{image.title}</h3>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Gallery Dialog */}
      <AiGalleryDialog
        images={sampleImages}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
};

export default GalleryExample;
