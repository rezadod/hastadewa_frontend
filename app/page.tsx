import Navbar from "@/components/core/navbar";
import { Button } from "@/components/ui/button";
import bgLanding from "@/public/bg-landing.png"
import Image from "next/image";


export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-muted flex flex-col justify-center items-center space-y-3">
      <Navbar />
      <div className="font-bold text-6xl">Lorem Ipsum</div>
      <div className="text-3xl">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
      <Button variant={"default"}>Selengkapnya</Button>
      <Image src={bgLanding.src} width={2500} height={2000} alt="Landing Image" className="h-[50vh] w-auto mt-5" />
    </div>
  );
}
