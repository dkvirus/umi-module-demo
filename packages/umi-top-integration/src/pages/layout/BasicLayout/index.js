import { connect } from 'dva';
import React from 'react';
import { Helmet } from 'react-helmet';
import glamorous from 'glamorous';
import { name } from 'configs/config';

import HeaderComp from './HeaderComp';
import SliderComp from './SliderComp';
import FooterComp from './FooterComp';
import BreadComp from './BreadComp';

const LayoutDiv = glamorous.div({
  position: 'relative',
  height: '100vh',
})

const MainDiv = glamorous.div({
  marginLeft: '224px',
  overflow: 'auto',
  height: '100vh',
  transition: 'all 0.3s ease-out',
  background: '#F7F7F7',
}, ({ sliderFold, isNavbar }) => {
  if (isNavbar) {
    return { marginLeft: 0 };
  }
  if (sliderFold) {
    return { 
      marginLeft: '42px', 
      transition: 'all 0.3s ease-out',
    };
  }
})

const ContentDiv = glamorous.div({
  margin: '24px',
  minHeight: 'calc(100vh - 160px)',
})

@connect(({ app }) => ({ app }))
class BasicLayout extends React.Component {
  render() {
    const { children } = this.props;
    const { isNavbar, sliderFold } = this.props.app;

    return (
      <>
        <Helmet>
          <title>{name}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        </Helmet>

        <LayoutDiv>
          <SliderComp />
          <MainDiv sliderFold={sliderFold} isNavbar={isNavbar}>
            <HeaderComp />
            <BreadComp />
            <ContentDiv>
              {children}
            </ContentDiv>
            <FooterComp />
          </MainDiv>
        </LayoutDiv>
      </>
    )
  }
}

export default BasicLayout; 
