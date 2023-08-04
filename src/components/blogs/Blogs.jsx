import { BiMessageEdit } from "react-icons/bi"
import { RiDeleteBin5Fill } from "react-icons/ri"
import { BsArrowRightShort } from "react-icons/bs"
import { Link } from "react-router-dom"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/config"
import { toast } from "react-toastify"
import{ AiOutlineLike , AiOutlineDislike} from 'react-icons/ai'
// import { PopularBlogs } from "../PopularBlogs/PopularBlogs"
import { useState } from "react"
const Blogs = ({ blogs, user }) => {
  console.log(user?.uid)
  console.log(user?.photoURL)
  // const getUserProfile = user.find
  console.log("miirshe", blogs)
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      try {

        const removeProduct = doc(db, "blogs", id);
        await deleteDoc(removeProduct);
        toast.success("Blog Deleted Successfully.")

      } catch (error) {
        console.log(error)
      }
    }
  }
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerge = 5;
  const lastIndex = currentPage * recordPerge;
  const firstIndex = lastIndex - recordPerge;
  const records = blogs?.slice(firstIndex, lastIndex);
  const numberPage = Math.ceil(blogs.length / recordPerge);
  const numbers = [...Array(numberPage + 1).keys()].slice(1);

  return (
    <div className="lg:w-10/12 mt-10 lg:mx-auto">
      <h1 className="ml-2 text-xl text-[#03256C] mt-2">Daily Blogs</h1>
      <hr className="w-8/12 mt-2" />
      <div className="flex flex-col lg:flex-row justify-start items-start gap-3">
        <div className="lg:w-8/12 grid grid-cols-1 lg:grid-cols-2 gap-3 mt-4 p-2" >
          {
            records?.map(items => {
              return (
                <>
                  <div className="h-72 w-4/7 bg-white " key={items?.id}>
                    <img className="h-72 w-[100%] object-fill rounded-md" src={items?.imgUrl} alt="" />
                  </div>
                  <div className="flex flex-col justify-start gap-4 p-2">
                    <div className="flex flex-row justify-start items-center gap-2 p-1">
                      <img className="rounded-[100%] w-16 h-16" src={items?.photoUrl} alt="profile author" />
                      <div>
                        <p>{items?.author}</p>
                        <p>{items?.timestemp?.toDate()?.toDateString()}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <h3>{items?.category}</h3>
                      <h2 className="text-2xl">{items?.title}</h2>
                      <p className="text-base leading-7 tracking-wide">{items?.content}</p>
                      <div className="flex flex-row justify-between items-center">
                        <Link to={`/Detail/${items?.id}`}>
                          <button className="text-[#03256C]">Read more <BsArrowRightShort className="inline" size={25} /></button>
                        </Link>
                        <div>
                          {
                            user?.uid && items?.userId === user?.uid && (
                              <>
                                <RiDeleteBin5Fill onClick={() => handleDelete(items?.id)} className="inline text-red-500 cursor-pointer" size={23} />
                                <Link to={`/UpdatePost/${items?.id}`}>
                                  <BiMessageEdit className="inline text-[#03256C] mt-1 cursor-pointer" size={25} />
                                </Link>
                              </>
                            )
                          }
                        </div>
                      </div>
                    </div>
                    <hr className="border-2"/>
                    <div className="flex flex-row gap-2 justify-end items-en">
                    <AiOutlineLike size={25}/>
                    <AiOutlineDislike size={25}/>
                    </div>
                  </div>

                </>
              )
            })
          }

        </div>
        {/* <div className="mb-28 ml-5">
          <PopularBlogs blogs={blogs} />
        </div> */}
      </div>
      <nav className='mt-20'>
        <ul className='flex flex-row justify-start items-center gap-10'>
          <li>
            <button onClick={prePage} className='bg-[#061826] py-3 px-5 text-[#fff] rounded-[50%] shadow-lg'>Prev</button>
          </li>
          {
            numbers.map((page, index) => {
              return (
                <li key={index} className={`${currentPage === page ? 'bg-[#061826] px-4 py-2 text-[#fff] text-lg rounded-[50%]' : ''}`}>
                  <button onClick={() => changeCurrentPage(page)}>{page}</button>
                </li>
              )
            })
          }
          <li>
            <button onClick={nextPage} className='bg-[#061826] py-3 px-5 rounded-[50%] text-[#fff] shadow-lg'>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  )
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }

  }
  function changeCurrentPage(id) {
    setCurrentPage(id)
  }
  function nextPage() {
    if (currentPage !== numberPage) {
      setCurrentPage(currentPage + 1)
    }

  }
}

export default Blogs