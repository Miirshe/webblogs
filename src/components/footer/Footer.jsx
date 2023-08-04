import { BsFacebook, BsInstagram } from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { AiOutlineWhatsApp } from 'react-icons/ai';
const Footer = () => {
  const getdate = new Date();
  const getYear = getdate.getFullYear();
  return (
    <footer className=' bg-[#03256C] text-white mt-32 w-full'>
      <div className='xl:w-[85%]  lg:mx-auto px-2 py-8 lg:ml-10 flex flex-col md:flex-row md:justify-between'>
        <div className='py-2 px-1 md:ml-3 lg:ml-14'>
          <div>
            <input className='p-3 border-collapse border-white shadow-2xl ' type='email' placeholder='example@gmail.com' />
            <button className='p-3  hover:text-[#03256C] hover:bg-white  hover:shadow-lg duration-500 ease-in'>Send email</button>
            <p className='text-base text-white w-64 space-y-3 my-3 tracking-wider leading-6'>Get E-mail updates about our latest Courses and special offers.</p>
          </div>
          <span>{getYear}  &copy; All rights reserved.</span>
        </div>

        <div className='p-2'>
          <ul className='flex flex-col justify-start space-y-1'>
            <Link className='hover:bg-white hover:text-[#03256C] rounded-md shadow-lg duration-500 ease-in p-2' to='/'>Home</Link>
            <Link className='hover:bg-white hover:text-[#03256C] rounded-md shadow-lg duration-500 ease-in p-2' to='/Courses'>Courses </Link>
            <Link className='hover:bg-white hover:text-[#03256C] rounded-md shadow-lg duration-500 ease-in p-2' to='/Contact'>Contact Us</Link>
            <Link className='hover:bg-white hover:text-[#03256C] rounded-md shadow-lg duration-500 ease-in p-2' to='/About'>About Us</Link>
          </ul>
        </div>

        <div className='py-2 px-1 mr-4 space-y-2 '>
          <div className='flex flex-col justify-start p-1 space-y-3 text-white text-base'>
            <h4 className='text-white text-3xl capitalize tracking-widest '>Bloggers</h4>
            <p className='tracking-widest'>Phone : 252 615081247
            </p>
            <p className='tracking-widest'>Email : Bloggers@gmail.com</p>
          </div>
          <span className='flex flex-row justify-start space-x-3 '>
            <Link to='https://www.facebook.com/thibyanshop'>
              <BsFacebook className='ml-3 cursor-pointer duration-500 text-white text-lg ease-in hover:text-[#31A439]  inline' size={22} />
            </Link>
            <Link to='https://www.instagram.com/thibyanshop/'>
              <BsInstagram className='ml-3 cursor-pointer duration-500 text-white text-lg  ease-in hover:text-[#31A439]  inline ' size={22} />
            </Link>
            <Link to='https://wa.link/5rayra'>
              <AiOutlineWhatsApp className='ml-3 cursor-pointer duration-500 text-white text-lg  ease-in hover:text-[#31A439]  inline' size={22} />
            </Link>
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer