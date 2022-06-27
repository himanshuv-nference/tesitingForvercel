import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

function HighlightText(props) {
  const { children, match, render, renderNonMatches, matchType } = props
  if (!match) return children
  const replace = Array.isArray(match) ? match : [match]
  if (!replace.length) return children

  function renderString(children) {
    // we want to match longer terms with higher precedence than shorter terms
    // eg. if both 'imatinib' and 'imatinib mesylate' are terms, we want to give precedence to 'imatinib mesylate'
    const sorted = replace.sort((a, b) => b.length - a.length)
    const matchStrings = sorted
      .map(_.escapeRegExp)
      .map(i => i.replace(/-|_| /g, '[-_ ]')) // underscores, dashes & spaces should match alike
    let regex = matchStrings.join('|')
    switch (matchType) {
      case 'token':
        regex = `\\b${matchStrings.join('\\b|\\b')}\\b`
        break
      case 'prefix':
        regex = `^${matchStrings.join('|^')}`
        break
      case 'word-prefix':
        regex = `\\b${matchStrings.join('|\\b')}`
        break
    }
    const ret = []
    const split = children.split(new RegExp(regex, 'ig'))
    const matches = children.match(new RegExp(regex, 'ig'))
    let matchIndex = 0
    split.forEach((str, i) => {
      if (str) ret.push(renderNonMatches({ text: str }))
      if (i < split.length - 1) {
        const text = matches[matchIndex]
        matchIndex++
        let replacer = null
        for (let i = 0; i < matchStrings.length; i++) {
          const re = new RegExp(matchStrings[i], 'i')
          if (re.test(text)) {
            replacer = sorted[i]
            break
          }
        }
        ret.push(render({ text, match: replacer }))
      }
    })

    // ensure each item has a key...
    return ret.map((s, i) => {
      if (typeof s === 'string') {
        return <span key={i}>{s}</span>
      }
      return React.cloneElement(s, { key: i })
    })
  }

  return (
    <>
      {React.Children.map(children, child => {
        if (typeof child === 'string') return renderString(child)
        return child
      })}
    </>
  )
}

HighlightText.propTypes = {
  /**
   * The raw text
   */
  children: PropTypes.node.isRequired,
  /**
   * The string(s) you want highlighted
   */
  match: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * The function used to render a highlighted substring
   *
   * args
   * text: string
   * match: string
   */
  render: PropTypes.func,

  /**
   * The function used to render all non-highlighted strings
   *
   * args
   * text: string
   * match: string
   */
  renderNonMatches: PropTypes.func,

  /**
   * What type of matches should we consider:
   * token: only match entire words
   * substring: match any substring (even if it's in the middle of a word)
   * prefix: substring match only the beginning of the entire string
   * word-prefix: substring match only the beginning of a word
   */
  matchType: PropTypes.oneOf(['token', 'prefix', 'word-prefix', 'substring']),
}

HighlightText.defaultProps = {
  render: ({ text }) => <b>{text}</b>,
  renderNonMatches: ({ text }) => text,
  matchType: 'substring',
}

export default HighlightText
