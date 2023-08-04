import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const Trendings = ({ blogs }) => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    return (
        <div className="lg:w-10/12 lg:mx-auto">
            <h1 className="ml-2 text-xl text-[#03256C] mt-2">Trending Blogs</h1>
            <hr className="w-8/12 mt-2" />

            <div className="lg:w-11/12 mt-5 flex flex-row justify-start items-center gap-1 ml-2 lg:ml-3 lg:mx-auto">
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    // autoPlay={this.props?.deviceType !== "mobile" ? true : false}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    // deviceType={this.props.deviceType}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    className="w-[100%]"
                >
                    {
                        blogs.map(items => {
                            return (
                                <div className="border rounded-md shadow-sm lg:w-64 relative pb-2" key={items?.id}>
                                    <img className="w-[98%] h-48 lg:w-72 rounded mb-8" src={items?.imgUrl} alt="" />
                                    <div className="flex flex-row justify-start items-start gap-2 p-1 mt-[-30px]">
                                        <img className="rounded-[100%] w-14 h-14" src={items?.photoUrl} alt="profile author" />
                                        <div>
                                            <p>{items?.author}</p>
                                            <p>{items?.timestemp.toDate().toDateString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default Trendings