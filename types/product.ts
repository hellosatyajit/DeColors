export interface IProduct {
  name: string;
  description: [string];
  price: {
    mrp: number;
    discount: number;
  };
  images: string;
  url: string;
  slug: string;
  subheading: string;
  brand: string;
  category: string;
  type: string;
  rating: {
    reviews: {
      name: string;
      rating: number;
      review: string;
      date: Date;
    }[];
  };
  soldCount: number;
  isIndividual: boolean;
  variants: [any];
  createdAt: Date;
  updatedAt: Date; 
}

export interface IPacks {
  name: string;
  description: [string];
  price: {
    mrp: number;
    discount: number;
  };
  images: string;
  url: string;
  slug: string;
  sku:string;
  brand: string;
  category: string;
  subheading: string;
  type: string;
  rating: {
    reviews: {
      name: string;
      rating: number;
      review: string;
      date: Date;
    }[];
  };
  soldCount: number;
  createdAt: Date; 
  updatedAt: Date; 
}

export interface User {
  id: string;
  email: string;
  name: string;
}
export interface Review {
  name: string;
  rating: number;
  review: string;
  date: Date;
}