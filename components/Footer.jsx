import Link from "next/link";

const links = [
    { href: "/", label: "Privacy Policy" },
    { href: "/", label: "Terms & Conditions" },
    { href: "/", label: "Cancellation & Return Policy" },
]

export default function Footer() {

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
    }

    return (
        <footer className="w-full bg-pink-50">
            <div className="max-w-5xl w-full m-auto p-5 py-10 flex flex-col gap-10">
                <div className="self-stretch h-9 justify-between items-center inline-flex">
                    <Link href="/" className="text-black text-2xl font-bold">De Coloress Lifestyle</Link>
                </div>
                <div className="grid grid-cols-2 gap-20">
                    <form action="" className="flex flex-col gap-3 col-span-1">
                        <p className="text-2xl font-semibold">Contact Us</p>
                        <input type="text" placeholder="Your Name" className="bg-white p-4 rounded-lg focus:outline-rose-600" />
                        <input type="text" placeholder="Your email" className="bg-white p-4 rounded-lg focus:outline-rose-600" />
                        <textarea name="" id="" cols={5} placeholder="Your message" className="bg-white p-4 rounded-lg focus:outline-rose-600"></textarea>
                        <button type="submit" className="button bg-black text-white p-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95">
                            Send
                        </button>
                    </form>
                    <div className="flex gap-20">
                        <div className="space-y-3">
                            <p className="text-xl font-semibold">Pages</p>
                            <div className="flex flex-col gap-2">
                                <Link href="/" className="text-black opacity-90 hover:opacity-100 text-sm font-normal">Home</Link>
                                <Link href="/" className="text-black opacity-90 hover:opacity-100 text-sm font-normal">Our Story</Link>
                                <Link href="/" className="text-black opacity-90 hover:opacity-100 text-sm font-normal">FAQs</Link>
                                <Link href="/" className="text-black opacity-90 hover:opacity-100 text-sm font-normal">Order Tracking</Link>
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
                                <div className="text-black text-sm font-normal">0000-000-000</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center items-center gap-2">
                    <ul className="flex gap-3">
                        {links.map(({ href, label }, index) => (
                            <li key={index} className="space-x-3">
                                <Link href={href} className="text-black opacity-70 hover:opacity-100 text-sm font-normal transition-all">
                                    {label}
                                </Link>
                                {index !== links.length - 1 && <span className="text-black opacity-50 text-sm font-normal">•</span>}
                            </li>
                        ))}
                    </ul>
                    <div className="text-black text-opacity-50 text-sm font-normal">
                        @2024 De Colores Lifestyle &nbsp; | &nbsp;  All rights Reserved
                    </div>
                </div>
            </div>
        </footer>
    );
}
