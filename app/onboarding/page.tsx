'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import GoBack from "@/components/GoBack";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession} from "next-auth/react";

export default function RegisterDetails() {
  const router = useRouter();
  const { data: session,status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    email: session?.user?.email || "", // Default to an empty string if email is undefined
    address: "",
    phoneNumber: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!details.address || !details.phoneNumber) {
        setError("Please fill in all fields");
        return;
      }
      console.log(details.email)
      if (!details.email) {
        setError("Please log in first");
        return;
      }

      const response = await axios.post('/api/updatedetails', details);

      if (response.data.error) {
        setError(response.data.error);
        return;
      }
      console.log(response)
      toast.success("Details updated successfully");
      router.push("/"); // Redirect to the home page or any other page
    } catch (error) {
      console.error('Update error:', error);
      setError("same details or Error occurred during update");
    } finally {
      setLoading(false);
      setDetails({
        email: session?.user?.email || "",
        address: "",
        phoneNumber: "",
      });
    }
  };

  const handleSkip = () => {
    router.push("/"); // Redirect to the home page or any other page
  };
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-1 flex flex-col w-full max-w-[1600px] p-5 sm:p-10 min-h-[calc(100vh-80px)] justify-center gap-2 relative">
      <GoBack />
      <form onSubmit={handleSubmit} className="animate-in flex-1 flex flex-col w-full max-w-96 m-auto mt-10 sm:mt-0 justify-center gap-3 text-foreground">
        <p className="text-3xl font-bold text-center mb-4">Add Your Details</p>

        <div>
          <label htmlFor="address" hidden>Address</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            id="address"
            value={details.address}
            onChange={handleInputChange}
            required
            className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" hidden>Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            id="phoneNumber"
            value={details.phoneNumber}
            onChange={handleInputChange}
            required
            className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
          />
        </div>
        {error && <p className="py-6 text-lg">{error}</p>}
        <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95 group">
          {loading ? "Processing" : "Submit"}
        </button>
        <button type="button" onClick={handleSkip} className="mt-4 bg-gray-600 hover:bg-gray-700 text-white p-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95 group">
          Skip
        </button>
      </form>
    </div>
  );
}
