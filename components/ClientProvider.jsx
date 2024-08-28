"use client";
import { usePathname } from "next/navigation";
// import { WebSocketProvider } from "next-ws/client"

function ClientProvider({ children }) {
  const pathname = usePathname();

  if (
    pathname == "/login" ||
    pathname == "/password-forget" ||
    pathname == "/password-reset" ||
    pathname == "/sign-up"
  )
    return null;

  return (
    // <WebSocketProvider url="ws://localhost:3000/api/ws">
    <div>
      {children}
    </div>
    // </WebSocketProvider>
  )
}

export default ClientProvider;
