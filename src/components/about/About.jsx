import { Link } from "react-router-dom"
import { HiInformationCircle, HiLightBulb } from 'react-icons/hi';
import { SiSimplenote } from 'react-icons/si';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';
import profile from "../../assets/duraan.jpg"
const About = () => {
  return (
    <>
      <div className="mt-20 p-10 bg-[#03256C] text-white">
        <div className=" p-4">
          <div className="p-3">
            <h1 className="text-4xl tracking-tighter text-center">About Us</h1>
          </div>
          <span className="flex justify-center items-center space-x-4">
            <Link to="/" className="text-xl">Home</Link> <small>/</small> <span className="text-lg">About</span>
          </span>
        </div>

      </div>

      <div className='p-5 text-[#03256C] mt-14'>
        <div className='flex flex-col lg:flex-row justify-start lg:ml-20 shadow-inner'>
          <img className='lg:w-[30%] h-[72] rounded-md' src={profile} alt='profiles' />
          <div className='lg:w-[50%] leading-8 lg:ml-10 tracking-widest space-y-3 mt-10'>
            <span className='text-3xl'>Duraan ali (Duraan)</span>
            <p className='text-2xl'>COE Founder Gabi School</p>
            <p> We are providing the best quality online courses. Our all instructors are high expert Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, est There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humor, or randomized words which don`t look even slightly believable.</p>
            <span className='flex flex-row justify-start space-x-3 '>
              <BsFacebook className='cursor-pointer duration-500  text-lg ease-in text-[#03256C]  inline' size={22} />
              <BsInstagram className='ml-4 cursor-pointer duration-500  text-lg  ease-in text-[#03256C]  inline ' size={22} />
              <BsTwitter className='ml-4 cursor-pointer duration-500  text-lg  ease-in text-[#03256C]  inline' size={22} />
            </span>
          </div>
        </div>
      </div>


      <div className='flex flex-col lg:flex-row justify-center mx-auto mt-14  p-3 lg:w-[87%] text-[#03256C] gap-6'>
        <div className='rounded-md shadow-lg p-3 space-y-3'>
          <p className='text-center txt-3xl tracking-widest leading-9'><HiInformationCircle className='inline' size={25} /> Ku saabsan </p>
          <p className='tracking-wide text-center leading-6'>
            Waa elearning educational online ah, oo aad ka heli karto Courses kor uqadayo xirfadahaaga
            tayo leh. waxaana la furay 2020.</p>
        </div>

        <div className='rounded-md shadow-lg p-3 space-y-3'>
          <p className='text-center txt-3xl tracking-widest leading-9'><HiLightBulb className='inline' size={25} /> Himilada </p>
          <p className='tracking-wide text-center leading-6'>In aan noqono filashada ah qof  walba in uu heli karo
            eLearning Online ah xirfadiisa kor ugu qadeyso waqti kooban, tayo.</p>
        </div>

        <div className='rounded-md shadow-lg p-3 space-y-3'>
          <p className='text-center txt-3xl tracking-widest leading-9'><SiSimplenote className='inline' size={25} /> Risaalada </p>
          <p className='tracking-wide text-center leading-6'>  In aan bulshada kaga filnaano in ay helaan eLearning
            Online ah ayaga oo guryahooda joogaan heli karaan wax barasho tayo leh.</p>
        </div>
      </div>
    </>
  )
}

export default About