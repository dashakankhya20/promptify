"use client";

//understand the class names of tailwindcss 
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    //as it is not getting called anywhere so we call it here
    setUpProviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <div className="w-8 h-8">
        {/* <Image src="/assets/images/logo.png" 
        alt="Promptopia Logo"
        width={100}
        height={100}
        className="object-contain max-h-full max-w-full"
        /> */}
        <img src="/assets/images/logo.png" 
          alt="Promptify Logo"
          style={{
            height:"100%",
            width:"100%",
            objectFit:"contain"
            // padding:"10px"
          }}
        />
        </div>
        <p className="logo_text">Promptify</p>
      </Link>

{/* why is it flex for small devices and what about mobile navigation */}
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href={`/profile/${session?.user?.id}`}>
              <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ): (
          <>
            {providers && 
             Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
             ))}
          </>
        )}
      </div>

      {/* {alert(providers)} */}

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
             <Image 
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
                onClick={() => setToggleDropdown((prev) => !prev)}
              />
              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                   href={`/profile/${session?.user?.id}`}
                   className="dropdown_link"
                   onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                   href="/create-prompt"
                   className="dropdown_link"
                   onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setToggleDropdown(false)
                      signOut();
                    }}
                    className="mt-5 w-full black_btn"
                  >
                    Sign Out
                  </button>
                </div>
              )}
          </div>
        ) : 
        (
          <>
           {providers && 
             Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign In
              </button>
             ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav