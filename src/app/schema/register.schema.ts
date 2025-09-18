import z from "zod"

export const registerFormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" })
  .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.email({message: "Please enter a valid email address."}),
  password: z.string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .refine(
      (val) =>
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) && 
        /\d/.test(val) && 
        /[^A-Za-z0-9]/.test(val),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
Phone: z.string()
  .nonempty({ message: "Phone is required" })
  .regex(/^(?:002|\+2)?01[0-2,5]{1}[0-9]{8}$/, {
    message: "Invalid Egyptian phone number",
  }),
  rePassword :z.string().nonempty({ message: "password is required" }).min(6, "Password must be at least 6 characters long" ),
})
.refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
})


export type RegisterSchema = z.infer<typeof registerFormSchema>


export type formStateType = {
  success: boolean,
  error:{
    name?: string[],
    email?: string[],
    password?: string[],    
    rePassword?: string[],    
    Phone?: string[],
  },
  message:string | null,
};

export const formState : formStateType = {
  success: false,
  error:{},
  message:null,
};
