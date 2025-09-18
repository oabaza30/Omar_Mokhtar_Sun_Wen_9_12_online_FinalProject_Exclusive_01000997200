import { z } from "zod";

export const addressFormSchema = z.object({
  cartId: z.string().nonempty({ message: "CardId is required" }),
  firstname: z.string().nonempty({ message: "Firstname is required" })
  .min(3, { message: "Firstname must be at least 3 characters long" }),
  lastname: z.string().nonempty({ message: "Lastname is required" })
  .min(3, { message: "Lastname must be at least 3 characters long" }),
  streetaddress: z.string().nonempty({ message: "Street address is required" })
  .min(3, { message: "Street address must be at least 3 characters long" }),
  apartment: z.string().optional(),
  city: z.string().nonempty({ message: "City name is required" })
  .min(3, { message: "City name must be at least 3 characters long" }),
  Phone: z.string()
  .nonempty({ message: "Phone is required" })
  .regex(/^(?:002|\+2)?01[0-2,5]{1}[0-9]{8}$/, {
    message: "Invalid Egyptian phone number",
  }),
  email:z.email({message: "Please enter a valid email address."}),
  paymentMethod: z.enum(["cash", "card"],{
    message: "Payment method is required",
  },),
})


export type addressFormType = z.infer<typeof addressFormSchema>


export const addressFormState = {
  success: false,
  error:{
    firstname: [],
    lastname: [],
    streetaddress: [],
    apartment: [],
    email: [],
    city: [],
    Phone: [],
    cartId: [],
    paymentMethod: [],
  },
  message:null,
  callbackUrl: "",
};

export type addressFormStateType = {
  success: boolean,
  error:{
    cartId?: string[],
    firstname?: string[],
    lastname?: string[],
    streetaddress?: string[],
    apartment?: string[],
    email?: string[],
    city?: string[],
    Phone?: string[],
    paymentMethod?: string[],
  },
  message:string | null;
  callbackUrl?: string;
};
