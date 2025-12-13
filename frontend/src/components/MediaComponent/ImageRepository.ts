export interface ImageData {
  id: number;
  name: string;
  location: string; // page where the image is used
  path: string;
}

let images: ImageData[] = [
  {
    id: 1,
    name: 'Logo',
    location: 'Header',
    path: '/images/logo-150x150-BDzOqpJa.png',
  },
  {
    id: 2,
    name: 'Student Life',
    location: 'Home Page',
    path: '/images/NP1040355-scaled-Cxq6po7s.jpg',
  },
  {
    id: 3,
    name: 'Campus View',
    location: 'About Us',
    path: '/images/P1000104-2048x1152-BfZA8ZzL.jpg',
  },
  // Add more images as needed
];

export const getImageData = (): ImageData[] => {
  return images;
};

export const addImageData = (newImage: Omit<ImageData, 'id'>): void => {
  const newId = images.length > 0 ? Math.max(...images.map(img => img.id)) + 1 : 1;
  images.push({ ...newImage, id: newId });
};

export const updateImageData = (id: number, newPath: string): void => {
  images = images.map((image) =>
    image.id === id ? { ...image, path: newPath } : image
  );
};

export const deleteImageData = (id: number): void => {
  images = images.filter((image) => image.id !== id);
};