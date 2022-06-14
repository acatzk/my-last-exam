import Link from 'next/link'
import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 w-full">
      <div className="container mx-auto max-w-5xl py-3 px-5">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-white">Web Dev Exam</a>
          </Link>
          <Link href="/create">
            <a className="py-2 px-4 bg-green-500 rounded-lg font-medium text-white">
              Create New Article
            </a>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
