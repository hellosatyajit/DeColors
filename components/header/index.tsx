import Link from "next/link";
import AuthButton from "../AuthButton";
import Hamburger from "./Hamburger";
import SearchModal from "./SearchModal";
// import CartBadge from "./CartBadge";

const links = [
  { href: "/products", label: "Best Sellers" },
  { href: "/#category", label: "Categories" },
  // { href: "/#hot-deals", label: "Hot Deals" }, 
  { href: "/products/chelsy", label: "Chelsy" },
  { href: "/products/de-colores", label: "De Colores" },
  { href: "/products/herbonica", label: "Herbonica" },
];

export default function Header() {
  return (
    <nav className="w-full bg-rose-600 sticky sm:static top-0 z-50">
      <div className="max-w-[1600px] w-full m-auto p-5 flex justify-between items-center gap-2 md:gap-5">
        <div className="flex items-center gap-5 md:gap-10">
          <div>
            <Link href="/" className="text-white text-lg sm:text-2xl font-bold leading-3">
              De Colores Lifestyle
            </Link>
          </div>
          <ul className="hidden lg:flex flex-1 gap-5">
            {links.map(({ href, label }, index) => (
              <li key={index}>
                <Link href={href} className="group transition duration-300 text-white text-lg leading-none">
                  {label}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-white"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-4 sm:gap-2">
          <SearchModal />
          <Link href={'/cart'}>
            <div className="w-5 h-5 sm:w-10 sm:h-10 flex justify-center items-center text-white sm:text-black bg-transparent sm:bg-white rounded-xl cursor-pointer relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
              {/* <CartBadge /> */}
            </div>
          </Link>
          <div className="w-5 h-5 sm:w-10 sm:h-10 flex justify-center items-center text-white sm:text-black bg-transparent sm:bg-white rounded-xl cursor-pointer relative group">
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.432 6.63346C15.432 9.7676 12.9776 12.2669 10.0002 12.2669C7.02278 12.2669 4.56836 9.7676 4.56836 6.63346C4.56836 3.49931 7.02278 1 10.0002 1C12.9776 1 15.432 3.49931 15.432 6.63346Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M1.5 17.75C4.29654 14.1783 11.6117 9.17793 18.5 17.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <AuthButton />
          </div>
          <div className="w-5 h-5 sm:w-10 sm:h-10 flex lg:hidden justify-center items-center text-white sm:text-black bg-transparent sm:bg-white rounded-xl cursor-pointer">
            <Hamburger links={links} />
          </div>
        </div>
      </div>
    </nav>
  );
}
