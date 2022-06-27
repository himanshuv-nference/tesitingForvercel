import { Typography as T } from '@material-ui/core'
import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import useStyles from '../../public/styles/HomepageStyles'
import styles from '../../public/styles/MedicalStyles'
import LowerSlider from '../../components/LowerSlider'
import * as prismic from '@prismicio/client'

const topimage = '/MedicalPageImages/Group 4215.svg'
const box2image1 = '/MedicalPageImages/Group 4196.svg'
const box2image2 = '/MedicalPageImages/Group 3960.svg'
const box3image1 = '/MedicalPageImages/Group 3705.svg'
const box3image2 = '/MedicalPageImages/Deidentification.svg'
const box4image1 = '/MedicalPageImages/Group 3717.svg'
const box4image2 = '/MedicalPageImages/Frame 3314.svg'
const box4image3 = '/MedicalPageImages/Frame 3315.svg'
const box4image4 = '/MedicalPageImages/Group 3749.svg'
const box5image1 = '/MedicalPageImages/Group 3710.svg'
const box5image2 = '/MedicalPageImages/image 60.svg'
const box6image1 = '/MedicalPageImages/Mask Group.svg'
const box7image1 = '/MedicalPageImages/Group 3713.svg'
const box7image2 = '/MedicalPageImages/Group 3950.svg'
const box8image1 = '/MedicalPageImages/Group 3954.svg'
const box8image2 = '/MedicalPageImages/Group 3757.svg'
const box9image1 = '/MedicalPageImages/Group 4194.svg'
const box9image2 = '/MedicalPageImages/Group 4048.svg'
const ncong = '/MedicalPageImages/Frame 1258.png'
const tringul = '/HomePageImages/icon_2.svg'
const signals = '/HomePageImages/icon_3 (1).svg'
const paramanaLogo = '/nference-web/MedicalPageImages/Group4320.svg'
//Data fetching from Prismic
const apiEndpoint = 'https://nference.prismic.io/api/v2'
const accessToken =
  'MC5ZUi1ZbXhJQUFDd0FXY05N.FEXvv73vv73vv70L77-977-977-9bVlJeh8dfO-_vQUpMzEMYO-_ve-_ve-_vVfvv70JS--_vQg' // This is where you would add your access token for a Private repository

const client = prismic.createClient(apiEndpoint, { accessToken })

export async function getStaticProps() {
  const responseforLowerSlider = await client.query(
    prismic.predicate.at('document.type', 'publications'),
  )
  const pubInfo = responseforLowerSlider.results
  return {
    props: {
      pubInfo: pubInfo,
    },
  }
}
function ForMedical({ pubInfo }) {
  const medicalStyles = styles()
  const homepageStyles = useStyles()

  return (
    <>
      <div className={medicalStyles.body}>
        <div className={medicalStyles.box1}>
          <img src={topimage} />
          <T className={medicalStyles.Tophead}>For Medical Centers</T>
          <T className={medicalStyles.TopSub}>
            We offer a vertically integrated, end-to-end solutions and software
            to make the most of your data
          </T>
        </div>
        <div className={medicalStyles.box2}>
          <div>
            <T className={medicalStyles.box2Head}>
              NFERENCE COLLABORATIONS FOR MEDICAL CENTERS
            </T>
            <T className={medicalStyles.box2Subhead}>
              Maximizing your data to improve patient outcomes
            </T>
            <T className={medicalStyles.box2desc}>
              We partner with you to securely process and transform your raw
              unstructured and semi-structured EMR data into structured data
              that can be used to develop solutions to healthcare’s biggest
              challenges
            </T>
          </div>
          <img className={medicalStyles.box2image1} src={box2image1} />
          <img className={medicalStyles.mobile} src={box2image2} />
        </div>
        <div className={medicalStyles.separatorDiv}>
          <div className={medicalStyles.separator} />
        </div>
        <div className={medicalStyles.box3}>
          <div>
            <img src={box3image1} className={medicalStyles.box3image1} />
            <T className={medicalStyles.box3head}>Deidentification</T>
            <T className={medicalStyles.box3subhead}>
              Protecting patient privacy with best in class algorithms
            </T>
            <div className={medicalStyles.box3line}></div>
            <T className={medicalStyles.box3desc}>
              Our approach to privacy is industry-leading, powered by our
              deidentification and “Data Under Glass” methodology. Our
              algorithms are certified best in class for deidentification of
              unstructured free-text. Unlike alternate solutions where copies of
              deidentified patient level data can leave your environment, our
              solution to deidentification ensures that patient level data never
              leaves your center.
            </T>
            <T className={medicalStyles.box3readmore}>
              Read more about the publication [de-id]
            </T>
          </div>
          <img src={box3image2} className={medicalStyles.box3image2} />
        </div>
      </div>
      <div className={medicalStyles.box4body}>
        <div className={medicalStyles.box4}>
          <img src={box4image1} className={medicalStyles.box4image1} />
          <T className={medicalStyles.box3head}>Data Creation</T>
          <T className={medicalStyles.box3subhead}>
            Digitizing pathology and generating sequencing
          </T>
          <div className={medicalStyles.box4line} />
          <div className={medicalStyles.box4part2}>
            <div>
              <div className={medicalStyles.pathdiv}>
                <img src={box4image3} className={medicalStyles.pathImage} />
                <T className={medicalStyles.path}>Pathology</T>
              </div>
              <T
                className={clsx(medicalStyles.box3desc, medicalStyles.desktop)}
              >
                Historically, pathology slides are collected and stored in
                physical form. Though our partners have 10M+ physical pathology
                slides collected over decades, digitization is the first step
                required to enable downstream analysis and applications,
                including training AI models to detect pathologic features. We
                use high-throughput scanning systems that are state-of-the-art
                in both hardware and software, allowing us to digitize archival
                slides.
              </T>
              <T className={clsx(medicalStyles.box3desc, medicalStyles.mobile)}>
                Selecting drug target-disease pairs to try in the clinic can be
                highly subjective and subject-matter driven.{' '}
              </T>
              <img src={paramanaLogo} />
            </div>
            <div>
              <div className={medicalStyles.pathdiv}>
                <img src={box4image2} className={medicalStyles.pathImage} />
                <T className={medicalStyles.path}>Sequencing</T>
              </div>
              <T
                className={clsx(medicalStyles.box3desc, medicalStyles.desktop)}
              >
                Sequencing has already been clinically impactful for disease
                areas such as oncology. We provide clinical-grade sequencing for
                patients at our partner medical centers. Unlike others that
                focus on sequencing panels of genes already known to be
                clinically relevant, we prioritize data generation through whole
                exome and transcriptome sequencing to support platform
                development and discovery of novel molecular phenotypes
                associated with diseases across therapeutic areas.
              </T>
              <T className={clsx(medicalStyles.mobile, medicalStyles.box3desc)}>
                Selecting drug target-disease pairs to try in the clinic can be
                highly subjective and subject-matter driven.{' '}
              </T>
            </div>
            <img src={box4image4} className={medicalStyles.mobile} />
          </div>
        </div>
      </div>
      <div className={medicalStyles.body}>
        <div className={medicalStyles.box5}>
          <div>
            <img src={box5image1} className={medicalStyles.box5image1} />
            <T className={medicalStyles.box3head}>Augmented Curation</T>
            <T className={medicalStyles.box3subhead}>
              Making healthcare data consumable
            </T>
            <div className={medicalStyles.box5line}></div>
            <T className={medicalStyles.box3desc}>
              By transforming unstructured clinical notes data into structured
              form through the extraction of key sentiments and relationships
              from text, our “augmented curation” uses neural networks to
              effectively automaticlaly transform unstructured text from the EMR
              into labeled patient datasets.
            </T>
          </div>
          <img src={box5image2} className={medicalStyles.box5image2} />
        </div>
        <div className={medicalStyles.box6}>
          <img src={box6image1} className={medicalStyles.box5image2} />
          <div>
            <img src={box5image1} className={medicalStyles.box5image1} />
            <T className={medicalStyles.box3head}>Data Harmonization</T>
            <T className={medicalStyles.box3subhead}>
              Making healthcare data consumable
            </T>
            <div className={medicalStyles.box5line}></div>
            <T className={medicalStyles.box3desc}>
              Due to the long and varied history of EMRs, even the structured
              data is complex. For example, the same lab test may be represented
              with multiple distinct codes and use different units of
              measurement. We use software-aided processes to transform this
              semi-structured patient data consisting of distinct data points
              into common unified data variables, which can then be consumed for
              downstream applications and analyses.
            </T>
          </div>
        </div>
        <div>
          <img src={box7image1} className={medicalStyles.box5image1} />
          <T className={medicalStyles.box3head}>Triangulating your data</T>
          <T className={medicalStyles.box3subhead}>
            Improving your data connectivity
          </T>
          <div className={medicalStyles.box7line}></div>
          <div className={medicalStyles.desktop}>
            <div className={medicalStyles.box7part2}>
              <div>
                <T className={medicalStyles.path}>
                  Triangulation with public and proprietary data
                </T>
                <T className={medicalStyles.box3desc}>
                  Integrating additional data sources with labeled, curated and
                  harmonized EMR data can strengthen the insights derived from
                  downstream data analysis. This data includes biomedical
                  literature (ex. PubMed), clinical trials (ex.
                  clinicaltrials.gov) and molecular data (ex. Gene Expression
                  Omnibus).
                </T>
              </div>
              <div>
                <T className={medicalStyles.path}>
                  State of the art algorithms
                </T>
                <T className={medicalStyles.box3desc}>
                  The labeled, curated and harmonized EMR data serves as a
                  starting point that enables training state-of-the-art AI
                  algorithms. We develop these algorithms as solutions to some
                  of the major challenges in healthcare, including early
                  detection and diagnosis of disease, identification of
                  biomarkers for disease progression and more.
                </T>
              </div>
            </div>
          </div>
          <div className={medicalStyles.mobile}>
            <T className={medicalStyles.box3desc}>
              We integrate your processed EMR data with additional public and
              proprietary data sources to provide additional insights through
              the connections made across additional data sources and types.
            </T>
            <img src={box7image2} />
          </div>
        </div>
        <div className={medicalStyles.box6}>
          <img src={box8image2} />
          <div>
            <img src={box8image1} />
            <T className={medicalStyles.box3head}>Compute Solutions</T>
            <T className={medicalStyles.box3subhead}>
              The most secure storage available for healthcare
            </T>
            <div className={medicalStyles.box8line}></div>
            <T className={medicalStyles.box3desc}>
              We provide differentiated compute and storage solutions that
              address the unique needs of healthcare data, with improved
              security and performance advantages over traditional providers.
            </T>
          </div>
        </div>
        <div>
          <T className={medicalStyles.path}>NFERENCE PRODUCTS</T>
          <T className={medicalStyles.box2Subhead}>Software product access</T>
          <T className={clsx(medicalStyles.box2desc, medicalStyles.box8desc)}>
            Medical centers we partner with have access to nference developed
            software built on EMR data
          </T>
          <div className={medicalStyles.box9part2}>
            <img
              src={box9image1}
              height={250}
              className={medicalStyles.desktop}
            />
            <img
              src={box9image2}
              className={clsx(medicalStyles.mobile, medicalStyles.box9image2)}
            />

            <div>
              <div className={medicalStyles.box9line} />
              <T className={medicalStyles.path}>
                Nfer Clinical NSights Software | Our EMR Data Product
              </T>
              <T className={medicalStyles.box3desc}>
                Powered by the largest set of deep, longitudinal de-identified
                clinical data in the world, this suite of sophisticated
                applications and tools unlocks the ability to realize insights
                from both structured and unstructured records of more than 6M+
                patients from our AMC partners, including the Mayo Clinic.{' '}
              </T>
              <T
                className={clsx(
                  medicalStyles.websitetext,
                  medicalStyles.mobile,
                )}
              >
                Learn more -{'>'}
              </T>
            </div>
          </div>
          {/* <div className={medicalStyles.productcontainer2}>
            <div>
              <img src={ncong} />
              <T className={medicalStyles.productname}>NCOGNITO SOFTWARE</T>
              <div className={medicalStyles.ncongLine}></div>
              <T className={medicalStyles.stepdesc}>
                On-demand deidentification of structured and unstructured
                patient data files for research purposes, powered by our same
                best-in-class deidentification methodology.
              </T>
              <T
                className={clsx(
                  medicalStyles.websitetext,
                  medicalStyles.mobile,
                )}
              >
                Learn more -{'>'}
              </T>
            </div>
            <div>
              <img src={signals} className={homepageStyles.productsPhotos} />
              <T className={medicalStyles.productname}>Nfer signals software</T>
              <div className={medicalStyles.signalLine}></div>
              <T className={medicalStyles.stepdesc}>
                Automated real-time synthesis of associated concepts, key
                opinion leaders and clinical activity for any biomedical concept
                based on 110M+ publicly available documents.
              </T>
              <T
                className={clsx(
                  medicalStyles.websitetext,
                  medicalStyles.mobile,
                )}
              >
                Learn more -{'>'}
              </T>
            </div>
            <div>
              <img src={tringul} className={homepageStyles.productsPhotos} />
              <T className={medicalStyles.productname}>
                Nfer Triangulation software
              </T>
              <div className={medicalStyles.tringLine}></div>
              <T className={medicalStyles.stepdesc}>
                Optimize lifecycle management and target discovery through
                unbiased triangulation of literature, molecular and real world
                evidence.
              </T>
              <T
                className={clsx(
                  medicalStyles.websitetext,
                  medicalStyles.mobile,
                )}
              >
                Learn more -{'>'}
              </T>
              <div className={medicalStyles.mobile}>
                <div className={medicalStyles.boximage}>
                  <div className={medicalStyles.allproduct}>
                    <T className={homepageStyles.learnoretext}>
                      See all our Products -{'>'}
                    </T>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* <div className={medicalStyles.box10part1}>
          <div>
            <T className={medicalStyles.path}>NFERENCE PUBLICATIONS</T>
            <T className={medicalStyles.box2Subhead}>
              Co-Authored and Peer Reviewed
            </T>
            <T className={clsx(medicalStyles.box2desc, medicalStyles.box8desc)}>
              nference has authored over a dozen publications with academic
              medical centers such as the Mayo Clinic.
            </T>
          </div>
        </div> */}
      </div>
      <div className={medicalStyles.desktop}>
        <div className={medicalStyles.body}>
          <LowerSlider doc={pubInfo} />
          <div className={medicalStyles.desktop}>
            <div className={homepageStyles.boximage}>
              <Link href="/publications">
                <a className={homepageStyles.nav}>
                  <div className={homepageStyles.allpaper}>
                    <T className={homepageStyles.learnoretext}>
                      See all our papers -{'>'}
                    </T>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={medicalStyles.mobile}>
        <LowerSlider doc={pubInfo} />
      </div>
    </>
  )
}

export default ForMedical
