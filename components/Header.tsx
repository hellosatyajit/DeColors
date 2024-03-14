import Link from "next/link";
import AuthButton from "./AuthButton";
import Hamburger from "./Hamburger";

const links = [
  { href: "/", label: "Best Sellers" },
  { href: "/", label: "Categories" },
  { href: "/", label: "Hot Deals" },
  { href: "/", label: "De Coloress" },
  { href: "/", label: "Chelsy" },
  { href: "/", label: "Herbonica" },
]

export default function Header() {
  return (
    <nav className="w-full bg-rose-600 sticky sm:static top-0 z-[100]">
      <div className="max-w-[1600px] w-full m-auto p-5 flex justify-between items-center gap-5">
        <div className="flex items-center gap-10">
          <div className="">
            <Link href="/" className="text-white text-lg sm:text-2xl font-bold leading-3">De Colors Lifestyle</Link>
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
          <div className="w-5 h-5 sm:w-10 sm:h-10 flex justify-center items-center text-white sm:text-black bg-transparent sm:bg-white rounded-xl cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16.9422 16.0578L13.0305 12.1469C15.3858 9.3192 15.1004 5.13911 12.3826 2.65779C9.66485 0.176469 5.47612 0.271665 2.87389 2.87389C0.271665 5.47612 0.176469 9.66485 2.65779 12.3826C5.13911 15.1004 9.3192 15.3858 12.1469 13.0305L16.0578 16.9422C16.302 17.1864 16.698 17.1864 16.9422 16.9422C17.1864 16.698 17.1864 16.302 16.9422 16.0578V16.0578ZM2.125 7.75C2.125 4.6434 4.6434 2.125 7.75 2.125C10.8566 2.125 13.375 4.6434 13.375 7.75C13.375 10.8566 10.8566 13.375 7.75 13.375C4.64483 13.3716 2.12844 10.8552 2.125 7.75V7.75Z" fill="currentColor" />
            </svg>
          </div>
          <div className="w-5 h-5 sm:w-10 sm:h-10 flex justify-center items-center text-white sm:text-black bg-transparent sm:bg-white rounded-xl cursor-pointer">
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.875 0.125H2.125C1.43464 0.125 0.875 0.684644 0.875 1.375V12.625C0.875 13.3154 1.43464 13.875 2.125 13.875H15.875C16.5654 13.875 17.125 13.3154 17.125 12.625V1.375C17.125 0.684644 16.5654 0.125 15.875 0.125V0.125ZM15.875 12.625H2.125V1.375H15.875V12.625V12.625ZM12.75 3.875C12.75 5.94607 11.0711 7.625 9 7.625C6.92893 7.625 5.25 5.94607 5.25 3.875C5.25 3.52982 5.52982 3.25 5.875 3.25C6.22018 3.25 6.5 3.52982 6.5 3.875C6.5 5.25571 7.61929 6.375 9 6.375C10.3807 6.375 11.5 5.25571 11.5 3.875C11.5 3.52982 11.7798 3.25 12.125 3.25C12.4702 3.25 12.75 3.52982 12.75 3.875V3.875Z" fill="currentColor" />
            </svg>
          </div>
          <div className="w-10 h-10 hidden sm:flex justify-center items-center bg-white rounded-xl cursor-pointer relative group">
            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.432 6.63346C15.432 9.7676 12.9776 12.2669 10.0002 12.2669C7.02278 12.2669 4.56836 9.7676 4.56836 6.63346C4.56836 3.49931 7.02278 1 10.0002 1C12.9776 1 15.432 3.49931 15.432 6.63346Z" stroke="black" strokeWidth="1.5" />
              <path d="M1.5 17.75C4.29654 14.1783 11.6117 9.17793 18.5 17.75" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
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
