const DealsandOffers = async () => {
  let product1 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?id=66a4b8701734bf6be9656041`)
  let product2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?id=66a4b87d1734bf6be9656051`)
  product1 = await product1.json()
  product2 = await product2.json()
  return (
    <section className='text-black body-font md:flex md:justify-center'>
      <div className="container px-5 lg:mx-auto md:mx-0 flex flex-col items-center justify-center max-w-lg: py-0">
        <section className="text-gray-800 body-font flex flex-col lg:px-16 py-10 max-w-sm: px-0">
          <div className="upper-container lg:flex">
            <div className="container rounded-2xl lg:mx-auto lg:my-0 max-w-sm: my-10 flex px-5 py-5 md:flex-row flex-col items-center lg:w-[55%] max-w-sm:w-0 border-2 border-teal-400 hover:shadow-xl hover:shadow-teal-400/30 mx-auto md:mx-0">
              <div className="lg:h-[100%] lg:flex-grow md:w-full lg:pr-5 md:pr-16 flex flex-col justify-evenly md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
                  {product1?.product.title}
                </h1>
                <p className="mb-8 leading-relaxed font-bold">
                {product1?.product.desc}
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex text-white bg-teal-400 border-0 py-2 px-6 focus:outline-none hover:bg-teal-500 rounded text-lg">
                    Buy Now
                  </button>
                </div>
              </div>
              <img
                className="object-contain object-center lg:w-1/4 max-w-sm: w-1/2"
                alt="CPAPMasks"
                src="https://res.cloudinary.com/dduiqwdtr/image/upload/f_auto,q_auto/v1/assets/CPAPMasks.png"
              />
            </div>
            <div className="container rounded-2xl mx-auto flex px-5 py-5 md:flex-row flex-col items-center bg-teal-400 lg:w-[45%] lg:ml-10 font-bold text-white  md:mx-0">
              <div className="lg:h-[100%] lg:flex-grow md:w-full lg:pr-5 md:pr-16 flex flex-col justify-evenly md:items-start md:text-left  md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold">
                  Free Shipping
                </h1>
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold">
                  45% OFF
                </h1>
                <p className="leading-relaxed">

                  Enjoy free shipping and a massive 45% discount on our premium medical equipment. Shop now to take advantage of these unbeatable savings and receive top-quality products delivered right to your doorstep at no extra cost!
                </p>
              </div>
            </div>
          </div>
          <div className="lower-container lg:flex lg:flex-row-reverse max-w-sm:flex-col mt-10">
            <div className="container rounded-2xl lg:ml-10 max-w-sm: ml-0 flex px-5 py-5 md:flex-row flex-col items-center lg:w-[55%] border-2 border-teal-400 hover:shadow-xl hover:shadow-teal-400/30 mx-auto md:mx-0">
              <div className="lg:h-[100%] lg:flex-grow md:w-full lg:pr-5 md:pr-16 flex flex-col justify-evenly md:items-start md:text-left items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold">
                  {product2?.product.title}
                  </h1>
                <p className="mb-8 leading-relaxed font-bold">
                {product2?.product.desc}
                </p>
                <div className="flex justify-center">
                  <button className="inline-flex text-white bg-teal-400 border-0 py-2 px-6 focus:outline-none hover:bg-teal-500 rounded text-lg">
                    Buy Now
                  </button>
                </div>
              </div>
              <img
                className="object-contain object-center lg:w-1/4 max-w-sm: w-1/2"
                alt="CPAPMasks"
                src="https://res.cloudinary.com/dduiqwdtr/image/upload/f_auto,q_auto/v1/assets/CPAPBattery.png"
              />
            </div>
            <div className="container rounded-2xl mx-auto lg:my-0 max-w-sm: my-6 flex px-5 py-5 md:flex-row flex-col items-center bg-teal-400 lg:w-[45%] mr-10 font-bold text-white  md:mx-0">
              <div className="lg:h-[100%] lg:flex-grow md:w-full lg:pr-5 md:pr-16 flex flex-col md:items-start md:text-left  md:mb-0 items-center text-center">
                <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold">
                  Trusted Brands
                </h1>
                <p className="leading-relaxed text-lg">
                We collaborate with trusted brands and partners to offer top-quality medical equipment, ensuring reliability, durability, and excellent performance. Your health and satisfaction are our top priorities.
                </p>
                <ul className="mt-3 ml-5 text-xl">
                  <li className="list-disc">Huge Selection</li>
                  <li className="list-disc">Always Low Price</li>
                  <li className="list-disc">Fast Shipping</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default DealsandOffers;
