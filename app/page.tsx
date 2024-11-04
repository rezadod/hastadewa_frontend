import Link from "next/link";


export default function Dashboard() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <Link href={'/login'} className="bg-black text-white rounded-full px-4 py-2">Log In</Link>
    </div>
  );
}
