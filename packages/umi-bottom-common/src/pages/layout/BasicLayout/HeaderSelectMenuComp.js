import React from 'react'
import { connect } from 'dva'
import { Menu, Icon } from 'antd'
import { getItem } from '../../../utils/localStorage'
import HeaderUpdatePwModalComp from './HeaderUpdatePwModalComp'

@connect(({ app }) => ({ app }))
class HeaderSelectMenuComp extends React.Component {
    constructor(props) {
        super(props)
        this.state = { modalVisible: false }
    }

    handleClickMenu(key) {
        switch (key) {
            case 'updatePw':
                this.props.dispatch({
                    type: 'app/showPwModal',
                })
                break
            case 'logout':
                this.props.dispatch({
                    type: 'app/logout',
                })
                break
            default:
        }
    }

    render() {
        const pwModalVisible = this.props.app.pwModalVisible

        return (
            <Menu mode="horizontal" onClick={e => this.handleClickMenu(e.key)} style={{ zIndex: 100 }}>
                <Menu.SubMenu
                    style={{ float: 'right', marginRight: 20 }}
                    title={<span> <Icon type="user" /> {getItem('name')} </span>}
                >
                    <Menu.Item key="updatePw">
                        修改密码
                    </Menu.Item>
                    <Menu.Item key="logout">
                        注销
                    </Menu.Item>
                </Menu.SubMenu>
                {pwModalVisible && <HeaderUpdatePwModalComp visible={pwModalVisible} />}
            </Menu>
        )
    }
}

export default HeaderSelectMenuComp