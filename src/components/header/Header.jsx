import { Link, useNavigate } from 'react-router-dom'
import { BiMenu } from "react-icons/bi"
import { useState } from 'react'
import './Header.css'
import { useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { remove_active_user, set_active_user } from '../../redux/slices/AuthSlices'
import { ShowLoggin, ShowLogout } from '../../handleAuth/hideAuthLink'
import { FaBlogger, FaUserCircle } from 'react-icons/fa'
const Header = () => {
  const [displayName, setDisplayName] = useState('')
  const dispatch = useDispatch();
  const [navs, showNavs] = useState(false);
  const showMenu = () => {
    showNavs(!navs)
  }
  const hideMenu = () => {
    showNavs(false);
  }
  const navigate = useNavigate();
  const logoutuser = () => {
    signOut(auth).then(() => {
      toast.success('successfully logout ');
      navigate('/');

    }).catch((error) => {
      toast.error(error.message);
    });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName == null) {
          // const name = user.email.substring(0, user.email.indexOf("@"));
          // const getName = name.charAt(0).toUpperCase() + name.slice(1);
          const name = user?.displayName
          setDisplayName(name);
        } else {
          setDisplayName(user.displayName);
        }
        dispatch(set_active_user({
          email: user.email,
          userName: user.displayName ? user.displayName : displayName,
          userId: user.uid
        }))
      } else {
        setDisplayName('');
        dispatch(remove_active_user())
      }
    });
  }, [dispatch, displayName])
  return (
    <div className='text-[#03256C] bg-white shadow  p-3 fixed top-0 left-0 right-0 z-20'>
      <div className=' flex flex-col lg:flex-row lg:justify-around lg:items-center gap-4 p-3'>
        <div className=' relative'>
          <h1 className=' text-3xl'><FaBlogger className='inline mb-2' />BLOGGs</h1>
          <div className=' absolute right-0 bottom-0 lg:hidden'>
            <button> <BiMenu size={30} onClick={showMenu} /></button>
          </div>
        </div>

        <nav className='lg:w-7/12 ' >
          <div className={navs ? "showList" : "HideList"}>
            <ul className='flex flex-col justify-start items-start gap-3 lg:flex-row lg:justify-around lg:items-center text-lg' onClick={hideMenu}>
              <Link to="/">HOME</Link>
              <Link to="/AllBlogs">BLOGS</Link>
              <Link to="/About">ABOUT</Link>
              <Link to="/Contact">CONTACT</Link>
              <span className=' flex flex-row justify-between items-center space-x-10'>
                <ShowLoggin>
                  <Link to="/AddEditPost">POST</Link>
                  <span className='flex flex-row justify-between '><FaUserCircle className='mr-2 mt-1' /> Hi.{displayName}</span>
                  <button onClick={logoutuser} className='px-4 py-2 text-white bg-[#03256C] rounded-md shadow-md'>Logout </button>
                </ShowLoggin>
                <ShowLogout>
                  <Link to="/Login">Sign in</Link>
                  <button className='px-4 py-2 text-white bg-[#03256C] rounded-md shadow-md'> <Link to="/Register">Sign up</Link> </button>
                </ShowLogout>
              </span>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Header