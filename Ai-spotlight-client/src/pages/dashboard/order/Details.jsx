import { Grid } from '@mui/material';
import { useState } from 'react';
import UpdateSelector from './UpdateSelector';

const Details = ({ data,setStatus}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [value, setOnClickValue] = useState(false);
 

  const handleOnClose = () => {
    setOpenDelete(false);
  };

  const handleOnDelete = (e) => {
    setOpenDelete(true);
  }; 

  return (
    <> 

      <div className="p-6">
        <div className=" ">
          <Grid className="pb-5" spacing={2} container>
            <Grid item xs={12} md={4} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Package Name
              </p>
              <p className="review_title">
                {data?.packages?.name}
              </p>
            </Grid>
            <Grid item xs={12} md={2} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Price
              </p>
              <p className="review_title">
                {data?.packages?.price}
              </p>
            </Grid>
            <Grid item xs={12} md={2} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Payment
              </p>
              <p className="review_title">
                {data?.payment}
              </p>
            </Grid>
            <Grid item xs={12} md={2} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Invoice Date
              </p>
              <p className="review_title">
                {data?.i_date}
              </p>
            </Grid>
            <Grid item xs={12} md={2} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Payment Status
              </p>
              {/* <p className="review_title">
                {data?.status}
              </p> */}
              <UpdateSelector
                  setStatus={setStatus}
                  id={data?._id}
                  type="status"
                  order={data}
                  colorB={
                    (data?.status === 'Pending' && '#dd8e17') ||
                    (data?.status === 'Compted' && 'blueviolet') ||
                    (data?.status === 'Processing' && 'Green')
                  }
                />
            </Grid>

            <Grid item xs={12} md={4} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Tools Name
              </p>
              <a target="_blank" href={`${data?.checkout_details?.toolurl}`} >{data?.payment_details?.tool_name}</a>
            </Grid>

            <Grid item xs={12} md={4} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Company Name
              </p>
              <p className="review_title">
                {data?.payment_details?.company_name}
              </p>
            </Grid>

            <Grid item xs={12} md={4} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Company Email
              </p>
              <p className="review_title">
                {data?.payment_details?.company_email}
              </p>
            </Grid>

            <Grid item xs={12} md={4} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Checkout Name
              </p>
              <p className="review_title">
                {data?.checkout_details?.firstname} {data?.checkout_details?.lastname}
              </p>
            </Grid>

            <Grid item xs={12} md={4} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Checkout Phone
              </p>
              <p className="review_title">
                {data?.checkout_details?.phone}
              </p>
            </Grid>

            <Grid item xs={12} md={4} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Checkout Email
              </p>
              <p className="review_title">
                {data?.checkout_details?.email}
              </p>
            </Grid>

            <Grid item xs={12} md={12} sx={{ mt: 2, padding: '0' }}>
              <p className=" font-bold">
                Provide Assets (recommended)
              </p>
              <p className="review_title">
                {data?.checkout_details?.assets ? data.checkout_details?.assets : "No Provide!"}
              </p>
            </Grid> 
          </Grid>

          </div> 
      </div>
    </>
  );
};

export default Details;