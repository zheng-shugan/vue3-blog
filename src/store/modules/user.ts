import * as types from '../types'

const initPageSate = () => {
  return {
    userInfo: {
      _id: '',
      name: '',
      avatar: '',
    },
  }
}

const user = {
  state: initPageSate(),
  mutations: {
    [types.SAVE_USER](state: object | any, pageState: object | any) {
      for (const prop in pageState)
        state[prop] = pageState[prop]
    }
  },
  actions: { }
}

export default user