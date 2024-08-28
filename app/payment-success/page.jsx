"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CiCircleCheck } from "react-icons/ci";
import Confetti from 'react-confetti';

const PaymentSuccessPage = () => {
  const [confettiVisible, setConfettiVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setConfettiVisible(false);
    }, 100000);
  }, []);

  // Get the window dimensions
  const { innerWidth: width, innerHeight: height } = window;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      {confettiVisible && <Confetti width={width} height={height} className='animate-pulse'/>}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-teal-400 rounded-full flex items-center justify-center mb-4 ">
            <CiCircleCheck className="w-10 h-10 text-white animate-ping" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Payment Successful</h2>
          <p className="text-center mb-6">
            Thank you for your payment. Your order is being processed and you
            will receive a confirmation email shortly.
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Amount:</span>
            <span className="font-semibold">$00.00</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-semibold">1234</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-semibold">EDC123456789</span>
          </div>
        </div>
        <div className="flex justify-between">
          <Link href="/">
            <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 cursor-pointer">
              Return to Homepage
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
