import { Typography as T } from '@material-ui/core'
import styles from '../../public/styles/MedicalStyles'
import { PrismicRichText } from '@prismicio/react'
import Link from 'next/link'
import BlogListingStyles from '../../public/styles/BlogListingStyles'

export default function CardRender(props) {
  const listingStyles = BlogListingStyles()
  const medicalStyles = styles()
  if (props.doc.data.internal) {
    return (
      <>
          <Link href={`/blog/${props.doc.id}`}>
            <a className={listingStyles.nav}>
              <div className={listingStyles.blogCard}>
                <div className={listingStyles.blogLeft}>
                  <div className={listingStyles.newscardhead}>
                    {props.doc.data.blog_date_published ? (
                      <div className={listingStyles.postedIndiv}>
                        <T className={listingStyles.newsDate}>PUBLICATION · </T>
                        <div className={listingStyles.underlineFlex}>
                        <T className={listingStyles.newsDate}>
                            {props.doc.data.blog_date_published}
                          </T>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  <T className={listingStyles.blogTitle}>
                    {props.doc.data.blog_title[0].text}
                  </T>

                  <T className={listingStyles.authorsBlog}>
                    {props.doc.data.blog_post_author}
                  </T>

                  <div className={listingStyles.headline}></div>

                  <T className={listingStyles.blogDesc}>
                    {props.doc.data.blog_brief_summary[0].text}
                  </T>
                </div>
                <div className={listingStyles.partition}></div>
                <div className={listingStyles.newsright}>
                  <img
                    className={listingStyles.newsCardImageBlog}
                    src={props.doc.data.blog_image.url}
                  />
                </div>
              </div>
            </a>
          </Link>
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
          <Link href={props.doc.data.blog_link.url}>
          <a target="_blank" className={listingStyles.nav}>
              <div className={listingStyles.blogCard}>
                <div className={listingStyles.blogLeft}>
                  <div className={listingStyles.newscardhead}>
                    {props.doc.data.blog_date_published ? (
                      <div className={listingStyles.postedIndiv}>
                        <T className={listingStyles.newsDate}>PUBLICATION · </T>
                        <div className={listingStyles.underlineFlex}>
                        <T className={listingStyles.newsDate}>
                            {props.doc.data.blog_date_published}
                          </T>
                        </div>
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>

                  <T className={listingStyles.blogTitle}>
                    {props.doc.data.blog_title[0].text}
                  </T>

                  <T className={listingStyles.authorsBlog}>
                    {props.doc.data.blog_post_author}
                  </T>

                  <div className={listingStyles.headline}></div>

                  <T className={listingStyles.blogDesc}>
                    {props.doc.data.blog_brief_summary[0].text}
                  </T>
                </div>
                <div className={listingStyles.partition}></div>
                <div className={listingStyles.newsright}>
                  <img
                    className={listingStyles.newsCardImageBlog}
                    src={props.doc.data.blog_image.url}
                  />
                </div>
              </div>
            </a>
          </Link>
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
