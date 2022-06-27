import React from 'react'
import TermsStyle from '../public/styles/termsStyle'
import { Typography as T } from '@material-ui/core'
import * as prismic from '@prismicio/client'
import { PrismicRichText } from '@prismicio/react'

const apiEndpoint = 'https://nference.prismic.io/api/v2'
const accessToken =
  'MC5ZUi1ZbXhJQUFDd0FXY05N.FEXvv73vv73vv70L77-977-977-9bVlJeh8dfO-_vQUpMzEMYO-_ve-_ve-_vVfvv70JS--_vQg' // This is where you would add your access token for a Private repository

const client = prismic.createClient(apiEndpoint, { accessToken })

export async function getStaticProps() {
  const response = await client.query(
    prismic.predicate.at('document.type', 'terms_and_policy'),
  )
  let data = response.results.filter(
    (x) => x.data.name === 'Nference-Terms-of-us',
  )
  return {
    props: {
      info: data,
    },
  }
}

function Termsofuse({ info }) {
  const style = TermsStyle()

  return (
    <div>
      <T className={style.head}>Terms of Use</T>
      <T className={style.subHead}>NFERENCE, INC.</T>
      <T className={style.content}>
        <PrismicRichText field={info[0].data.content} />
      </T>
    </div>
  )
}

export default Termsofuse
