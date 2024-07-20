"use client";

interface CartItem {
  id: string;
  name: string;
  image: string;
  sku?: string;
  price: number;
  quantity: number;
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
  const cartItem: CartItem = {
    id: sku ? `${item._id}-${sku}` : item._id,
    name: item.name,
    image: getItemImage(item, sku),
    sku: sku || undefined,
    price: item.price.mrp - item.price.discount,
    quantity: item.quantity || 1,
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
  cartData.items = cartData.items.filter((item: CartItem) => item.id !== itemId);
  updateCartData(cartData);
};

export const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
  const cartData = getCartData();
  const itemToUpdate = cartData.items.find((item: CartItem) => item.id === itemId);
  if (itemToUpdate) {
    itemToUpdate.quantity = newQuantity;
    updateCartData(cartData);
  }
};

export const emptyCart = () => {
  const cartData: CartData = { items: [] };
  updateCartData(cartData);
};
