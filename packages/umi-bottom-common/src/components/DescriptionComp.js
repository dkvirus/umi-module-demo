import React from 'react'
import { Row, Col, Input } from 'antd'

export class DescriptionList extends React.Component {
    render () {
        const { children, column = 2 } = this.props

        return <Row type="flex">
            {React.Children.map(children, child =>
                child ? React.cloneElement(child, { column }) : child
            )}
        </Row> 
    }
}

export class Description extends React.Component {
    render() {
        const { term, children, column, style } = this.props

        const responsive = {
            1: { xs: 24 },
            2: { xs: 24, sm: 12 },
            3: { xs: 24, sm: 12, md: 8 },
            4: { xs: 24, sm: 12, md: 6 },
        }

        const itemStyle = {
            boxSizing: 'border-box',
            wordBreak: 'break-all',
            display: 'flex',
            marginBottom: '16px',
            ...style,
        }

        const termStyle = {
            paddingBottom: '16px',
            color: 'rgba(0, 0, 0, 0.85)',
            lineHeight: '20px',
            whiteSpace: 'wrap',
            width: '25%',
            textAlign: 'right',
            paddingRight: '10px',
        }

        const detailStyle = {
            paddingBottom: '16px',
            color: 'rgba(0, 0, 0, 0.65)',
            lineHeight: '20px',
            wordBreak: 'break-all',
            paddingRight: '30px',
            flex: '1',
        }

        const textareaStyle = {
            color: 'rgba(0, 0, 0, 0.65)',
            border: 'none',
            outline: 'none',
            boxShadow: 'none',
            resize: 'none',
            background: 'transparent',
            cursor: 'text',
            padding: '0px',
        }

        return (
            <Col {...responsive[column]} style={itemStyle}>
                {term && <div style={termStyle}>{term}：</div>}
                <div style={detailStyle}>
                    {
                        typeof children === 'string' ?
                            <Input.TextArea style={textareaStyle} autosize value={children} disabled /> :
                            children
                    }
                </div>
            </Col>
        )
    }
} 