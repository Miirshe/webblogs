import { Link, useNavigate} from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { auth } from '../firebase/config';
import {  signInWithEmailAndPassword} from 'firebase/auth';
import { toast } from 'react-toastify';
const Login = () => {

    const navigate = useNavigate();
    const initialValue = {
        email : '',
        password : ''
    }
    const validationSchema = Yup.object({
        email : Yup.string().required("Please enter your email"),
        password : Yup.string().required("Please enter your password")
    })
      const submitHandle = (values) =>{
        signInWithEmailAndPassword(auth, values.email , values.password)
            .then(() => {
                toast.success('Successfully logged in');
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
      }
    return (
        <>
            <section data-aos="fade-up" className=' z-10'>
                <div className='mt-36   p-3 shadow-lg bg-white w-[90%]  md:w-[43%] lg:w-[35%] xl:w-[27%] mx-auto'>
                    <h2 className='text-3xl text-center p-2 uppercase text-[#03256C] '>Login</h2>
                    <Formik
                    initialValues={initialValue}
                    validationSchema={validationSchema}
                    onSubmit={submitHandle}>
                    <Form className='flex flex-col p-3 w-[100%] space-y-5  md:space-y-4'>
                        <Field className='py-2 px-5 w-[95%] shadow-md border outline-[#03256C] rounded-md' type='email' placeholder='Email' name="email" />
                        <ErrorMessage component="div" name="email" className='text-red-500'/>
                        <Field className='py-2 px-5 w-[95%]  shadow-md border outline-[#03256C] rounded-md' type='password' placeholder='Password' name="password" />
                        <ErrorMessage component="div" name="password" className='text-red-500'/>
                        <button type='submit' className='bg-[#03256C] py-2 px-3 rounded-md w-[95%] uppercase text-white'>Login</button>
                        <span className='p-1 '>
                            <Link className='headingText' to='/' >Forget Password</Link>
                        </span>
                        <span className='text-center mt-2 p-1'>-------- or --------</span>
                        <span className=' p-1 text-center'>
                            <small className='headingText'>Do you have an account ? </small>
                            <Link className='headingText' to='/Register' >Register</Link>
                        </span>
                    </Form>
                    </Formik>
                </div>
            </section>
        </>
    )
}

export default Login;