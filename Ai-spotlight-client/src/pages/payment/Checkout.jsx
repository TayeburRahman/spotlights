import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Container } from "@mui/system";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import FromCheckout from './from';
import './index.css';

const Checkout = () => {
  return (
    <Fragment>
      <Container>
      <div className='mb-5 mt-5'>
         <Link to="/">Home</Link> <KeyboardArrowRightIcon/>   Verified Listing
      </div>
      <div className='mt-5'>
        <h2 className='h2- pb-5'>Get Your AI Tool Verified ($247)</h2>
        <p className='p- pt-5'>Futurepedia is the #1 AI tools database and resource for professionals adopting AI.</p>
        <p className='p- pt-5 pb-5'>We charge a one-time fee of $247 to perform the research needed to verify that your tool meets our editorial and quality guidelines. If accepted, your listing will be awarded:</p>

        <ul className='ul-'>
          <li className='p- okay '>Verified check mark - This enhances credibility among our users who are looking for tools whose features have been verified by our editorial team.</li>
          <li className='p- pt-1'>Enhanced listing pages - This can include a video, several FAQs, and search engine indexing.</li>
          <li className='p- pt-1'>Eligible for additional sponsorships. We only allow verified tools to sponsor in our newsletter, website, YouTube channel, social channels, editorial content, and custom collaborations.</li>
          <li className='p- pt-1'>Eligible for free placements - Examples include our deals page, our AI website chatbot helper, and our personalized recommendations engine.</li>
        </ul>
        <p className='p- pt-5 '><strong>Note:</strong> Our most popular listing is the Enhanced Listing, which guarantees 1,000 clicks to your site.</p>
        <p className='p- pt-5 pb-5'><strong>Refund Policy:</strong> If our editorial team denies your Verified listing submission for any reason, you will promptly receive a full refund.</p>
      </div>
      <FromCheckout />
      </Container> 
      
    </Fragment>
  );
};

export default Checkout;
