import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import Comments from "../comments/Comments";
export const Detail = ({ user }) => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  useEffect(() => {
    id && getData();
  }, [id])
  const getData = async () => {
    const OneDetail = doc(db, "blogs", id);
    const getDetail = await getDoc(OneDetail);
    setDetail(getDetail.data());
  }
  const initialState = {
    comment :''
  }
  const [comments , setComments ] = useState(initialState);
  const StoreComment = async (e)=>{
    e.preventDefault();
    console.log('hey',comments)
      try {
        await addDoc(collection(db, "comments"), {
          comments,
          timestemp: serverTimestamp(),
          author: user?.displayName,
          userId: user?.uid,
          photoUrl: user?.photoURL
        })
        toast.success("comments Created Successfully.")
      } catch (err) {
        console.log("error", err)
      }
  }
  const [userComments , GetComments] = useState([]);
  useEffect(() => {
    const getData = onSnapshot(
        collection(db, "comments"),
        (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            GetComments(list)
        }, (error) => {
            console.log(error);
        }
    )

    return () => {
        getData();
    }
}, [])
  return (
    <div className="mt-20">
          <div className="p-10 bg-[#03256C] text-white object-center h-72" style={{ backgroundImage: `url(${detail?.imgUrl})`}}>
          <div className=" p-4">
            <div className="p-3">
              <h1 className="text-4xl tracking-tighter text-center">Details</h1>
            </div>
            <span className="flex justify-center items-center space-x-4">
              <Link to="/" className="text-xl">Home</Link> <small>/</small> <span className="text-lg">Detail</span>
            </span>
          </div>

        </div>
      <div className="flex flex-col justify-start gap-4 p-2 lg:mx-auto lg:w-[85%]">
        <div className="flex flex-row justify-start items-center gap-2">
          <img className="rounded-[100%] w-16" src={detail?.photoUrl} alt="profile author" />
          <div>
            <p>{detail?.author}</p>
            <p>{detail?.timestemp.toDate().toDateString()}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3>{detail?.category}</h3>
          <h4>{detail?.title}</h4>
          <p className="text-base leading-7 tracking-wide">{detail?.description}</p>
        </div>
      </div>
      <div className="border-2 rounded-md shadow lg:w-[50%] lg:ml-[8%] mt-5 p-3 border-slate-200 space-y-3">
      <Comments userComments= {userComments} user={user}/>
        <form onSubmit={StoreComment}  className="flex flex-col gap-2 justify-start items-start mx-auto space-y-3">
        {/* <hr className="border-2 border-[#03256C]"/> */}
          <textarea name="comment" id="" cols="20" rows="5" placeholder="Enter Your Comment" className="w-[90%] p-4 rounded border-2  border-[#03256C]" onChange={(e)=>setComments(e.target.value)}></textarea>
          <button className="w-[30%] p-3 rounded bg-[#03256C] text-white">Submit</button>
        </form>
      </div>
    </div>
  )
}
