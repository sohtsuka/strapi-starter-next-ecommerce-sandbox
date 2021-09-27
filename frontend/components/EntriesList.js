import Link from "next/link"
import ReactMarkdown from 'react-markdown'

import { getStrapiURL } from "../utils/api"

const EntriesList = ({ entries }) => {
  return (
    <div className="m-6 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8">
      {entries.map((_entry) => (
        <div
          key={_entry.id}
          className="border rounded-lg bg-gray-100 hover:shadow-lg shadow-md"
        >
          <Link href={`/entries/${_entry.slug}`}>
            <a>
              <div className="pl-4 pr-4 pb-4 pt-4 rounded-lg">
                <h4 className="mt-1 font-semibold text-base leading-tight truncate text-gray-700">
                  {_entry.title}
                </h4>
                <div className="mt-1 text-sm text-gray-700">
                  <ReactMarkdown
                    children={_entry.doc}
                    transformImageUri={uri => uri.startsWith("http") ? uri : getStrapiURL(uri)}
                  />
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default EntriesList
