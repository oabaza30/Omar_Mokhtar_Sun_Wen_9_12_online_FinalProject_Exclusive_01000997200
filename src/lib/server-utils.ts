"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getDecodedToken() {
    const cookiesStore = await cookies(); 
    const encodedToken = cookiesStore.get("next-auth.session-token")?.value ||
    cookiesStore.get("_Secure-next-auth.session-token")?.value;
    const decodedToken = await decode({ token: encodedToken, secret: process.env.AUTH_SECRET! });
    return decodedToken
    
}
export async function  getUserToken() {
    const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
    const decodedToken = await decode({ token: encodedToken, secret: process.env.AUTH_SECRET! });



    return decodedToken!.token

}