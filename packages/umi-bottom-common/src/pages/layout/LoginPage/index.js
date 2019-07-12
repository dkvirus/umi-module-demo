import React from 'react'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import glamorous from 'glamorous'
import { logo, name } from 'configs/config'

const WrapDiv = glamorous.div({
  position: 'absolute',
  top: '50%',
  left: '50%',
  margin: '-160px 0 0 -160px',
  width: '320px',
  height: '320px',
  padding: '36px',
  boxShadow: '0 0 100px rgba(0, 0, 0, .08)',

  '& button': {
    width: '100%',
  },
})

const LogoWrap = glamorous.div({
  textAlign: 'center',
  height: '40px',
  lineHeight: '40px',
  cursor: 'pointer',
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'center',

  '& img': {
    width: '40px',
    marginRight: '8px',
  },

  '& span': {
    verticalAlign: 'text-bottom',
    fontSize: '16px',
    textTransform: 'uppercase',
    display: 'inline-block',
  },
})

@connect(({ app }) => ({ app }))
class LoginPage extends React.Component {
  /**
   * 登录按钮
   */
  handleOkBtn() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return
      this.props.dispatch({ type: 'app/login', payload: values })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <WrapDiv>
        <LogoWrap>
          <img alt={'logo'} src={logo} />
          <span>{name}</span>
        </LogoWrap>

        <Form>
          <Form.Item hasFeedback>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '用户名不能为空' }],
            })(<Input size="large" onPressEnter={() => this.handleOkBtn()} placeholder="请输入用户名" />)}
          </Form.Item>

          <Form.Item hasFeedback>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '密码不能为空' }],
            })(<Input size="large" type="password" onPressEnter={() => this.handleOkBtn()} placeholder="请输入密码" />)}
          </Form.Item>

          <Row>
            <Button type="primary" size="large" onClick={() => this.handleOkBtn()}>
              登录
            </Button>
          </Row>
        </Form>
      </WrapDiv>
    )
  }
}

export default Form.create({})(LoginPage)