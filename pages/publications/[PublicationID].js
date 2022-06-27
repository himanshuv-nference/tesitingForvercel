import React from 'react'
import { Typography as T } from '@material-ui/core'
import PublicationListingStyles from '../../public/styles/PublicationListingStyles'
import styles from '../../public/styles/MedicalStyles'
import { makeStyles } from '@material-ui/styles'
const pdffull = '/PublicationPageImages/Group 3895.svg'
const twittericon = '/FooterImages/Combined-Shape (1).svg'
const linkIcon = '/FooterImages/Group 3627.svg'
const pdfPlaceholder = '/PublicationPageImages/image49.svg'
import { useState, useEffect } from 'react'
import Loading from '../../components/Loading/Loading'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import * as prismicH from '@prismicio/helpers'

const apiEndpoint = 'https://nference.prismic.io/api/v2'
const accessToken =
  'MC5ZUi1ZbXhJQUFDd0FXY05N.FEXvv73vv73vv70L77-977-977-9bVlJeh8dfO-_vQUpMzEMYO-_ve-_ve-_vVfvv70JS--_vQg' // This is where you would add your access token for a Private repository

const client = prismic.createClient(apiEndpoint, { accessToken })

const PublicationStyles = makeStyles({
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
    fontSize: '28px',
    fontWeight: '500',
    lineHeight: '140%',
    // marginTop:'28px',
    // marginBottom:'14px',
    color: '#000000',
    ['@media (max-width:780px)']: {
      fontSize: '14px',
      marginTop: '30px',
    },
  },
  date: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '140%',
    // marginTop:'28px',
    // marginBottom:'14px',
    color: '#1A2530',
    ['@media (max-width:780px)']: {
      fontSize: '12px',
      //   marginTop:'30px'
    },
  },
  line: {
    background:
      'linear-gradient(to right, rgba(20, 221, 224, 1) ,rgba(75, 90, 255, 1))',
    mixBlendMode: 'multiply',
    height: '4px',
    width: '40px',
    marginTop: '18px',
    marginBottom: '32px',

    borderRadius: '20px',
    ['@media (max-width:780px)']: {
      marginTop: '16px',
      marginBottom: '16px',
      width: '126px',
    },
  },
  abstract: {
    fontSize: '16px',
    fontWeight: '300',
    lineHeight: '180%',
    marginTop: '32px',
    marginBottom: '32px',
    letterSpacing: '0.005em',
    color: '#374554',
    ['@media (max-width:780px)']: {
      fontSize: '14px',
      fontWeight: 'normal',

      marginTop: '16px',
      marginBottom: '16px',
    },
  },
  authors: {
    fontSize: '16px',
    fontWeight: 'normal',
    lineHeight: '100%',
    // marginTop:'28px',
    // marginBottom:'14px',
    letterSpacing: '0.005em',
    color: '#1C2329',
    ['@media (max-width:780px)']: {
      fontSize: '14px',
      lineHeight: '137%',

      //   marginTop:'30px'
    },
  },
  authhead: {
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '89.5%',
    // marginTop:'28px',
    // marginBottom:'14px',
    letterSpacing: '0.005em',
    color: '#1C2329',
    ['@media (max-width:780px)']: {
      fontSize: '14px',
      lineHeight: '137%',
    },
  },
  pdfText: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '180%',
    marginTop: '10px',

    letterSpacing: '0.005em',
    color: '#1C2329',
    textDecorationLine: 'underline',
    ['@media (max-width:780px)']: {
      fontSize: '14px',
    },
  },
  box: {
    display: 'flex',
    gap: '32px',
    marginTop: '88px',
    marginBottom: '102px',

    ['@media (max-width:780px)']: {
      marginTop: '32px',
      flexDirection: 'column',
    },
  },
  datediv: {
    display: 'flex',
    gap: '40px',
    marginTop: '32px',
    ['@media (max-width:780px)']: {
      marginTop: '16px',
      gap: '50%',
    },
  },
  icondiv: {
    display: 'flex',
    gap: '8px',
  },
  icon: {
    width: '25px',
    height: '25px',
  },
  openIcon: {
    marginRight: '6px',
  },
  authdiv: {
    display: 'flex',
    gap: '8px',
    marginTop: '32px',
    marginBottom: '32px',
    ['@media (max-width:780px)']: {
      marginTop: '16px',
      marginBottom: '16px',
    },
  },
  mobileauthcover: {
    background: '#D9E6FF',
    borderRadius: '4px',
    padding: '4px 8px 4px 8px',
    ['@media (max-width:780px)']: {
      padding: '2px 5px 2px 5px',
    },
  },
  authtext: {
    fontSize: '12px',
    fontWeight: '300',
    lineHeight: '140%',

    color: '#0057FF',

    ['@media (max-width:780px)']: {
      fontSize: '11px',
    },
  },
  pdfmobile: {
    width: '250px',
    height: '250px',
    ['@media (max-width:780px)']: {
      width: '92px',
      height: '92px',
    },
  },
  logo: {
    width: '84px',
    height: '29px',
  },
})

function Publication() {
  const medicalStyles = styles()
  const listingStyles = PublicationListingStyles()
  const pageStyles = PublicationStyles()
  const [doc, setDocData] = useState(null)
  const [pub, setPubData] = useState(null)
  const params = useRouter()
  const ID = params.query.PublicationID
  useEffect(() => {
    const fetchData = async () => {
      if (!params.isReady) return
      const response = await client.query(
        prismic.predicate.at('document.type', 'publications'),
        { pageSize: 100 },
      ).then((response) => {
        {
          const resultPublication = response.results.find(
            (x) => x.id === ID || x.data.url === ID,
          )

          setDocData(response.results)
          setPubData(resultPublication)
        }
      })
    }
    fetchData()
  }, [params.isReady])

  if (doc && pub) {
    return (
      <>
        <div className={medicalStyles.body}>
          <Link href="/publications">
            <a className={listingStyles.nav}>
              <T className={pageStyles.back}>{'<'} Back to All Publications</T>
            </a>
          </Link>
          <div className={pageStyles.box}>
            <div className={pageStyles.boxLeft}>
              <T className={pageStyles.title}>
                {prismicH.asText(pub.data.title)}
              </T>
              <div className={pageStyles.datediv}>
                <T className={pageStyles.date}>{pub.data.dt_published}</T>
                {/* <div className={pageStyles.icondiv}>
                  <img className={listingStyles.logo} src={twittericon} />
                  <img className={listingStyles.logo} src={linkIcon} />
                </div> */}
              </div>
              <div className={pageStyles.line} />

              <div>
                <a href={pub.data.download_pdf.url} target="blank">
                  <img
                    className={pageStyles.logo}
                    src={pub.data.source_logo.url}
                  />
                </a>
                <div className={pageStyles.openfullDiv}>
                  <T className={pageStyles.pdfText}>
                    <img src={pdffull} className={pageStyles.openIcon} />
                    <a href={pub.data.download_pdf.url} target="blank">
                      Open Full publication
                    </a>
                  </T>
                </div>
              </div>

              <T className={pageStyles.abstract}>
                {prismicH.asText(pub.data.summary)}
              </T>
              <div className={pageStyles.authdiv}>
                <T className={pageStyles.authhead}>Authors: </T>
                <T className={pageStyles.authors}>{pub.data.authors} </T>
              </div>
              <T className={pageStyles.authors}>
                {pub.data.authors_institute_address}
              </T>
            </div>
            <div className={pageStyles.boxRight}>
              <div>
                {pub.data.paper_image.url ? (
                  <img
                    src={pub.data.paper_image.url}
                    className={pageStyles.pdfmobile}
                  />
                ) : (
                  <img src={pdfPlaceholder} className={pageStyles.pdfmobile} />
                )}

                <T className={pageStyles.pdfText}>
                  <a href={pub.data.download_pdf.url} target="_blank" download>
                    Download PDF
                  </a>
                </T>
                {/* <div className={pageStyles.openfullDiv}>
                  <T className={pageStyles.pdfText}>
                    <img src={pdffull} className={pageStyles.openIcon} />
                    <a href={pub.data.download_pdf.url} target="blank">
                      Open Full publication
                    </a>
                  </T>
                </div> */}
              </div>
              <div className={pageStyles.authdiv}>
                {pub.data.institutional_authors.map((item, index) => {
                  return (
                    <div className={pageStyles.mobileauthcover}>
                      <T className={pageStyles.authtext}>{item.text}</T>
                    </div>
                  )
                })}
              </div>

              <T className={pageStyles.authhead}>Correspondence to:</T>
              <T>{pub.data.correspondence_to}</T>
            </div>
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
    return (
      <T>
        <Loading />
      </T>
    )
  }
}

export default Publication
