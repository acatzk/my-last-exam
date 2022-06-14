import React from 'react'
import Head from 'next/head'
import type { NextPage } from 'next'
import Header from '../components/Header'
import { gql, useQuery } from '@apollo/client'
import { nhost } from '../lib/nhostClient'
import useSWR from 'swr'
import Layout from '../layouts/Layout'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const router = useRouter()
  const { data } = useSWR(
    gql`
      query {
        articles(order_by: { created_at: desc }) {
          id
          title
          content
          created_at
        }
      }
    `,
    async (query) => await nhost.graphql.request(query),
    {
      refreshInterval: 1000,
      revalidateOnMount: true,
    }
  )

  const handleDelete = async (track: any) => {
    const { id } = track
    let message = confirm('Are you sure you want to delete?')
    if (message) {
      const { data } = await nhost.graphql.request(
        gql`
          mutation deleteArticleByPk($id: uuid!) {
            delete_articles_by_pk(id: $id) {
              id
              title
            }
          }
        `,
        { id }
      )
    }
  }

  return (
    <Layout>
      <div>
        <h1 className="text-xl font-bold">Articles</h1>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <div className="mt-2">
          <table className="min-w-full border rounded">
            <thead className="bg-white border-b shadow">
              <tr className="bg-gray-100 border-blue-20">
                <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
                  Title
                </th>
                <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
                  Content
                </th>
                <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
                  Date Created
                </th>
                <th className="text-sm font-semibold text-gray-900 px-6 py-4 text-left border-r">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.articles?.map((article: any, i: any) => (
                <tr key={article?.id} className="divide-y">
                  <td className="p-2">{article?.title}</td>
                  <td className="line-clamp-2 p-2">{article?.content}</td>
                  <td className="p-2">
                    {moment(article?.created_at).format('MMMM d, YYYY')}
                  </td>
                  <td className="p-2 text-white">
                    <button className="bg-yellow-500 p-0.5 text-sm font-medium rounded-l">
                      Edit
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 p-0.5 text-sm font-medium"
                      onClick={() => handleDelete(article)}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => router.push(`/articles/${article?.id}`)}
                      className="bg-blue-500 p-0.5 text-sm font-medium rounded-r"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default Home
