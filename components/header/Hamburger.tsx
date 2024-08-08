'use client'
import { useState } from "react";
import Link from "next/link";

export default function Hamburger({ links = [] }: { links: any[] }) {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleLinkClick = () => {
        setMenuOpen(false);
    }

    return (
        <>
            <svg width="18" height="14" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => setMenuOpen(!isMenuOpen)}>
                <path d="M17.3077 2H0.692308C0.313846 2 0 1.54667 0 1C0 0.453333 0.313846 0 0.692308 0H17.3077C17.6862 0 18 0.453333 18 1C18 1.54667 17.6862 2 17.3077 2Z" fill="currentColor" />
                <path d="M17.3077 10H0.692308C0.313846 10 0 9.54667 0 9C0 8.45333 0.313846 8 0.692308 8H17.3077C17.6862 8 18 8.45333 18 9C18 9.54667 17.6862 10 17.3077 10Z" fill="currentColor" />
                <path d="M17.3077 18H0.692308C0.313846 18 0 17.5467 0 17C0 16.4533 0.313846 16 0.692308 16H17.3077C17.6862 16 18 16.4533 18 17C18 17.5467 17.6862 18 17.3077 18Z" fill="currentColor" />
            </svg>
            <div className={`fixed top-16 sm:top-20 left-0 right-0 bottom-0 ${isMenuOpen ? 'w-full' : 'w-0'} transition-all bg-white z-40`}>
                <ul className={`${isMenuOpen ? 'flex' : 'hidden'} flex-col p-5 gap-5 transition-all`}>
                    {links.map(({ href, label }, index) => (
                        <li key={index} className="border-l-2 border-gray-900 p-2">
                            <Link href={href} onClick={handleLinkClick} className="group transition duration-300 text-black text-lg leading-none">
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}