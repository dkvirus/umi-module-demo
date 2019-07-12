import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input } from 'antd';

@connect(({ app }) => ({ app }))
class HeaderUpdatePwModalComp extends React.Component {
    /**
     * 确定按钮
     */
    handleOkBtn () {
        this.props.form.validateFields((err) => {
            if (err) return;
            
            const data = { ...this.props.form.getFieldsValue() };

            this.props.dispatch({
                type: 'app/updatePw',
                payload: data,
            });
        });
    }

    /**
     * 取消按钮
     */
    handleCancelBtn () {
        this.props.dispatch({
            type: 'app/hidePwModal',
        });
    }

    render () {
        const { visible } = this.props;
        const { getFieldDecorator } = this.props.form;

        const formLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        const modalProps = {
            visible,
            maskClosable: false,
            title: '修改密码',
            onOk: () => this.handleOkBtn(),
            onCancel: () => this.handleCancelBtn(),
        };

        return (
            <Modal {...modalProps}>
                <Form>
                    <Form.Item {...formLayout} label="新密码">
                        {
                            getFieldDecorator('newPw', {
                                rules: [
                                    {
                                        message: '新密码不能为空',
                                        required: true,
                                        max: 30,
                                    },
                                ],
                            })(<Input placeholder="请输入新的密码" />)
                        }
                    </Form.Item>

                    <Form.Item {...formLayout} label="确认新密码">
                        {
                            getFieldDecorator('againPw', {
                                rules: [
                                    {
                                        message: '确认密码不能为空',
                                        required: true,
                                        max: 30,
                                    },
                                ],
                            })(<Input placeholder="请再次输入新的密码" />)
                        }
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({})(HeaderUpdatePwModalComp);
