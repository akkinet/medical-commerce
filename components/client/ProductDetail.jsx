"use client";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CartContext } from "../SessionProVider";

const ProductPage = ({ data }) => {
  const fileInputRef = useRef(null);
  const [displayImage, setDisplayImage] = useState(
    data?.product.images[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();
  const router = useRouter();
  const [, setCartItems] = useContext(CartContext);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file);
    }
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  async function addToCart(product) {
    await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify(product),
    });
  }

  async function upToDateCart(product) {
    await fetch(`/api/cart/${product.email}`, {
      method: "PUT",
      body: JSON.stringify(product),
    });
  }

  const cartHandler = () => {
    let cart = [];
    const medCart = window.localStorage.getItem("medCart");
    const newProduct = {
      quantity,
      _id: data.product._id,
      images: data.product.images,
      title: data.product.title,
      price: data.product.price,
      stockQuantity: data.product.stockQuantity,
    };
    if (medCart) {
      const localCart = JSON.parse(medCart);
      const exist = localCart.find((c) => c._id == data.product._id);
      if (exist)
        cart = localCart.map((c) => {
          if (c._id == data.product._id) {
            if (session && session.user)
              upToDateCart({
                quantity,
                product_id: data.product._id,
                email: session.user.email,
              });

            return newProduct;
          }

          return {
            quantity: c.quantity,
            _id: c._id,
            images: c.images,
            title: c.title,
            price: c.price,
            stockQuantity: c.stockQuantity,
          };
        });
      else {
        cart = [...localCart, newProduct];
        if (session && session.user)
          addToCart({
            quantity,
            product_id: data.product._id,
            email: session.user.email,
          });
      }
    } else {
      if (session && session.user)
        addToCart({
          quantity,
          product_id: data.product._id,
          email: session.user.email,
        });
      cart.push(newProduct);
    }

    setCartItems(cart.length);
    window.localStorage.setItem("medCart", JSON.stringify(cart));
    router.push("/cart");
  };

  if (!data) {
    return (
      <div className="container mt-24 mx-auto p-4">
        {/* Skeleton loader (as before) */}
      </div>
    );
  }

  return (
    <div className="container mt-24 mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col items-center">
          <div
            className="p-4 border shadow-md rounded flex justify-center items-center"
            style={{ width: "500px", height: "500px" }}
          >
            {displayImage && (
              <Image
                src={displayImage}
                alt="Main Product"
                layout="intrinsic"
                width={500}
                height={500}
                objectFit="contain"
              />
            )}
          </div>
          <div className="flex space-x-2 mt-4">
            {data?.product.images.map((image, i) => (
              <div
                key={i}
                onClick={() => setDisplayImage(image)}
                className="p-2 border shadow-md rounded"
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${i + 1}`}
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{data?.product.brand}</h2>
          <h3 className="text-xl">{data?.product.title}</h3>
          <p className="text-gray-600 mb-1">37207</p>
          <p className="text-gray-600 text-xl font-bold mb-1">
            ${data?.product.price}
          </p>
          {data?.product.prescription && (
            <div className="flex space-x-4 mt-2">
              <button
                onClick={handleUploadClick}
                className="bg-teal-400 text-white px-4 py-2 rounded flex items-center space-x-2"
              >
                <MdOutlineFileUpload size={24} />
                <span>Upload RX</span>
              </button>
              <button className="bg-teal-400 text-white px-4 py-2 rounded">
                Submit RX
              </button>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="application/pdf, image/*"
          />
          <div className="flex items-center mt-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity
            </label>
            <select
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="border rounded px-2 py-1"
            >
              {[...Array(data?.product.stockQuantity).keys()].map((q, i) => (
                <option key={i} value={q + 1}>
                  {q + 1}
                </option>
              ))}
            </select>
          </div>
          {data?.product.stockQuantity == 0 ? (
            <p>Out of Stock</p>
          ) : (
            <button
              className="bg-teal-400 text-white px-4 py-2 rounded mt-4"
              onClick={cartHandler}
            >
              Add To Cart
            </button>
          )}
          <div className="mt-4">
            <button className="text-grey-400 mt-4 mb-3">
              Product Description
            </button>
            <h2 className="text-xl mb-2">{data?.product.descTitle}</h2>
            <h4 className="text-sm">{data?.product.desc}</h4>
          </div>
        </div>
      </div>
      {data?.relatedProducts.length > 0 && (
        <div className="mt-8">
          <h4 className="text-xl font-bold">RELATED PRODUCTS</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {data.relatedProducts.map((pd) => (
              <div
                key={pd._id}
                className="flex flex-col items-center p-4 border shadow-md rounded w-full"
              >
                <Link href={`/product/${pd._id}`}>
                  <Image
                    src={pd.images[0]}
                    alt={`Related Product ${pd.title}`}
                    width={400}
                    height={200}
                    className="w-full"
                    objectFit="cover"
                  />
                </Link>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {data.relatedProducts.map((pd) => (
              <p key={pd._id} className="mt-2 text-center font-bold">
                {pd.title}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
