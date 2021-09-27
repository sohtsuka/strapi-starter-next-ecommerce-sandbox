import Head from "next/head"
import ProductsList from "../components/ProductsList"
import EntriesList from "../components/EntriesList"
import { getProducts, getEntries } from "../utils/api"

const HomePage = ({ products, entries }) => {
  return (
    <div>
      <Head>
        <title>Strapi Next.js E-commerce</title>
      </Head>
      <ProductsList products={products} />
      <EntriesList entries={entries} />
    </div>
  )
}

export async function getStaticProps() {
  const products = await getProducts()
  const entries = await getEntries()
  return { props: { products, entries } }
}

export default HomePage
