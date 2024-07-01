'use client'
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { NameEdit, PhoneEdit } from "./EditField";

export default  function ProfielPage() {
    const { data: session } = useSession();
    const user = session?.user;
    return (
        <div className="space-y-5 flex-1">
            <p className="font-bold text-lg sm:text-3xl">Profile</p>
            <div className="w-full">
                <ul className="space-y-5 w-full">
                    <li>
                        <NameEdit user={user} />
                    </li>   
                    <hr />
                    <li className="flex justify-between">
                        <div>
                            <p className="font-semibold">Email</p>
                            <p>{user?.email}</p>
                        </div>
                    </li>
                    <hr />
                    <li>
                        <PhoneEdit user={user} />
                    </li>
                    <hr />
                    <li>
                        <div>
                            <p className="font-semibold">Address</p>
                            <p>{ "Not added yet"}</p>
                        </div>
                        <Button variant={'default'}>Edit</Button>
                    </li>
                </ul>
            </div>
        </div>
    )
}