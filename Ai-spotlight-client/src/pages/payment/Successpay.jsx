import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useToast from '../../hooks/useToast';
 
export default function SuccessPayment() {
  const { id } = useParams();

  const { displayToast } = useToast();

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await axios.post(
          `https://ai-spotlights.com/api/v1/order/payment/${id}/user`,
        ); 
        const { result } = response.data;   
      } catch (error) {
        // setLoading(false);
      }
    };

    postData();
  }, [id]);
  const navigation = useNavigate();
  return (
    <div className='success_main'>
      <div class="success_card bg-gray-900  dark:bg-white">
      <div className='' style={{borderRadius:"150px", height:"150px", width:"150px",margin:"0 auto"}}>
        <i class="checkmark success_i">✓</i>
      </div>
        <h1 className='success_h1'>Success</h1> 
        <p className='success_p'>We received your payment;  we'll be in touch shortly!</p>
        <button class="button-70" role="button" onClick={e=> navigation("/dashboard")}>Go back your Profile</button>
      </div>
    </div>
  );
}