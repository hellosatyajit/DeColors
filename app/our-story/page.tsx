import { Metadata } from "next";
import { WEBSITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Our Story - De Colores Lifestyle",
    alternates: {
        canonical: `${WEBSITE_URL}/out-story`,
    }
};

export default function OurStoryPage() {
    return (
        <div className="max-w-5xl m-auto px-5 py-10 md:py-20 space-y-8">
            <h1 hidden>Our Story</h1>
            <div className="space-y-2">
                <h2 className="font-medium  text-lg sm:text-2xl text-rose-600">Beauty with a Purpose</h2>
                <p className="text-lg opacity-80">In the fast-moving world of cosmetics, where trends change quickly and quality matters most, De Colores Lifestyle Private Limited stands out for its innovation and excellence. Founded on November 2, 2020, by Maulik Doshi and Monica Doshi, the company brings over 20 years of experience in the beauty industry.</p>
            </div>

            <div className="space-y-2">
                <h2 className="font-medium  text-lg sm:text-2xl text-rose-600">Our Story: From Idea to Reality</h2>

                <p className="text-lg opacity-80">De Colores Lifestyle Private Limited started when Maulik and Monica saw a gap in the market during the COVID-19 pandemic. With their extensive experience in cosmetics, they realized that high-quality products were hard to find. This insight led them to start their own brand, aiming to set new standards for quality.</p>
            </div>

            <div className="space-y-2">
                <h2 className="font-medium  text-lg sm:text-2xl text-rose-600">Meet Chesly: A Name with Meaning</h2>

                <p className="text-lg opacity-80">Our brand, Chesly, is named after our daughter, Chesly Doshi. The name represents purity, love, and a personal touch in every product we make. Chesly is more than just a brand—it's a symbol of our family's commitment to delivering top-quality cosmetics.</p>
            </div>

            <div className="space-y-2">
                <h2 className="font-medium  text-lg sm:text-2xl text-rose-600">Proudly Made in India</h2>

                <p className="text-lg opacity-80">We take pride in our products being made in India. We combine local craftsmanship with modern technology to ensure our cosmetics are both luxurious and effective. Our goal is to exceed the expectations of our customers with every product.</p>
            </div>

            <div className="space-y-2">
                <h2 className="font-medium  text-lg sm:text-2xl text-rose-600">Our Cruelty-Free Promise</h2>

                <p className="text-lg opacity-80">At Chesly, we are committed to being cruelty-free. We believe in creating beauty products without harming animals, aligning with our values and the ethical beliefs of our customers.</p>
            </div>

            <div className="space-y-2">
                <h2 className="font-medium  text-lg sm:text-2xl text-rose-600">Looking Forward: Our Vision</h2>

                <p className="text-lg opacity-80">Our journey is just beginning. We aim to make Chesly a global brand known for quality, integrity, and beauty. We are always exploring new trends and sustainable practices to make a positive impact on our industry and the world.</p>
            </div>

            <div className="space-y-2">
                <h2 className="font-medium  text-lg sm:text-2xl text-rose-600">Join Us</h2>

                <p className="text-lg opacity-80">We invite you to be part of our story and experience Chesly for yourself. Together, let's celebrate beauty where quality, ethics, and innovation come together to create something truly special.</p>
            </div>
        </div>
    );
}