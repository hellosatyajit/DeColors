export interface IProduct {
  _id: any;
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
      date: any;
    }[];
  };
  soldCount: number;
  isIndividual: boolean;
  variants: [any];
  createdAt: Date;
  updatedAt: Date; 
}

export interface IPacks {
  _id: any;
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
  packItem:[any];
  brand: string;
  category: string;
  subheading: string;
  inventory: number;
  type: string;
  rating: {
    reviews: {
      name: string;
      rating: number;
      review: string;
      date: any;
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
  date: any;
}