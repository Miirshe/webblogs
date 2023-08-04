import React from 'react'
import { Link } from 'react-router-dom'
import Blogs from '../blogs/Blogs'

const AllBlogs = ({ blogs, user }) => {

    return (
        <div className='mt-20'>
            <div className="mt-16 p-10 bg-[#03256C] text-white">
                <div className=" p-4">
                    <div className="p-3">
                        <h1 className="text-4xl tracking-widest text-center">ALL BLOGS</h1>
                    </div>
                    <span className="flex justify-center items-center space-x-4">
                        <Link to="/" className="text-xl">HOME</Link> <small>/</small> <span className="text-lg">BLOGS</span>
                    </span>
                </div>
            </div>

            <div className='mt-10'>
                <Blogs blogs={blogs} user={user} />
            </div>

        </div>
    )
}

export default AllBlogs