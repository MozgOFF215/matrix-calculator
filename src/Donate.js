import React from 'react'
import { localize } from './Locale'

export const Donate = localize(({ style, texts }) => {

  let { suffix, title } = texts

  return (
    <div style={style}>
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="5GCTEZR384BGJ" />
        <input type="image" src={"https://www.paypalobjects.com/" + suffix + "/i/btn/btn_donate_SM.gif"} border="0" name="submit" title={title} alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_DE/i/scr/pixel.gif" width="1" height="1" />
      </form>
    </div>
  )
})

export const DonateBig = localize(({ style, texts }) => {

  let { suffix2, title } = texts

  return (
    <div style={style}>
      <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
        <input type="hidden" name="cmd" value="_s-xclick" />
        <input type="hidden" name="hosted_button_id" value="5GCTEZR384BGJ" />
        <input type="image" src={"https://www.paypalobjects.com/" + suffix2 + "/i/btn/btn_donateCC_LG.gif"} border="0" name="submit" title={title} alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_DE/i/scr/pixel.gif" width="1" height="1" />
      </form>
    </div>
  )
})

Donate.defaultProps = {
  texts: {
    suffix: "en_US",
    suffix2: "en_US/DK",
    title: "PayPal - The safer, easier way to pay online!",
  },
  "texts-de": {
    suffix: "de_DE",
    suffix2: "de_DE/DE",
    title: "PayPal - The safer, easier way to pay online!",
  },
  "texts-ru": {
    suffix: "ru_RU",
    suffix2: "ru_RU/RU",
    title: "PayPal - простой и безопасный способ оплаты онлайн!",
  }
}

DonateBig.defaultProps = Donate.defaultProps