/**
 * @file photoManager.ts
 * @description Central registry for all managed photos in the application.
 * This file acts as the single source of truth for image assets.
 * Developers can easily update image paths here.
 */

export interface Photo {
  id: string; // A unique identifier for the photo, e.g., 'page-component-usage'
  name: string; // A descriptive name for the photo
  location: string; // The page or component where the photo is used
  path: string; // The URL path to the image file
}

export const photoRegistry: Photo[] = [
  {
    id: "home-hero-banner",
    name: "Homepage Hero Banner",
    location: "HomePage",
    path: "/images/home/hero.jpg",
  },
  {
    id: "about-us-main-image",
    name: "About Us Main Image",
    location: "AboutPage",
    path: "/images/about/main.png",
  },
];
