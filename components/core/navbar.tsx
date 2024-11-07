
import Image from "next/image";
import { ModeToggle } from "../ui/mode_toggle";
import {
    NavigationMenu,
    NavigationMenuLink,
    NavigationMenuList,
  } from "../ui/navigation-menu"
import logo from "@/public/hastadewa.png"
  

export default function Navbar() {
    return (
        <>
        <div className="fixed top-0 w-full h-[3rem] flex justify-between items-center bg-background/50 backdrop-blur-sm px-4">
            <div className="flex space-x-4" >
                <NavigationMenu className="space-x-4" >
                    <NavigationMenuList className="cursor-default">
                        <NavigationMenuLink>
                        <Image src={logo.src} width={1000} height={1000} alt="Logo" className="h-10 w-auto" />
                        </NavigationMenuLink>
                    </NavigationMenuList>
                    <NavigationMenuList className="cursor-pointer">
                        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80 focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        Home
                        </NavigationMenuLink>
                    </NavigationMenuList>
                    <NavigationMenuList className="cursor-pointer">
                        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80 focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        Product
                        </NavigationMenuLink>
                    </NavigationMenuList>
                    <NavigationMenuList className="cursor-pointer">
                        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80 focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        About
                        </NavigationMenuLink>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="flex space-x-4">
                <NavigationMenu className="space-x-4" >
                    <NavigationMenuList className="cursor-pointer">
                        <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/80 text-accent focus:bg-accent focus:text-accent-pribg-primary focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50" >
                        Register
                        </NavigationMenuLink>
                    </NavigationMenuList>
                    <NavigationMenuList className="cursor-pointer">
                        <NavigationMenuLink href="/login" className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80 focus:bg-accent focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                        Login
                        </NavigationMenuLink>
                    </NavigationMenuList>
                </NavigationMenu>
                <ModeToggle />
            </div>

        </div>
        

        </>
    )
}