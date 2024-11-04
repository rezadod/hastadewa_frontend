
import withAuth from "@/middlewares/withAuth"
import {  NextResponse } from "next/server";


export function mainMiddleware() {
  const res = NextResponse.next();
  return res;
}
// dirubah dadi iki nak ws butuh midleware
// export default withAuth(mainMiddleware, ['/dashboard'])

export default withAuth(mainMiddleware, ['/contoh'])