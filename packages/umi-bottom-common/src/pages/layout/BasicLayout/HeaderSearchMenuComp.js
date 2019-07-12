import React from 'react'
import { connect } from 'dva'
import { AutoComplete } from 'antd'
import router from 'umi/router'
import { css } from 'glamor'
import menu from 'configs/menu'
import { getItem } from '../../../utils/localStorage'

const searchSty = css({
    width: '130px',
    transition: 'all 0.5s',

    '& input': {
        borderRadius: '15px!important',
        padding: '0 20px!important',
    },

    '&:hover': {
        width: '200px',
    },
})

// 菜单过滤框
@connect(({ app }) => ({ app }))
class HeaderSearchMenuComp extends React.Component {
    constructor () {
        super()
        this.state = {
            menuSelect: [],
        }
    }

    /**
     * 点击选项 Option 触发事件
     */
    handleSearch(value) {
        // 过滤隐藏的菜单，菜单配置有 hide: true 属性时，菜单不显示
        let menuArr = menu.filter(item => !item.hide)

        // 判断当前登录用户拥有权限与菜单的 authorities 权限数组是否有交集，没有交集就在菜单数组中删除该菜单
        const authorities = getItem('privs')
        const noMenus = []
        for (let i = 0; i < menuArr.length; i++) {
            if (menuArr[i].authorities.filter(leaf => authorities.includes(leaf.trim())).length === 0) {
                noMenus.push(menuArr[i].id)
            }
        }
        menuArr = menuArr.filter(item => !noMenus.includes(item.id))


        // 过滤菜单数组，只要有 route 属性的菜单
        const menuFilter = menuArr.filter(item => item.router && ~item.name.indexOf(value))
        this.setState({
            menuSelect: menuFilter,
        })
    }

    /**
     * 搜索框中值变化触发事件
     */
    handleSelect(value) {
        this.props.dispatch({
            type: 'app/updateState',
            payload: {
                currentPathname: value,
            },
        })
        router.push(value)
    }

    /**
     * 处理菜单重名的情形，在每个菜单后面显示小标题，内容为该菜单的父级菜单
     */
    handleSmallTitile(id) {
        const idArr = id.split('-')
        if (idArr.length === 1) {
            return ''
        }

        let result = ''
        if (idArr.length === 2) {
            idArr.pop()
            const menuItem = menu.filter(item => item.id === idArr.join('-'))
            result = menuItem[0] && menuItem[0].name
        }

        if (idArr.length === 3) {
            idArr.pop()
            const secondMenu = menu.filter(item => item.id === idArr.join('-'))

            idArr.pop()
            const firstMenu = menu.filter(item => item.id === idArr.join('-'))

            result = `${firstMenu[0].name} - ${secondMenu[0].name}`
        }

        return `(${result})`
    }

    render() {
        const { menuSelect = [] } = this.state

        // 渲染下拉框选项
        const renderOption = (item) => {
            return (
                <AutoComplete.Option key={item.router} text={item.name}>
                    {item.name} &nbsp;&nbsp;
                    <small>{this.handleSmallTitile(item.id)}</small>
                </AutoComplete.Option>
            )
        }

        return (
            <AutoComplete
                className={`${searchSty}`}
                placeholder="请输入菜单名称"
                onSearch={value => this.handleSearch(value)}
                onSelect={value => this.handleSelect(value)}
                optionLabelProp="text"
            >
                {menuSelect.map(renderOption)}
            </AutoComplete>
        )
    }
}

export default HeaderSearchMenuComp