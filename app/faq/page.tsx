import { Metadata } from "next";
import { WEBSITE_URL } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";


export const metadata: Metadata = {
    title: "FAQ - De Colores Lifestyle",
    alternates: {
        canonical: `${WEBSITE_URL}/faq`,
    }
};

const faqs: Array<{ question: string; answer: string }> = [
    {
        question: "What ingredients are used in your products?",
        answer: "Our products are formulated with the finest ingredients sourced from trusted suppliers. We prioritize natural and safe components that enhance the skin's health and beauty."
    },
    {
        question: "How should I use your products?",
        answer: "Each product comes with detailed instructions to ensure optimal use. Please refer to the packaging for specific guidelines on application and usage frequency."
    },
    {
        question: "What are the benefits of your products?",
        answer: "Our products are designed to provide visible results, such as improved skin texture, hydration, and radiance. They are infused with active ingredients that promote skin health and enhance natural beauty."
    },
    {
        question: "How long does it take to process an order?",
        answer: "Orders are processed within 1-2 business days. You will receive a confirmation email once your order is ready for shipment."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive a tracking number via email to monitor the delivery status."
    },
    {
        question: "What is your return policy?",
        answer: "We accept returns within 7 days of purchase. Products must be unopened and in their original packaging."
    },
    {
        question: "How do I exchange a product?",
        answer: "To exchange a product, please contact our customer service team with your order details. We will guide you through the process."
    },
    {
        question: "How long does it take to process a refund?",
        answer: "Refunds are processed within 7-10 business days after receiving the returned item. The refund will be credited to your original payment method."
    },
    {
        question: "What if I receive a damaged or defective item?",
        answer: "If you receive a damaged or defective item, please contact us immediately. We will arrange for a replacement or refund as per your preference."
    },
    {
        question: "How do I create an account?",
        answer: "Sign up on our website to create an account. Enjoy faster checkouts, order tracking, and exclusive offers."
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept various payment methods, including credit/debit cards, PayPal, and net banking."
    },
    {
        question: "How can I update my account information?",
        answer: "Log in to your account to update personal information, including your address and payment details."
    },
    {
        question: "How can I manage my subscriptions?",
        answer: "You can manage your product subscriptions from your account dashboard. Easily adjust delivery frequencies or cancel subscriptions as needed."
    },
    {
        question: "Where can I find current promotions?",
        answer: "Visit our promotions page for the latest deals and offers on our products."
    },
    {
        question: "How do I apply discount codes?",
        answer: "Enter your discount code at checkout to avail of the offer. Ensure the code is valid and correctly entered."
    },
    {
        question: "What is your loyalty program?",
        answer: "Join our loyalty program to earn points on every purchase. Redeem points for discounts on future orders."
    },
    {
        question: "How can I earn referral discounts?",
        answer: "Refer friends to our brand and earn discounts on your next purchase when they make their first order."
    },
    {
        question: "How can I contact customer service?",
        answer: "Reach out to our customer service team via email, phone, or the contact form on our website."
    },
    {
        question: "Where can I find solutions to common issues?",
        answer: "Check our FAQ section for solutions to common issues related to orders, products, and accounts."
    },
    {
        question: "Is live chat support available?",
        answer: "Our live chat support is available during business hours for instant assistance."
    },
    {
        question: "What are your support hours?",
        answer: "Customer support is available Monday to Friday, 9 AM to 6 PM IST."
    },
    {
        question: "Are your products cruelty-free?",
        answer: "All Chesly products are cruelty-free. We do not test on animals at any stage of product development."
    },
    {
        question: "Are your products dermatologist tested?",
        answer: "Our products undergo rigorous testing and are approved by dermatologists to ensure safety and efficacy."
    },
    {
        question: "How can I check for allergens in your products?",
        answer: "We provide detailed ingredient lists to help customers identify potential allergens. If you have sensitive skin, perform a patch test before full application."
    },
    {
        question: "How do I find the expiry date of a product?",
        answer: "Each product has a clearly marked expiry date. Ensure to use the product within this period for optimal results."
    },
    {
        question: "What is the history of your company?",
        answer: "Founded on November 2, 2020, by Maulik and Monica Doshi, De Colores Lifestyle Private Limited brings over 20 years of expertise in the color cosmetics industry."
    },
    {
        question: "What is your mission and values?",
        answer: "Our mission is to create high-quality, cruelty-free cosmetics that enhance natural beauty while adhering to ethical practices. We value innovation, integrity, and customer satisfaction."
    },
    {
        question: "What are your sustainability efforts?",
        answer: "We are committed to sustainable practices, including eco-friendly packaging and responsible sourcing of ingredients."
    },
    {
        question: "Do you have any partnerships or collaborations?",
        answer: "We collaborate with local artisans and suppliers to promote 'Made in India' products and support the community."
    }
];


export default function FAQPage() {
    return (
        <div className="max-w-5xl m-auto px-5 py-10 md:py-20 space-y-8">
            <h1 className="font-bold text-xl sm:text-3xl text-rose-600">Frequently Asked Questions</h1>
            <div>
                <Accordion type="single" collapsible>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}