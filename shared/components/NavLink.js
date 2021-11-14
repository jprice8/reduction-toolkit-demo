import React from 'react'

const NavLink = ({ icon, title }) => {
  return (
    <div className="px-10 py-5 cursor-pointer text-linkMain hover:bg-linkHover transition duration-200">
      {icon}
      <p className="pl-5">{title}</p>
    </div>
  )
}

export default NavLink
