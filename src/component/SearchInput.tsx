import React from 'react'

export default function SearchInput() {
  return <div className="flex space-x-2 w-full">
    <input type="text" placeholder="Input here" className="border px-4 py-2 rounded-md w-full" />
    <button className="basis-40 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-700">Search</button>
    </div>
}
