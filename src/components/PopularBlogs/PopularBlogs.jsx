import { Link } from "react-router-dom"
export const PopularBlogs = ({ blogs }) => {
    return (
        <div className="lg:ml-10">
            <h1 className="text-xl text-[#03256C]">Most Popular Blogs </h1>
            <div className='flex flex-col justify-start items-start gap-3 mt-5'>
                {
                    blogs?.map(items => {
                        return (
                            <Link to={`/Detail/${items?.id}`} className="flex flex-row justify-start items-start cursor-pointer " key={items?.id}>
                                <img className=" w-40 h-36 rounded-lg" src={items?.imgUrl} alt="" />
                                <div className="space-y-3 ml-5 mb-14">
                                    <p>{items?.author}</p>
                                    <p>{items?.timestemp.toDate().toDateString()}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
