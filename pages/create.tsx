import React from 'react'
import { NextPage } from 'next'
import { gql } from '@apollo/client'
import Layout from '../layouts/Layout'
import { useForm } from 'react-hook-form'
import { nhost } from '../lib/nhostClient'
import { toast } from 'react-toastify'
import Router from 'next/router'

const Create: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data: any) => {
    const { title, content } = data

    const { data: dataSource } = await nhost.graphql.request(
      gql`
        mutation createArticleMutation($title: String!, $content: String!) {
          insert_articles_one(object: { title: $title, content: $content }) {
            id
            title
            content
          }
        }
      `,
      {
        title,
        content,
      }
    )

    if (data) {
      toast.success('Successfully inserted')
      Router.push('/')
    } else {
      toast.error('Something went wrong!')
    }
  }

  return (
    <Layout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-2xl mx-auto border rounded-lg bg-gray-200 py-8 px-4"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="w-full">
            <h1 className="text-black font-medium">Title</h1>
            <input
              type="text"
              {...register('title')}
              className="border w-full"
            />
          </div>
          <div className="w-full">
            <h1>Content</h1>
            <textarea {...register('content')} className="border w-full" />
          </div>
          <button type="submit" className="py-2 bg-blue-500 w-full text-white">
            Save
          </button>
        </div>
      </form>
    </Layout>
  )
}

export default Create
