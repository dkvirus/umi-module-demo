import { message } from 'antd';
import router from 'umi/router';

import { initRouter } from 'configs/config';
import { setItem } from '../../utils/localStorage';
import * as appService from './service';

export default {
    namespace: 'app',

    state: {
        user: null,             // 用户信息
        pwModalVisible: false,  // Header > 修改密码模态框状态值
        menuProver: false,      // Header > 浏览器窗口很窄时显示水平菜单
        menuSelect: [],         // Header > 菜单过滤框，输入 '管理' 在所有菜单中过滤包含关键字的数组 ['用户管理', '角色管理']
        navOpenKeys: [],        // 左边菜单打开数组
        sliderFold: false,      // 值为 true 表示左边菜单树被折叠，为 false 表示被打开
        darkTheme: false,       // 值为 true 表示黑色，为 false 表示白色
        menuItemIds: [],        // 被选中菜单项数组，不包括 subMenu
        isNavbar: document.body.clientWidth < 769,  // 值为 true 表示浏览器宽度小于 769，为 false 表示浏览器宽度大于 769
        currentPathname: '',
    },

    effects: {
        /**
         * 登录
         */
        *login({ payload }, { call, put }) {
            localStorage.clear();

            // 第一步：获取 token
            const result = yield call(appService.login, payload);
            if (result.code !== '0000') return;

            // 保存 token 
            setItem('token', result.data.access_token);

            // 第二步：存在，查询用户相关信息，包含权限信息
            const userResult = yield call(appService.query);
            if (userResult.code !== '0000') return;

            // 保存用户权限信息，放到 localStorage 中
            setItem('privs', userResult.data.authorities);
            setItem('id', userResult.data.id);
            yield put({ type: 'saveUserInfo', payload: { user: userResult.data } });

            message.success('登录成功。');

            // 跳转到 / 路由，之后会跳转默认首页
            router.push(`${initRouter}`);
        },

        /**
         * 注销
         */
        // eslint-disable-next-line require-yield
        *logout() {
            localStorage.clear();

            // 跳转路由，刷新页面，此时 dva 中 state 数据也会在内存中重新刷新
            window.location.pathname = '/';
            message.success('注销成功。');
        },

        /**
         * 修改用户密码
         */
        *updatePw({ payload }, { call, put }) {
            const { newPw, againPw } = payload;
            if (String(newPw) !== String(againPw)) {
                return message.error('新密码与再次输入密码不相等，请重新输入');
            }
            const result = yield call(appService.password, { password: newPw });
            if (result.code !== '0000') return;

            yield put({ type: 'hidePwModal' })
            yield put({ type: 'logout' });
        },

        /**
         * 根据用户拖动浏览器宽度，实时改变 isNavbar 值
         */
        * changeNavbar(__, { put, select }) {
            const app = yield select(_ => _.app);
            const isNavbar = document.body.clientWidth < 769;
            if (isNavbar !== app.isNavbar) {
                yield put({ type: 'updateIsNavbar', payload: { isNavbar } })
            }
        },
    },

    reducers: {
        // 保存用户信息
        saveUserInfo(state, { payload }) {
            return { ...state, ...payload };
        },
        // 根据用户拖动浏览器宽度，实时改变 isNavbar 值
        updateIsNavbar(state, { payload }) {
            return { ...state, ...payload };
        },
        // Slider > 菜单点击
        saveNavOpenKeys(state, { payload }) {
            return { ...state, ...payload };
        },
        // Header > 修改密码，显示模态框
        showPwModal(state) {
            return { ...state, pwModalVisible: true };
        },
        // Header > 修改密码，隐藏模态框
        hidePwModal(state) {
            return { ...state, pwModalVisible: false };
        },
        // Header > 菜单过滤框
        updateMenuSelect(state, { payload }) {
            return { ...state, ...payload };
        },
        // Header > 左边菜单是否折叠
        updateSliderFold(state, { payload }) {
            return { ...state, ...payload };
        },
        // Header > 当浏览器宽度小于 769 时头部小图标显示水平菜单标识 
        updateMenuProver(state, { payload }) {
            return { ...state, ...payload };
        },
        // Menu > 更新被选中菜单项
        updateMenuItemIds(state, { payload }) {
            return { ...state, ...payload };
        },
        /**
         * 更新变量
         */
        updateState (state, { payload }) {
            return { ...state, ...payload };
        },
    },

    subscriptions: {
        setup({ dispatch, history }) {
            let tid
            window.onresize = () => {
                clearTimeout(tid)
                tid = setTimeout(() => {
                    dispatch({ type: 'changeNavbar' })
                }, 300)
            }

            if (history.location.pathname.substring(0, 5) === '/user') {
                localStorage.clear();
            }
        },
    },
}