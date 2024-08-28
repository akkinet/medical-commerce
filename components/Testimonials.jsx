
'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from "react-icons/fa";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const testimonials = [
  {
    rating: 4.9,
    text: "Purchasing medical equipment from this website was a breeze! The user-friendly interface made it easy to find what I needed, and the fast checkout process was impressive. Highly recommended!",
    imgSrc: "https://pagedone.io/asset/uploads/1696229969.png",
    name: "ADITI SHAHI",
    role: "Software Developer",
  },
  {
    rating: 4.5,
    text: "This website made buying medical equipment effortless. The process was incredibly smooth, with a fast and simple checkout. Excellent service and high-quality products",
    imgSrc: "https://pagedone.io/asset/uploads/1696229994.png",
    name: "SHIVAM AWASTHI",
    role: "Full Stack Developer",
  },
  {
    rating: 4.9,
    text: "Shopping for medical equipment here was fantastic! The site is easy to navigate, the checkout process was quick, and I received my order in no time. The quality of the products is exceptional",
    imgSrc: "https://pagedone.io/asset/uploads/1696230027.png",
    name: "AKASH SHARMA",
    role: "Design Lead",
  },
  {
    rating: 4.8,
    text: "I had a fantastic experience with this website. The user-friendly design ensured a hassle-free shopping experience, and the quick delivery exceeded my expectations. Highly recommended!",
    imgSrc: "https://pagedone.io/asset/uploads/1696229969.png",
    name: "KASHISH",
    role: "Wordress Developer",
  },
  {
    rating: 4.1,
    text: "Shopping for medical equipment here was fantastic! The site is easy to navigate, the checkout process was quick, and I received my order in no time. The quality of the products is exceptional",
    imgSrc: "https://pagedone.io/asset/uploads/1696229994.png",
    name: "VERMA JI",
    role: "Product Designer",
  },
];

const Testimonials = () => {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h1 className='text-5xl font-bold mb-3 text-center'>Customer Testimonials</h1>
          <p className='text-center mb-3 text-xl'>
            Discover how our top-quality medical equipment has transformed lives. Hear firsthand experiences from our satisfied customers who trust us for their healthcare needs and unparalleled support.
          </p>
        </div>

        <Swiper
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={32}
          loop
          centeredSlides
          pagination={{ clickable: true, el: '.swiper-pagination' }}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 32 },
            768: { slidesPerView: 2, spaceBetween: 32 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="group bg-white  border-solid border-gray-300 rounded-xl p-6 transition-all duration-500 mx-auto w-full hover: border-2 hover:border-teal-400 hover:shadow-md">
                <div>
                  <div className="flex items-center mb-7 gap-2 text-amber-500 transition-all duration-500">
                    <FaStar />
                    <span className="text-base font-semibold text-indigo-600">{testimonial.rating}</span>
                  </div>
                  <p className="text-base text-gray-600 leading-6 transition-all duration-500 pb-8 group-hover:text-gray-800">
                    {testimonial.text}
                  </p>
                </div>
                <div className="flex items-center gap-5 border-t border-solid border-teal-400/80 pt-5">
                  <img className="rounded-full h-10 w-10" src={testimonial.imgSrc} alt="avatar" />
                  <div>
                    <h5 className="text-gray-900 font-medium transition-all duration-500 mb-1">{testimonial.name}</h5>
                    <span className="text-sm leading-4 text-gray-500">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;


