import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const createOrder = async (order: any) => {
  const response = await axios.post(`${API_BASE_URL}/order/create`, { order });
  return response.data;
};

const updateOrder = async (transactionId: string, updateFields: any) => {
  const response = await axios.post(`${API_BASE_URL}/order/update`, { transactionId, updateFields });
  return response.data;
};

const findOrdersByUserId = async (userId: string) => {
  const response = await axios.post(`${API_BASE_URL}/order/user`, { userId });
  return response.data;
};


export {
  createOrder,
  updateOrder,
  findOrdersByUserId
};