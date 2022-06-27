import { Typography as T } from '@material-ui/core'
import styles from '../../public/styles/MedicalStyles'
import PublicationListingStyles from '../../public/styles/PublicationListingStyles'
import * as prismicH from '@prismicio/helpers'
import Link from 'next/link'

export default function SliderMobile(props) {
  const listingStyles = PublicationListingStyles()
  const medicalStyles = styles()
  const { item } = props
  return (
    <>
      <div className={listingStyles.newsmobileContaniner}>
        <div className={listingStyles.newsmobileDatediv}>
          <T className={listingStyles.Slidertop}>{item.data.source_name}</T>
          <T className={listingStyles.sliderDate}>{item.data.published_date}</T>
        </div>
        <T className={listingStyles.SliderTitle}>
          {prismicH.asText(item.data.title)}
        </T>
        <T
          className={listingStyles.sliderDesc}
        >{`${item.data.description.substring(0, 150)}....`}</T>
        <div className={listingStyles.Newsdatediv}>
          <div className={listingStyles.authdiv}>
            <div className={listingStyles.mobileauthcovernews}>
              <T className={listingStyles.sliderAuth}>
                {item.data.news_category}
              </T>
            </div>
          </div>
          <Link href={item.data.news_url}>
            <a className={styles.nav}>
              <T className={listingStyles.readmore}>Read more -{'>'} </T>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
