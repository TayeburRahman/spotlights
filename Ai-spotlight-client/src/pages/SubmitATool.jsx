import React from 'react'

const SubmitATool = () => {
    return (
        <div className=''>
            {/* component */}
            <section className="dark:bg-slate-50 bg-black">
                <div className="container px-6 py-20 mx-auto">
                    <div className="mx-auto max-w-screen-md text-center mb-14 lg:mb-12">
                        <h2 className="mb-4 text-7xl max-md:text-5xl md:text-1xl tracking-tight font-extrabold dark:text-gray-900 text-white">Designed for business teams like yours</h2>
                        {/* <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p> */}
                    </div>
                    <div className="sm:flex sm:items-center sm:justify-between border-gray-400 border-2 rounded-xl p-7">

                        <div>
                            <h2 className="text-3xl font-bold dark:text-gray-800 text-gray-100">Simple, transparent pricing</h2>
                            <p className="mt-4 dark:text-gray-500 text-gray-400">No Contracts. No surorise fees.</p>
                        </div>
                        <div className="overflow-hidden p-0.5 mt-6 border rounded-lg dark:border-gray-700">
                            <div className="sm:-mx-0.5 flex">
                                <button className=" focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 text-white bg-blue-500 rounded-lg">Monthly</button>
                                {/* <button className=" focus:outline-none px-3 w-1/2 sm:w-auto py-1 sm:mx-0.5 dark:text-gray-800 text-gray-200 hover:bg-gray-700 bg-transparent rounded-lg dark:hover:bg-gray-200">Yearly</button> */}
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-sm:p-7">
                        <div className="px-6 py-4 transition-colors duration-200 transform dark:border-gray-300 border-gray-800 border-[1px] rounded-lg dark:hover:bg-gray-200 hover:bg-gray-700">
                            <p className="text-lg font-medium dark:text-gray-800 text-gray-100">Intro</p>
                            <h4 className="mt-2 text-4xl font-semibold dark:text-gray-800 text-gray-100">$247 <span className="text-base font-normal dark:text-gray-600 text-gray-400">/ Month</span></h4>
                            <p className="mt-4 dark:text-gray-500 text-gray-300">For most businesses that want to optimaize Verified Listing.</p>
                            <div className="mt-8 space-y-8">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Verified check mark</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Featured video</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Case studies</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">FAQ Section</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Published within 7 days</span>
                                </div>
                            </div>
                            <button className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Choose plan
                            </button>
                        </div>
                        <div className="px-6 py-4 transition-colors duration-200 transform dark:border-gray-300 border-gray-800 border-[1px] rounded-lg dark:hover:bg-gray-200 hover:bg-gray-700">
                            <p className="text-lg font-medium dark:text-gray-800 text-gray-100">Base</p>
                            <h4 className="mt-2 text-4xl font-semibold dark:text-gray-800 text-gray-100">$497 <span className="text-base font-normal dark:text-gray-600 text-gray-400">/ Month</span></h4>
                            <p className="mt-4 dark:text-gray-500 text-gray-300">For most businesses that want to optimaize web queries.</p>
                            <div className="mt-8 space-y-8">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Verified check mark</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Featured video</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Case studies</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">FAQ Section</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Published within 7 days</span>
                                </div>
                            </div>
                            <button className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Choose plan
                            </button>
                        </div>
                        <div className="px-6 py-4 transition-colors duration-200 transform dark:border-gray-300 border-gray-800 border-[1px] bg-gray-900 rounded-lg dark:bg-gray-900">
                            <p className="text-lg font-medium rounded w-fit px-7 text-center bg-green-600 text-white">Popular</p>
                            <h4 className="mt-2 text-4xl font-semibold text-gray-100">$799 <span className="text-base font-normal text-gray-400">/ Month</span></h4>
                            <p className="mt-4 text-gray-300">For most businesses that want to optimaize web queries.</p>
                            <div className="mt-8 space-y-8">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4  text-gray-300">Verified check mark</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4  text-gray-300">Featured video</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4  text-gray-300">Case studies</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4  text-gray-300">FAQ Section</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4  text-gray-300">Published within 7 days</span>
                                </div>
                            </div>
                            <button className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Choose plan
                            </button>
                        </div>
                        <div className="px-6 py-4 transition-colors duration-200 transform dark:border-gray-300 border-gray-800 border-[1px] rounded-lg dark:hover:bg-gray-300 hover:bg-gray-700">
                            <p className="text-lg font-medium dark:text-gray-800 text-gray-100">Exterprise</p>
                            <h4 className="mt-2 text-4xl font-semibold dark:text-gray-800 text-gray-100">Custom Pricing <span className="text-base font-normal dark:text-gray-600 text-gray-400">/ Month</span></h4>
                            <p className="mt-4 dark:text-gray-500 text-gray-300">For most businesses that want to optimaize web queries.</p>
                            <div className="mt-8 space-y-8">
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Verified check mark</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Featured video</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Case studies</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">FAQ Section</span>
                                </div>
                                <div className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="mx-4 dark:text-gray-700 text-gray-300">Published within 7 days</span>
                                </div>
                            </div>
                            <button className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Choose plan
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default SubmitATool