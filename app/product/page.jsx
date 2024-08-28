import Products from '../../components/client/Products'

async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?for=all`);
  const data = await res.json();
 
  return (
    <Products productList={data.productList} brands={data.brandList} />
  )
}

export default page;