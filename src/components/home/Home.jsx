import { useEffect, useState } from "react"
import navHome from "../../assets/profile2.png"
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import Blogs from "../blogs/Blogs";
import Trendings from "../trending/Trendings";
import ClientMap from "./ClientMap";
import { Link } from "react-router-dom";
const Home = ({user}) => {
    const [blogs, setBlogs] = useState([]);
    const [trending , setTrending ] = useState([]);
    // useEffect(()=>{

    // },[])
    const getTrendingBlogs = async ()=>{
        const blog = collection(db , "blogs");
        const trendingQuery = query(blog , where("trendings" , "==" , "yes"));
        const dataRef = await getDocs(trendingQuery);
        let trendingBlog = [];
        dataRef.forEach((doc)=>{
            trendingBlog.push({id: doc.id, ...doc.data()});
        })
        setTrending(trendingBlog);
    }
    useEffect(() => {
        const getData = onSnapshot(
            collection(db, "blogs"),
            (snapshot) => {
                let list = [];
                snapshot.docs.forEach((doc) => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                setBlogs(list)
            }, (error) => {
                console.log(error);
            }
        )

        return () => {
            getTrendingBlogs();
            getData();
        }
    }, [])
    console.log("here blogs :", blogs)
    return (
        <>
            <div className="mt-32 lg:mt-20 h-screen">
                <div className="text-[#03256C] flex flex-col lg:flex-row justify-between items-center lg:w-10/12 lg:mx-auto">

                    <div className="lg:w-[40%] space-y-4">
                        <h1 className="text-4xl tracking-widest lg:leading-normal p-3 uppercase">Write your own blogger</h1>
                        <h4 className="text-base tracking-wide leading-8 p-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since </h4>
                        <button className="text-base p-3 ml-2 shadow rounded-md border text-white bg-[#03256C] ">
                            <Link to="/AllBlogs">Now Blogger</Link>
                        </button>
                    </div>
                    <div className="lg:w-[60%]">
                        <img className="lg:w-[84%] mx-auto" src={navHome} alt="blogs profile" />
                    </div>

                </div>
            </div>

            <div>
            <Trendings blogs={trending}/>   
            <Blogs blogs={blogs} user={user}/>

            </div>
            <ClientMap/>
        </>
    )
}

export default Home