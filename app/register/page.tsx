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
import Image from 'next/image';
const formSchema = z.object({
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});
import logo from "@/public/hastadewa.png"
import loginImage from "@/public/login.png"
import { useRouter } from 'next/navigation';
export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const router = useRouter()
  const [isSubmit, setIsSubmit] = useState(false)
  const [isErrorSubmit, setIsErrorSubmit] = useState(false);
  const [isErrorUsername, setIsErrorUsername] = useState(false)
  const [isErrorPassword, setIsErrorPassword] = useState(false)
  

  async function OnRegisterSubmit(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmit(true)
    try {
      const form = e.currentTarget;
      const username = form.username.value.trim();
      const password = form.password.value.trim();
      if (!username && !password) {
        setIsErrorPassword(true)
        setIsErrorUsername(true)
        setIsSubmit(false);
        return;
      }
      if (!username) {
          setIsErrorUsername(true)
          setIsSubmit(false);
          return;
      }
      if (!password) {
          setIsErrorPassword(true)
          setIsSubmit(false);
          return;
      }
      const res = await signIn('credentials',  { redirect: false, username: username, password: password, formType: "Register"})
      
      if (res?.error) {
        setIsErrorSubmit(true);
        setIsSubmit(false)
      } else {
          console.log("Register berhasil:", res);
          setIsSubmit(false)
          // Redirect atau tindakan lain yang diinginkan
      }
      
    } catch (error) {
      console.log(error);
      setIsErrorSubmit(true)
      setIsSubmit(false)
    }
  }

  return (
    <div className={`flex-row w-full min-h-screen transition-all duration-300 flex bg-muted`}>
      {/* <Navbar /> */}
      <div className="w-1/3 min-h-screen flex justify-center items-center bg-card shadow-sm">
        <Card className="border-none shadow-none w-3/4">
          <CardHeader>
            <Image src={logo.src} width={1000} height={1000} alt="Logo" className="h-auto max-w-3/4 mb-10" />
            <CardTitle>Register</CardTitle>
            <CardDescription>Make Your Account to Continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={(e) => OnRegisterSubmit(e)}
                className="space-y-8 max-w-3xl mx-auto py-4"
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
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={`${isErrorSubmit && "text-destructive"}`}>Confirm Password</FormLabel>
                          <FormControl>
                            <Input placeholder="confirm password" type="password" {...field} />
                          </FormControl>
                          {
                            isErrorSubmit && 
                            <FormMessage>Password tidak sama</FormMessage>
                          }
                        </FormItem>
                      )}
                    />
                  </div>
                <Button className={`w-full ${isSubmit ? "cursor-not-allowed" : "cursor-default"}`} type="submit">{isSubmit ? "Sedang Memproses.." : "Register"}</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p>Have an account? 
              <span 
              onClick={() => router.push(`/login`)} 
              className='text-primary cursor-pointer hover:underline'> Login</span>
            </p>
          </CardFooter>
        </Card>
      </div>
      <div className='w-2/3 flex justify-center items-center'>
        <Image src={loginImage.src} width={1500} height={1000} alt='login image' className='h-[80vh] w-auto' />
      </div>
    </div>
  );
}
