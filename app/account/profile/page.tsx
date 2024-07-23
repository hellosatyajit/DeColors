'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { NameEdit, PhoneEdit, AddressEdit } from "./EditField";
import { findUserByEmail } from "@/server/model/User";
import { Skeleton } from "@/components/ui/skeleton";

function ProfileItems() {
    const { data: session, status } = useSession();
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (session?.user?.email) {
                const userInfo = await findUserByEmail(session.user.email);
                setUserDetails(userInfo);
            }
            setLoading(false);
        };
        fetchUserDetails();
    }, [session]);

    if (status === "loading" || loading) {
        return <div className='mt-2 space-y-2'>
            <Skeleton className='w-full h-16' />
            <Skeleton className='w-full h-16' />
            <Skeleton className='w-full h-16' />
            <Skeleton className='w-full h-16' />
        </div>;
    }

    return (
        <div className="w-full">
            <ul className="space-y-5 w-full">
                <li>
                    <NameEdit user={userDetails} />
                </li>
                <hr />
                <li className="flex justify-between">
                    <div>
                        <p className="font-semibold">Email</p>
                        <p>{userDetails?.email}</p>
                    </div>
                </li>
                <hr />
                <li>
                    <PhoneEdit user={userDetails} />
                </li>
                <hr />
                <li>
                    <div>
                        <AddressEdit user={userDetails} />
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default function ProfielPage() {


    return (
        <div className="space-y-5 flex-1">
            <p className="font-bold text-lg sm:text-3xl">Profile</p>
            <ProfileItems />
        </div>
    );
}
