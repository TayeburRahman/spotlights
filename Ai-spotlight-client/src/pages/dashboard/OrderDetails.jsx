const OrderDetails = () => {
   
    return (
        <main className="min-h-[calc(100vh-66px)] overflow-x-scroll lg:overflow-hidden">
            <div>

                <table className="w-full">
                    <thead>
                        <tr className="text-left shadow-lg rounded">
                            <th>Id</th>
                            <th>User Name</th>
                            <th>Users Email</th>
                            <th>Invoice Date</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="my-5">
                    {/* <tr className="text-left">
                        <td>{index + 1}</td>
                        <td className="flex items-center gap-4">
                            <img
                                className="rounded-full h-10 w-10 object-cover"
                                src={item?.userImage}
                                alt={item?.userName}
                            />
                            <strong className="capitalize">{item?.userName}</strong>
                        </td>
                        <td>{item?.userEmail}</td>
                        <td>{item?.invoice_date}</td>
                        <td className="capitalize">{item?.role}</td>
                        <td>
                            <Button
                                size="small"
                                colors="transparent"
                            >
                                Go Publication
                            </Button>
                        </td>
                    </tr> */}
                    </tbody>
                </table> 
            </div>
        </main>


    )
}

export default OrderDetails;