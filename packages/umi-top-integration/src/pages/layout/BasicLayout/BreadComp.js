import React from 'react';
import { connect } from 'dva';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'
import menu from 'configs/menu';

// tools：'aaa-bbb-ccc' 变成 ['aaa', 'aaa-bbb', 'aaa-bbb-ccc']
const strToArr = (str) => {
    const arr = str.split('-');
    const result = [];
    arr.forEach((item, index, array) => {
        result.push(array.slice(0, index + 1).join('-'));
    });
    return result;
};

const breadSty = {
    height: '40px',
    lineHeight: '40px',
    paddingLeft: '24px',
    marginBottom: '-24px',
    overflow: 'hidden',
}

const breadItem = {
    marginTop: '10px',
}

@connect(({ app }) => ({ app }))
class Bread extends React.Component {
    // 获取当前显示菜单以及它的父级菜单们
    getCurrentMenuArr(menus) {
        // eslint-disable-next-line no-restricted-globals
        let pathname = location.pathname
        const menuId = pathname.substr(1).split('/').join('-');

        // 匹配与 location.pathname 相符的菜单
        const currentMenu = menus.find(item => item.id === menuId);
        // 没有匹配到菜单时面包屑显示 Not Found
        if (!currentMenu) {
            return [{
                id: 'xxxxxxx',
                name: '',
            }];
        }

        // 获取菜单及其父级菜单数组并返回
        const idArr = strToArr(currentMenu.id);
        const menuArr = menus.filter((item) => {
            return idArr.includes(item.id);
        });

        return menuArr;
    }

    // 获取 bread Elements
    geneBreadElements(menuArray) {
        return menuArray.map((item, key) => {
            return (
                <Breadcrumb.Item key={key}>
                    {
                        item.router ?
                            <Link to={item.router}>
                                <span style={{ color: '#40A9FF' }}>{item.name}</span>
                            </Link> :
                            <span>{item.name}</span>
                    }
                </Breadcrumb.Item>
            );
        })
    }

    render() {
        const { currentPathname } = this.props.app

        // 第一步：获取当前显示菜单以及它的父级菜单们
        const currentMenuArr = this.getCurrentMenuArr(menu, currentPathname);

        // 第二步：获取 Elements
        const breadElements = this.geneBreadElements(currentMenuArr);

        return (
            <div style={breadSty} >
                <Breadcrumb separator=">" style={breadItem}>
                    {breadElements}
                </Breadcrumb>
            </div>
        );
    }
}

export default Bread;
