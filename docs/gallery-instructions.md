# How to Add Images to the Gallery

To add more images to the gallery, follow these steps:

## 1. Add your image files to the public/assets directory

```
public/assets/your-new-image.jpg
```

## 2. Update the GalleryGrid component

Open `components/GalleryGrid.tsx` and locate the `galleryItems` array. Add new items following this format:

```typescript
{
  id: 3, // Increment the ID for each new item
  title: 'Your Image Title',
  description: 'Short description of the image',
  imageSrc: '/assets/your-new-image.jpg', // Path to the image file
  category: 'category', // Use an existing category or create a new one
}
```

## Available Categories

Currently, the gallery has these categories:
- building
- prayer

Feel free to add new categories as needed. They will automatically appear in the filter buttons.

## Image Guidelines

- Use JPG or PNG format for best compatibility
- Recommended image resolution: 1200x800px or higher
- Keep file sizes under 500KB for optimal performance
- Use descriptive filenames (e.g., friday-prayer-2023.jpg instead of IMG_1234.jpg)