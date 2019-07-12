import React from 'react'
import { connect } from 'dva'
import { Table, Card } from 'antd'

@connect(({ goods, loading }) => ({ goods, loading }))
class GoodsPage extends React.Component {
    /**
     * 页面加载完成后请求数据
     */
    componentDidMount() {
        this.props.dispatch({
            type: 'goods/query',
        })
    }

    render() {
        const { list } = this.props.goods

        const columns = [
            {
                title: '主键',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
        ]

        const tableProps = {
            dataSource: list,
            columns,
            loading: this.props.loading.effects['goods/query'],
            rowKey: record => record.id,
          }

        return (
            <Card>
                <Table {...tableProps} />
            </Card>
        )
    }
}

export default GoodsPage