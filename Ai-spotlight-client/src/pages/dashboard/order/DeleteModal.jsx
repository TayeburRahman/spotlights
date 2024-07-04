import axios from 'axios';
import React, { useState } from 'react';
import useToast from '../../../hooks/useToast';

 

const DeleteModal  = ({
  isDelete,
  onCloseDelete,
  status,
  dValue, 
  setReqStatus,
  orderId
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { displayToast } = useToast();
  const closeModal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onCloseDelete();
      setIsTransitioning(false);
    }, 300); // Adjust the transition duration as needed
  }; 
  const deleteOnHandel = async () => {
  
    try {
      const apiUrl = `https://ai-spotlights.com/api/v1/publication/delete/${orderId}/${dValue._id}`;
      const apiUrl2 = `https://ai-spotlights.com/api/v1/order/delete/${dValue._id}`;

      const response = await axios.delete(
        status === 'order' ? apiUrl2 : apiUrl,
      );

      if (response.data.status === 'success') {
        setReqStatus((e) => !e);
        displayToast({
          status: 'success',
          message: 'Publication delete successfully!',
        });
        closeModal(); // Close modal on successful submission
      } else {
        displayToast({
          status: 'error',
          message: 'There is something wrong! Please try again.',
        });
      }
    } catch (error) {
      console.error('Submission error:', error.response?.data || error.message);
      displayToast({
        status: 'error',
        message:
          'An error occurred while processing your request. Please try again later.',
      });
    }
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full transition-opacity ${
          isDelete ? 'block' : 'hidden'
        } ${isTransitioning ? 'duration-300' : ''}`}
        onClick={closeModal}
        style={{ opacity: '0.2', backgroundColor: 'rgb(0 0 0 / 31%)' }}
      ></div>

      {/* Modal dialog */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark p-6 rounded-md shadow-lg transition-all ${
          isDelete ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${isTransitioning ? 'duration-300' : ''}`}
        style={{   background: 'black' }}
      >
        <div className="flex justify-between mb-5">
          <h2 className="text-xl font-bold mb-4">
            {/* {status === ' ' ? ' ' : ' '} */}
          </h2>
          <button
            className="px-4 py-2 font-bold text-white rounded-md bg-gray-500 transition-colors rounded"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <h6 className="mb-5">
          Are you sure! you want to delete{' '}
          <span className="font-bold">{status==='order'? dValue?.payment_details.tool_name : dValue.news_name}</span>
        </h6>

        <div className="flex justify-between">
          <button
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-700 text-white transition-colors"
            onClick={deleteOnHandel}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;