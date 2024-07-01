"use client";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  url: string;
  quantity: number;
}

interface CartData {
  items: CartItem[];
}

export const getCartData = () => {
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

export const addToCart = (item: any, sku: string = "") => {
  item.quantity = item.quantity || 1;
  item.sku = sku;
  if (sku) {
    item._id = `${item._id}-${sku}`;
  }
  const cartData = getCartData();
  const existingItemIndex = cartData.items.findIndex(
    (i: any) => i._id === item._id
  );
  if (existingItemIndex !== -1) {
    cartData.items[existingItemIndex].quantity += item.quantity;
  } else {
    cartData.items.push(item);
  }
  console.log(cartData);
  
  updateCartData(cartData);
};

export const removeFromCart = (itemId: string) => {
  const cartData = getCartData();
  cartData.items = cartData.items.filter((item: any) => item._id !== itemId);
  updateCartData(cartData);
};


export const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
  const cartData = getCartData();
  const itemToUpdate = cartData.items.find((item: any) => item._id === itemId);
  if (itemToUpdate) {
    itemToUpdate.quantity = newQuantity;
    updateCartData(cartData);
  }
};
