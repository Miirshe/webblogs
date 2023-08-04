const Comments = ({ userComments, user }) => {
    console.log("haye comment ", userComments)
    console.log("haye user ", user)
    return (
        <div>
            {
                userComments?.map(val => {
                    return (

                        <div className="flex flex-col justify-start items-start gap-3 space-y-3 p-3" key={val?.id}>
                            {
                                user?.uid === val?.userId && val?.id  && (
                                    <>
                                        <div className="flex flex-row justify-start items-center gap-2">
                                            <img className="rounded-[100%] w-16" src={val?.photoUrl} alt="profile author" />
                                            <div className="mb-4">
                                                <p>{val?.author}</p>
                                                <p>{val?.timestemp.toDate().toDateString()}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>
                                                {val?.comments}
                                            </p>
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Comments