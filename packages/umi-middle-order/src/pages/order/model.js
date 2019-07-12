import * as service from './service'

export default {
    namespace: 'order',

    state: {
        list: [],
    },

    effects: {
        /**
         * 更新一条数据
         */
        * query({ payload }, { call, put }) {
            const result = yield call(service.query)
            if (result.code !== '0000') return

            yield put({ type: 'updateState', payload: { list: result.data.content } })
        },
    },

    reducers: {
        /**
         * 更新数据
         */
        updateState(state, { payload }) {
            return { ...state, ...payload }
        },
    },

}