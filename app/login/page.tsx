"use client";
import { signIn } from 'next-auth/react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);
  const [isErrorUsername, setIsErrorUsername] = useState(false)
  const [isErrorPassword, setIsErrorPassword] = useState(false)

  async function onSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const username = form.username.value.trim();
      const password = form.password.value.trim();
      if (!username && !password) {
        setIsErrorPassword(true)
        setIsErrorUsername(true)
        return;
      }
      if (!username) {
          setIsErrorUsername(true)
          return;
      }
      if (!password) {
          setIsErrorPassword(true)
          return;
      }
      const res = await signIn('credentials',  { redirect: false, username: username, password: password})
      
      if (res?.error) {
        setIsErrorSubmit(true);
    } else {
        console.log("Login berhasil:", res);
        // Redirect atau tindakan lain yang diinginkan
    }
      
    } catch (error) {
      console.log(error);
      setIsErrorSubmit(true)
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-end bg-muted">
      <div className="w-1/3 min-h-screen flex justify-center items-center bg-white shadow-sm">
        <Card className="border-none shadow-none w-3/4">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Please Login to Continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={(e) => onSubmit(e)}
                className="space-y-8 max-w-3xl mx-auto py-10"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`${isErrorSubmit && "text-destructive"}`}>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" type="text" {...field} />
                      </FormControl>
                      {
                        isErrorUsername ? 
                        <FormMessage>Mohon isi username</FormMessage>
                        : isErrorSubmit ? 
                        <FormMessage>Username atau password salah</FormMessage> : <></>
                      }
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={`${isErrorSubmit && "text-destructive"}`}>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" type="password" {...field} />
                      </FormControl>
                      {
                        isErrorPassword ? 
                        <FormMessage>Mohon isi Password</FormMessage>
                        : isErrorSubmit ? 
                        <FormMessage>Username atau password salah</FormMessage> : <></>
                      }
                    </FormItem>
                  )}
                />
                <Button className="w-full" type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p>Dont have an account? Register</p>
          </CardFooter>
        </Card>

      </div>

    </div>
  );
}
