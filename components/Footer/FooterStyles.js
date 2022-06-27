import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  body: {
    marginLeft: '120px',
    marginRight: '120px',
    ['@media (max-width:780px)']: {
      marginLeft: '16px',
      marginRight: '16px',
    },
  },
  desktop: {
    display: 'block',
    ['@media (max-width:780px)']: {
      display: 'none',
    },
  },
  mobile: {
    display: 'none',
    ['@media (max-width:780px)']: {
      display: 'block',
    },
  },
  footerText: {
    fontSize: '14px',
    fontWeight: 'normal',
    lineHeight: '17px',
    color: '#627181',
    marginBottom: '16px',
  },
  footercontainer: {
    display: 'flex',
    gap: '52px',
  },
  sociallogos: {
    paddingTop: '90px',
  },
  footerlogos: {
    paddingRight: '12px',
  },
  copyrightDesktop: {
    paddingTop: '200px',
    paddingLeft: '45%',
    display: 'block',
    ['@media (max-width:780px)']: {
      paddingTop: '20px',
      paddingLeft: '0px',
      display: 'none',
    },
  },
  copyrightMobile: {
    paddingTop: '200px',
    paddingLeft: '45%',
    display: 'none',
    ['@media (max-width:780px)']: {
      paddingTop: '20px',
      paddingLeft: '0px',
      display: 'block',
    },
  },
  footerhead: {
    marginBottom: '28px',
    marginTop: '96px',
    ['@media (max-width:780px)']: {
      marginTop: '35px',
    },
  },
  formhead: {
    fontSize: '44px',
    fontWeight: '300',
    lineHeight: '150%',
    color: '#0057FF',
    ['@media (max-width:780px)']: {
      fontSize: '22px',
    },
    // textAlign: 'center',
    // paddingRight: '180px',
    // paddingLeft: '180px',
    // marginTop: '32px',
  },
  formsub: {
    fontSize: '24px',
    fontWeight: '300',
    lineHeight: '150%',
    color: '#627181',
    // textAlign: 'center',
    // paddingRight: '180px',
    // paddingLeft: '180px',
    marginTop: '16px',
    marginBottom: '60px',
    ['@media (max-width:780px)']: {
      fontSize: '16px',
      marginTop: '8px',
      marginBottom: '32px',
    },
  },
  formcontanier: {
    background: '#FAFBFC',
    padding: '60px',
    ['@media (max-width:780px)']: {
      padding: '0px',
    },
  },
  formbox: {
    display: 'flex',
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: '#0057FF',
    boxSizing: 'border-box',
    borderRadius: '1px',
    gap: '60px',
    padding: '102px 60px 80px 60px',
    ['@media (max-width:780px)']: {
      flexDirection: 'column',
      gap: '0px',
      padding: '16px',
    },
  },
  thankbox: {
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: '#0057FF',
    boxSizing: 'border-box',
    borderRadius: '1px',
    gap: '60px',
    ['@media (max-width:780px)']: {
      flexDirection: 'column',
      gap: '0px',
      padding: '16px',
    },
  },
  learnoretext: {
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '19px',
    color: '#0057FF',
    textAlign: 'center',
  },
  learnmore: {
    borderRadius: '20px',
    borderStyle: 'solid',
    borderColor: '#0057FF',
    boxSizing: 'border-box',
    borderWidth: '1px',
    textAlign: 'center',
    background: '#FFFFFF',
    maxWidth: '146px',
    padding: '8px 16px 8px 16px',
    marginBottom: '60px',
    ['@media (max-width:780px)']: {
      marginBottom: '28px',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },

  inputname: {
    display: 'flex',
    gap: '18px',
  },
  inputemail: {
    width: '100%',
  },
  inputmessage: {
    width: '100%',
    marginTop: '16px',
    marginBottom: '58px',
  },
  link: {
    textDecorationLine: 'none',
  },
  widthName: {
    width: '200px',
    marginBottom: '16px',
    ['@media (max-width:780px)']: {
      width: '100px',
    },
  },
  thankmodal: {
    margin: 'auto',
    // paddingTop: '13%',

    width: '1128px',

    ['@media (max-width:780px)']: {
      width: '300px',

      height: '80%',
      padding: '0px',
    },
    ['@media (min-width:100000px)']: {
      width: '60%',
    },
  },
  thankyoupad: {
    padding: '145px 5px 100px 45px',
    ['@media (max-width:780px)']: {
      padding: '10px',
    },
  },
  iconDiv: {
    textAlign: 'right',
    paddingTop: '25px',
    paddingRight: '23px',
  },
  icon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  hide: {
    display: 'none',
  },
}))

export default useStyles
