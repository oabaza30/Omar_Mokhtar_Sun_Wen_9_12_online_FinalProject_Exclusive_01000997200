"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ContactSchema,
  contactFormState,
  contactFormSchema,
} from "@/app/schema/contact.schema";
import { useActionState, useEffect } from "react";
import { handleContact } from "@/services/contact.service";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PhoneCall, Mail } from "lucide-react";


export default function ContactPage() {
  const [action, formAction] = useActionState(handleContact, contactFormState);

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    if (action.message) {
      if (action.success) {
        toast.success(action.message, { position: "top-center" });
        form.reset();
      } else {
        toast.error(action.message, { position: "top-center" });
      }
    }
  }, [action, form]);

  return (
    <section className="container py-20">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-10 p-8 bg-white shadow rounded">
          <div className="flex gap-4 items-center">
            <span className="bg-red-500 text-white p-3 rounded-full">
              <PhoneCall className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-semibold">Call To Us</h4>
              <p className="text-sm text-gray-600">We are available 24/7, 7 days a week.</p>
              <p className="text-sm text-gray-600">Phone: +8801611112222</p>
            </div>
          </div>
          <hr />
          <div className="flex gap-4 items-center">
            <span className="bg-red-500 text-white p-3 rounded-full">
              <Mail className="w-5 h-5" />
            </span>
            <div>
              <h4 className="font-semibold">Write To US</h4>
              <p className="text-sm text-gray-600">Fill out our form and we will contact you within 24 hours.</p>
              <p className="text-sm text-gray-600">Emails: customer@exclusive.com</p>
              <p className="text-sm text-gray-600">support@exclusive.com</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-8 bg-white shadow rounded">
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Name *" className="bg-gray-100" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.name?.[0] ?? ""}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Email *" className="bg-gray-100" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.email?.[0] ?? ""}</FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Phone *" className="bg-gray-100" {...field} />
                      </FormControl>
                      <FormMessage>{action.error?.phone?.[0] ?? ""}</FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Your Message" rows={6} className="bg-gray-100" {...field} />
                    </FormControl>
                    <FormMessage>{action.error?.message?.[0]  ?? ""}</FormMessage>
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-red-500 text-white px-8 float-right">
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
