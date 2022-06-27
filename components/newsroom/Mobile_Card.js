import { Typography as T } from '@material-ui/core'
import styles from '../../public/styles/MedicalStyles'
import PublicationListingStyles from '../../public/styles/PublicationListingStyles'
import * as prismicH from '@prismicio/helpers'
import Link from 'next/link'

export default function MobileCardRender(props) {
  const listingStyles = PublicationListingStyles()
  const medicalStyles = styles()
  const { news } = props
  return (
    <>
      <div className={medicalStyles.mobile}>
        <Link href={news.data.news_url.url}>
          <a className={listingStyles.nav}>
            <div className={listingStyles.newsCard}>
              <div className={listingStyles.mobileLeft}>
                {/* <T className={listingStyles.newsSource}>{news.data.news_category}</T> */}
                <T className={listingStyles.newsSource}>
                  {news.data.source_name}
                </T>

                <T className={listingStyles.newsTitle}>
                  {prismicH.asText(news.data.title).slice(0, 96) + '...'}
                </T>

                <div className={listingStyles.Carddatediv}>
                  <div className={listingStyles.mobileauthcovernews}>
                    <T className={listingStyles.sliderAuth}>
                      {news.data.news_category}
                    </T>
                  </div>
                  <T className={listingStyles.newsDate}>
                    {news.data.published_date}
                  </T>
                </div>
              </div>
              <div className={listingStyles.mobileRight}>
                <img
                  className={listingStyles.newsCardImage}
                  src={news.data.news_image.url}
                />
              </div>
            </div>
          </a>
        </Link>
      </div>
      <style jsx global>{`
        a {
          color: #1c2329 !important;
          text-decoration: none !important;
        }
      `}</style>
    </>
  )
}
