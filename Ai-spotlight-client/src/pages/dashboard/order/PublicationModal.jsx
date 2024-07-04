import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useToast from '../../../hooks/useToast';

 

const PublicationModal = ({
  isOpen,
  onClose,
  status,
  uValue,
  userData,
  setReqStatus,
  orderId
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const { displayToast } = useToast();

  const onSubmit = async (data) => {
    console.log(data);
    console.log("userData",userData, data)
    try {
      const apiUrl = `https://ai-spotlights.com/api/v1/publication/add_new/${orderId}`;
      const apiUrl2 = `https://ai-spotlights.com/api/v1/publication/update/${orderId}/${uValue?._id}`;

      const response = await axios.post(
        status === 'Update' ? apiUrl2 : apiUrl,
        {
          user: userData,
          publication: data,
        },
      );

      // console.log('response.data', response.data);

      if (response.data.status === 'success') {
        setReqStatus((ra) => !ra);
        displayToast({
          status: 'success',
          message: `Publication ${status} Successfully!`,
        });
        onClose(); // Close modal on successful submission
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

  const closeModal = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onClose();
      setIsTransitioning(false);
    }, 300); // Adjust the transition duration as needed
  };

  return (
    <>
      {/* Background overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full transition-opacity ${
          isOpen ? 'block' : 'hidden'
        } ${isTransitioning ? 'duration-300' : ''}`}
        onClick={closeModal}
        style={{ opacity: '0.2',   }}
      ></div>

      {/* Modal dialog */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black p-6 rounded-md shadow-lg transition-all ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${isTransitioning ? 'duration-300' : ''}`}
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">
            {status === 'Update' ? 'Update' : 'Add a new link'}
          </h2>
          <button
           className="px-4 py-2 font-bold text-white rounded-md bg-gray-500 transition-colors rounded"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        
          <div className="flex">
            <div className="mb-3 me-2">
              <label htmlFor="site_link" className="block">
                News Name
              </label>
              <input
                id="site_link"
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="text"
                defaultValue={uValue ? uValue.news_name : ''}
                required
                {...register('news_name')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="site_link" className="block">
                News Sites Link
              </label>
              <input
                id="site_link"
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="text"
                defaultValue={uValue ? uValue.news_link : ''}
                required
                {...register('news_link')}
              />
            </div>
          </div>

           <div className="mb-3 me-2">
          <label htmlFor="moz_rank" className="block">
                Site Image
              </label>
              <input
                id="site_image"
                type="text"
                required
                defaultValue={uValue ? uValue.site_image : ''}
                   className="border-solid border-2 border-blue-600 rounded h-10 ps-2 w-full text-black"
                {...register('site_image')}
              />
            </div>  

          <div className="flex">
            <div className="mb-3 me-2">
              <label htmlFor="site_link" className="block">
                AUTHORITY
              </label>
              <input
                id="site_link"
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="number"
                defaultValue={uValue ? uValue.authority : ''}
                required
                {...register('authority')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="authority_link" className="block">
                AUTHORITY Link
              </label>
              <input
                id="authority_link"
                type="text"
                required
                defaultValue={uValue ? uValue.authority_link : ''}
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                {...register('authority_link')}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mb-3 me-2">
              <label htmlFor="moz_rank" className="block">
                MOZ RANK
              </label>
              <input
                id="moz_rank"
                required
                defaultValue={uValue ? uValue.moz_rank : ''}
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="number"
                {...register('moz_rank')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="moz_rank_link" className="block">
                MOZ RANK Link
              </label>
              <input
                id="moz_rank_link"
                required
                defaultValue={uValue ? uValue.moz_rank_link : ''}
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="text"
                {...register('moz_rank_link')}
              />
            </div>
          </div>

          <div className="flex">
            <div className="mb-3 me-2">
              <label htmlFor="global_rank" className="block">
                GLOBAL RANK
              </label>
              <input
                id="global_rank"
                required
                defaultValue={uValue ? uValue.global_rank : ''}
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="number"
                {...register('global_rank')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="global_rank_link" className="block">
                GLOBAL RANK Link
              </label>
              <input
                id="global_rank_link"
                required
                defaultValue={uValue ? uValue.global_rank_link : ''}
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="text"
                {...register('global_rank_link')}
              />
            </div>
          </div>
          <div className="flex">
            <div className="mb-3 me-2">
              <label htmlFor="social" className="block">
                SOCIAL
              </label>
              <input
                id="social"
                required
                defaultValue={uValue ? uValue.social : ''}
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="number"
                {...register('social')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="social_link" className="block">
                SOCIAL Link
              </label>
              <input
                id="social_link"
                required
                defaultValue={uValue ? uValue.social_link : ''}
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="text"
                {...register('social_link')}
              />
            </div>
          </div>

          <div className="flex">
            <div className="mb-3 me-2">
              <label htmlFor="traffic" className="block">
                TRAFFIC
              </label>
              <input
                id="traffic"
                required
                defaultValue={uValue ? uValue.traffic : ''}
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="number"
                {...register('traffic')}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="traffic_link" className="block">
                TRAFFIC Link
              </label>
              <input
                id="traffic_link"
                required
                defaultValue={uValue ? uValue.traffic_link : ''}
                className="border-solid border-2 border-blue-600 rounded h-10 ps-2 text-black"
                type="text"
                {...register('traffic_link')}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              className="border-solid border-2 border-blue-600 rounded px-4 py-2 bg-blue-600 text-white"
              type="submit"
            >
              {status}
            </button>

            {/* <input
              type="submit"
              value={status}
              className="border-solid border-2 border-blue-600 rounded px-4 py-2 bg-blue-600 text-white"
            /> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default PublicationModal;