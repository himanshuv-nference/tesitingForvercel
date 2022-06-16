import { Typography as T } from '@material-ui/core'
import { Drawer } from '@material-ui/core'
import { Icon } from '@material-ui/core'
import React from 'react'

const logo = '/NavbarImages/nferencelognav.svg'
import MenuIcon from '@material-ui/icons/Menu'
import ClearIcon from '@material-ui/icons/Clear'
import clsx from 'clsx'
import useStyles from '../public/styles/NavbarStyles'
import emailjs from 'emailjs-com'
import { useRouter } from 'next/router'
import Link from 'next/link'
import MenuComponent from './MenuComponent'
import { TextField, ButtonBase } from '@material-ui/core'
import NferxModal from './NferxModal/NferxModal'

export default function Navbar() {
  const styles = useStyles()
  const [open, setOpen] = React.useState(false)
  const [thankModal, setThankyoumodal] = React.useState(false)
  const [formData, setFormData] = React.useState({
    company: '',
    title: '',
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  })
  const [errorFormData, setErrorFormData] = React.useState({
    email: false,
  })
  const emailValition = () => {
    return true
  }

  const modalClose = () => setOpen(false)
  const ModalOpen = () => setOpen(true)
  const thankyouModalOpen = () => setThankyoumodal(true)
  const thankyouModalClose = () => setThankyoumodal(false)

  const [state, setState] = React.useState({
    top: false,
  })
  const location = useRouter()
  const { pathname } = location
  const splitLocation = pathname.split('/')

  const toggle = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  const handleSubmit = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      let templateParams = {
        Company: formData.Company,
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
        .then((result) => {
          modalClose()
          thankyouModalOpen()
          setFormData({
            company: '',
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            message: '',
          })
        })
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
    <div className={styles.sticky}>
      <div className={styles.topline}></div>
      <div className={styles.body}>
        <div className={styles.nav}>
          <div className={styles.image}>
            <Link href="/">
              <a>
                <img src={logo} alt={'nference'} />
              </a>
            </Link>
          </div>
          <div className={styles.navItems}>
            <div>
              <Link href="/aboutus">
                <a
                  className={
                    splitLocation[1] === 'aboutus'
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <T>About Us</T>
                </a>
              </Link>
            </div>
            <T>
              <Link href="/pharma">
                <a
                  className={
                    splitLocation[1] === 'pharma'
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  For BioPharma
                </a>
              </Link>
            </T>
            <T>
              <Link href="/medical">
                <a
                  className={
                    splitLocation[1] === 'medical'
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  For Medical Centers
                </a>
              </Link>
            </T>
            <div>
              <Link href="/publications">
                <a
                  className={
                    splitLocation[1] === 'publications'
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <T>Publications</T>
                </a>
              </Link>
            </div>
            <div>
              <MenuComponent
                className={
                  splitLocation[1] === 'news' || splitLocation[1] === 'blog'
                    ? styles.activeLink
                    : styles.link
                }
              />
            </div>
            <div>
              <Link href="/career">
                <a
                  className={
                    splitLocation[1] === 'career'
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <T>Careers</T>
                </a>
              </Link>
            </div>
            {/* <div>
              <Link href="/covid">
                <a
                  className={
                    splitLocation[1] === 'covid'
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <T>Covid</T>
                </a>
              </Link>
            </div> */}

            <div className={styles.selected} onClick={ModalOpen}>
              <T>Contact Us</T>
            </div>
          </div>
          <NferxModal
            contentPad
            className={styles.modal}
            open={open}
            onClose={modalClose}
            noCloseInRight
          >
            <div className={styles.formcontanier}>
              <div className={styles.formbox}>
                <div className={styles.iconDiv}>
                  <Icon onClick={modalClose} className={styles.icon}>
                    <ClearIcon />
                  </Icon>
                </div>
                <div className={styles.formboxFlex}>
                  <div>
                    <T className={styles.contactusText}>Contact Us</T>
                    <T className={styles.formhead}>
                      Let’s talk about how we can work together.
                    </T>
                    <T className={styles.formsub}>
                      Fill out the form and we’ll get right back to you.
                    </T>
                  </div>
                  <div>
                    <form>
                      <div
                        className={clsx(styles.inputname, styles.companyDiv)}
                      >
                        <TextField
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e,
                            })
                          }
                          placeholder={'Company'}
                          variant={'standard'}
                          className={styles.nameInput}
                        />
                        <TextField
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e })
                          }
                          placeholder={'Title'}
                          variant={'standard'}
                          className={styles.nameInput}
                        />
                      </div>
                      <div className={styles.inputname}>
                        <TextField
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e,
                            })
                          }
                          className={styles.nameInput}
                          placeholder={'First Name'}
                          variant={'standard'}
                        />
                        <TextField
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e,
                            })
                          }
                          className={styles.nameInput}
                          placeholder={'Last Name'}
                          variant={'standard'}
                        />
                      </div>
                      <div className={styles.inputemailDiv}>
                        <TextField
                          onChange={(e) =>
                            setFormData({ ...formData, email: e })
                          }
                          value={formData.email}
                          placeholder={'Email'}
                          variant={'standard'}
                          helperText={
                            errorFormData.email
                              ? 'Please give valid email and try again'
                              : null
                          }
                          error={errorFormData.email}
                          className={styles.inputemail}
                        />
                      </div>
                      <div>
                        <TextField
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e,
                            })
                          }
                          value={formData.message}
                          placeholder={'Message'}
                          className={styles.inputmessage}
                          variant={'standard'}
                        />
                      </div>

                      <div className={styles.learnmore} onClick={handleSubmit}>
                        <T className={styles.learnoretext}>Let's Talk</T>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </NferxModal>
          <NferxModal
            contentPad
            className={styles.thankmodal}
            open={thankModal}
            onClose={thankyouModalClose}
            noCloseInRight
          >
            <div>
              <div className={styles.formbox}>
                <div className={styles.iconDiv}>
                  <Icon onClick={thankyouModalClose} className={styles.icon}>
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
          <div className={styles.mobile}>
            <Icon onClick={toggle('top', true)}>
              <MenuIcon />
            </Icon>
            <Drawer
              anchor={'top'}
              open={state['top']}
              onClose={toggle('top', false)}
              onOpen={toggle('top', true)}
            >
              <div className={styles.topline} />
              <div className={styles.logoDiv}>
                <Link href="/">
                  <a>
                    <img className={styles.mobileLogo} src={logo} />
                  </a>
                </Link>
                <Icon onClick={toggle('top', false)}>
                  <ClearIcon />
                </Icon>
              </div>
              <div className={styles.line} />
              <div className={styles.mobileNav}>
                <Link href="/aboutus">
                  <a
                    className={
                      splitLocation[1] === 'aboutus'
                        ? styles.activeLink
                        : styles.link
                    }
                  >
                    <T onClick={toggle('top', false)}>About Us</T>
                  </a>
                </Link>
                <Link href="/pharma">
                  <a
                    className={
                      splitLocation[1] === 'pharma'
                        ? styles.activeLink
                        : styles.link
                    }
                  >
                    <T onClick={toggle('top', false)}>For BioPharma</T>
                  </a>
                </Link>

                <Link href="/medical">
                  <a
                    className={
                      splitLocation[1] === 'medical'
                        ? styles.activeLink
                        : styles.link
                    }
                  >
                    <T onClick={toggle('top', false)}>For Medical Centers</T>
                  </a>
                </Link>

                <Link href="/publications">
                  <a
                    className={
                      splitLocation[1] === 'publications'
                        ? styles.activeLink
                        : styles.link
                    }
                  >
                    <T onClick={toggle('top', false)}>Publications</T>
                  </a>
                </Link>
                <Link href="/news">
                  <a
                    className={
                      splitLocation[1] === 'news'
                        ? styles.activeLink
                        : styles.link
                    }
                  >
                    <T onClick={toggle('top', false)}>News</T>
                  </a>
                </Link>
                <Link href="/blog">
                  <a
                    className={
                      splitLocation[1] === 'blog'
                        ? styles.activeLink
                        : styles.link
                    }
                  >
                    <T onClick={toggle('top', false)}>Blog</T>
                  </a>
                </Link>
                {/* <T onClick={toggle('top', false)}>Careers</T> */}
                {/* <Link href="/covid">
                  <a
                    className={
                      splitLocation[1] === 'covid'
                        ? styles.activeLink
                        : styles.link
                    }
                  >
                    <T onClick={toggle('top', false)}>Covid</T>
                  </a>
                </Link> */}
              </div>
              <div className={styles.selected} onClick={ModalOpen}>
                <ButtonBase onClick={toggle('top', false)}>
                  Contact Us
                </ButtonBase>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  )
}
