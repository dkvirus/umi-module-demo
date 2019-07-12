import React from 'react';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import menu from 'configs/menu';
import { iconfontJs } from 'configs/config';
import { getItem } from '../../../utils/localStorage';

/**
 * iconfont 的 js 使用
 */
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: iconfontJs || '/iconfont/iconfont.js',
});

/**
 * tools：获取两个数组的差集
 */
function arrDiff (arg1 = [], arg2 = []) {
    let arr1;
    let arr2;
    if (arg1.length < arg2.length) {
        arr1 = arg2;
        arr2 = arg1;
    } else {
        arr1 = arg1;
        arr2 = arg2;
    }

    const a1 = new Set(arr1);
    const a2 = new Set(arr2);
    const difference = new Set([...a1].filter(x => !a2.has(x)));
    return [...difference];
};

/**
 * tools：'aaa-bbb-ccc' 变成 ['aaa', 'aaa-bbb', 'aaa-bbb-ccc']
 */
function strToArr (str) {
    const arr = str.split('-');
    const result = [];
    arr.forEach((item, index, array) => {
        result.push(array.slice(0, index + 1).join('-'));
    });
    return result;
};

@connect(({ app }) => ({ app }))
class MenuComp extends React.Component {
    /**
     * 点击 subMenu 触发事件
     */
    handleOpenChange(openKeys, navOpenKeys) {
        // 当前点击那个 SubMenu
        const currentSubMenu = arrDiff(openKeys, navOpenKeys);
        let nextOpenKeys;
        if (navOpenKeys.includes(currentSubMenu[0])) {
            // 点击当前已经打开的 SubMenu，即折叠该 SubMenu
            nextOpenKeys = navOpenKeys.filter(item => item !== currentSubMenu[0]);
        } else {
            // 点击的 SubMenu 并没有打开，对 id 进行解析
            nextOpenKeys = strToArr(currentSubMenu[0]);
        }
        this.props.dispatch({
            type: 'app/saveNavOpenKeys',
            payload: { navOpenKeys: nextOpenKeys },
        });
    }

    /**
     * 点击 MenuItem 触发事件
     */
    handleClickMenu({ key }) {
        this.props.dispatch({
            type: 'app/updateMenuItemIds',
            payload: { menuItemIds: [key] },
        });
    }

    /**
     * 根据用户权限过滤菜单
     */
    handleFilterPermissionMenus() {
        // 没有登录或登录用户没有权限
        if (!getItem('privs')) {
            return [];
        }
        const authorities = getItem('privs');

        // 获取菜单数组的复制份，接下来所有操作都对它处理，并最终返回它
        let menuArr = JSON.parse(JSON.stringify(menu));

        // 过滤需要隐藏的菜单。菜单属性 hide = true
        menuArr = menuArr.filter(item => !item.hide);

        // 判断当前登录用户拥有权限与菜单的 authorities 权限数组是否有交集，没有交集就在菜单数组中删除该菜单
        const noMenus = [];
        for (let i = 0; i < menuArr.length; i++) {
            if (menuArr[i].authorities.filter(leaf => authorities.includes(leaf.trim())).length === 0) {
                noMenus.push(menuArr[i].id);
            }
        }
        menuArr = menuArr.filter(item => !noMenus.includes(item.id));
        return menuArr;
    }

    /**
     * 将列表数据转换为树形结构的数据
     */
    handleArrayToTree(array, id = 'id', pid = 'mpid', children = 'children') {
        const data = JSON.parse(JSON.stringify(array));
        const result = [];
        const hash = {};
        data.forEach((item, index) => {
            hash[data[index][id]] = data[index];
        });

        data.forEach((item) => {
            const hashVP = hash[item[pid]];
            if (hashVP) {
                if (!hashVP[children]) hashVP[children] = [];
                hashVP[children].push(item);
            } else {
                result.push(item);
            }
        });
        return result;
    }

    /**
     * 递归将树形结构数据转换为菜单的 <Menu> 标签用于渲染页面
     */
    handleGeneMenuElements(menuTreeN, sliderFoldN, menuTree) {
        return menuTreeN.map((item) => {
            if (item.children) {
                return (
                    <Menu.SubMenu
                        key={item.id}
                        title={<span>
                            {item.icon && <IconFont type={item.icon} />}
                            {(!sliderFoldN || !menuTree.includes(item)) && item.name}
                        </span>}
                    >
                        {this.handleGeneMenuElements(item.children, sliderFoldN, menuTree)}
                    </Menu.SubMenu>
                );
            }
            return (
                <Menu.Item key={item.id}>
                    <Link to={item.router}>
                        {item.icon && <IconFont type={item.icon} />}
                        {(!sliderFoldN || !menuTree.includes(item)) && item.name}
                    </Link>
                </Menu.Item>
            );
        });
    }

    /**
     * 获取被选中的菜单 id
     */
    handleGetSelectedKeys () {
        // eslint-disable-next-line no-restricted-globals
        let pathname = location.pathname
        const menuId = pathname.substr(1).split('/').join('-');
        const currentMenu = menu.find(item => item.id === menuId);
        
        if (!currentMenu) return [];
        return [currentMenu.id];
    }

    render() {
        // 返回菜单 Elements
        // 第一步：接收父组件传递参数
        // sliderFold：为 true 表示左边菜单树折叠，为 false 表示展开
        // navOpenKeys：菜单树默认展开项 id 数组
        // menuItemIds：被选中菜单项数组，背景高亮
        const { app } = this.props;
        let { sliderFold, navOpenKeys = [], darkTheme, menuItemIds, currentPathname } = app;

        // 获取选中菜单 id 
        const selectedKeys = this.handleGetSelectedKeys(menuItemIds, currentPathname);

        // 第二步：过滤权限数组
        const permissonMenu = this.handleFilterPermissionMenus();

        // 第三步：将菜单列表数据转换为树状结构的数据
        const menuTree = this.handleArrayToTree(permissonMenu);

        // 第四步：获得 Menu Elements
        const menuItems = this.handleGeneMenuElements(menuTree, sliderFold, menuTree);

        // sliderFold 为 true 表示菜单被折叠，为 false 表示菜单被打开
        const getExpandObj = () => {
            if (sliderFold) {
                return {};
            }
            return { onOpenChange: keys => this.handleOpenChange(keys, navOpenKeys), openKeys: navOpenKeys };
        };
        const menuProps = getExpandObj();

        return (
            <Menu
                {...menuProps}
                mode={sliderFold ? 'vertical' : 'inline'}
                theme={darkTheme ? 'dark' : 'light'}
                selectedKeys={selectedKeys}
                onClick={({ key }) => this.handleClickMenu({ key })}
            >
                {menuItems}
            </Menu>
        );
    }
}

export default MenuComp;
