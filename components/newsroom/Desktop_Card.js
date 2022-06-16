import { Typography as T } from '@material-ui/core'
import styles from '../../public/styles/MedicalStyles'
import PublicationListingStyles from '../../public/styles/PublicationListingStyles'
import * as prismicH from '@prismicio/helpers'
import Link from 'next/link'

export default function CardRender(props) {
  const listingStyles = PublicationListingStyles()
  const medicalStyles = styles()
  const { news } = props
  if (news.data.internal) {
    return (
      <>
        <div className={medicalStyles.desktop}>
          <Link href={`/news/${news.id}`}>
            <a className={listingStyles.nav}>
              <div className={listingStyles.newsCard}>
                <div className={listingStyles.newsleft}>
                  <div className={listingStyles.newscardhead}>
                    <T className={listingStyles.newsSource}>
                      {news.data.news_category}
                    </T>
                    {news.data.source_name ? (
                      <T className={listingStyles.newsSource}>
                        ·{news.data.source_name}
                      </T>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <T className={listingStyles.newsTitle}>
                    {prismicH.asText(news.data.title)}
                  </T>

                  <T className={listingStyles.newsDesc}>
                    {news.data.description}
                  </T>
                  <T className={listingStyles.newsDate}>
                    {news.data.published_date}
                  </T>
                </div>
                <div className={listingStyles.newsright}>
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
  } else {
    return (
      <>
        <div className={medicalStyles.desktop}>
          <Link href={news.data.news_url.url}>
            <a className={listingStyles.nav}>
              <div className={listingStyles.newsCard}>
                <div className={listingStyles.newsleft}>
                  <div className={listingStyles.newscardhead}>
                    <T className={listingStyles.newsSource}>
                      {news.data.news_category}
                    </T>
                    {news.data.source_name ? (
                      <T className={listingStyles.newsSource}>
                        ·{news.data.source_name}
                      </T>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <T className={listingStyles.newsTitle}>
                    {prismicH.asText(news.data.title)}
                  </T>

                  <T className={listingStyles.newsDesc}>
                    {news.data.description}
                  </T>
                  <T className={listingStyles.newsDate}>
                    {news.data.published_date}
                  </T>
                </div>
                <div className={listingStyles.newsright}>
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
}
