import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config/Url";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Publication from "./Publication";
import Details from "./order/Details";

const UserOrderDetails = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();

    const { isLoading, error, data,  refetch } = useQuery({
      queryKey: ["manageUsers"],
      queryFn: () => axiosSecure.get(`${baseUrl}/api/v1/order/details/${id}`).then((res) => res.data.data),
    });
   
    console.log("data",data)
  
    if (isLoading)
      return (
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      );
      
    if (error)
      return (
        <div className="flex items-center justify-center min-h-screen">
          Error: {error.message}
        </div>
      );
   
    return (
        <main className="min-h-[calc(100vh-66px)] overflow-x-scroll lg:overflow-hidden">
            <Details data={data}/>
            <div>  
            </div>
            <Publication mType="user" order={data}/>
        </main>


    )
}

export default UserOrderDetails;