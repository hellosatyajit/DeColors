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
  { href: "/products/de-colores", label: "De Colors" },
  { href: "/products/herbonica", label: "Herbonica" },
];

export default function Header() {
  return (
    <nav className="w-full bg-rose-600 sticky sm:static top-0 z-[100]">
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
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.875 0.125H2.125C1.43464 0.125 0.875 0.684644 0.875 1.375V12.625C0.875 13.3154 1.43464 13.875 2.125 13.875H15.875C16.5654 13.875 17.125 13.3154 17.125 12.625V1.375C17.125 0.684644 16.5654 0.125 15.875 0.125V0.125ZM15.875 12.625H2.125V1.375H15.875V12.625V12.625ZM12.75 3.875C12.75 5.94607 11.0711 7.625 9 7.625C6.92893 7.625 5.25 5.94607 5.25 3.875C5.25 3.52982 5.52982 3.25 5.875 3.25C6.22018 3.25 6.5 3.52982 6.5 3.875C6.5 5.25571 7.61929 6.375 9 6.375C10.3807 6.375 11.5 5.25571 11.5 3.875C11.5 3.52982 11.7798 3.25 12.125 3.25C12.4702 3.25 12.75 3.52982 12.75 3.875V3.875Z"
                  fill="currentColor"
                />
              </svg>
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
