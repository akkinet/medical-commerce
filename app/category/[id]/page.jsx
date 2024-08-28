import ProductByCategory from "../../../components/client/ProductByCategory";

async function page({ params }) {
  let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${params.id}`);
  data = await data.json();
  return <ProductByCategory data={data} />;
}

export default page;

export const generateMetadata = () => {
  return {
    title: "Category's Product"
  }
}
