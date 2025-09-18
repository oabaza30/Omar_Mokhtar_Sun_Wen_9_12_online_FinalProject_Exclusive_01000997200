"use server"

import { formStateType, registerFormSchema } from "@/app/schema/register.schema";

export async function handleRegister(formState: formStateType, formData:FormData) : Promise<formStateType> {
    const formValues = {
    "name": formData.get("name"),
    "email":formData.get("email"),
    "password":formData.get("password"),
    "rePassword":formData.get("rePassword"),
    "Phone": formData.get("Phone") ?? ""
};

const parsedData = registerFormSchema.safeParse(formValues);

if (!parsedData.success) {
    return {
        success: false,
        error: parsedData.error?.flatten().fieldErrors,
        message: null
    };
}


    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedData.data),
        }
    );
    const data = await res.json();
    
    if (!res.ok){
        return {
        success: false,
        error: {},
        message: data.message
        };
        
    }
    return {
        success: true,
        error: {},
        message: data.message
    }
    } catch (error) {
       return {
        success: false,
        error: {},
        message: (error as string) || "Something went wrong"
    } 
        
    }
}