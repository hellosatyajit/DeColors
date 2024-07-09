import Link from "next/link";

const categories = [
    {
        label: "Nails",
        url: `/products/nails`,
        image: 'https://img.freepik.com/premium-vector/beautiful-vector-illustration-with-manicure-decorative-design-background-hand-drawing_482292-178.jpg?w=360',
        alt: 'Nails'
    },
    {
        label: "Face",
        url: `/products/face`,
        image: 'https://www.shutterstock.com/image-vector/beautiful-young-woman-face-closed-260nw-1184057125.jpg',
        alt: 'Face'
    },
    {
        label: "Hair",
        url: `/products/hair`,
        image: 'https://gogivo.com/wp-content/uploads/2020/09/Gogivo_5324_preview.jpg.webp',
        alt: 'Hair'
    },
    {
        label: "Eye",
        url: `/products/eye`,
        image: 'https://images.template.net/77455/Free-Watercolor-Eyes-Illustration-JPEG-1.jpg',
        alt: 'Eye'
    },
    {
        label: "Body",
        url: `/products/body`,
        image: 'https://img.freepik.com/free-vector/hand-drawn-one-line-art-illustration_23-2149298652.jpg?t=st=1720542790~exp=1720546390~hmac=ca9778351045604a43382c1688eb4b3de4af6717804a6ae07e16baf624583ab7&w=740',
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