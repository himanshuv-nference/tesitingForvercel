import { fetchPrismicGlobals, prismicClient } from '../../utils/prismic'
import { Page } from '../../components'
import PublicationContents from '../../layouts/Publications/PublicationContents'
import * as prismicH from '@prismicio/helpers'

export default function DynamicPage(props) {
  return (
    <Page {...props}>
      <PublicationContents publication={props.publication} />
    </Page>
  )
}

export async function getStaticPaths() {
  const publications = await prismicClient.getAllByType('publications')
  const ids = publications.map((page) => page.id)
  const paths = ids.map((id) => ({ params: { PublicationID: id } }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { PublicationID: id } = context.params

  const [publication, globals] = await Promise.all([
    prismicClient.getByID(id),
    fetchPrismicGlobals,
  ])

  const content = {
    data: {
      seoTitle: 'nference | ' + prismicH.asText(publication.data.title),
      seoDescription: prismicH.asText(publication.data.summary),
    },
  }

  return {
    props: {
      id,
      content, // must be named content
      publication,
      ...globals,
    },
  }
}
