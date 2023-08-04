import { useRef } from 'react'
import { HiLocationMarker } from 'react-icons/hi'
import { MdEmail } from 'react-icons/md'
import { BsTelephoneFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_rvvy0zr', 'template_xpao1ek', e.target, 'H311G9LLDex6hmI9k')
      .then((result) => {
        console.log(result.text);
        toast.success("successfully sended")
      }, (error) => {
        console.log(error.text);
        toast.error(error.text);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="mt-20 p-10 bg-[#03256C] text-white">
        <div className=" p-4">
          <div className="p-3">
            <h1 className="text-4xl tracking-tighter text-center">Contact Us</h1>
          </div>
          <span className="flex justify-center items-center space-x-4">
            <Link to="/" className="text-xl">Home</Link> <small>/</small> <span className="text-lg">Contact Us</span>
          </span>
        </div>
      </div>
      <div className='p-4 mt-20 flex flex-col lg:flex-row justify-center'>
        <div className='lg:w-[40%] shadow-2xl border border-[#03256C]'>
          <form ref={form} onSubmit={sendEmail} className='p-5 flex flex-col justify-start items-start space-y-3'>
            <input className="py-3 px-5 rounded-md shadow-sm w-full border-b-2 border-gray-300 outline-[#03256C]" type="text" name="user_name" placeholder='Your name' required />
            <input className='py-3 px-5 rounded-md shadow-sm w-full border-b-2 border-gray-300 outline-[#03256C]' type="email" name="user_email" placeholder='Your email' required />
            <input className='py-3 px-5 rounded-md shadow-sm w-full border-b-2 border-gray-300 outline-[#03256C]' type="number" name="phone" placeholder='Your phone' required />
            <textarea className='py-3 px-5 rounded-md shadow-sm w-full border-b-2 border-gray-300 outline-[#03256C]' name="message" placeholder='Your message' required />
            <input className="py-3 px-5 w-full rounded-md bg-white hover:bg-[#03256C] hover:text-white italic tracking-widest cursor-pointer duration-500 ease-in border-2 text-[#03256C] outline-white" type="submit" value="Send" />
          </form>
        </div>
        <div className='p-5  lg:w-[30%] bg-[#03256C] space-x-2 space-y-3 shadow-inner' >
          <h1 className='text-xl text-white capitalize ml-1 tracking-widest'>contact information</h1>
          <p className='text-base text-white tracking-widest'>contact us with these reference and get as possible response.</p>
          <div className=' space-y-4'>
            <p className='text-white tracking-widest '><span className='text-white'><HiLocationMarker size={25} className='inline' /></span>  United State-Minisota </p>
            <p className='text-white tracking-widest '><span className='text-white'><BsTelephoneFill size={25} className='inline' /></span>  +1(252) 615081247 </p>
            <p className='text-white tracking-widest '><span className='text-white'><MdEmail size={25} className='inline ' /> </span>  Bloggers.com </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact