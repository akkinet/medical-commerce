import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-teal-100 text-gray-600 body-font lg:flex 
    lg:flex-col-reverse mt-6 max-w-sm: flex max-w-sm: flex-col-reverse ">
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">© 2024 All Rights are reserved  —
            <Link href="https://twitter.com/medsupply" className="text-gray-600 ml-1" target="_blank" rel="noopener noreferrer">@medsupply</Link>
          </p>
          <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">Design and Developed by :  <b>Akash Sharma</b> , <b>Shivam Awasthi</b> , <b>Aditi Shahi </b></span>
        </div>
      </div>
      <div className="container px-5  mx-auto  ">
        <div className="flex flex-wrap justify-around md:text-left text-center -mb-10 -mx-4">
          <div className="lg:w-1/6 md:w-1/2 w-full px-4 leading-8 ">
            <div className=" flex lg:justify-start max-w-sm: justify-center">
              <img className='lg:w-[50%] max-w-sm: w-[20%]' src="https://res.cloudinary.com/dduiqwdtr/image/upload/f_auto,q_auto/v1/assets/logo.png" alt="" />
            </div>
            <nav className="list-none mb-10">
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer">
                Call Us: 305-266-6701
              </li>
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer">
                Toll Free: 855-717-7378
              </li>
              <li className="text-gray-600 hover:text-gray-800 cursor-pointer">
                info@hexerve.com
              </li>
            </nav>
          </div>
          <div className="lg:w-1/6 md:w-1/2 w-full px-4 leading-8">
            <h2 className="title-font font-large  text-gray-900 tracking-widest text-lg mb-3">Information</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">About Us</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Store Location</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Site Map</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Orders and Returns</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Contact Us</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/6 md:w-1/2 w-full px-4 leading-8">
            <h2 className="title-font font-large  text-gray-900 tracking-widest text-lg mb-3">Products</h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={"/category/66a4b84c1734bf6be9656016"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Diagnostics</Link>
              </li>
              <li>
                <Link href={"/category/66a4b8501734bf6be965601e"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Respiratory</Link>
              </li>
              <li>
                <Link href={"/category/66a4b85d1734bf6be9656029"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Mobility Aids</Link>
              </li>
              <li>
                <Link href={"/category/66a4b8641734bf6be9656031"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Hospital Furniture</Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/6 md:w-1/2 w-full px-4 leading-8">
            <h2 className="title-font font-large  text-gray-900 tracking-widest text-lg mb-3">Additional Resources</h2>
            <nav className="list-none mb-14">
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Upload RX</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">RX Form</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Travel Tips</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">What is Sleep Apnea</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Prescription Policy</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Terms and Conditions</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Secure Shopping</Link>
              </li>
              <li>
                <Link href={"#"} className="text-gray-600 hover:text-gray-800 cursor-pointer">Track My Order</Link>
              </li>
            </nav>
          </div>

        </div>
      </div>
      <div className=" mt-10 flex items-center justify-evenly lg:flex-row max-w-sm: flex-col ">
        <div className=" upper-footer">
          <p className='lg:text-4xl  max-w-sm: text-2xl text-center font-bold text-teal-400'>Stay in the loop with exclusive discounts!</p>
        </div>
        <div className="lg:px-5 max-w-sm: px-10 py-8 lg:w-auto max-w-sm: w-full">
          <div className=" w-full lg:flex lg:flex-row  flex-wrap justify-center items-center md:justify-start max-w-sm: flex max-w-sm: flex-col ">
            <div className=" relative   sm:mr-4 mr-2 ">
              <input type="text" id="footer-field" name="footer-field" placeholder='Your Email Address' className="w-full bg-gray-100 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-teal-200 focus:border-teal-500 text-base outline-none text-black py-1 px-3 leading-8 " />
            </div>
            <button className="inline-flex text-white bg-teal-400 border-0 py-2 px-6 focus:outline-none hover:bg-teal-500 rounded lg:mt-0 max-w-sm: mt-4">Subscribe</button>
          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer