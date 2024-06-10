import { getUser, signOut } from "@/utils/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getUser();
    if(!user) redirect("/login");

    // const fullUrl = headers().get('referer') || "";
    // const pathname = new URL(fullUrl).pathname.split("/")[2];

    return (
        <section className="max-w-7xl m-auto p-5 flex gap-5 md:mb-20">
            <aside id="default-sidebar" className="sticky top-0 left-0 z-40 w-64 h-min" aria-label="Sidebar">
                <div className="h-full p-2 overflow-y-auto bg-pink-50 rounded-xl">
                    <ul className="space-y-2 font-normal">
                        <li>
                            <Link href="/account/profile" className="flex items-center p-1 text-gray-900 rounded-lg hover:text-rose-600 group">
                                <span className="ms-3">Profile</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/account/orders" className="flex items-center p-1 text-gray-900 rounded-lg hover:text-rose-600 group">
                                <span className="ms-3">Orders</span>
                            </Link>
                        </li>
                        <li>
                            <form action={signOut}>
                                <button className="flex items-center p-1 text-gray-900 rounded-lg hover:text-rose-600 group">
                                    <span className="ms-3">Logout</span>
                                </button>
                            </form>
                        </li>
                    </ul>
                </div>
            </aside>
            {children}
        </section>

    )
}