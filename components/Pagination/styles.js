import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  input: {
    whiteSpace: 'nowrap',
    ...theme.typography.body2,
    padding: [6, 12],
    display: 'inline-block',
    backgroundColor: theme.palette.background.default,
    borderRadius: 40,
    border: 'none',
    minWidth: 50,
    width: 75,
    textAlign: 'center',
    '&:focus': {
      outline: 'none',
    },
    marginRight: theme.pad.xxs,
  },
  text: {
    display: 'flex',
    alignItems: 'center',
    ...theme.typography.body2,
    margin: [0, theme.pad.xs],
  },
  iconButtonWrapper: {
    color: theme.palette.primary.main,

    '&:first-child': {
      marginRight: theme.pad.xxs,
    },
    '&:last-child': {
      marginLeft: theme.pad.xxs,
    },

    // '&:not(:last-child)': {
    //   marginRight: theme.pad.xxs,
    // },
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helperText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: '#8D9EB0',
    ...theme.typography.body2,
    marginTop: theme.pad.xxs,
  },
  dark: {
    backgroundColor: theme.palette.primary.main,
    border: theme.border,
    borderRadius: theme.borderRadius,
    color: theme.palette.common.white,
  },
}))
