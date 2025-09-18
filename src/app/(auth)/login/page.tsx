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
import { LoginFormPayload, loginFormSchema } from "@/app/schema/login.schema"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<LoginFormPayload>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormPayload) {
    try {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      })

      if (res?.ok) {
        toast.success("Login successfully", {
          position: "top-center",
        })
        router.push("/")
      } else {
        toast.error(res?.error || "Something went wrong", {
          position: "top-center",
        })
      }
    } catch {
      toast.error("Something went wrong", {
        position: "top-center",
      })
    }
  }

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
          <h1 className="text-3xl font-bold mb-2">Log in to Exclusive</h1>
          <p className="text-sm text-gray-700 mb-6">Enter your details below</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="username@domain.com" {...field} />
                    </FormControl>
                    <FormMessage />
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
                      <Input placeholder="*********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <Button type="submit" className="bg-red-500 text-white px-8">
                  Log In
                </Button>
                <span className="text-sm text-red-500 cursor-pointer">
                  Forget Password?
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
