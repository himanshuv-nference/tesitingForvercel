import React from 'react'
import styles from '../../public/styles/MedicalStyles'
import PharmaStyles from '../../public/styles/PharmaStyles'
import CovidStyles from '../../public/styles/CovidpageStyles'
import clsx from 'clsx'
const logo = '/CovidPageImages/Group 4221.svg'
const topImage = '/nference-web/CovidPageImages/Frame4087.svg'
const info = '/nference-web/CovidPageImages/info.svg'
import T from '@material-ui/core/Typography'
import * as prismic from '@prismicio/client'
import { useState } from 'react'
import DesktopCard from '../../components/Covid/Desktop_Card'
import MobileCard from '../../components/Covid/Mobile_Card'
import TopCard from '../../components/Covid/TopCard'
import CovidTable from '../../components/Covid/CovidTable'

const apiEndpoint = 'https://nference.prismic.io/api/v2'
const accessToken =
  'MC5ZUi1ZbXhJQUFDd0FXY05N.FEXvv73vv73vv70L77-977-977-9bVlJeh8dfO-_vQUpMzEMYO-_ve-_ve-_vVfvv70JS--_vQg' // This is where you would add your access token for a Private repository

const client = prismic.createClient(apiEndpoint, { accessToken })

export async function getStaticProps() {
  // const responseforCard = await client.query(
  //   prismic.predicate.at('document.type', 'covid_page'),
  // )
  // const responseforTopcard = await client.query(
  //   prismic.predicate.at('document.type', 'covid_page_card'),
  // )

  // const Card = responseforTopcard.results
  // const covidInfo = responseforCard.results

  return {
    props: {
      // covidInfo: covidInfo,
      // Card: Card,
    },
  }
}

function Covid({ apps }) {
  // const [cardData, setcardData] = useState(Card)

  // data.sort(function (a, b) {
  //   return (
  //     new Date(b.data.date_and_time).getTime() -
  //     new Date(a.data.date_and_time).getTime()
  //   )
  // })
  // console.log('selected', selected)

  return (
    <>
      {/* <div className={medicalStyles.body}>
        <div className={pharmaStyles.box1}>
          <img src={logo} />
          <T className={style.Tophead}>
            FROM SCIENTIFIC DISCOVERY TO PUBLIC HEALTH POLICY IN 25 DAYS
          </T>
          <T className={style.TopSub}>
            Monitoring Real-world Evidence in Real-time
          </T>
        </div>
      </div>
      <div className={clsx(medicalStyles.body, medicalStyles.desktop)}>
        {cardData.map((data, index) => {
          return <TopCard cardData={data} key={index} />
        })}
      </div>
      <div className={clsx(medicalStyles.mobile)}>
        {cardData.map((data, index) => {
          return <TopCard cardData={data} key={index} />
        })}
      </div>

      <div className={clsx(medicalStyles.desktop, medicalStyles.body)}>
        <div className={style.cardContainer}>
          {data.map((data, index) => {
            return <DesktopCard Covid={data} key={index} />
          })}
        </div>
      </div>
      <div className={clsx(medicalStyles.mobile, style.mobileCardConatiner)}>
        {data.map((data, index) => {
          return <MobileCard Covid={data} key={index} />
        })}
      </div> */}
    </>
  )
}

export default Covid
