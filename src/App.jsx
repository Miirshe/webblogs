import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Footer from "./components/footer/Footer"
import Login from "./author/Login"
import Register from "./author/Register"
import Contact from "./components/contact/Contact"
import About from "./components/about/About"
import Header from "./components/header/Header"
import AddEditPost from "./components/endpoints/AddEditPost"
import { Detail } from "./components/details/Detail"
import Home from "./components/home/Home"
import { useEffect, useState } from "react"
import { auth, db } from "./firebase/config"
import AllBlogs from "./components/allblog/AllBlogs"
import { collection, onSnapshot } from "firebase/firestore"

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
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
          getData();
      }
  }, [])
  return (
    <>
      <ToastContainer position="top-center"/>
      <Header />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/AllBlogs" element={<AllBlogs blogs={blogs} user={user} />} />
        <Route path="/AddEditPost" element={<AddEditPost/>} />
        <Route path="/UpdatePost/:id" element={<AddEditPost/>} />
        <Route path="/Detail/:id" element={<Detail user={user}/>} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App


// #213547
