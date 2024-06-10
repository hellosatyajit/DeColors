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
        return redirect(`/login?message=${error.message}`);
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
        return redirect(`/register?message=${error.message}`);
    } else {
        return redirect("/");
    }
};

export const googleSignIn = async () => {
    const supabase = createClient();
    
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: process.env.VERCEL_URL
                ? `https://${process.env.VERCEL_URL}`
                : 'http://localhost:3000'
        }
    })    

    if (error) {
        console.log("Register Error", error);
    } else {
        return redirect(data.url);
    }
};

export const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/");
}

export const forgotPassword = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}/auth/callback`
            : 'http://localhost:3000/auth/callback'
    })
};

export const getUser = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
        console.log("Get User Error", error);
    } else {
        return {
            email: data.user?.email,
            username: data.user?.user_metadata.username || data.user?.user_metadata.name,
            phone: data.user?.user_metadata.phone,
        };
    }
}