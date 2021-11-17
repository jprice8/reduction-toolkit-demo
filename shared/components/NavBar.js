import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  FaClipboardCheck,
  FaCog,
  FaSearch,
  FaShippingFast,
  FaTrophy,
  FaUser,
} from "react-icons/fa"

import Header from "./Header"
import { classNames } from "../utils/navHelpers"

const navigation = [
  { name: "Profile", href: "/profile", icon: FaUser },
  { name: "Search", href: "/search", icon: FaSearch },
  { name: "Review", href: "/review", icon: FaClipboardCheck },
  { name: "Shipping", href: "/shipping", icon: FaShippingFast },
  { name: "Leaderboard", href: "/leaderboard", icon: FaTrophy },
  { name: "Readme", href: "/", icon: FaCog },
]

const NavBar = ({ children }) => {
  const router = useRouter()

  // Check whether link is hot for highlight
  const isLinkHot = (item) => {
    return router.pathname === item.href
  }

  return (
    <React.Fragment>
      {/* Header */}
      <Header />

      {/* Gray background */}
      <div className="bg-gray-200 h-full w-full">
        {/* Top Nav */}
        <div className="w-full bg-white">
          <h2 className="text-logoMain py-5 pl-10 text-3xl">
            Reduction <span className="text-logoSecond">Toolkit</span>
          </h2>
        </div>

        {/* Side Nav and Content */}
        <div className="flex w-full h-full">
          {/* Side Nav */}
          <nav className="hidden md:block bg-white">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <div 
                  className={classNames(
                    isLinkHot(item) 
                    ? "bg-gray-200"
                    : "",
                    "flex px-10 py-5 cursor-pointer text-linkMain hover:bg-linkHover transition duration-200"
                  )}
                >
                  <item.icon className="mr-4 flex-shrink-0 h-6 w-6 text-linkMain" />
                  <p>{item.name}</p>
                </div>
              </Link>
            ))}
          </nav>

          {/* Content */}
          <section className="w-full">{children}</section>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NavBar
