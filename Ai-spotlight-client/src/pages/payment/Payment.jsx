import { Grid } from '@mui/material';
import { Box, Container } from '@mui/system';
import axios from 'axios';
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { baseUrl } from '../../config/Url';
import useToast from '../../hooks/useToast';
import './index.css';
import stripeImg from './stripe.png';

const Payment = () => {
  const [isCouponState, setCouponState] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isCheckout, setCheckout] = useState();
  const [isPackages, setPackages] = useState();
  const [isPrice, setPrice] = useState();
  const [isUser, setUser] = useState();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const {displayToast} = useToast(); 

  const [discount, setDiscount] = useState({
    disc: false,
    match: false,
  });

  const couponCode = 'specialdiscount10';
  const discountPercentage = 10; 

  React.useEffect(() => {
    try {
      const localOder = localStorage?.getItem('order');
      if (localOder) {
        const { checkout_details, packages, user} = JSON.parse(localOder);
        if (
          checkout_details ||
          packages?.package_name  || user
        ) {
          setCheckout(checkout_details);
          setPackages(packages?.package_name); 
          setPrice(packages?.package_name?.price)
          setUser(user)
        } else {
          navigate('/order/checkout');
        }
      }
    } catch (error) {
      console.error('Error retrieving user from local storage:', error);
    }
  }, []);


  const handleCouponApply = () => {
    if (coupon === couponCode) {
      if (!discount.disc) {
        const discountAmount =
        isPackages?.price - (Number(isPackages?.price ) * Number(discountPercentage)) / 100; 

        setPrice(discountAmount)
        setDiscount((data) => ({
          ...data,
          disc: true,
          match: false,
        }));
      }
      return;
    } else { 
      setPrice(isPackages?.price)
      setDiscount((data) => ({
        ...data,
        disc: false,
        match: true,
      }));
    }
    // setDiscount()
  };

  const handleOnPayment = async () => {


    setLoading(true);


    try {
      const response = await axios.post(
        'https://fameflownetwork-server.vercel.app/api/v1/payment/oder',
        { formData },
      );

      if (response.status !== 200) {
        setLoading(false);
        displayToast({
          status: 'error',
          message: 'Something wrong. Please try again',
        });
        return;
      }

      if (response?.data?.session.url) {
        window.location.href = response.data.session.url;
        localStorage.removeItem('order');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      displayToast({
        status: 'error',
        message: 'Server Error!',
      });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const formData = {
      checkout_details: isCheckout,
      packages: isPackages,
      payment_details: data, 
      user: isUser,
    };
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/order/payment`,
        { formData },
      );

      console.log("response", response)

      if (response.status !== 200) {
        setLoading(false);
        displayToast({
          status: 'error',
          message: 'Something wrong. Please try again',
        });
        return;
      }

      if (response?.data?.session.url) {
        window.location.href = response.data.session.url;
        localStorage.removeItem('order');
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error)
      setLoading(false);
      displayToast({
        status: 'error',
        message: 'Server Error!',
      });
    }
  };
  return (
    <Container className="padding-50">
      <Grid container spacing={5} >
        <Grid item sx={12} md={6}>
          <div className='summary-box'>
            <h4 className='summary'>Summary</h4>
            <div className='border-bottom pb-4'>
              <div className='d-flex-c justify-between px-5 pt-5 pb-2'>
                <h4 className=''>Tool Submission: Verified</h4>
                <h4>${isPrice}</h4>
              </div>
              <p className='text-small px-5'>Selects and pays for verified</p>
            </div>
            <div className='border-bottom d-flex-c justify-between p-5'>
              <h4 className=''>Total (USD)</h4>
              <h4>${isPrice}</h4>
            </div>
            <div className='p-5'>
              <p className='pb-5'>Futurepedia is a popular AI tools website with over 400K+ monthly visitors and 200k members frequently looking to adopt new tools. </p>
              <p className='pb-5'>Verified listings on Futurepedia get a verified check mark, reviews enabled, enhanced listing page elements, eligibility for sponsorships, eligibility for editorial placements, and more!</p>

              <p className='pb-5'>Please note that we strictly accept AI tools only and do not allow NSFW (Not Safe for Work) tools on our website. This includes dating and romance related tools. Submissions such as AI newsletters or other directories will also be rejected.</p>
              <p className='pb-5'>In the event your tool doesn't meet our editorial policy requirements, we offer a complete refund guarantee. </p>
              <p className=' '>If you encounter any challenges, email us at contact@futurepedia.io. We're here to assist you! </p>
            </div>
          </div>

        </Grid>
        <Grid item sx={12} md={6}>  
          <div className="mt-5">  
            <Box className="d-flex-c pt-3">
              <button
                onClick={(e) => setCouponState((e) => !e)}
                className="d-flex-c upgrades"
                id="payments_coupon"
              >
                <span className="span_plus">{isCouponState ? '-' : '+'}</span>
                {isCouponState ? 'Hide' : 'Add'} Discount Coupon
              </button>

            </Box>
            {isCouponState && (
              <div className="mt-5 ">
                <div className="flex">
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="search-dropdown"
                      className="block p-3 w-full z-20 text-sm text-gray-900 outline-none bg-gray-50 rounded-e-lg rounded-s-blue-100 rounded  border border-blue-500 "
                      placeholder="Enter your coupon code here"
                      onChange={(e) => setCoupon(e.target.value)}
                      coupon={coupon}
                    />
                    <button
                      onClick={handleCouponApply}
                      type="submit"
                      className="absolute top-0 end-0 p-3 h-full text-sm font-medium text-blue-600 rounded-e-lg border border-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
                {discount.match && (
                  <p className="text-less-w text-red">
                    {' '}
                    Failed to match the coupon!
                  </p>
                )}
                {discount.disc && (
                  <p className="text-less-w text-green-500">
                    Coupon get successfully, (discount 10%)
                  </p>
                )}
              </div>
            )} 
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className='mt-4 review_order_'>Contact info</h4>
              <div className='d-grid-s'>
                <label>Company Email<span className='required'>*</span></label>
                <input className='input-filed' type='email' id={`${errors.company_email && 'border-red'}`} {...register("company_email", { required: true })} />
                {errors.company_email && <span className='required'>This field is required</span>}
              </div>

              <div className='d-grid-s'>
                <label>Company name<span className='required'>*</span></label>
                <input className='input-filed' id={`${errors.company_name && 'border-red'}`} {...register("company_name", { required: true })} />
                {errors.company_name && <span className='required'>This field is required</span>}
              </div>
              <div className='d-grid-s'>
                <label>Tool Name<span className='required'>*</span></label>
                <input className='input-filed' id={`${errors.tool_name && 'border-red'}`} {...register("tool_name", { required: true })} />
                {errors.tool_name && <span className='required'>This field is required</span>}
              </div>
              <h4 className='mt-5 review_order_'>Payment Method </h4>
              <button id="active-re" className="d-flex-c w-full writing_box pt-4 mt-5">
                <img
                  src={stripeImg}
                  style={{
                    width: '100px',
                  }}
                /> 
                <Box className="w-full"></Box>
              </button>


              <div className="mb-5 mt-2">
                <button
                  className="input-button mt-5 mb-5"
                  disabled={isLoading}
                  role="button"
                  onClick={handleOnPayment}
                >
                  {isLoading ? (
                    <p className="ps-5 pe-5 ms-5 me-5 d-flex-c">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="mr-2 animate-spin"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                      </svg>
                      loading
                    </p>
                  ) : (
                    <>
                      Continue to Payment
                      {/* <ArrowForwardIcon />{' '} */}
                    </>
                  )}
                </button>
              </div>
            </form>

 
        </div> 
        </Grid>
      </Grid>
    </Container>
  );
};

export default Payment;
