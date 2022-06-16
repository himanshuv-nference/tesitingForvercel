import React from 'react'
import { Typography as T } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useState, useEffect } from 'react'
import * as prismic from '@prismicio/client'
const twittericon = '/FooterImages/Combined-Shape (1).svg'
const linkIcon = '/FooterImages/Group 3627.svg'
import { PrismicRichText } from '@prismicio/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import BlogListingStyles from '../../public/styles/BlogListingStyles'
import dynamic from 'next/dynamic'
import { Icon } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Clear'
import NferxModal from '../../components/NferxModal/NferxModal'

const DynamicOpenSeaViewer = dynamic(
  () => import('../../components/SeaDragonViewer'),
  { ssr: false }
)

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
  const listingStyles = BlogListingStyles()
  const [article, setArticleData] = useState(null)
  const params = useRouter()
  const [open, setOpen] = useState(false)
  const [imageIndex, setImageIndex] = useState(-1)
  const modalClose = () => setOpen(false)

  const ID = params.query.BlogID
  const style = NewStyles()
  useEffect(() => {
    const fetchData = async () => {
      if (!params.isReady) return
      const response = await client.query(
        prismic.predicate.at('document.type', 'nference_blog'),
      ).then((response) => {
        {
          const resultPublication = response.results.find((x) => x.id === ID)
          setArticleData(resultPublication)
        }
      })
    }
    fetchData()
  }, [params.isReady])
  if (article) {
    return (
      <>
        <div className={style.body}>
          <Link href="/blog">
            <a className={style.nav}>
              <T className={style.back}>{'<'} Back to Blog</T>
            </a>
          </Link>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <div style={{ margin: '5px 5px 0px 0px' }}>
              <img
                style={{ width: '60px', borderRadius: '4px' }}
                src={article.data.blog_image.url}
              />

            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
              <T className={listingStyles.authorDate}>
                {article.data.blog_post_author}
              </T>
              <T className={listingStyles.authorDate}>
                {article.data.blog_date_published}
              </T>
            </div>
          </div>
          <div className={listingStyles.blogDesc}>
            <T className={style.title}>{article.data.blog_title[0].text}</T>
          </div>
          <div>
            <img
              className={listingStyles.newsCardImageInd}
              src={article.data.blog_image.url}
            />
            <T className={listingStyles.newsDesc}>
              {article.data.blog_content[0].text}
            </T>

          </div>
          <div>
            {
              article.data.body.map((obj, index) =>
              (
                <div className={listingStyles.blogImageContainer}>
                  <div>
                    <img
                      onClick={() => {
                        setOpen(true)
                        setImageIndex(index)
                      }}
                      className={listingStyles.blogImage} src={obj.primary.image.url} >
                    </img>
                    {open && <NferxModal
                      contentPad
                      className={listingStyles.modal}
                      open={true && index === imageIndex}
                      onClose={modalClose}
                      noCloseInRight={true}
                    >
                      <div className={listingStyles.iconDiv}>
                        <Icon className={listingStyles.iconDivIndex} onClick={modalClose}>
                          <ClearIcon className={listingStyles.cursor} />
                        </Icon>
                      </div>
                      <div className={listingStyles.blogImageModal}>
                        <DynamicOpenSeaViewer className={listingStyles.viewer} src={obj.primary.image.url} test={article.data.blog_image} />
                      </div>
                    </NferxModal>
                    }
                  </div>
                  <T className={listingStyles.blogImageCaption}>{obj.primary.caption[0].text}</T>
                </div>
              ))
            }
          </div>

          <div className={listingStyles.headline}></div>
          <div className={listingStyles.logosDiv}>
            <img className={listingStyles.logo} src={twittericon} />
            <img className={listingStyles.logo} src={linkIcon} />
          </div>
        </div>
        <style jsx global>{`
          p {
            margin-top: 0px;
            margin-bottom: 0px;
          }

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
