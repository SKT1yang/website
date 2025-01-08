type Firework = {
  id: number;
  name: string;
  description: string;
  price: number;
  actualPrice: number;
  priceText: string;
  thumb: string;
  imageUrl: string;
  category: string;
};

type CartFireworks = {
  [id: number]: {
    quantity: number;
  };
};

export type { Firework, CartFireworks };
