import Carousel from 'react-material-ui-carousel'
import styles from '../public/styles/MedicalStyles'
import useStyles from '../public/styles/HomepageStyles'
import { Typography as T } from '@material-ui/core'
import React from 'react'
import * as prismicH from '@prismicio/helpers'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Link from 'next/link'

function Slider2(props) {
  const homepageStyles = useStyles()

  const { item } = props
  return (
    <>
      <div className={homepageStyles.slider2container}>
        {item.map((item, index) => (
          <div className={homepageStyles.slider2}>
            <T className={homepageStyles.slider2Top}>
              {item.data.published_in.text}
            </T>
            <T className={homepageStyles.slider2head}>
              {prismicH.asText(item.data.title)}
            </T>
            <T
              className={homepageStyles.slider2disc}
            >{`${item.data.abstract.substring(0, 300)}....`}</T>
            <Link href={`/publications/${item.id}`}>
              <a className={homepageStyles.link}>
                <T className={homepageStyles.slider2read}>Read more -{'>'}</T>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}
function Slider2mobile(props) {
  const homepageStyles = useStyles()

  const { item } = props

  return (
    <>
      <div className={homepageStyles.slider2container}>
        <div className={homepageStyles.slider2}>
          <T className={homepageStyles.slider2Top}>
            {item.data.published_in.text}
          </T>
          <T className={homepageStyles.slider2head}>
            {prismicH.asText(item.data.title)}
          </T>
          <T
            className={homepageStyles.slider2disc}
          >{`${item.data.abstract.substring(0, 200)}....`}</T>
          <Link href={`/publications/${item.id}`}>
            <a className={homepageStyles.link}>
              <T className={homepageStyles.slider2read}>Read more -{'>'}</T>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

function LowerSlider({ doc }) {
  const medicalStyles = styles()
  const location = useRouter()
  const { pathname } = location
  const splitLocation = pathname.split('/')

  let filteredPublication = []
  if (splitLocation[1] === '') {
    filteredPublication = doc.filter((x) =>
      x.data.publication_types.some((us) => us.text === 'co-auth'),
    )
  }
  if (splitLocation[1] === 'pharma') {
    filteredPublication = doc.filter((x) =>
      x.data.publication_types.some((us) => us.text === 'peer-reviewed'),
    )
  }
  if (splitLocation[1] === 'medical') {
    filteredPublication = doc.filter((x) =>
      x.data.publication_types.some((us) => us.text === 'peer-reviewed'),
    )
    filteredPublication = doc.filter((x) =>
      x.data.publication_types.some((us) => us.text === 'co-auth'),
    )
  }
  filteredPublication.sort(function (a, b) {
    return (
      new Date(b.data.dt_published).getTime() -
      new Date(a.data.dt_published).getTime()
    )
  })
  let customItems2 = []
  let sliderItems = []
  filteredPublication.map((item, index) => {
    sliderItems.push(item)
    if (sliderItems.length === 3) {
      customItems2.push(sliderItems)
      sliderItems = []
    }
  })
  if (sliderItems.length !== 0) {
    customItems2.push(sliderItems)
  }
  return (
    <>
      <div className={medicalStyles.desktop}>
        <Carousel
          indicators={true}
          animation={'slide'}
          timeout={2000}
          interval={8000}
          autoPlay={true}
        >
          {customItems2.map((item, index) => {
            return <Slider2 item={item} key={index} />
          })}
        </Carousel>
      </div>
      <div className={clsx(medicalStyles.mobile, medicalStyles.mobileSLider)}>
        <Carousel
          indicators={true}
          animation={'slide'}
          timeout={2000}
          interval={8000}
          autoPlay={true}
        >
          {filteredPublication.map((item, index) => {
            return <Slider2mobile item={item} key={index} />
          })}
        </Carousel>
      </div>
    </>
  )
}

export default LowerSlider
