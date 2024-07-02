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
      date: string;
    }[];
  };
  soldCount: number;
  isIndividual: boolean;
  variants: [any];
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
  brand: string;
  category: string;
  subheading: string;
  type: string;
  rating: {
    reviews: {
      name: string;
      rating: number;
      review: string;
      date: string;
    }[];
  };
  soldCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
