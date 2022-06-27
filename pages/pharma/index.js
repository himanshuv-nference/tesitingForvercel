import React from 'react'
import { Typography as T } from '@material-ui/core'
import clsx from 'clsx'

import styles from '../../public/styles/MedicalStyles'
import PharmaStyles from '../../public/styles/PharmaStyles'

import useStyles from '../../public/styles/HomepageStyles'
import Link from 'next/link'
import { useState } from 'react'
import LowerSlider from '../../components/LowerSlider'
import * as prismic from '@prismicio/client'

const logo = '/PharmaPageImages/Group 3963.svg'
const mayologo = '/HomePageImages/Group 2948.svg'
const box1image2 = '/PharmaPageImages/Group 4049.svg'
const box1image3 = '/PharmaPageImages/Group 4050.svg'
const box2image1 = '/PharmaPageImages/Group 3670.svg'
const box2image2 = '/PharmaPageImages/Group 4235.svg'
const discovery = '/PharmaPageImages/Group 3966.svg'
const lifecycle = '/PharmaPageImages/Group 3967.svg'
const trial = '/PharmaPageImages/Group 3968.svg'
const real = '/PharmaPageImages/Group 3969.svg'
const medicine = '/PharmaPageImages/Group 3970.svg'
const intervention = '/PharmaPageImages/Group 3971.svg'
const early = '/PharmaPageImages/Group 3978.svg'
const journey = '/PharmaPageImages/Group 3973.svg'
const drug = '/PharmaPageImages/Group 3977.svg'
const symptoms = '/PharmaPageImages/Group 3976.svg'
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
function ForPharma({ pubInfo }) {
  const medicalStyles = styles()
  const homepageStyles = useStyles()
  const pharmaStyles = PharmaStyles()

  const [show, setShow] = useState(false)

  const seeMore = () => {
    setShow(true)
  }
  const seeLess = () => {
    setShow(false)
  }

  return (
    <>
      <div className={medicalStyles.body}>
        <div className={pharmaStyles.box1}>
          <img src={logo} />
          <T className={medicalStyles.Tophead}>Collaborations for Pharma</T>
          <T className={medicalStyles.TopSub}>
            Our scientists use the nference platform and data in collaboration
            with your teams to tackle your most important questions and
            challenges
          </T>
        </div>
        <div className={pharmaStyles.box2}>
          <div className={pharmaStyles.mayoIcon}>
            <div className={homepageStyles.mayo}>
              <img src={mayologo} />
            </div>
          </div>

          <T className={homepageStyles.box2head}>
            nference is creating the largest labeled EMR dataset in healthcare
          </T>

          <T className={pharmaStyles.box2text}>
            EMR data contains longitudinal real-world, “deep data” rich in
            clinical phenotypes and outcomes spanning across therapeutic areas,
            but exists in largely semi-structured and unstructured form. The
            nference platform powers the transformation of the raw data into a
            labeled EMR dataset.
          </T>

          <div className={pharmaStyles.box2part}>
            <div>
              <img src={box1image2} />

              <T className={homepageStyles.pharmahead}>HARMONIZATION</T>
              <T className={homepageStyles.pharmaText}>
                We leverage our deep biomedical expertise to transform
                semi-structured data (e.g. lab tests, procedures) into
                structured data through technology-enabled data harmonization.
              </T>
            </div>
            <div>
              <img src={box1image3} />
              <T className={homepageStyles.pharmahead}>AUGMENTED CURATION</T>
              <T className={homepageStyles.pharmaText}>
                We build upon state-of-the-art neural networks and Natural
                Language Processing (NLP) methods to transform unstructured
                clinical text (e.g. clinical notes) into structured patient
                features.
              </T>
            </div>
          </div>
        </div>

        <div className={pharmaStyles.box3}>
          <div className={pharmaStyles.box3part1}>
            <T className={medicalStyles.path}>BIOPHARMA COLLABORATIONS</T>
            <T
              className={clsx(pharmaStyles.box3width, pharmaStyles.box3subhead)}
            >
              Triangulation across data and state of the art algorithms power
              collaborations
            </T>
            <T className={clsx(pharmaStyles.box3width, medicalStyles.box2desc)}>
              Connecting structured, harmonized EMR data with publicly available
              literature, molecular and real world datasets and applying our
              powerful proprietary algorithms allows us to ask and answer
              challenging questions
            </T>
          </div>

          <div className={pharmaStyles.box3part2}>
            <div>
              <img src={box2image1} className={pharmaStyles.box3Image} />
              <T className={pharmaStyles.box3head}>
                Triangulation With Public and Proprietary Data
              </T>
              <T className={pharmaStyles.box3desc}>
                Integrating additional data sources with labeled, curated and
                harmonized EMR data can strengthen the insights derived from
                downstream data analysis. This data includes biomedical
                literature (ex. PubMed), clinical trials (ex.
                clinicaltrials.gov) and molecular data (ex. Gene Expression
                Omnibus).
              </T>
            </div>
            <div>
              <img
                src={box2image2}
                className={clsx(
                  pharmaStyles.box3Image,
                  pharmaStyles.box3image2,
                )}
              />
              <T className={pharmaStyles.box3head}>
                State of the art algorithms
              </T>
              <T className={pharmaStyles.box3desc}>
                The labeled, curated and harmonized EMR data serves as a
                starting point that enables training state-of-the-art AI
                algorithms. We develop these algorithms as solutions to some of
                the major challenges in healthcare, including early detection
                and diagnosis of disease, identification of biomarkers for
                disease progression and more.
              </T>
            </div>
          </div>
        </div>
      </div>
      <div className={pharmaStyles.box4}>
        <T className={medicalStyles.path}>
          NFERENCE COLLABORATIONS FOR BIOPHARMA
        </T>
        <T className={clsx(medicalStyles.Tophead, pharmaStyles.box4pad1)}>
          Work with our scientists to tackle hard problems in Pharma R{'&'}D,
          Medical Affairs and Strategy
        </T>
        <T className={clsx(medicalStyles.box2desc, pharmaStyles.box4pad2)}>
          Our scientists will use the nference platform and data in
          collaboration with your teams to tackle the questions and challenges
          most important to you
        </T>
        <div className={pharmaStyles.bo4part3}>
          {/* 

          Desktop view
          */}

          <div className={medicalStyles.desktop}>
            <div>
              <div className={pharmaStyles.box4row}>
                <div>
                  <div className={pharmaStyles.workBox}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>Target discovery</T>
                      <img src={discovery} className={pharmaStyles.box4icons} />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Identify candidate targets with significant evidence for
                      potential therapeutic benefit for a selected indication
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
                <div>
                  <div className={pharmaStyles.workBox}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>Lifecycle Management</T>
                      <img src={lifecycle} className={pharmaStyles.box4icons} />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Evaluate likelihood of drug success pre-launch and
                      identify opportunities for commercialized assets
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
                <div>
                  <div className={pharmaStyles.workBox}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>
                        Clinical Trial Design
                      </T>
                      <img src={trial} className={pharmaStyles.box4icons} />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Build complex patient cohorts using real world EMR data to
                      optimize clinical study criteria and study design. Read our
                      Publication
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
                <div>
                  <div className={pharmaStyles.workBox}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>Real World Outcomes</T>
                      <img src={real} className={pharmaStyles.box4icons} />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Track patient-level outcomes following specific treatments
                      or interventions
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
              </div>
              {/* ROW 2nd */}
              <div className={pharmaStyles.box4row}>
                <div>
                  <div className={pharmaStyles.workBox}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>Precision Medicine</T>
                      <img src={medicine} className={pharmaStyles.box4icons} />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Identify biomarkers or correlates of disease progression
                      or treatment outcomes using our clinico-genomic data which
                      spans therapeutic areas
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
                <div>
                  <div className={pharmaStyles.workBox}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>Early Intervention</T>
                      <img
                        src={intervention}
                        className={pharmaStyles.box4icons}
                      />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Identify indicators of disease or disease progression to
                      support earlier, targeted treatment or intervention
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
                <div>
                  <div className={pharmaStyles.workBox}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>Early Diagnosis</T>
                      <img src={early} className={pharmaStyles.box4icons} />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Leverage the longitudinality of our dataset and power of
                      our technology to identify early predictors of disease
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
                <div>
                  <div className={pharmaStyles.workBox}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>Drug Toxicity</T>
                      <img src={drug} className={pharmaStyles.box4icons} />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Identify drug side effects and understand the populations
                      most susceptible to them based on real world use
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
              </div>
              {/* Row 3rd */}
              <div className={pharmaStyles.box4row}>
                <div>
                  <div className={pharmaStyles.workBox}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>Symptoms</T>
                      <img src={symptoms} className={pharmaStyles.box4icons} />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Identify disease symptoms and understand the populations
                      most susceptible to them
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
                <div>
                  <div className={clsx(pharmaStyles.workBox)}>
                    <div className={pharmaStyles.nameImage}>
                      <T className={medicalStyles.path}>Patient Journey</T>
                      <img src={journey} className={pharmaStyles.box4icons} />
                    </div>
                    <T className={pharmaStyles.box4desc}>
                      Get disease area specific insight on the end-to-end
                      patient journey, leveraging longitudinal patient data
                    </T>
                  </div>
                  <div className={pharmaStyles.separatorDiv}>
                    <div className={pharmaStyles.separator} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 
          Mobile view

           */}
          <div className={medicalStyles.mobile}>
            <div>
              <div className={pharmaStyles.nameImage}>
                <T className={medicalStyles.path}>Target discovery</T>
                <img src={discovery} className={pharmaStyles.box4icons} />
              </div>
              <T className={pharmaStyles.box4desc}>
                Identify candidate targets with significant evidence for
                potential therapeutic benefit for a selected indication
              </T>
            </div>
            <div>
              <div className={pharmaStyles.nameImage}>
                <T className={medicalStyles.path}>Precision Medicine</T>
                <img src={medicine} className={pharmaStyles.box4icons} />
              </div>
              <T className={pharmaStyles.box4desc}>
                Identify biomarkers or correlates of disease progression or
                treatment outcomes using our clinico-genomic data which spans
                therapeutic areas
              </T>
            </div>
            <div>
              <div className={pharmaStyles.nameImage}>
                <T className={medicalStyles.path}>Symptoms</T>
                <img src={symptoms} className={pharmaStyles.box4icons} />
              </div>
              <T className={pharmaStyles.box4desc}>
                Identify disease symptoms and understand the populations most
                susceptible to them
              </T>
            </div>
            <div>
              <div className={pharmaStyles.nameImage}>
                <T className={medicalStyles.path}>Lifecycle Management</T>
                <img src={lifecycle} className={pharmaStyles.box4icons} />
              </div>
              <T className={pharmaStyles.box4desc}>
                Evaluate likelihood of drug success pre-launch and identify
                opportunities for commercialized assets
              </T>
            </div>
            <div
              onClick={seeMore}
              className={clsx({
                [pharmaStyles.show]: !show,
                [pharmaStyles.hide]: show,
              })}
            >
              <T className={clsx(medicalStyles.path, pharmaStyles.underline)}>
                See More
              </T>
            </div>
            <div
              className={clsx({
                [pharmaStyles.hide]: !show,
                [pharmaStyles.show]: show,
              })}
            >
              <div>
                <div>
                  <div className={pharmaStyles.nameImage}>
                    <T className={medicalStyles.path}>Early Intervention</T>
                    <img
                      src={intervention}
                      className={pharmaStyles.box4icons}
                    />
                  </div>
                  <T className={pharmaStyles.box4desc}>
                    Identify indicators of disease or disease progression to
                    support earlier, targeted treatment or intervention
                  </T>
                </div>
                <div>
                  <div className={pharmaStyles.nameImage}>
                    <T className={medicalStyles.path}>Patient Journey</T>
                    <img src={journey} className={pharmaStyles.box4icons} />
                  </div>
                  <T className={pharmaStyles.box4desc}>
                    Get disease area specific insight on the end-to-end patient
                    journey, leveraging longitudinal patient data
                  </T>
                </div>
                <div>
                  <div className={pharmaStyles.nameImage}>
                    <T className={medicalStyles.path}>Clinical Trial Design</T>
                    <img src={trial} className={pharmaStyles.box4icons} />
                  </div>
                  <T className={pharmaStyles.box4desc}>
                    Build complex patient cohorts using real world EMR data to
                    optimize clinical study criteria and study design. Read our
                    Publication
                  </T>
                </div>
                <div>
                  <div className={pharmaStyles.nameImage}>
                    <T className={medicalStyles.path}>Early Diagnosis</T>
                    <img src={early} className={pharmaStyles.box4icons} />
                  </div>
                  <T className={pharmaStyles.box4desc}>
                    Leverage the longitudinality of our dataset and power of our
                    technology to identify early predictors of disease
                  </T>
                </div>
                <div>
                  <div className={pharmaStyles.nameImage}>
                    <T className={medicalStyles.path}>Real World Outcomes</T>
                    <img src={real} className={pharmaStyles.box4icons} />
                  </div>
                  <T className={pharmaStyles.box4desc}>
                    Track patient-level outcomes following specific treatments
                    or interventions
                  </T>
                </div>
                <div>
                  <div className={pharmaStyles.nameImage}>
                    <T className={medicalStyles.path}>Drug Toxicity</T>
                    <img src={drug} className={pharmaStyles.box4icons} />
                  </div>
                  <T className={pharmaStyles.box4desc}>
                    Identify drug side effects and understand the populations
                    most susceptible to them based on real world use
                  </T>
                </div>
              </div>

              <div onClick={seeLess}>
                <T className={clsx(medicalStyles.path, pharmaStyles.underline)}>
                  See Less
                </T>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={medicalStyles.body}>
        <div>
          <div className={medicalStyles.box10part1}>
            <div>
              <T className={pharmaStyles.path}>NFERENCE PUBLICATIONS</T>
              <T className={medicalStyles.box2Subhead}>
                Peer-reviewed publications
              </T>
              <T
                className={clsx(medicalStyles.box2desc, medicalStyles.box8desc)}
              >
                Our partners and clients have used our data and analyses to
                publish insights in a array of academic journals
              </T>
            </div>
          </div>
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
    </>
  )
}

export default ForPharma
