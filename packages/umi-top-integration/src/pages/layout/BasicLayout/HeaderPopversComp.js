import React from 'react';
import { connect } from 'dva';
import { Popover, Icon } from 'antd';
import glamorous from 'glamorous';
import MenuComp from './MenuComp';

const IconDiv = glamorous.div({
    width: '47px',
    height: '47px',
    lineHeight: '47px',
    textAlign: 'center',
    fontSize: '18px',
    cursor: 'pointer',
    transition: '@transition-ease-in',
    '&:hover': {
        color: '#1DA57A',
        backgroundColor: 'rgba(29, 165, 122, 0.15)',
    }
})

/**
 * 菜单悬浮框
 */
@connect(({ app }) => ({ app }))
class HeaderPopoverComp extends React.Component {
    /**
     * 切换 sliderFold：值为 true 表示左边菜单树被折叠，为 false 表示被打开
     */
    handleSwitchSlider() {
        this.props.dispatch({
            type: 'app/updateSliderFold',
            payload: { sliderFold: !this.props.app.sliderFold },
        });
    }

    handleSwitchMenuPopover() {
        this.props.dispatch({
            type: 'app/updateMenuProver',
            payload: { menuProver: !this.props.app.menuProver },
        });
    }

    render() {
        const { isNavbar, sliderFold, menuProver } = this.props.app;

        // isNavbar = false。浏览器宽度大于 769
        if (!isNavbar) {
            return (
                <IconDiv onClick={() => this.handleSwitchSlider()}>
                    <Icon type={sliderFold ? 'menu-unfold' : 'menu-fold'} />
                </IconDiv>
            );
        }

        // isNavbar = true。浏览器宽度小于 769
        return (
            <Popover
                placement="bottomLeft" onVisibleChange={() => this.handleSwitchMenuPopover()} visible={menuProver}
                overlayClassName="layout-popover" trigger="click" content={<MenuComp />}
            >
                <IconDiv>
                    <Icon type="bars" />
                </IconDiv>
            </Popover>
        );
    }
}

export default HeaderPopoverComp;