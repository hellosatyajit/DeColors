'use client';

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { useEffect } from "react";
import { redirect } from "next/navigation"; 

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session, status } = useSession();
    const user = session?.user;

    useEffect(() => {
        if (status === "loading") return; 
        if (!session) {
            redirect("/login"); 
        }
    }, [session, status]);

    if (!user) return null; 

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
                            <button
                                type="button"
                                onClick={() => signOut()}
                                className="flex items-center p-1 text-gray-900 rounded-lg hover:text-rose-600 group"
                            >
                                <span className="ms-3">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
            {children}
        </section>
    );
}
