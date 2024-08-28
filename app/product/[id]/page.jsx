import ProductDetail from '../../../components/client/ProductDetail'

export const generateMetadata = () => {
  return {
    title: "Product Detail"
  }
}

const fetchApi = async (id) => {
  let data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product?id=${id}`)
  return await data.json()
}

async function ProductDetailPage({ params }) {
  const data = await fetchApi(params.id);

  return (
    <ProductDetail data={data} />
  )
}

export default ProductDetailPage