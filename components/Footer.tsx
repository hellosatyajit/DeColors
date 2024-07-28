'use client';
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1">
        <path fillRule="evenodd" clipRule="evenodd" d="M13.2978 2.68315C12.9189 2.75055 12.3817 2.92686 11.5215 3.21358L5.03051 5.37724C4.20312 5.65304 3.61936 5.84795 3.19945 6.01179C2.99178 6.09282 2.84715 6.15754 2.74658 6.2106C2.66139 6.25554 2.63077 6.2803 2.62895 6.28156C2.22309 6.67446 2.22309 7.32551 2.62895 7.71841C2.63077 7.71968 2.66139 7.74444 2.74658 7.78938C2.84715 7.84243 2.99178 7.90716 3.19945 7.98819C3.61936 8.15203 4.20312 8.34694 5.03051 8.62274C5.04951 8.62907 5.06834 8.63533 5.08702 8.64154C5.3604 8.73247 5.60042 8.8123 5.82138 8.92916C6.35385 9.21076 6.78923 9.64614 7.07083 10.1786C7.18769 10.3996 7.26752 10.6396 7.35845 10.913C7.36466 10.9317 7.37092 10.9505 7.37725 10.9695C7.65305 11.7969 7.84796 12.3806 8.0118 12.8005C8.09282 13.0082 8.15755 13.1528 8.21061 13.2534C8.25555 13.3386 8.28031 13.3692 8.28157 13.371C8.67447 13.7769 9.32553 13.7769 9.71842 13.371C9.71969 13.3692 9.74445 13.3386 9.78939 13.2534C9.84244 13.1528 9.90717 13.0082 9.9882 12.8005C10.152 12.3806 10.3469 11.7969 10.6227 10.9695L12.7864 4.4785C13.0731 3.61832 13.2494 3.0811 13.3168 2.70219C13.3182 2.6943 13.3196 2.68663 13.3208 2.67916C13.3134 2.68042 13.3057 2.68175 13.2978 2.68315ZM13.5568 2.66004C13.5566 2.66022 13.5533 2.65995 13.5475 2.65868C13.5541 2.65922 13.557 2.65985 13.5568 2.66004ZM13.3413 2.45245C13.34 2.44671 13.3398 2.44343 13.34 2.44322C13.3401 2.44302 13.3408 2.44588 13.3413 2.45245ZM12.9475 0.714063C13.4985 0.616046 14.253 0.586859 14.8331 1.16691C15.4131 1.74697 15.3839 2.50148 15.2859 3.05247C15.1896 3.5939 14.9632 4.27302 14.7077 5.03931L14.6838 5.11095L12.5201 11.6019L12.5107 11.6301C12.2464 12.423 12.0358 13.0549 11.8514 13.5275C11.6781 13.9717 11.4726 14.4321 11.1631 14.7541C9.98265 15.9825 8.01734 15.9825 6.83687 14.7541C6.52739 14.4321 6.3219 13.9717 6.1486 13.5275C5.96422 13.055 5.75359 12.423 5.48933 11.6303L5.47989 11.6019C5.35949 11.2407 5.33237 11.1694 5.30285 11.1136C5.20898 10.9361 5.06386 10.791 4.88637 10.6971C4.83055 10.6676 4.75926 10.6405 4.39806 10.5201L4.36973 10.5107C3.57694 10.2464 2.94503 10.0358 2.47249 9.85139C2.0283 9.67809 1.56794 9.4726 1.24589 9.16312C0.0174443 7.98265 0.0174443 6.01733 1.24589 4.83686C1.56794 4.52738 2.0283 4.32189 2.47249 4.14859C2.94505 3.96421 3.57699 3.75356 4.36981 3.48929L4.39806 3.47988L10.889 1.31622C10.913 1.30823 10.9369 1.30027 10.9607 1.29234C11.727 1.03683 12.4061 0.81038 12.9475 0.714063Z" fill="white" />
    </svg>
)

const links = [
    { href: "https://pickle-larch-966.notion.site/Privacy-Policy-De-Colores-3ac5b4a19b2d4b4caf3fbb1f2558ce70", label: "Privacy Policy" },
    { href: "https://merchant.razorpay.com/policy/O9K2NHFk5U8VGR/terms", label: "Terms & Conditions" },
    { href: "https://merchant.razorpay.com/policy/O9K2NHFk5U8VGR/refund", label: "Cancellation & Return Policy" },
    { href: "https://merchant.razorpay.com/policy/O9K2NHFk5U8VGR/shipping", label: "Shipping & Delivery Policy" },
]

export default function Footer() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const time = new Date();
            const timestamp = time.valueOf();
            const previousTimestamp = localStorage.getItem('contactUs-time-check');
            if(previousTimestamp && Number(previousTimestamp) + 60 * 1000 > timestamp){
                toast.error('Too many contactUs request sended,please try again after while')
                return;
            }

            const response = await axios.post('/api/contactUs',formData)

            if (response.status == 200) {
                toast.success("Form submitted successfully!");
                setFormData({ name: "", email: "", message: "" });
                localStorage.setItem(
                    'contactUs-time-check',
                    new Date().valueOf().toString(),
                );
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error("Error submitting form. Please try again.");
        }
    };

    return (
        <footer className="w-full bg-pink-50">
            <div className="max-w-5xl w-full m-auto p-5 py-10 flex flex-col gap-10">
                <div className="self-stretch h-9 justify-between items-center inline-flex">
                    <Link href="/" className="text-black text-2xl font-bold">De Colores Lifestyle</Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-20">
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-3 col-span-1">
                        <p className="text-xl font-semibold">Contact Us</p>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Your Name"
                            className="bg-white p-4 rounded-lg border border-transparent hover:border-gray-400 focus:outline-rose-600"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Your Email"
                            className="bg-white p-4 rounded-lg border border-transparent hover:border-gray-400 focus:outline-rose-600"
                        />
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            cols={5}
                            placeholder="Your Message"
                            className="bg-white p-4 rounded-lg border border-transparent hover:border-gray-400 focus:outline-rose-600"
                        ></textarea>
                        <button type="submit" className="bg-slate-900 hover:bg-black text-white p-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95 group">
                            Send{" "}<SendIcon />
                        </button>
                    </form>

                    <div className="flex flex-col sm:flex-row gap-5 sm:gap-10 md:gap-20">
                        <div className="space-y-3">
                            <p className="text-xl font-semibold">Pages</p>
                            <div className="flex flex-col gap-2">
                                <Link href="/" className="text-black opacity-90 hover:opacity-100 text-sm font-normal">Home</Link>
                                <Link href="/" className="text-black opacity-90 hover:opacity-100 text-sm font-normal">Our Story</Link>
                                <Link href="/" className="text-black opacity-90 hover:opacity-100 text-sm font-normal">FAQs</Link>
                                <Link href="https://www.shiprocket.in/shipment-tracking/" target="_blank" className="text-black opacity-90 hover:opacity-100 text-sm font-normal">Order Tracking</Link>
                            </div>
                        </div>
                        <div className="flex-col justify-start items-start gap-5 inline-flex">
                            <div className="space-y-3">
                                <p className="text-xl font-semibold">Phone</p>
                                <div className="text-black text-sm font-normal">+91 9104143145</div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-xl font-semibold">Email</p>
                                <div className="w-28 h-5 relative">
                                    <div className="text-black text-sm font-normal">decoloreslifestyle@gmail.com</div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <p className="text-xl font-semibold">Address</p>
                                <div className="text-black text-sm font-normal">
                                    <p>
                                        A-702 Rajyash Riverium,<br />
                                        B/H G.B.Shah College,<br />
                                        South Vasna,<br />
                                        Ahmedabad, Gujarat,<br />
                                        Pincode: 380007
                                    </p></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sm:flex flex-col justify-center items-center space-y-5 sm:space-y-0 sm:gap-2">
                    <ul className="flex flex-col sm:flex-row gap-1 sm:gap-3">
                        {links.map(({ href, label }, index) => (
                            <li key={index} className="space-x-3">
                                <Link href={href} className="text-black opacity-70 hover:opacity-100 text-sm font-normal transition-all">
                                    {label}
                                </Link>
                                {index !== links.length - 1 && <span className="text-black opacity-50 text-sm font-normal hidden sm:inline-block">•</span>}
                            </li>
                        ))}
                    </ul>
                    <div className="text-black text-opacity-50 text-sm font-normal">
                        @2024 De Colores Lifestyle Private Limited <span className="hidden sm:inline-block">&nbsp; | &nbsp;</span> <br className="sm:hidden" />  All rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    );
}
