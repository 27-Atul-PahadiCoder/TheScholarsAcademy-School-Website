export type GalleryPhoto = {
  id: string;
  slug: string;
  mediaId: string;
  mediaUrl: string;
  caption: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GalleryUpdatePayload = {
  caption?: string | null;
  displayOrder?: number;
  isActive?: boolean;
};
