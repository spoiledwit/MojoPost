'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import {signIn, signOut, useSession, getProviders} from "next-auth/react"

const Nav = () => {

  const {data: session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvidersF = async () => {
      const providers = await getProviders();
      setProviders(providers);
    }
    setProvidersF();
  }, []);

  return (
    <nav>
    <div
    className="flex-between w-full mb-16 px-20 pt-2"
    >
        <Link href="/" className="flex gap-2 flex-center">
            <Image
             src="/assets/images/logo.svg"
             alt="MojoPost Logo"
             width={30}
             height={30}
             className="object-contain"
            />
        <p className="logo_text">
            MojoPost
        </p>
        </Link>

        <div className="
        sm:flex hidden 
        ">
          {session?.user ? (
            <div className="flex gap-4">
              <Link href="/create-prompt"
              className="black_btn mb-2"
              >
                Create Post
              </Link>
              <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn mb-2"
              >
                Sign Out
              </button>

              <Link href="/profile">
                <Image
                src={session?.user.image || "/assets/images/profile.svg"}
                alt="Profile"
                width={30}
                height={30}
                className="object-contain rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
            {
              providers && Object.values(providers).map((provider) => (
                <button
                type="button"
                onClick={() => signIn(provider.id)}
                className="black_btn"
                >
                  Sign in with {provider.name}
                </button>
              ))
            }
            </>
          )}
        </div>

        {/* Mobile Navigation */}

        <div className="sm:hidden flex relative">
            {
              session?.user ? (<>
              <div className="
              flex
              ">
                <Image 
                src={session?.user.image || "/assets/images/profile.svg"}
                width={37}
                height={37}
                className="rounded-full"
                alt="MojoPost Logo"
                onClick={() => {
                  setToggleDropdown((prev) => !prev)
                }}
                />
                {
                  toggleDropdown && (
                    <div className="dropdown">
                      <Link
                      href="/profile"
                      className="dropdown_link"
                      onClick={()=>{
                        setToggleDropdown(false)
                      }} >
                        My Profile
                        </Link> 
                        <Link
                      href="/create-prompt"
                      className="dropdown_link"
                      onClick={()=>{
                        setToggleDropdown(false)
                      }} >
                      Create Prompt
                        </Link> 

                        <button
                        onClick={()=>[
                          setToggleDropdown(false),
                          signOut()
                        ]}
                        className="mt-5 w-full black_btn"
                        >
                          Sign Out
                        </button>
                    </div>
                  )
                }
              </div>
              </>) : (<>
                {
              providers && Object.values(providers).map((provider) => (
                <button
                type="button"
                onClick={() => signIn(provider.id)}
                className="black_btn"
                >
                  Sign in with {provider.name}
                </button>
              ))
            }
              </>)
            }
        </div>
    </div>
    </nav>
  )
}

export default Nav