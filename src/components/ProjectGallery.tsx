
import React from 'react';

interface ProjectGalleryProps {
  projectType: 'ecommerce' | 'taskmanager';
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projectType }) => {
  const getProjectImages = () => {
    if (projectType === 'ecommerce') {
      return [
        {
          src: '/screenshots/AlderliDashboard.png',
          alt: 'E-commerce homepage with product grid',
          filename: 'homepage.bmp'
        },
        {
          src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=200&fit=crop',
          alt: 'Shopping cart and checkout interface',
          filename: 'checkout.bmp'
        },
        {
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
          alt: 'Admin dashboard with analytics',
          filename: 'admin_panel.bmp'
        },
        {
          src: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&h=200&fit=crop',
          alt: 'Product search and filtering',
          filename: 'product_search.bmp'
        }
      ];
    } else {
      return [
        {
          src: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop',
          alt: 'Kanban board with task cards',
          filename: 'kanban_board.bmp'
        },
        {
          src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=200&fit=crop',
          alt: 'Team collaboration interface',
          filename: 'team_collab.bmp'
        },
        {
          src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop',
          alt: 'Analytics dashboard with charts',
          filename: 'analytics.bmp'
        },
        {
          src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop',
          alt: 'Settings and preferences panel',
          filename: 'preferences.bmp'
        }
      ];
    }
  };

  const images = getProjectImages();

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="bg-gray-100 border-2 border-gray-400 p-2">
          <div className="w-full h-32 border border-gray-500 mb-2 overflow-hidden">
            <img 
              src={image.src} 
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-xs text-center">{image.filename}</div>
        </div>
      ))}
    </div>
  );
};

export default ProjectGallery;
