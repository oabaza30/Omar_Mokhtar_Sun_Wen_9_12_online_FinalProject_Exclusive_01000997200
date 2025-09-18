"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import loginImage from "@/assets/images/login.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { formState, registerFormSchema, RegisterSchema } from './../../schema/register.schema';
import { handleRegister } from "@/services/register.service";
import {  useActionState, useEffect } from "react";
import { toast } from "sonner";




export default function RegisterPage() {
  const [action, formAction] = useActionState(handleRegister, formState);
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      Phone: "",
      
    },
  })


 useEffect(() => {
    if (action.message) {
      if (action.success) {
        toast.success(action.message,{
          position: "top-center",
        });
        router.push("/login");
      } else {
        toast.error(action.message, {
          position: "top-center",
        });
      }
    }
  }, [action, router]);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Left Side - Image */}
        <div className="relative w-full h-[600px] hidden md:block">
          <Image
            src={loginImage}
            alt="Login Visual"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="flex flex-col justify-center px-10 py-16">
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-sm text-gray-700 mb-6">Enter your details below</p>

          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field}/>
                    </FormControl>
                    <FormMessage>
                      {action.error?.name?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="username@domain.com" {...field} type="email" />
                    </FormControl>
                    <FormMessage>
                      {action.error?.email?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*********" type="password" {...field} autoComplete="off"/>
                    </FormControl>
                    <FormMessage>
                      {action.error?.password?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input placeholder="*********" type="password" {...field} autoComplete="off"/>
                    </FormControl>
                    <FormMessage>
                      {action.error?.rePassword?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+021 0000 0000 " type="tel" {...field} />
                    </FormControl>
                    <FormMessage>
                      {action.error?.Phone?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <div className="w-full">
                <Button type="submit" className="bg-red-500 text-white px-8 w-full">
                  Create account
                </Button>
                
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
