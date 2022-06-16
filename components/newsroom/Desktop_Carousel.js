import { Typography as T } from '@material-ui/core'
import styles from '../../public/styles/MedicalStyles'
import PublicationListingStyles from '../../public/styles/PublicationListingStyles'
import * as prismicH from '@prismicio/helpers'

export default function Slider(props) {
  const listingStyles = PublicationListingStyles()
  const medicalStyles = styles()
  const { item } = props
  return (
    <>
      <div className={listingStyles.slidercontainer}>
        <img src={item.data.news_image.url} className={listingStyles.sample} />
        <div>
          <T className={listingStyles.Slidertop}>{item.data.source_name}</T>
          <T className={listingStyles.SliderTitle}>
            {prismicH.asText(item.data.title)}
          </T>
          <T
            className={listingStyles.sliderDesc}
          >{`${item.data.description.substring(0, 300)}....`}</T>

          <T className={listingStyles.sliderDate}>{item.data.published_date}</T>
        </div>
      </div>
    </>
  )
}
