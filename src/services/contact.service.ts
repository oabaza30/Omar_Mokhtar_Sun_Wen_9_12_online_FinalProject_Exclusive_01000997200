"use server";

import { contactFormSchema, ContactFormStateType } from "@/app/schema/contact.schema";


export async function handleContact(
  formState: ContactFormStateType,
  formData: FormData
): Promise<ContactFormStateType> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  const parsedData = contactFormSchema.safeParse(formValues);

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    await fetch("/cantact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedData.data),
    });

    return {
      success: true,
      error: {},
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Contact API error:", error);
    return {
      success: false,
      error: {},
      message: "Something went wrong while sending message.",
    };
  }
}
