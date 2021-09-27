import Head from "next/head"
import { useRouter } from "next/router"
import ReactMarkdown from 'react-markdown'

import { getEntries, getEntry, getStrapiURL } from "../../utils/api"

const EntryPage = ({ entry }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading entry...</div>
  }

  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-8">
      <Head>
        <title>{entry.title}</title>
      </Head>
      <div className="w-full p-5 flex flex-col justify-between">
        <div>
          <h4 className="mt-1 font-semibold text-lg leading-tight truncate text-gray-700">
            {entry.title}
          </h4>
          <div className="mt-1 text-gray-600">
            <ReactMarkdown
              children={entry.doc}
              transformImageUri={uri => uri.startsWith("http") ? uri : getStrapiURL(uri)}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default EntryPage

export async function getStaticProps({ params }) {
  const entry = await getEntry(params.slug)
  return { props: { entry } }
}

export async function getStaticPaths() {
  const entries = await getEntries()
  return {
    paths: entries.map((_entry) => {
      return {
        params: { slug: _entry.slug },
      }
    }),
    fallback: true,
  }
}
