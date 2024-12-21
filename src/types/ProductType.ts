export type Product = {
  name: string;
  imageUrl: string; // Main image
  category: { name: string };
  stock: Array<{ id: string; size: string; price: string; stock: string }>;
  images: Array<{ id: string; url: string }>; // Additional images for lightbox
  statusId: number;
  createdAt: string;
};
