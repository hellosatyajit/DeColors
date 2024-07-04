'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export function NameEdit({ user }: any) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const { data: session, update } = useSession();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            await axios.post('/api/updatedetails', { email: user.email, name });
            if(session){
                const newSession = {
                    ...session,
                    user: {
                      ...session?.user,
                      name: name
                    },
                  };
              
                  await update(newSession);
                  console.log(session)
                  setName("")
            toast.success("Name updated successfully");
            setShow(false);
            }
        } catch (error) {
            toast.error("Failed to update name");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <div>
                    <p className="font-semibold">Name</p>
                    <p>{user?.name}</p>
                </div>
                <Button variant={'default'} onClick={() => setShow(!show)}>Edit</Button>
            </div>
            {show && <div className="flex justify-between">
                <Input 
                    type="text" 
                    placeholder="Your New Name" 
                    className="max-w-96 ring-pink-500" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <Button variant={'default'} onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
            </div>}
        </div>
    );
}

export function PhoneEdit({ user }: any) {
    const [show, setShow] = useState(false);
    const [displayPhoneNumber, setDisplayPhoneNumber] = useState(user?.phoneNumber || "Not added yet");
    const [inputPhoneNumber, setInputPhoneNumber] = useState(displayPhoneNumber === "Not added yet" ? "" : displayPhoneNumber);
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/updatedetails', { email: user.email, phoneNumber: inputPhoneNumber });
            if (response.data.success) {
                toast.success("Phone number updated successfully");
                setShow(false);
                setDisplayPhoneNumber(inputPhoneNumber);
            } else {
                toast.error("Failed to update phone number");
            }
        } catch (error) {
            toast.error("Failed to update phone number");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <div>
                    <p className="font-semibold">Phone</p>
                    <p>{displayPhoneNumber}</p>
                </div>
                <Button variant={'default'} onClick={() => setShow(!show)}>Edit</Button>
            </div>
            {show && (
                <div className="flex justify-between">
                    <Input 
                        type="text" 
                        placeholder="Your New Phone" 
                        className="max-w-96 ring-pink-500" 
                        value={inputPhoneNumber}
                        onChange={(e) => setInputPhoneNumber(e.target.value)} 
                    />
                    <Button variant={'default'} onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>
                </div>
            )}
        </div>
    );
}
export function AddressEdit({ user }: any) {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({
      address: user?.address?.address || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      pinCode: user?.address?.pinCode || "",
      country: user?.address?.country || "India"
    });
  
    const handleInputChange = (event: any) => {
      const { name, value } = event.target;
      setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };
  
    const handleSave = async () => {
      setLoading(true);
      try {
        const response = await axios.post('/api/updatedetails', { email: user.email, ...details });
        if (response.data.success) {
          toast.success("Address updated successfully");
          setShow(false);
        } else {
          toast.error("Failed to update address");
        }
      } catch (error) {
        toast.error("Failed to update address");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="space-y-5">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Address</p>
            <p>
              {details.address}, {details.city}, {details.state}, {details.pinCode}, {details.country}
            </p>
          </div>
          <Button variant={'default'} onClick={() => setShow(!show)}>Edit</Button>
        </div>
        {show && (
          <div className="space-y-3">
            <Input 
              type="text" 
              placeholder="Address" 
              name="address"
              className="max-w-96 ring-pink-500" 
              value={details.address}
              onChange={handleInputChange} 
            />
            <Input 
              type="text" 
              placeholder="City" 
              name="city"
              className="max-w-96 ring-pink-500" 
              value={details.city}
              onChange={handleInputChange} 
            />
            <Input 
              type="text" 
              placeholder="State" 
              name="state"
              className="max-w-96 ring-pink-500" 
              value={details.state}
              onChange={handleInputChange} 
            />
            <Input 
              type="text" 
              placeholder="Pin Code" 
              name="pinCode"
              className="max-w-96 ring-pink-500" 
              value={details.pinCode}
              onChange={handleInputChange} 
              minLength={6}
              maxLength={6}
              pattern="[0-9]{6}"
              title="Please enter a valid 6-digit pin code"
            />
            <Input 
              type="text" 
              placeholder="Country" 
              name="country"
              className="max-w-96 ring-pink-500" 
              value={details.country}
              disabled={true}
              onChange={handleInputChange} 
            />
            <Button variant={'default'} onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </div>
    );
  }