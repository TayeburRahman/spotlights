import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderTable from "../../components/OrderTable";
import { baseUrl } from "../../config/Url";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManagePublication = () => {

  const [axiosSecure] = useAxiosSecure();
  const [resStatus, setResStatus] = useState(false); 
  const [isLoading, setLoading] = useState(true);

  const [orders, setOrders] = useState();
  const navigate = useNavigate()   

  useEffect(() => {
    const orderDataApi = async () => {
      try {
        const apiUrl = `${baseUrl}/api/v1/order/get_list`; 
        const response = await axiosSecure.get(apiUrl);
        const { data, status } = response?.data;  
        if (status === 'success') {
          setOrders(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) { 
        setLoading(false);
        if (error)
          return (
            <div className="flex items-center justify-center min-h-screen">
              Error: {error.message}
            </div>
          );
      }
    };
    orderDataApi();
      
  }, [resStatus ,navigate]);
 

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    ); 
 

  return (
    <main className="min-h-[calc(100vh-66px)] overflow-x-scroll lg:overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="text-left shadow-lg rounded">
            <th>Id</th>
            <th>User Name</th>
            <th>Company Email</th>
            <th>Tools Name</th>
            <th>Invoice Date</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead> 
        <tbody className="my-5">
          {orders  && orders?.map((item, index) => (
            <OrderTable
              route="admin"
              key={item?._id}
              item={item}
              index={index}
              setResStatus={setResStatus}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ManagePublication;
