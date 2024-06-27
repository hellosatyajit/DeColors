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
  subheading: string;
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
