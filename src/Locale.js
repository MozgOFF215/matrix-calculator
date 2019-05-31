import React, { useContext, memo } from 'react'

export const localeContext = React.createContext({ locale: "en", setLocale: () => { } })
export const LocaleProvider = localeContext.Provider
LocaleProvider.displayName = 'LocaleContext.Provider'
export const LocaleConsumer = localeContext.Consumer
LocaleConsumer.displayName = 'LocaleContext.Consumer'

export function setDisplayName(prefix, source, obj) {
  obj.displayName = `${prefix}(${source.displayName || source.name})`
  return obj
}

function getTexts(texts, locale) {
  if (texts)
    return texts.localize(locale)
}

export function localeConnect(Target, strings) {

  if (strings)
    return setDisplayName('L', Target,
      (props) => {
        let { locale, setLocale } = useContext(localeContext)
        return (<Target texts={getTexts(strings, locale)} locale={locale} setLocale={setLocale} {...props} />)
      })

  return setDisplayName('L', Target,
    (props) => {
      let { locale, setLocale } = useContext(localeContext)
      return (<Target locale={locale} setLocale={setLocale} {...props} />)
    })
}

export function stringsConnect(Target, strings) {
  return setDisplayName('S', Target,
    (props) => {
      let { locale } = useContext(localeContext)
      return (<Target texts={getTexts(strings, locale)} {...props} />)
    })
}

// to check which one is faster
function localizedProps1(props, locale) { //eslint-disable-line

  const result = {}
  for (var prop in props) {
    const i = prop.indexOf('-')

    if (i < 0) {
      if (!(prop in result))
        result[prop] = props[prop]
    }
    else {
      const lang = prop.slice(i + 1, prop.length)
      const name = prop.slice(0, i)

      if (locale === lang)
        result[name] = props[prop]
    }
  }

  return result
}

// to check which one is faster
function localizedProps2(props, locale) { //eslint-disable-line

  const indices = Object.keys(props).map(prop => ({ prop, idx: prop.indexOf('-') }))
  const first = indices.find(i => i.idx > 0)
  if (first) {
    const result = { ...props }

    for (var i = first; i < indices.length; i++) {
      const item = indices[i]
      const { prop, idx } = item

      if (idx > 0) {
        delete result[prop]

        const lang = prop.slice(idx + 1, prop.length)
        const name = prop.slice(0, idx)

        if (locale === lang)
          result[name] = props[prop]
      }
    }
    return result
  }
  return props
}

function applyLocProps(props, localizedProps, locale) { //eslint-disable-line

  const result = { ...props }

  for (var i in localizedProps) {

    var prop = localizedProps[i]
    var idx = prop.indexOf('-')
    var lang = prop.slice(idx + 1, prop.length)
    if (lang === locale) {
      const name = prop.slice(0, idx)
      result[name] = result[prop]
    }

    delete result[prop]
  }

  return result
}

function findLocalizedProps(props) {
  return Object.keys(props).filter(prop => !prop.startsWith("bind-") && prop.indexOf('-') > 0)
}

export function localize(Target) {

  let n = Target.displayName || Target.name
  if (n && n.includes('L('))
    return Target

  if (Target.prototype === undefined) {
    return setDisplayName('L', Target, props => Target(useLocalizedProps(props)))
  }

  return setDisplayName('M', Target, memo(setDisplayName('L', Target, props => <Target {...useLocalizedProps(props)} />)))
}

export function useLocalizedProps(props) {
  const { locale } = useContext(localeContext)
  const localizedProps = findLocalizedProps(props)
  return localizedProps.length > 0 ? applyLocProps(props, localizedProps, locale) : props
}

export function useLocaleContext() {
  return useContext(localeContext)
}