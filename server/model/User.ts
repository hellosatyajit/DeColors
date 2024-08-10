"use server";
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

const createUser = async (user: any) => {
  const response = await axios.post(`${API_BASE_URL}/user/create`, { user });
  return response.data;
};
const findUserByEmail= async(email:string)=>{
  const response = await axios.post(`${API_BASE_URL}/user/find/email`,{email});
  return response.data; 
}
const updateUser = async(email:string,updateFields:any) =>{
  const response = await axios.post(`${API_BASE_URL}/user/update`,{email,updateFields});
  return response.data;
}
const findUserByResetToken = async(resetToken: string) =>{
  const response = await axios.post(`${API_BASE_URL}/user/find/resettoken`,{resetToken});
  return response.data;
}
const updateUserByResetToken = async(resetToken: string, updateFields: any)=>{
  const response = await axios.post(`${API_BASE_URL}/user/update/resettoken`,{resetToken,updateFields});
  return response.data;
}
export{
  createUser,
  findUserByEmail,
  updateUser,
  findUserByResetToken,
  updateUserByResetToken
}