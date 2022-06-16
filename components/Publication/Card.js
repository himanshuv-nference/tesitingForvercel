import styles from '../../public/styles/MedicalStyles'
import PublicationListingStyles from '../../public/styles/PublicationListingStyles'
import { Typography as T } from '@material-ui/core'
import { PrismicRichText } from '@prismicio/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import * as prismicH from '@prismicio/helpers'

export default function CardRender(props) {
  const [show, setShow] = useState(false)
  const seeMore = () => {
    setShow(true)
  }
  const seeLess = () => {
    setShow(false)
  }

  const medicalStyles = styles()
  const listingStyles = PublicationListingStyles()
  return (
    <div className={listingStyles.card}>
      <div className={listingStyles.cardLeft}>
        {props.doc.data.url ? (
          <Link href={props.doc.data.url}>
            <a target="_blank" className={listingStyles.nav}>
              <T className={listingStyles.cardTitle}>
                {prismicH.asText(props.doc.data.title)}
              </T>
            </a>
          </Link>
        ) : (
          <Link href={`/publications/${props.doc.id}`}>
            <a className={listingStyles.nav}>
              <T className={listingStyles.cardTitle}>
                {prismicH.asText(props.doc.data.title)}
              </T>
            </a>
          </Link>
        )}
        <div className={listingStyles.mobilePosted}>
          {props.doc.data.published_in[0].text ? (
            <div className={listingStyles.postedIndiv}>
              <T className={listingStyles.postedIn}>Published in</T>
              <div className={listingStyles.underlineFlex}>
                <T className={clsx(listingStyles.postedIn)}>
                  <PrismicRichText field={props.doc.data.published_in} />
                </T>
                <T className={clsx(listingStyles.postedIn)}>
                  ({props.doc.data.dt_published})
                </T>
              </div>
            </div>
          ) : (
            <div />
          )}
          {props.doc.data.posted_in[0] ? (
            props.doc.data.posted_in[0].text ? (
              <div className={listingStyles.postedIndiv}>
                <T className={listingStyles.postedIn}>Preprint : </T>
                <div className={listingStyles.underlineFlex}>
                  <T className={clsx(listingStyles.postedIn)}>
                    <PrismicRichText field={props.doc.data.posted_in} />
                  </T>
                  <T className={clsx(listingStyles.postedIn)}>
                    ({props.doc.data.dt_posted})
                  </T>
                </div>
              </div>
            ) : (
              <div />
            )
          ) : (
            <div />
          )}

          {props.doc.data.featured_in[0].text ? (
            <div className={listingStyles.postedIndiv}>
              <T
                className={clsx(listingStyles.postedIn, listingStyles.pubflex)}
              >
                Featured in:{' '}
              </T>

              <T className={clsx(listingStyles.postedIn)}>
                <PrismicRichText field={props.doc.data.featured_in} />
              </T>
            </div>
          ) : (
            <div />
          )}
        </div>
        <div className={medicalStyles.desktop}>
          {props.doc.data.cited_by[0] ? (
            props.doc.data.cited_by[0].text ? (
              <div className={listingStyles.postedIndiv}>
                <T
                  className={clsx(
                    listingStyles.postedIn,
                    listingStyles.pubflex,
                  )}
                >
                  Cited by
                </T>
                <T className={clsx(listingStyles.postedIn)}>
                  <PrismicRichText field={props.doc.data.cited_by} />
                </T>
              </div>
            ) : (
              <div />
            )
          ) : (
            <div />
          )}
        </div>
        <T className={listingStyles.authors}>
          <ReactReadMoreReadLess
            charLimit={60}
            readMoreText={'more'}
            readLessText={'less'}
            readMoreClassName={listingStyles.authormore}
            readLessClassName={listingStyles.authormore}
          >
            {props.doc.data.authors}
          </ReactReadMoreReadLess>
        </T>
        {props.doc.data.abstract ? (
          <T className={listingStyles.cardesc}>
            {`${props.doc.data.abstract.substring(0, 300)}....`}
          </T>
        ) : (
          <div />
        )}

        <T className={clsx(listingStyles.cardesc, listingStyles.desktop)}>
          Correspondence to: {props.doc.data.correspondence_to}
        </T>
      </div>
      <div className={medicalStyles.desktop}>
        <div className={listingStyles.cardRight}>
          {/* <div>
            <T className={listingStyles.postedIn}>Use Cases</T>
            {props.doc.data.usecase.map((item, index) => {
              return (
                <div className={listingStyles.usecaseboxes}>
                  <T className={listingStyles.usecaseText}>{item.text}</T>
                </div>
              )
            })}
          </div> */}
          {props.doc.data.therapeutic_area[0].text ? (
            <div>
              <T className={listingStyles.postedIn}>Therapeutic Area</T>
              {props.doc.data.therapeutic_area.map((item, index) => {
                return (
                  <div className={listingStyles.areaboxes}>
                    <T className={listingStyles.usecaseText}>{item.text}</T>
                  </div>
                )
              })}
            </div>
          ) : (
            <div />
          )}
          <div>
            <T className={listingStyles.postedIn}>Institutional Authors</T>
            {props.doc.data.institutional_authors.map((item, index) => {
              return (
                <div className={listingStyles.authboxes}>
                  <T className={listingStyles.usecaseText}>{item.text}</T>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={medicalStyles.mobile}>
        {/* <div className={listingStyles.grid}>
          {props.doc.data.usecase.map((item, index) => {
            return (
              <div className={listingStyles.usecaseboxes}>
                <T className={listingStyles.usecaseText}>{item.text}</T>
              </div>
            )
          })}
        </div> */}
        {props.doc.data.therapeutic_area.map((item, index) => {
          return (
            <div className={listingStyles.areaboxes}>
              <T className={listingStyles.usecaseText}>{item.text}</T>
            </div>
          )
        })}
        <div
          className={clsx({
            [listingStyles.show]: !show,
            [listingStyles.hide]: show,
          })}
          onClick={seeMore}
        >
          <T className={listingStyles.SeeMoreText}>more</T>
        </div>

        <div
          className={clsx({
            [listingStyles.show]: show,
            [listingStyles.hide]: !show,
          })}
        >
          <div className={listingStyles.grid2}>
            {props.doc.data.institutional_authors.map((item, index) => {
              return (
                <div className={listingStyles.authboxes}>
                  <T className={listingStyles.usecaseText}>{item.text}</T>
                </div>
              )
            })}
          </div>
          <div onClick={seeLess}>
            <T className={listingStyles.SeeMoreText}>less</T>
          </div>
        </div>
      </div>
    </div>
  )
}
