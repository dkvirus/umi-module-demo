import React from 'react'

import { getItem } from '../../utils/localStorage'
import BasicLayout from './BasicLayout/index'
import LoginPage from './LoginPage/index'

class Layout extends React.Component {
    render() {
        // 判断是否登录
        const privs = getItem('privs')

        if (!privs) {
            return (
                <LoginPage />
            )
        }

        return (
            <BasicLayout>
                {this.props.children}
            </BasicLayout>
        )
    }
}

export default Layout
