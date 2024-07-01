'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NameEdit({ user }: any) {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <div>
                    <p className="font-semibold">Name</p>
                    <p>{user?.name}</p>
                </div>
                <Button variant={'default'} onClick={() => setShow(!show)}>Edit</Button>
            </div>
            {show && <div className="flex justify-between">
                <Input type="text" placeholder="Your New Name" className="max-w-96 ring-pink-500" />
                <Button variant={'default'}>Save</Button>
            </div>}
        </div>
    );
}

export function PhoneEdit({ user }: any) {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-5">
            <div className="flex justify-between">
                <div>
                    <p className="font-semibold">Phone</p>
                    <p>{ "Not added yet"}</p>
                </div>
                <Button variant={'default'} onClick={() => setShow(!show)}>Edit</Button>
            </div>
            {show && <div className="flex justify-between">
                <Input type="text" placeholder="Your New Phone" className="max-w-96 ring-pink-500" />
                <Button variant={'default'}>Save</Button>
            </div>}
        </div>
    );
}