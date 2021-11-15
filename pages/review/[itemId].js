import React from 'react'
import { useRouter } from "next/router"
import Link from "next/link"

import NavBar from '../../shared/components/NavBar'
import { targetData } from '../../shared/data/targetData'
import { HiPencilAlt, HiViewList } from 'react-icons/hi'

const ReviewDetail = () => {
  const router = useRouter()
  const { itemId } = router.query

  const item = targetData[itemId - 1]

  return (
    <NavBar>
      <div className="max-w-6xl mx-auto mt-10">
        <div>
          <h2 className="text-3xl">Review Target Item</h2>
          <p className="text-gray-500">Create or view movement plans for this item</p>
        </div>

        <div className="mt-5 bg-white flex justify-between p-10 rounded-md">
          <div>
            <h3 className="text-2xl">{item.description}</h3>
          </div>

          <div className="flex flex-col space-y-4">
            <Link href={`/review/create/${itemId}`}>
              <div 
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HiPencilAlt className="-ml-1 mr-2 h-5 w-5" />
                Create Plan
              </div>
            </Link>
            <Link href={`/review/view/${itemId}`}>
              <div 
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <HiViewList className="-ml-1 mr-2 h-5 w-5" />
                View Plans
              </div>
            </Link>
          </div>
        </div>

      </div>
    </NavBar>
  )
}

export default ReviewDetail
