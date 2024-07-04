'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GoBack from "@/components/GoBack";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function RegisterDetails() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login");
    }
  }, [session, status, router]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    email: session?.user?.email || "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    phoneNumber: "",
    country: "India"
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { address, state, city, pinCode, phoneNumber, email, country } = details;
      if (!address || !state || !city || !pinCode || !phoneNumber || !country) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }
      if (!email) {
        setError("Please log in first");
        setLoading(false);
        return;
      }

      const response = await axios.post('/api/updatedetails', details);

      if (response.data.error) {
        setError(response.data.error);
        setLoading(false);
        return;
      }
      toast.success("Details updated successfully");
      router.push("/");
    } catch (error) {
      console.error('Update error:', error);
      setError("Same details or error occurred during update");
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.push("/");
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 flex flex-col w-full max-w-[1600px] p-5 sm:p-10 min-h-[calc(100vh-80px)] justify-center gap-2 relative">
      <GoBack />
      <form onSubmit={handleSubmit} className="animate-in flex-1 flex flex-col w-full max-w-96 m-auto mt-10 sm:mt-0 justify-center gap-3 text-foreground">
        <p className="text-3xl font-bold text-center mb-4">Add Your Details</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="address" hidden>Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              id="address"
              value={details.address}
              onChange={handleInputChange}
              required
              minLength={5}
              className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
            />
          </div>
          <div>
            <label htmlFor="country" hidden>Country</label>
            <input
              type="text"
              placeholder="Country"
              name="country"
              id="country"
              value={details.country}
              disabled={true}
              onChange={handleInputChange}
              required
              minLength={2}
              pattern="[A-Za-z]{2,}"
              title="Please enter a valid country name"
              className="bg-gray-100 p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="state" hidden>State</label>
            <input
              type="text"
              placeholder="State"
              name="state"
              id="state"
              value={details.state}
              onChange={handleInputChange}
              required
              minLength={2}
              pattern="[A-Za-z]{2,}"
              title="Please enter a valid state name"
              className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
            />
          </div>
          <div>
            <label htmlFor="city" hidden>City</label>
            <input
              type="text"
              placeholder="City"
              name="city"
              id="city"
              value={details.city}
              onChange={handleInputChange}
              required
              minLength={2}
              pattern="[A-Za-z]{2,}"
              title="Please enter a valid city name"
              className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
            />
          </div>
          <div>
            <label htmlFor="pinCode" hidden>Pin Code</label>
            <input
              type="text"
              placeholder="Pin Code"
              name="pinCode"
              id="pinCode"
              value={details.pinCode}
              onChange={handleInputChange}
              required
              minLength={6}
              pattern="[0-9]{6}"
              title="Please enter a valid 6-digit pin code"
              className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="phoneNumber" hidden>Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              id="phoneNumber"
              value={details.phoneNumber}
              onChange={handleInputChange}
              required
              minLength={10}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
              className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
            />
          </div>
        </div>

        {error && <p className="py-6 text-lg">{error}</p>}
        <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95 group" disabled={loading || !details.email}>
          {loading ? "Processing" : "Submit"}
        </button>
        <button type="button" onClick={handleSkip} className="mt-4 text-gray p-4 rounded-lg flex justify-left items-center gap-2 transition-all active:scale-95 group">
          Skip
        </button>
      </form>
    </div>
  );
}
