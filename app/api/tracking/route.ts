import { NextResponse, NextRequest } from "next/server";
import axios from 'axios';

export async function POST(request: NextRequest){
    try {
        const { awb_code,shipment_id } = await request.json();
        const shiprocketAuthResponse = await axios.post(
            "https://apiv2.shiprocket.in/v1/external/auth/login",
            {
              email: process.env.SHIPROCKET_EMAIL,
              password: process.env.SHIPROCKET_PASSWORD,
            }
          );
        
        const { token } = shiprocketAuthResponse.data;
        if(awb_code == ""){
          const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${shipment_id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          });
          const data = response.data
          console.log(data)
          return NextResponse.json({data},{status:200})
        }
        else{
        const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb_code}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          });
          const data = response.data
          console.log(data)
          return NextResponse.json({data},{status:200})
    }
  } 
    catch(error){
        console.error('Error fetching orders:', error);
        return NextResponse.json({ error: "Internal server error" },{status:500});
    }
};