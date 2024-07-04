import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderTable from "../../components/OrderTable";
import { baseUrl } from "../../config/Url";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";

const UserOrder = () => {
  const [axiosSecure] = useAxiosSecure(); 
  const [isLoading, setLoading] = useState(true);
          
  const [orders, setOrders] = useState();
  const navigate = useNavigate()   
  
  const { user } = useContext(AuthContext); 

  useEffect(() => {
    const orderDataApi = async () => {
      try {
        const apiUrl = `${baseUrl}/api/v1/order/user/${user?.uid}`; 
        const response = await axiosSecure.get(apiUrl);
        const { order, status } = response?.data;  
        if (status === 'success') {
          setOrders(order);
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
      
  }, [  navigate]);
 

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
          {orders && orders?.map((item, index) => (
            <OrderTable
              route="user"
              key={item?._id}
              item={item}
              index={index}
              
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default UserOrder;
