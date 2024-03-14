"use client";
import Image from "next/image";
import Link from "next/link";

export default function Newsletter() {

    return (
        <div className="w-full">
            <div className="max-w-7xl m-auto px-5 py-32 flex flex-col gap-5 sm:gap-10  justify-center items-center">
                <div className="space-y-1 sm:space-y-2">
                    <p className="font-bold text-3xl md:text-4xl w-full text-center">
                        Our Newsletter
                    </p>
                    <p className="text-primary text-lg text-center text-rose-600">Get all updates directly to your email!</p>
                </div>
                <div className="max-w-[1600px] w-full">
                    <form action="" className="animate-in flex-1 flex flex-col sm:flex-row w-full m-auto mt-10 sm:mt-0 justify-center gap-3 text-foreground">
                        <div className="w-full sm:w-80">
                            <label htmlFor="email" hidden>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                id="email"
                                required
                                className="bg-white p-4 rounded-lg transition-all w-full outline-none ring-0 border hover:border-gray-400 focus:border-rose-600"
                            />
                        </div>
                        <button className="bg-rose-600  hover:bg-rose-700 text-white px-8 py-4 rounded-lg flex justify-center items-center gap-2 transition-all active:scale-95 group w-full sm:w-auto">
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}