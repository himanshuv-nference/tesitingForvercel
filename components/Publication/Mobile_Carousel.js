import styles from '../../public/styles/MedicalStyles'
import PublicationListingStyles from '../../public/styles/PublicationListingStyles'
import { Typography as T } from '@material-ui/core'
import * as prismicH from '@prismicio/helpers'
import Link from 'next/link'

export default function SliderMobile(props) {
  const listingStyles = PublicationListingStyles()
  const { item } = props

  return (
    <>
      <div className={listingStyles.mobileContaniner}>
        <div className={listingStyles.mobileDatediv}>
          <T className={listingStyles.Slidertop}>FEATURED</T>
          <T className={listingStyles.sliderDate}>{item.data.dt_published}</T>
        </div>
        <T className={listingStyles.SliderTitle}>
          {prismicH.asText(item.data.title)}
        </T>
        {item.data.abstract ? (
          <T
            className={listingStyles.sliderDesc}
          >{`${item.data.abstract.substring(0, 150)}....`}</T>
        ) : (
          <div />
        )}

        <div className={listingStyles.datediv}>
          <div className={listingStyles.authdiv}>
            {item.data.institutional_authors.map((item, index) => {
              return (
                <div className={listingStyles.mobileauthcover}>
                  <T className={listingStyles.sliderAuth}>{item.text}</T>
                </div>
              )
            })}
          </div>
          <Link href={`publications/${item.id}`}>
            <a className={styles.nav}>
              <T className={listingStyles.readmore}>Read more -{'>'} </T>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}
