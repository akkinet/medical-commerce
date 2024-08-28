import ProductCategory from '../client/ProductCategory'

async function HomeProduct() {
    let prod = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/66a4b84c1734bf6be9656016?for=home&num=6`)
    prod = await prod.json()

    return (
        <ProductCategory prod={prod} />
    )
}

export default HomeProduct