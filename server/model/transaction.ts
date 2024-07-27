"use server";
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const createTransaction = async (transaction: any) => {
    const response = await axios.post(`${API_BASE_URL}/transaction/create`, { transaction });
    return response.data;
  };
export {
    createTransaction
};