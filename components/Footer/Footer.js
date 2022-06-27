import { Typography as T, Icon, TextField } from '@material-ui/core'
import React from 'react'
import NferxModal from '../NferxModal/NferxModal'
import { useRouter } from 'next/router'
const logo = '/NavbarImages/nferencelognav.svg'
const fbicon = '/FooterImages/Combined-Shape.svg'
const twittericon = '/FooterImages/Combined-Shape (1).svg'
const linkIcon = '/FooterImages/Group 3627.svg'
import ClearIcon from '@material-ui/icons/Clear'
import emailjs from 'emailjs-com'
import Link from 'next/link'
import useStyles from './FooterStyles'

export default function Footer() {
  const location = useRouter()
  const { pathname } = location
  const splitLocation = pathname.split('/')
  const styles = useStyles()
  const [formData, setFormData] = React.useState({
    company: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [thankModal, setThankyoumodal] = React.useState(false)
  const thankyouModalOpen = () => setThankyoumodal(true)
  const thankyouModalClose = () => setThankyoumodal(false)
  const [errorFormData, setErrorFormData] = React.useState({
    email: false,
  })

  const handleSubmit = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      let templateParams = {
        Company: formData.company,
        Title: formData.title,
        FirstName: formData.firstName,
        LastName: formData.lastName,
        email: formData.email,
        message: formData.message,
        url: window.location.href,
      }

      emailjs
        .send(
          'service_el2cvyo',
          'template_3duokn9',
          templateParams,
          'user_805xdXJj2kUpbZjzH67Gx',
        )
        .then(
          (result) => {
            thankyouModalOpen()

            setFormData({
              company: '',
              title: '',
              firstName: '',
              lastName: '',
              email: '',
              message: '',
            })
          },
          (error) => {
            console.log('formerror', error.text)
          },
        )
    } else {
      setErrorFormData((prev) => {
        return {
          ...prev,
          email: true,
        }
      })
    }
  }

  return (
    <div>
      <div
        className={splitLocation[1] === 'career' ? styles.hide : styles.none}
      >
        <div className={styles.formcontanier}>
          <div className={styles.formbox}>
            <div>
              <T className={styles.formhead}>
                Let’s talk about how we can work together.
              </T>
              <T className={styles.formsub}>
                Fill out the form and we’ll get right back to you.
              </T>
            </div>
            <div>
              <div className={styles.inputname}>
                <TextField
                  id={'company'}
                  placeholder={'Company'}
                  variant={'standard'}
                  className={styles.widthName}
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
                <TextField
                  id={'title'}
                  placeholder={'Title'}
                  variant={'standard'}
                  className={styles.widthName}
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className={styles.inputname}>
                <TextField
                  id={'first_name'}
                  placeholder={'First Name'}
                  variant={'standard'}
                  value={formData.firstName}
                  className={styles.widthName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <TextField
                  id={'last_name'}
                  placeholder={'Last Name'}
                  variant={'standard'}
                  className={styles.widthName}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div>
                <TextField
                  id={'email'}
                  placeholder={'Email'}
                  variant={'standard'}
                  className={styles.inputemail}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  helperText={
                    errorFormData.email
                      ? 'Please give valid email and try again'
                      : null
                  }
                  error={errorFormData.email}
                />
              </div>
              <div>
                <TextField
                  id={'message'}
                  placeholder={'Message'}
                  variant={'standard'}
                  className={styles.inputmessage}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e })}
                />
              </div>

              <div className={styles.learnmore} onClick={handleSubmit}>
                <T className={styles.learnoretext}>Let’s talk -{'>'}</T>
              </div>
              <NferxModal
                contentPad
                className={styles.thankmodal}
                open={thankModal}
                onClose={thankyouModalClose}
                noCloseInRight
              >
                <div className={styles.formcontanier}>
                  <div className={styles.thankbox}>
                    <div className={styles.iconDiv}>
                      <Icon
                        onClick={thankyouModalClose}
                        className={styles.icon}
                      >
                        <ClearIcon />
                      </Icon>
                    </div>

                    <div className={styles.thankyoupad}>
                      <T className={styles.formhead}>Thank You!</T>
                      <T className={styles.formsub}>
                        Our team will contact you soon
                      </T>
                    </div>
                  </div>
                </div>
              </NferxModal>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div>
          <img className={styles.footerhead} src={logo} />
          <div className={styles.footercontainer}>
            <div>
              <Link href="/privacy-policy">
                <a className={styles.link}>
                  <T className={styles.footerText}>Privacy policy</T>
                </a>
              </Link>
              <Link href="/terms-of-use">
                <a className={styles.link}>
                  <T className={styles.footerText}>Terms of Use</T>
                </a>
              </Link>
              {/* <T className={styles.footerText}>Trademark</T> */}
              <div className={styles.sociallogos}>
                {/* <img className={styles.footerlogos} src={fbicon} /> */}
                <Link href="https://twitter.com/_nference">
                  <a className={styles.link}>
                    <img className={styles.footerlogos} src={twittericon} />
                  </a>
                </Link>
                <Link href="https://www.linkedin.com/company/nference">
                  <a className={styles.link}>
                    <img className={styles.footerlogos} src={linkIcon} />
                  </a>
                </Link>
              </div>
            </div>
            <div>
              <Link href="/aboutus">
                <a className={styles.link}>
                  <T className={styles.footerText}>About Us</T>
                </a>
              </Link>
              <Link href="/pharma">
                <a className={styles.link}>
                  <T className={styles.footerText}>For BioPharma</T>
                </a>
              </Link>
              <Link href="/medical">
                <a className={styles.link}>
                  <T className={styles.footerText}>For Medical Centers</T>
                </a>
              </Link>
              <Link href="/publications">
                <a className={styles.link}>
                  <T className={styles.footerText}>Publications</T>
                </a>
              </Link>
              <Link href="/news">
                <a className={styles.link}>
                  <T className={styles.footerText}>Media</T>
                </a>
              </Link>
              <Link href="/career">
                <a className={styles.link}>
                  <T className={styles.footerText}>Careers</T>
                </a>
              </Link>
              <Link href="/blog">
                <a className={styles.link}>
                  <T className={styles.footerText}>Blog</T>
                </a>
              </Link>
              {/* <Link href="/covid">
                <a className={styles.link}>
                  <T className={styles.footerText}>Covid</T>
                </a>
              </Link> */}

              {/* <NavLink to="/"" ><T className={styles.footerText}>Contact Us</T> */}
            </div>

            <div className={styles.copyrightDesktop}>
              <T className={styles.footerText}>
                @{new Date().getFullYear()} nference, Inc. All rights reserved.
              </T>
            </div>
          </div>
          <div className={styles.mobile}>
            <div className={styles.copyrightMobile}>
              <T className={styles.footerText}>
                @{new Date().getFullYear()} nference, Inc. All rights reserved.
              </T>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
