'use client';
import { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { searchProductsAndPacks } from "@/server/actions/ProductActions";

interface SearchResult {
    _id: string;
    name: string;
    subheading: string;
    slug: string;
    variants?: [any];
    image?: string;
}

export default function SearchModal() {
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);

        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        debounceTimeoutRef.current = setTimeout(async () => {
            if (value === "") {
                setSearchResults([]);
            } else {
                const products = await searchProductsAndPacks(value, 1);
                setSearchResults(products.data.map((product: any) => ({
                    ...product,
                    image: product.images?.[0] || product.variants?.[0]?.image?.[0],
                })));
            }
        }, 500);
    };

    const handleResultClick = (slug: string, hasVariants: boolean) => {
        router.push(hasVariants ? `/product/${slug}` : `/packs/${slug}`);
        setSearchQuery("");
        setSearchResults([]);
        setIsOpen(false)
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
            <DialogTrigger className="w-5 h-5 sm:w-10 sm:h-10 flex justify-center items-center text-white sm:text-black bg-transparent sm:bg-white rounded-xl cursor-pointer relative group">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.9422 16.0578L13.0305 12.1469C15.3858 9.3192 15.1004 5.13911 12.3826 2.65779C9.66485 0.176469 5.47612 0.271665 2.87389 2.87389C0.271665 5.47612 0.176469 9.66485 2.65779 12.3826C5.13911 15.1004 9.3192 15.3858 12.1469 13.0305L16.0578 16.9422C16.302 17.1864 16.698 17.1864 16.9422 16.9422C17.1864 16.698 17.1864 16.302 16.9422 16.0578V16.0578ZM2.125 7.75C2.125 4.6434 4.6434 2.125 7.75 2.125C10.8566 2.125 13.375 4.6434 13.375 7.75C13.375 10.8566 10.8566 13.375 7.75 13.375C4.64483 13.3716 2.12844 10.8552 2.125 7.75V7.75Z"
                        fill="currentColor"
                    />
                </svg>
            </DialogTrigger>
            <DialogContent>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="bg-white p-4 rounded-lg border hover:border-gray-400 focus:outline-rose-600"
                    placeholder="Search for products..."
                />
                <div className="max-h-60 overflow-y-auto">
                    {searchResults.length > 0 && (
                        searchResults.map((result, index) => (
                            <div
                                key={index}
                                className="p-2 border-b last:border-none cursor-pointer flex"
                                onClick={() => handleResultClick(result.slug, !!result.variants)}
                            >
                                {result.image && (
                                    <img src={result.image} alt={result.name} className="w-12 h-12 object-cover mr-2 rounded-lg" />
                                )}
                                <div>
                                    <p className="text-lg font-semibold">{result.name}</p>
                                    <p className="text-sm text-gray-500">{result.subheading}</p>
                                </div>
                            </div>
                        ))
                    )}
                    <p className=" text-gray-500 text-center">
                        {!searchQuery && 'Start your beauty search and shine bright!'}
                        {(searchQuery && !searchResults.length) && 'Oops! No results found.'}
                    </p>
                </div>
            </DialogContent>
        </Dialog >
    )
}