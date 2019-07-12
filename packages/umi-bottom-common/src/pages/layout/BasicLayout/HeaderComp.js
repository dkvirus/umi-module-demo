import React from 'react'
import glamorous from 'glamorous'
import HeaderPopversComp from './HeaderPopversComp'
import HeaderSearchMenuComp from './HeaderSearchMenuComp'
import HeaderSelectMenuComp from './HeaderSelectMenuComp'

const Header = glamorous.div({
    boxShadow: '4px 4px 40px 0 rgba(0, 0, 0, 0.2)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    height: '47px',
    backgroundColor: '#fff',
})

const RigthWrapper = glamorous.div({
    display: 'flex',
    paddingRight: '16px',
    alignItems: 'center',
})

class HeaderComp extends React.Component {
    render() {
        return (
            <Header>
                <HeaderPopversComp />
                <RigthWrapper>
                    <HeaderSearchMenuComp />
                    <HeaderSelectMenuComp />
                </RigthWrapper>
            </Header>
        )
    }
}

export default HeaderComp
