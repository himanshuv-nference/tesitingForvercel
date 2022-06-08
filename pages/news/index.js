import React from 'react'
import { Typography as T } from '@material-ui/core'
import styles from '../../public/styles/MedicalStyles'
import PublicationListingStyles from '../../public/styles/PublicationListingStyles'
import Prismic from '@prismicio/client'
import { Date } from 'prismic-reactjs'
import { useState, useEffect } from 'react'
const theNewYorksTimess = '/NewsRoomImages/Group 1213.svg'
const Bloomerg = '/NewsRoomImages/bloom.svg'
const theWashingTimess = '/NewsRoomImages/Group 1227.svg'
const theSA = '/NewsRoomImages/SA.svg'
import Carousel from 'react-material-ui-carousel'
import { Pagination, ListItem, ChipFilterSelect } from 'nferx-core-ui'
import _ from 'lodash'
import clsx from 'clsx'
import Slider from '../../components/newsroom/Desktop_Carousel'
import SliderMobile from '../../components/newsroom/Mobile_Carousel'
import CardRender from '../../components/newsroom/Desktop_Card'
import MobileCardRender from '../../components/newsroom/Mobile_Card'
const apiEndpoint = 'https://nference.prismic.io/api/v2'
const accessToken =
  'MC5ZUi1ZbXhJQUFDd0FXY05N.FEXvv73vv73vv70L77-977-977-9bVlJeh8dfO-_vQUpMzEMYO-_ve-_ve-_vVfvv70JS--_vQg' // This is where you would add your access token for a Private repository

const Client = Prismic.client(apiEndpoint, { accessToken })

function NewsRoom() {
  const [newsData, setNewsData] = useState([])
  const defaultValue = []
  const defaultValueDate = null
  const [allNews, setallNews] = useState([])
  const [recentFilter, setRecentFilter] = useState(defaultValueDate)
  const [topicFilter, setTopicFilter] = useState(defaultValue)
  const [filteredNews, setFilteredNews] = useState(defaultValue)
  const [pageNumber, setPageNumber] = useState(1)
  const [TotalPages, setTotalPages] = useState(1)
  const [pageSize, setpageSize] = useState(5)

  useEffect(() => {
    const fetchData = async () => {
      const response = await Client.query(
        Prismic.Predicates.at('document.type', 'news_room'),
      )
      setNewsData(response.results)
      setallNews(response.results)
    }
    fetchData()
  }, [])

  useEffect(() => {
    let filterNews = []
    if (allNews) {
      filterNews = allNews.filter(
        (x) =>
          topicFilter.includes(x.data.news_category) ||
          _.isEqual(topicFilter, defaultValue),
      )
      filterNews.sort(function (a, b) {
        return (
          new Date(b.data.published_date).getTime() -
          new Date(a.data.published_date).getTime()
        )
      })
      setFilteredNews(filterNews)
    }
  }, [topicFilter, allNews, pageNumber])
  if (recentFilter) {
    allNews.sort(function (a, b) {
      if (recentFilter === 1) {
        return (
          new Date(b.data.published_date).getTime() -
          new Date(a.data.published_date).getTime()
        )
      } else {
        return (
          new Date(a.data.published_date).getTime() -
          new Date(b.data.published_date).getTime()
        )
      }
    })
  }

  const listingStyles = PublicationListingStyles()
  const medicalStyles = styles()
  let topicArray = []
  let filterNews = allNews
  allNews.map((li) => {
    topicArray.push(li.data.news_category)
  })
  let uniquetopics = [...new Set(topicArray)]
  if (filteredNews != []) {
    filterNews = [...filteredNews]
  }
  filterNews = filterNews.slice((pageNumber - 1) * 5, pageNumber * 5)

  let sliderNews = allNews.filter((x) => x.tags.some((us) => us === 'featured'))

  return (
    <>
      <div className={medicalStyles.body}>
        <T className={listingStyles.head}>Featured News</T>
        <div className={listingStyles.headline}></div>
      </div>
      <div className={medicalStyles.desktop}>
        <Carousel
          indicators={true}
          animation={'slide'}
          timeout={800}
          autoPlay={true}
        >
          {sliderNews.map((item, index) => {
            return <Slider item={item} key={index} />
          })}
        </Carousel>
      </div>
      <div className={medicalStyles.mobile}>
        <Carousel
          indicators={true}
          animation={'slide'}
          timeout={800}
          autoPlay={true}
        >
          {sliderNews.map((item, index) => {
            return <SliderMobile item={item} key={index} />
          })}
        </Carousel>
      </div>
      <div className={listingStyles.newslabel}>
        <img src={Bloomerg} className={listingStyles.bloom} />
        <img src={theWashingTimess} className={listingStyles.wash} />
        <img src={theNewYorksTimess} className={listingStyles.newsyork} />
        <img src={theSA} className={listingStyles.SA} />
      </div>

      <div className={medicalStyles.body}>
        <div className={listingStyles.mediaDiv}>
          <div className={listingStyles.filterDivNews}>
            <ChipFilterSelect
              label={'Sorted by Most Recent'}
              className={clsx(
                listingStyles.select,
                listingStyles.mobileNewsFIlter,
              )}
              value={recentFilter}
              onChange={setRecentFilter}
              isDefault={_.isEqual(recentFilter, defaultValueDate)}
              onDelete={() => setRecentFilter(defaultValueDate)}
            >
              <ListItem key={1} id={1} text={'Most Recent'} />
              <ListItem key={2} id={2} text={'Oldest'} />
            </ChipFilterSelect>
            <ChipFilterSelect
              label={'All Topics'}
              className={clsx(listingStyles.select)}
              value={topicFilter}
              onChange={setTopicFilter}
              isDefault={_.isEqual(topicFilter, defaultValue)}
              onDelete={() => setTopicFilter(defaultValue)}
            >
              {uniquetopics.map((ta, index) => (
                <ListItem key={index} id={ta} text={ta} />
              ))}
            </ChipFilterSelect>
          </div>
          <T className={listingStyles.mediaText}>
            Media Contact {' | '} media@nference.net
          </T>
        </div>
        <div className={listingStyles.cardconatiner}>
          {filterNews.map((news, index) => {
            return <CardRender news={news} key={index} />
          })}
        </div>
      </div>
      <div className={medicalStyles.mobile}>
        {filterNews.map((news, index) => {
          return <MobileCardRender news={news} key={index} />
        })}
      </div>
      <div className={medicalStyles.body}>
        <div
          className={clsx(
            listingStyles.Pageconatiner,
            listingStyles.pageButtom,
          )}
        >
          <Pagination
            className={listingStyles.pageination}
            value={pageNumber}
            totalCount={filteredNews.length}
            pageSize={pageSize}
            onChange={setPageNumber}
          />
        </div>
      </div>
    </>
  )
}

export default NewsRoom
