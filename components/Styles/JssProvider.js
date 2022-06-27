import React from 'react'
import PropTypes from 'prop-types'
import { create } from 'jss'
import jssExpand from 'jss-plugin-expand'
import { StylesProvider, jssPreset } from '@material-ui/styles'

/*
 * This provider allows us to customize which jss plugins
 * we use beyond the standard set included in material-ui
 * */
const presetPlugins = jssPreset().plugins
const jss = create({
  plugins: [
    ...presetPlugins.slice(0, -2),
    jssExpand(),
    ...presetPlugins.slice(-2),
  ],
})

export default function JssProvider({ children, ...rest }) {
  return (
    <StylesProvider jss={jss} {...rest}>
      {children}
    </StylesProvider>
  )
}

JssProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
