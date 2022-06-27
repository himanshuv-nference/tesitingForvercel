import React from 'react'
import { Typography as T } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useState, useEffect } from 'react'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as prismicH from '@prismicio/helpers'

const apiEndpoint = 'https://nference.prismic.io/api/v2'
const accessToken =
  'MC5ZUi1ZbXhJQUFDd0FXY05N.FEXvv73vv73vv70L77-977-977-9bVlJeh8dfO-_vQUpMzEMYO-_ve-_ve-_vVfvv70JS--_vQg' // This is where you would add your access token for a Private repository

const client = prismic.createClient(apiEndpoint, { accessToken })

const NewStyles = makeStyles({
  body: {
    marginLeft: '8.43%',
    marginRight: '8.43%',
    marginBottom: '50px',
    ['@media (max-width:780px)']: {
      marginRight: '16px',
      marginLeft: '16px',
    },
    // ['@media (min-width:2000px)']: {
    //   marginRight: '1200px',
    //   marginLeft: '1200px',
    // },
  },
  back: {
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '200%',
    marginTop: '40px',
    // marginBottom:'14px',
    color: '#627181',
    ['@media (max-width:780px)']: {
      fontSize: '11px',
      marginTop: '30px',
    },
  },
  title: {
    marginTop: '20px',
    marginBottom: '20px',
    fontSize: '28px',
    fontWeight: '500',
    lineHeight: '140%',
    color: '#000000',
    ['@media (max-width:780px)']: {
      fontSize: '14px',
      marginTop: '30px',
    },
  },
  nav: {
    textDecoration: 'none',
  },
})

export default function News() {
  const [news, setNewsData] = useState(null)
  const params = useRouter()
  const [doc, setDocData] = useState(null)

  const ID = params.query.NewsID
  const style = NewStyles()
  useEffect(() => {
    const fetchData = async () => {
      if (!params.isReady) return
      const response = await client.query(
        prismic.predicate.at('document.type', 'news_room'),
      ).then((response) => {
        {
          const resultPublication = response.results.find((x) => x.id === ID)
          setNewsData(resultPublication)
        }
      })
    }
    fetchData()
  }, [params.isReady])
  if (news) {
    return (
      <>
        <div className={style.body}>
          <Link href="/news">
            <a className={style.nav}>
              <T className={style.back}>{'<'} Back to All News</T>
            </a>
          </Link>
          <T className={style.title}>{prismicH.asText(news.data.title)}</T>

          <T>
            <PrismicRichText field={news.data.internal_article_richtext} />
          </T>
        </div>
        <style jsx global>{`

          a {
            color: #1c2329 !important;
          }
        `}</style>
      </>
    )
  } else {
    return <T>Loading.....</T>
  }
}
