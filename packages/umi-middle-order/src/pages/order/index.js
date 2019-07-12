import React from 'react'
import { connect } from 'dva'
import { Table, Card } from 'antd'

@connect(({ order, loading }) => ({ order, loading }))
class OrderPage extends React.Component {
    /**
     * 页面加载完成后请求数据
     */
    componentDidMount() {
        this.props.dispatch({
            type: 'order/query',
        })
    }

    render() {
        const { list = [] } = this.props.order

        const columns = [
            {
                title: '订单号',
                dataIndex: 'orderId',
                key: 'orderId',
            },
            {
                title: '订单描述',
                dataIndex: 'desc',
                key: 'desc',
            },
        ]

        const tableProps = {
            dataSource: list,
            columns,
            loading: this.props.loading.effects['order/query'],
            rowKey: record => record.orderId,
          }

        return (
            <Card>
                <Table {...tableProps} />
            </Card>
        )
    }
}

export default OrderPage