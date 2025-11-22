export interface Dessert {
  id: number;
  name: string;
  origin: string;
  size: string;
  price: number;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface ArtFeature {
  id: number;
  title: string;
  icon?: string;
}