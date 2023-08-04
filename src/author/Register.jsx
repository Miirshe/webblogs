import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';
import { auth,storage } from '../firebase/config';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
const initialState = {
  username : '',
  email: '',
  password: '',
  userconfirm :'',
  photo : ''
}
const Register = () => {
  const navigate = useNavigate();
  const [saveUser , setSaveUser ] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [progress, setProgress] = useState(null);
  const { username , email, password, userconfirm , photo} = saveUser;
  const [file , setFile] = useState(null);
  const handleChange = (e)=>{
    setSaveUser({...saveUser , [e.target.name]: e.target.value})
  }
  useEffect(() => {
    const uploadFile = () => {
      const storageref = ref(storage, file.name);
      const UploadTask = uploadBytesResumable(storageref, file);
      UploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload progress" + progress + "% done");
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("upload is puased");
            break;
          case "running":
            console.log("upload is running");
            break;
          default:
            break;
        }
      }, (error) => {
        console.log("error: " + error)
      },
        () => {
          getDownloadURL(UploadTask.snapshot.ref).then((downloadUrl) => {
            setSaveUser((prev) => ({ ...prev, photo: downloadUrl }))

          })
        })
    }
    file && uploadFile();
  }, [file])
  const validate = ()=>{
    let errors = {};
    if(!username){
      errors.username = "username is required";
    }
    if(!email){
      errors.email= "email is required";
    }
    if(!password){
      errors.password= "password is required";
    }
    if(!userconfirm){
      errors.userconfirm= "confirm password is required";
    }
    return errors;
  }
  console.log(saveUser)
  const submitHandle = async (e) => {
    e.preventDefault();
    let errors = validate();
    if (Object.keys(errors).length) return setErrors(errors);
    if(password !== userconfirm ){
      return toast.error("password don`t match ");
    }
    else{
      try {
        const { user } = await createUserWithEmailAndPassword(auth,email,password);
        await updateProfile(user , { displayName:`${username}`,photoURL:photo})
        .then(() => {
          toast.success('successfull sign up ');
          navigate('/Login');
        })
        .catch((error) => {
          toast.error(error.message);
        });
        
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
      <section data-aos="fade-up">
        <div className='mt-36 p-3 shadow-lg bg-white w-[95%] md:w-[43%] lg:w-[35%] xl:w-[27%] mx-auto'>
          <h2 className='text-3xl text-center p-2 uppercase text-[#03256C] '>Register now</h2>
            <form className='flex flex-col p-3 w-[100%]'
            onSubmit={submitHandle}>
              <input className='py-2 px-5 w-[95%] mt-3   shadow-md border outline-[#03256C]' type='text' placeholder='Enter Username' name="username" onChange={handleChange} />
              <span className='text-red-500'>{errors.username ? errors.username : null}</span>
              {/* <input className='py-2 px-5 w-[95%] mt-3   shadow-md border outline-[#03256C]' type='text' placeholder='Enter Bio' name="bio" onChange={handleChange} />
              <span className='text-red-500'>{errors.bio ? errors.bio : null}</span> */}
              <input className='py-2 px-5 w-[95%] mt-3   shadow-md border outline-[#03256C]' type='email' placeholder='Enter Email' name="email" onChange={handleChange} />
              <span className='text-red-500'>{errors.email ? errors.email : null}</span>
              <input className='py-2 px-5 w-[95%] mt-4  shadow-md border outline-[#03256C]' type='password' placeholder='Password' name="password" onChange={handleChange} />
              <span className='text-red-500'>{errors.password ? errors.password : null}</span>
              <input className='py-2 px-5 w-[95%] mt-4  shadow-md border outline-[#03256C]' type='password' placeholder='confirm Password' name="userconfirm" onChange={handleChange} />
              <span className='text-red-500'>{errors.userconfirm ? errors.userconfirm : null}</span>
              <input className='py-2 px-5 w-[95%] mt-4  shadow-md border outline-[#03256C]' type='file'  onChange={(e)=>setFile(e.target.files[0])} />
              <button type='submit' className='mt-3  bg-[#03256C] py-2 px-3 rounded-md w-[95%]  text-white' disabled={progress !== null && progress < 100}>Register</button>
              <span className='mt-2 p-1 text-center'>
                <small className='headingText'> Do you have already an account ? </small>
                <Link className='headingText' to='/Login' >Login</Link>
              </span>
            </form>
        </div>
      </section>
    </>

  )
}

export default Register