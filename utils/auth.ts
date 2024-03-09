"use server";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.log("Login Error", error);
    } else {
        return redirect("/");
    }
};

export const signUp = async (formData: FormData) => {
    const origin = headers().get("origin");
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: name
            },
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) {
        console.log("Register Error", error);
    } else {
        return redirect("/");
    }
};