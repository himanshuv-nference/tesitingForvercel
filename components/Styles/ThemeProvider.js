import React from 'react'
import PropTypes from 'prop-types'
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'

function computeTheme(primaryColor = '#3367d6', appBg) {
  /*
   * Here we create a default material-ui theme
   * for the strict purpose of being able to use it's
   * variables while creating our own theme
   * */
  const t = createTheme({})

  const textColor = '#1A2530'
  const textColorLight = '#6C7987'
  const textColorMedium = '#5f6368'

  const shadows = t.shadows.map((s) => {
    return s
      .replace('0.2', '0.1')
      .replace('0.14', '0.07')
      .replace('0.12', '0.06')
  })

  const hoverBg = 'rgba(0, 0, 0, 0.08)'

  const borderRadius = 6

  const spacing = 8

  t.pad = {
    xxs: spacing / 2,
    xs: spacing,
    sm: spacing * 2,
    md: spacing * 4,
    lg: spacing * 6,
    xl: spacing * 10,
  }

  t.typography.fontFamily = '"Inter", "Helvetica", "Arial", sans-serif'

  const borderColor = '#C3CED9'

  const theme = createTheme({
    palette: {
      surface: {
        primary: '#FFFFFF',
        secondary: '#F5F7FA',
      },
      appTitleGray: '#627181',

      primary: {
        main: primaryColor,
      },

      secondary: {
        main: t.palette.secondary.main,
      },

      tertiary: {
        main: '#C3CED9',
      },

      borderColor,
      borderColorDark: '#6C7987',

      background: {
        globalBg: appBg || '#F5F7FA',
        default: '#F5F7FA',
        highlight: '#ebfaff',
        dark: '#EEEEEE',
        hover: hoverBg,
      },

      collectionColors: ['#00C853', '#FF9100', '#925cc7', '#eb268c'],

      warmColorScheme: [
        '#00b0f0',
        '#1565C0',
        '#925cc7',
        '#eb268c',
        '#ff6d19',
        '#ffba32',
      ],
      coolColorScheme: ['#00B8D4', '#00C853', '#00BFA5', '#FF9100', '#FFC400'],

      success: {
        light: '#C8E6C9',
        main: '#4CAF50',
        dark: '#2E7D32',
      },

      warning: {
        light: '#F2CD5D',
        main: '#F9A825',
        dark: '#D76A03',
      },

      error: {
        main: '#E53835',
        dark: '#C30805',
      },

      divider: 'rgba(0,0,0,0.1)',
    },

    pad: t.pad,

    typography: {
      color: textColor,
      colorLight: textColorLight,
      fontFamily: t.typography.fontFamily,
      fontSize: 14,
      fontSizeLg: 16,
      fontSizeSm: 12,

      h1: {
        fontSize: 36,
        lineHeight: 1.2,
        marginLeft: 0,
        fontWeight: 400,
        color: textColor,
        fontFamily: t.typography.fontFamily,
      },

      h2: {
        fontSize: 28,
        fontWeight: 400,
        lineHeight: 1.2,
        marginLeft: 0,
        color: textColor,
        fontFamily: t.typography.fontFamily,
      },

      h3: {
        fontSize: 24,
        color: textColor,
        lineHeight: 1.2,
        fontWeight: 600,
        fontFamily: t.typography.fontFamily,
      },

      h4: {
        fontSize: 22,
        color: textColor,
        fontWeight: 500,
        lineHeight: 1.2,
        fontFamily: t.typography.fontFamily,
      },

      h5: {
        fontSize: 20,
        color: textColor,
        fontWeight: 600,
        marginLeft: 0,
        lineHeight: 1.2,
        fontFamily: t.typography.fontFamily,
      },

      h6: {
        fontSize: 18,
        color: textColor,
        fontWeight: 500,
        lineHeight: 1.2,
        fontFamily: t.typography.fontFamily,
      },

      subtitle1: {
        fontSize: 16,
        color: textColor,
        fontWeight: 500,
        lineHeight: 1.2,
        fontFamily: t.typography.fontFamily,
      },

      subtitle2: {
        fontSize: 14,
        color: textColor,
        fontWeight: 500,
        lineHeight: 1.2,
        fontFamily: t.typography.fontFamily,
      },

      body1: {
        fontSize: 16,
        lineHeight: 1.6,
        fontFamily: t.typography.fontFamily,
      },

      body2: {
        lineHeight: 1.6,
        fontSize: 14,
        color: textColor,
        fontFamily: t.typography.fontFamily,
      },

      body3: {
        lineHeight: 1.6,
        fontSize: 12,
        color: textColor,
        fontFamily: t.typography.fontFamily,
        fontWeight: 400,
      },

      caption: {
        color: textColorLight,
        fontSize: 14,
        lineHeight: 1.6,
        fontFamily: t.typography.fontFamily,
        fontWeight: 400,
      },

      code: {
        fontSize: t.typography.fontSize,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
        backgroundColor: 'rgba(255,229,100,0.1)',
        color: t.palette.text.primary,
        display: 'inline',
        padding: 2,
        borderRadius: 2,
        whiteSpace: 'pre',
        fontWeight: 400,
      },

      error: {
        lineHeight: 1.6,
        fontSize: 14,
        color: t.palette.error.main,
        fontFamily: t.typography.fontFamily,
        fontWeight: 400,
      },

      appTitle: {
        fontSize: 20,
        fontWeight: t.typography.fontWeightLight,
        marginLeft: 0,
        letterSpacing: '-0.03em',
        color: textColorLight,
        lineHeight: 1,
        fontFamily: t.typography.fontFamily,
      },

      eyebrow: {
        fontSize: 11,
        lineHeight: 1.2,
        letterSpacing: '0.075em',
        fontWeight: 500,
        fontFamily: t.typography.fontFamily,
        textTransform: 'uppercase',
      },
    },

    iconSize: {
      xs: 12,
      sm: 18,
      md: 21,
      lg: 36,
    },

    maxContentWidth: t.breakpoints.values.md,

    sectionWidth: {
      sm: 780,
      md: 920,
      lg: 1220,
    },

    borderRadius,
    appBarHeight: 50,
    border: `1px solid ${borderColor}`,

    shadows,

    overflowEllipsis: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },

    overrides: {
      MuiInputBase: {
        root: {
          fontSize: 14,
        },
      },
      MuiTooltip: {
        tooltip: {
          fontSize: 12,
          color: t.typography.color,
          fontWeight: t.typography.fontWeightRegular,
          backgroundColor: '#FFF',
          boxShadow: t.shadows[2],
          overflow: 'hidden',
          maxWidth: 450,
        },
        popper: {
          opacity: 1,
        },
      },
      MuiListItemIcon: {
        root: {
          marginRight: spacing,
        },
      },
      MuiChip: {
        label: {
          fontSize: 13,
          fontWeight: 500,
        },
      },
      MuiFormGroup: {
        root: {
          flexWrap: 'nowrap',
        },
      },
      MuiFormControl: {
        root: {
          flexShrink: 0, //fix bug when inside an overflow: auto container
        },
      },
      MuiFormControlLabel: {
        root: {
          flexShrink: 0, //fix bug when inside an overflow: auto container
        },
      },
      MuiPaper: {
        rounded: {
          borderRadius,
        },
      },
      MuiIconButton: {
        root: {
          padding: t.pad.xs,
          flexShrink: 0,
        },
      },
      PrivateSwitchBase: {
        root: {
          padding: [9, '!important'],
        },
      },
      PrivateValueLabel: {
        offset: {
          color: 'inherit',
        },
      },
      MuiSwitch: {
        switchBase: {
          color: ['#fafafa', '!important'],
          padding: '9px !important',
        },
        colorPrimary: {
          '&$checked': {
            color: [primaryColor, '!important'],
          },
        },
        colorSecondary: {
          '&$checked': {
            color: [primaryColor, '!important'],
          },
        },
      },
      MuiFormHelperText: {
        root: {
          fontSize: 12,
        },
      },
    },

    tabHeight: 32,

    props: {
      MuiWithWidth: {
        initialWidth: 'xs',
      },
    },
  })

  return theme
}

const computedTheme = computeTheme()

function ThemeProvider(props) {
  const { children } = props

  return <MuiThemeProvider theme={computedTheme}>{children}</MuiThemeProvider>
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThemeProvider
