import { gql } from '@apollo/client'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import Layout from '../../layouts/Layout'
import { nhost } from '../../lib/nhostClient'

const Article = () => {
  const router = useRouter()
  const { id } = router.query

  const { data } = useSWR(
    gql`
      query getArticleById($id: uuid!) {
        articles_by_pk(id: $id) {
          id
          title
          content
          created_at
        }
      }
    `,
    async (query) => await nhost.graphql.request(query, { id }),
    {
      revalidateOnMount: true,
      refreshInterval: 1000,
    }
  )

  const title = data?.data?.articles_by_pk?.title

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen p-8">
        <h2 className="text-center font-bold text-2xl">{title}</h2>
        <h2 className="mt-5 text-lg font-semibold">
          {data?.data?.articles_by_pk?.content}
        </h2>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      </div>
    </Layout>
  )
}

export default Article
