"use client";

// Define interfaces for CartItem and CartData
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

// Function to get cart data from local storage
export const getCartData = () => {
  const cartDataStr = localStorage.getItem("cart");
  if (cartDataStr) {
    return JSON.parse(cartDataStr);
  } else {
    return { items: [] };
  }
};

// Function to update cart data in local storage
const updateCartData = (cartData: CartData) => {
  localStorage.setItem("cart", JSON.stringify(cartData));
};

// Function to add item to cart
export const addToCart = (item: any, sku: string = "") => {
  item.quantity = item.quantity || 1;
  item.sku = sku;
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

// Function to remove item from cart
export const removeFromCart = (itemId: string) => {
  const cartData = getCartData();
  cartData.items = cartData.items.filter((item: any) => item._id !== itemId);
  updateCartData(cartData);
};

// Function to increase/decrease quantity of an item in cart
export const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
  const cartData = getCartData();
  const itemToUpdate = cartData.items.find((item: any) => item._id === itemId);
  if (itemToUpdate) {
    itemToUpdate.quantity = newQuantity;
    updateCartData(cartData);
  }
};
