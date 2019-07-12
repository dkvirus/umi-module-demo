import React from 'react'
import glamorous from 'glamorous'
import svg403 from './svgs/403.svg'
import svg404 from './svgs/404.svg'
import svg500 from './svgs/500.svg'

const config = {
  403: {
    img: svg403,
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: svg404,
    title: '404',
    desc: '抱歉，你访问的页面不存在',
  },
  500: {
    img: svg500,
    title: '500',
    desc: '抱歉，服务器出错了',
  },
}

const ExceptionWrap = glamorous.div({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
})

const ImgWrap = glamorous.div({
  flex: '0 0 62.5%',
  width: '62.5%',
  paddingRight: '152px',
  zoom: 1,
  '&:before': {
    content: ' ',
    display: 'table',
  },
  '&:after': {
    clear: 'both',
    visibility: 'hidden',
    fontSize: 0,
    height: 0,
  },
})

const ImgDiv = glamorous.div({
  height: '360px',
  width: '100%',
  maxWidth: '430px',
  float: 'right',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '50% 50%',
  backgroundSize: 'contain',
}, ({ pageType }) => ({ backgroundImage: `url(${config[pageType].img})` }))

const ContentDiv = glamorous.div({
  flex: 'auto',

  '& h1': {
    color: '#434e59',
    fontSize: '72px',
    fontWeight: '600',
    lineHeight: '72px',
    marginBottom: '24px',
  },

  '& .desc': {
    color: '@text-color - secondary',
    fontSize: '20px',
    lineHeight: '28px',
    marginBottom: '16px',
  },

  '& .actions': {
    button: {
      marginRight: '8px',
    },
  },
})

class Exception extends React.Component {
  render() {
    const { className, type, title, desc, img, actions, ...rest } = this.props
    const pageType = type in config ? type : '404'

    return (
      <ExceptionWrap {...rest}>
        <ImgWrap>
          <ImgDiv pageType={pageType} />
        </ImgWrap>
        <ContentDiv>
          <h1>{title || config[pageType].title}</h1>
          <div className="desc">{desc || config[pageType].desc}</div>
          {
            actions && <div className="actions">{actions}</div>
          }
        </ContentDiv>
      </ExceptionWrap>
    )
  }
}

export default Exception
