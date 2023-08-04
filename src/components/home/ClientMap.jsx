import clientMaps from "../../assets/map.png"
const ClientMap = () => {
    return (
        <div className="mt-10 p-10  text-[#03256C] bg-white" data-aos="fade-up">
            <div className="flex flex-col justify-center items-center gap-3">
                <div className=" text-center lg:w-7/12">
                    <h1 className='text-3xl lg:text-7xl p-2 leading-10 text-center tracking-tighter'>Join the biggest Community of learning</h1>
                    <p className='text-base tracking-tighter leading-10 text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro fuga similique repudiandae placeat expedita, ab vero sapiente aperiam consequatur molestias asperiores? Ab asperiores expedita,</p>
                </div>
                <div>
                    <img src={clientMaps} alt="map profiles" />
                </div>
            </div>
        </div>
    )
}

export default ClientMap