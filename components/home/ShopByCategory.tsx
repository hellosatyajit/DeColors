import Link from "next/link";

const categories = [
    {
        label: "Nails",
        url: `/products/nails`,
        image: 'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/1.png',
        alt: 'Nails'
    },
    {
        label: "Face",
        url: `/products/face`,
        image: 'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/2.png',
        alt: 'Face'
    },
    {
        label: "Hair",
        url: `/products/hair`,
        image: 'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/3.png',
        alt: 'Hair'
    },
    {
        label: "Eye",
        url: `/products/eye`,
        image: 'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/4.png',
        alt: 'Eye'
    },
    {
        label: "Body",
        url: `/products/body`,
        image: 'https://juewdrvuynzvupklbxme.supabase.co/storage/v1/object/public/home/5.png',
        alt: 'Body'
    },
];

export default function ShopByCategory() {
    return (
        <div className="w-full" id="category">
            <div className="max-w-7xl m-auto px-5 py-10 flex flex-col gap-5 sm:gap-10  justify-center items-center">
                <div className="space-y-1 sm:space-y-2">
                    <p className="font-bold text-3xl md:text-4xl w-full text-center">
                        Shop By Category
                    </p>
                    <p className="text-primary text-lg text-center text-rose-600">Our products are designed for everyone</p>
                </div>
                <div className="flex items-center justify-center flex-wrap gap-5 sm:gap-10">
                    {categories.map((item, index) => (
                        <div className="group flex flex-col gap-2 sm:gap-4" key={index}>
                            <div className="relative flex items-center justify-center overflow-hidden shadow-xl w-20 sm:w-32 h-20 sm:h-32 rounded-full border-2">
                                <Link
                                    href={item.url}
                                    className="absolute w-full h-full transition-all duration-500 ease-in-out transform bg-center bg-cover group-hover:scale-150 rounded-full"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                >
                                </Link>
                            </div>
                            <Link href={item.url}>
                                <p className="font-semibold text-lg text-center">{item.label}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}