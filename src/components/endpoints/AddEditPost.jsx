import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../../firebase/config";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import profile3 from "../../assets/profile3.png";
import { toast } from "react-toastify";
const initialState = {
  title: '',
  trendings: 'no',
  category: '',
  content: '',
  description: ''
}
const categories = [
  "Technology",
  "Sports",
  "Food",
  "Business"
]
const AddEditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    })
  }, [])
  useEffect(() => {
    id && getBlogDetail();
  }, [id])
  const getBlogDetail = async () => {
    try {
      const dataRef = doc(db, "blogs", id);
      const snapshot = await getDoc(dataRef);
      if (snapshot.exists()) {
        setPost({ ...snapshot.data() });
      }

    } catch (error) {
      console.log(error);
    }
  }
  console.log("hi miirshe", user);
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
            toast.success("Image Successfully Storage into the Firestorage .")
            setPost((prev) => ({ ...prev, imgUrl: downloadUrl }))

          })
        })
    }
    file && uploadFile();
  }, [file])
  const { title, trendings, category, description, content } = post
  const handleChnage = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  }
  const handletrendings = (e) => {
    setPost({ ...post, trendings: e.target.value })
  }
  const handleCategory = (e) => {
    setPost({ ...post, category: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(post);
    if (categories && title && trendings && content && description) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...post,
            timestemp: serverTimestamp(),
            author: user?.displayName,
            userId: user?.uid,
            photoUrl: user?.photoURL
          })
          toast.success("Blog Created Successfully.")
        } catch (err) {
          console.log("error", err)
        }

      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...post,
            timestemp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
            photoUrl: user.photoURL
          })
          toast.success("Blog Updated Successfully.")
        } catch (err) {
          console.log("error", err)
        }
      }

    } else {
      toast.success("Look for your input fields data.")
    }

    navigate("/");

  }

  return (
    // parent div controlls all sub Children div , form , input and etc
    <div className="mt-20">
      {/* another sub parent  */}
      <div>

        <div className="mt-16 p-10 bg-[#03256C] text-white">
          <div className=" p-4">
            <div className="p-3">
              <h1 className="text-4xl tracking-widest text-center">Post Now</h1>
            </div>
            <span className="flex justify-center items-center space-x-4">
              <Link to="/" className="text-xl">Home</Link> <small>/</small> <span className="text-lg">{id ? 'Update Post' : 'Add Post'}</span>
            </span>
          </div>

        </div>
        <div className="mt-10 lg:w-9/12 shadow rounded grid grid-cols-1 lg:grid-cols-2  gap-3 lg:mx-auto">

          <div>
            <img src={profile3} alt="profile post " />
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2 lg:mx-auto  p-3">
              <input className="shadow rounded text-base p-3 w-full " type="text"
                placeholder="enter title "
                name="title" value={title}
                onChange={handleChnage} />
              {/* radio button */}
              <div className="flex flex-row justify-start items-center gap-3">
                <p>it`s trending blogs </p>
                <input type="radio"
                  name="radioOptions" value="yes"
                  onChange={handletrendings}
                  checked={trendings === "yes"} />
                <label htmlFor="radioOptions">Yes &nbsp; </label>
                <input type="radio" name="radioOptions"
                  value="no" onChange={handletrendings}
                  checked={trendings === "no"} />
                <label htmlFor="radioOptions">No &nbsp; </label>
              </div>

              {/* categories drop down list select options */}
              <select className="shadow rounded text-base p-3 w-full" value={category} onChange={handleCategory}>
                <option value="">--select category--</option>
                {
                  categories.map((items, index) => {
                    return <option key={index}>{items || " "}</option>
                  })
                }
              </select>

              <textarea name="content" value={content} placeholder="enter contents"
                id="" cols="3" rows="3" onChange={handleChnage} className="shadow rounded text-base p-3 w-full border">
              </textarea>

              <textarea name="description" value={description} placeholder="enter description"
                id="" cols="8" rows="8" onChange={handleChnage} className="shadow rounded text-base p-3 w-full border">
              </textarea>

              <input className="shadow rounded text-base p-3 w-full border" type="file"
                onChange={(e) => setFile(e.target.files[0])} />

              <button className="shadow rounded  bg-[#03256C] text-white text-base p-3 w-full border" type="submit" disabled={progress !== null && progress < 100}>{id ? 'Update Post' : 'submit'}</button>

            </form>
          </div>


        </div>

      </div>

    </div>
  )
}

export default AddEditPost