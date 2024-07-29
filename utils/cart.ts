"use client";

export interface CartItem {
  id: string;
  subheading: string;
  isPack: boolean;
  name: string;
  image: string;
  category: string;
  brand: string;
  sku?: string;
  quantity: number;
  price: {
    mrp: number;
    discount: number;
  };
}

interface CartData {
  items: CartItem[];
}

export const getCartData = (): CartData => {
  const cartDataStr = localStorage.getItem("cart");
  if (cartDataStr) {
    return JSON.parse(cartDataStr);
  } else {
    return { items: [] };
  }
};

const updateCartData = (cartData: CartData) => {
  localStorage.setItem("cart", JSON.stringify(cartData));
};
const getItemImage = (item: any, sku: string): string => {
  if (item.images && item.images.length > 0) {
    return item.images[0];
  }
  if (item.variants && sku) {
    const variant = item.variants.find((v: any) => v.sku === sku);
    if (variant && variant.image && variant.image.length > 0) {
      return variant.image[0];
    }
  }
  return "";
};

export const addToCart = (item: any, sku: string = "") => {
  const price = item.price.mrp - item.price.discount;

  if (typeof price !== "number" || isNaN(price)) {
    throw new Error("Invalid price");
  }

  const cartItem: CartItem = {
    id: item.variants ? `${item._id}-${sku}` : item._id,
    subheading: item.subheading,
    name: item.name,
    category: item.category,
    brand: item.brand,
    isPack: item.variants ? false : true,
    image: getItemImage(item, sku),
    sku: sku || undefined,
    quantity: item.quantity || 1,
    price: {
      mrp: item.price.mrp,
      discount: item.price.discount,
    },
  };

  const cartData = getCartData();
  const existingItemIndex = cartData.items.findIndex(
    (i: CartItem) => i.id === cartItem.id
  );

  if (existingItemIndex !== -1) {
    cartData.items[existingItemIndex].quantity += cartItem.quantity;
  } else {
    cartData.items.push(cartItem);
  }

  updateCartData(cartData);
};

export const removeFromCart = (itemId: string) => {
  const cartData = getCartData();
  cartData.items = cartData.items.filter(
    (item: CartItem) => item.id !== itemId
  );
  updateCartData(cartData);
};

export const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
  const cartData = getCartData();
  const itemToUpdate = cartData.items.find(
    (item: CartItem) => item.id === itemId
  );
  if (itemToUpdate) {
    itemToUpdate.quantity = newQuantity;
    updateCartData(cartData);
  }
};

export const emptyCart = () => {
  const cartData: CartData = { items: [] };
  updateCartData(cartData);
};

export const getCartLength = (): number => {
  return getCartData().items.length;
};
