"use client";
//as we are using the browser's capabilites so we will use "use client"

import { SessionProvider } from "next-auth/react";

//it is going to be a high order component
//that is other elements are going to be wrapped inside it 
const Provider = ({ children, session}) => {
  return (
    <SessionProvider sessison={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider