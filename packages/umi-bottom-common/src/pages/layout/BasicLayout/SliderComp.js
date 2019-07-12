import React from 'react'
import { connect } from 'dva'
import glamorous from 'glamorous'
import { logo, name } from 'configs/config'
import menu from 'configs/menu'
import MenuComp from './MenuComp'

const AsideWrap = glamorous.aside({
    width: '224px',
    background: '#fff',
    position: 'absolute',
    overflow: 'visible',
    paddingBottom: '24px',
    height: '100vh',
    transition: 'all 0.3s ease-out',
    boxShadow: '4px 4px 20px 0 rgba(0, 0, 0, 0.01)',
    color: '#999',
}, function ({ sliderFold }) {
    if (sliderFold) {
        return {
            width: '42px',

            '& ant-menu-root': {
                width: '100%',
                overflow: 'visible',
            },
        }
    } 
})

const LogoWrap = glamorous.div({
    textAlign: 'center',
    height: '40px',
    lineHeight: '40px',
    cursor: 'pointer',
    margin: '28px 0',
    transition: 'all 0.3s ease-out',
    overflow: 'hidden',
    
    '& img': {
        width: '28px',
        margin: '6px 7px',
    },
})

@connect(({ app }) => ({ app }))
class SliderComp extends React.Component {
    render() {
        const { sliderFold, isNavbar } = this.props.app

        return (
            <>
                {!isNavbar ? <AsideWrap sliderFold={sliderFold}>
                    {menu.length === 0 ? null : (
                        <>
                            <LogoWrap>
                                <img alt={'logo'} src={`${logo}`} />
                                {sliderFold ? null : <span>{name}</span>}
                            </LogoWrap>

                            <MenuComp />
                        </>
                    )}
                </AsideWrap> : null}
            </>
        )
    }
}

export default SliderComp
