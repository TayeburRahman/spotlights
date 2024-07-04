import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../config/Url";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Publication from "./Publication";
import Details from "./order/Details";

const OrderDetails = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure(); 
    const [data , setData] = useState()
    const [error , setError] = useState()
    const [isLoading , setLoading] = useState()
    const [status, setStatus] = useState(false); 

    useEffect(() => {
      const postData = async () => {
        setLoading(true);
        try {
          const response = await axiosSecure.get(`${baseUrl}/api/v1/order/details/${id}`)
          const { data } = response.data;  
          if(data){
            setData(data) 
          } else {
            setError(true)
          } 
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(true)
        }
      }; 
      postData();
    }, [status]);
  
    // if (isLoading)
    //   return (
    //     <div className="flex items-center justify-center min-h-screen">
    //       Loading...
    //     </div>
    //   );
      
    if (error)
      return (
        <div className="flex items-center justify-center min-h-screen">
          Error: {error.message}
        </div>
      );
   
    return (
        <main className="min-h-[calc(100vh-66px)] overflow-x-scroll lg:overflow-hidden">
            <Details  data={data} setStatus={setStatus} />
            <div>  
            </div>
            <Publication mType="admin"  />
        </main>


    )
}

export default OrderDetails;