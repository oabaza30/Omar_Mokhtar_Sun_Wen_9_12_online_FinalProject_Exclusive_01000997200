import z from "zod"

export const loginFormSchema = z.object({
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
})


export type LoginFormPayload = z.infer<typeof loginFormSchema>