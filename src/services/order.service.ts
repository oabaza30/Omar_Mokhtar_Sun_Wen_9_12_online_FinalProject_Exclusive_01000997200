"use server"
import { addressFormSchema, addressFormStateType } from "@/app/schema/address.schema";
import { getUserToken } from "@/lib/server-utils";

export async function handlePayment(formState: addressFormStateType, formData: FormData): Promise<addressFormStateType> {
    const shippingAddress = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        streetaddress: formData.get("streetaddress"),
        apartment: formData.get("apartment"),
        email: formData.get("email"),

        city: formData.get("city"),
        Phone: formData.get("Phone"),

    };

    const cartId = formData.get("cartId")

    
    const paymentMethod = formData.get("paymentMethod")
    const parsedData = addressFormSchema.safeParse({...shippingAddress, cartId, paymentMethod});
    if (!parsedData.success) {
        return {
            success: false,
            error: parsedData.error?.flatten().fieldErrors,
            message: null,
            callbackUrl: "/cart"
        };
    }
    try {
        const token = await getUserToken();

        const endpoint = paymentMethod === "cash" ?
         `api/v1/orders/${cartId}` :
         `api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`
        const res = await fetch(`${process.env.NEXTAUTH_API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token as string
            },
            body: JSON.stringify(shippingAddress,),

        });

        const data = await res.json();

        if (!res.ok) {
            return {
                success: false,
                error: {},
                message: data.message || "Failed to place order",
                callbackUrl: "/cart",

            };
        }

        return {
            success: true,
            error: {},
            message: data.message || "Order placed successfully",
            callbackUrl: paymentMethod === "cash" ? "/allorders" : data.session.url,
        };
    } catch (error) {
        return {
            success: false,
            error: {},
            message: (  error as string) || "Failed to place order",
        };

    }








}

