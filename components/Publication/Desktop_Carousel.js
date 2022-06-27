import PublicationListingStyles from '../../public/styles/PublicationListingStyles'
import { Typography as T } from '@material-ui/core'
import { PrismicRichText } from '@prismicio/react'
import clsx from 'clsx'
import * as prismicH from '@prismicio/helpers'

export default function Slider(props) {
  const listingStyles = PublicationListingStyles()
  const { item } = props

    return (
      <>
        <div className={listingStyles.slidercontainer}>
          {item.data.paper_image.url ? (
            <img
              src={item.data.paper_image.url}
              className={listingStyles.sample}
            />
          ) : (
            <div />
          )}

          <div>
            <T className={listingStyles.Slidertop}>FEATURED</T>
            <T className={listingStyles.SliderTitle}>
              {prismicH.asText(item.data.title)}
            </T>
            {item.data.abstract ? (
              <T
                className={listingStyles.sliderDesc}
              >{`${item.data.abstract.substring(0, 300)}....`}</T>
            ) : (
              <div />
            )}

            <div className={listingStyles.datediv}>
              <div className={listingStyles.authdiv}>
                <T className={listingStyles.sliderAuth}>Authored by:</T>
                {item.data.institutional_authors.map((item, index) => {
                  return (
                    <div className={listingStyles.authcover}>
                      <T className={listingStyles.sliderAuth}>{item.text}</T>
                    </div>
                  )
                })}
              </div>
              <div className={listingStyles.Date}>
                <T className={listingStyles.sliderDate}>
                  {item.data.dt_published}
                </T>
              </div>
            </div>
            <div className={listingStyles.logosDiv}>
              {item.data.body[0] ? (
                item.data.body[0].items.map((logo, index) => {
                  return (
                    <div className={listingStyles.logoMargin}>
                      <img
                        src={logo.image_carousel.url}
                        className={listingStyles.logos}
                      />
                    </div>
                  )
                })
              ) : (
                <div />
              )}
            </div>
            <div className={listingStyles.authdiv}>
              {' '}
              <T className={listingStyles.sliderAuth}>Featured in:</T>{' '}
              <T className={clsx(listingStyles.sliderAuth)}>
                <PrismicRichText field={item.data.featured_in} />
              </T>
            </div>
            {/* <div className={listingStyles.authdiv}>
            {' '}
            <T className={listingStyles.sliderAuth}>Cited by:</T>
            <T
              className={clsx(
                listingStyles.underline,
                listingStyles.sliderAuth,
              )}
            >
              {PrismicRichText.render(item.data.cited_by)}
            </T>
          </div> */}
          </div>
        </div>
      </>
    )
}
