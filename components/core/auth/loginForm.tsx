"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
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
import { useRouter } from "next/navigation";

export default function LoginFormComponent({isRegisterForm, isErrorSubmit, isErrorUsername, isErrorPassword, OnRegisterSubmit, onLoginSubmit } : 
    {isRegisterForm:boolean, isErrorSubmit:boolean, isErrorUsername:boolean, isErrorPassword:boolean, OnRegisterSubmit:(e: React.FormEvent) => void, onLoginSubmit:(e: React.FormEvent) => void}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      });
      const router = useRouter()
    return (
        <>
        <div className="w-1/3 min-h-screen flex justify-center items-center bg-card shadow-sm">
            <Card className="border-none shadow-none w-3/4">
            <CardHeader>
                <Image src={logo.src} width={1000} height={1000} alt="Logo" className="h-auto max-w-3/4 mb-10" />
                
                <CardTitle>{isRegisterForm ? "Register" : "Login"}</CardTitle>
                <CardDescription>{isRegisterForm ? "Make Your Account to Continue" : "Please Login to Continue"}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                <form
                    onSubmit={isRegisterForm ? (e) => OnRegisterSubmit(e) : (e) => onLoginSubmit(e)}
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
                    {
                    isRegisterForm &&
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
                    }
                    <Button className="w-full" type="submit">{isRegisterForm ? "Register" : "Login"}</Button>
                </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p>{isRegisterForm ? "Have an account? " : "Dont have an account? "} 
                <span 
                onClick={() => router.push(`/login?register=${isRegisterForm ? "false" : "true"}`)} 
                className='text-primary cursor-pointer hover:underline'>{isRegisterForm ? "Login" : "Register"}</span>
                </p>
            </CardFooter>
            </Card>
        </div>
        </>
    )
}