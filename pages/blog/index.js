import React from 'react'
import { Typography as T } from '@material-ui/core'
import BlogListingStyles from '../../public/styles/BlogListingStyles'

import styles from '../../public/styles/MedicalStyles'
import * as prismic from '@prismicio/client'
import { useState, useEffect } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import _ from 'lodash'
import CardRender from '../../components/Blog/Card'
const apiEndpoint = 'https://nference.prismic.io/api/v2'
const accessToken =
  'MC5ZUi1ZbXhJQUFDd0FXY05N.FEXvv73vv73vv70L77-977-977-9bVlJeh8dfO-_vQUpMzEMYO-_ve-_ve-_vVfvv70JS--_vQg' // This is where you would add your access token for a Private repository

const person1 = '/BlogImages/Group3927.svg' 
const person2 = '/BlogImages/Group1254.svg' 
const client = prismic.createClient(apiEndpoint, { accessToken })

function isLastelement(arr) {
  let lastElement = arr[arr.length - 1]
  return lastElement === undefined ? true : false
}
export async function getStaticProps() {
  let publications = []
  let result = []
  let pageNumber = 1
  do {
    publications = await client.query(
      prismic.predicate.at('document.type', 'nference_blog'),
      { pageSize: 50, page: pageNumber },
    )
    result = [...result, ...publications.results]
    pageNumber++
  } while (!isLastelement(publications.results))
  const pubInfoFilter = result.filter((el) => {
    return el != null && el != ''
  })
  return {
    props: {
      pubInfo: pubInfoFilter,
    },
  }
}

function BlogListing({ pubInfo }) {
  const [allPublications, setallPublications] = useState(pubInfo)
  const [filteredPublications, setFilteredPublications] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setpageSize] = useState(5)
  
  const listingStyles = BlogListingStyles()

  useEffect(() => {
    let filterPublications =[]
    filterPublications =  allPublications.sort(function (a, b) {
      return (
        new Date(b.data.blog_date_published).getTime() -
        new Date(a.data.blog_date_published).getTime()
      )
    })
    setFilteredPublications(filterPublications)
  }, [pageNumber])

  let filterPublications = allPublications
  filterPublications = filterPublications.slice((pageNumber - 1) * 5, pageNumber * 5)

  return (
    <>
      <div className={listingStyles.box1}>
        <T className={listingStyles.nferenceBlog}>nference blog</T>
        <T className={listingStyles.blogWith}>With Ajit Rajasekharan + Venky Soundararajan</T>
        <div style={{display: 'flex', gap: '30px'}}>
          <div className={listingStyles.imageContainer1}>
          <T className={listingStyles.imageContainerText}>Chief Technology Officer</T>
          <img src={person1} className={listingStyles.imageContainerImage}/>
          </div>
          <div className={listingStyles.imageContainer2}>
          <T className={listingStyles.imageContainerText}>Founder, Chief Scientific Officer</T>
          <img src={person2} className={listingStyles.imageContainerImage}/>
          </div>
        </div>
      </div>
      <div className={listingStyles.body}>
        <div className={listingStyles.cardconatiner}>
          {filterPublications.map((allPublications, index) => {
            return <CardRender doc={allPublications} key={index} />
          })}
        </div>

        <div className={listingStyles.Pageconatiner}>
          <Pagination
            className={listingStyles.pageination}
            value={pageNumber}
            totalCount={filteredPublications.length}
            pageSize={pageSize}
            onChange={setPageNumber}
          />
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
}
export default BlogListing
