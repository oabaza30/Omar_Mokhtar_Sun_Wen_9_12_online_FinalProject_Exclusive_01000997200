import z from "zod";

export const contactFormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .regex(/^(?:002|\+2)?01[0-2,5]{1}[0-9]{8}$/, {
      message: "Invalid Egyptian phone number",
    }),
  message: z.string().nonempty({ message: "Message is required" }),
});

export type ContactSchema = z.infer<typeof contactFormSchema>;

export type ContactFormStateType = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
  };
  message: string | null;
};


export const contactFormState: ContactFormStateType = {
  success: false,
  error: {},
  message: null,
};
