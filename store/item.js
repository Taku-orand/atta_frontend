export const state = () => ({
  list: [
    {
      id: 1,
      name: 'name1',
      content: 'これはイベント1です。',
    },
    {
      id: 2,
      name: 'name2',
      content: 'これはイベント2です。',
      map_url: 'this is map url',
      reward: '大根上げるよ！',
    },
    {
      id: 3,
      name: 'name3',
      content: 'これはイベント3です。',
      map_url: 'this is map url',
      reward: '大根上げるよ！',
    },
    {
      id: 4,
      name: 'name4',
      content: 'これはイベント4です。',
      map_url: 'this is map url',
      reward: '大根上げるよ！',
    },
    {
      id: 5,
      name: 'name5',
      content: 'これはイベント5です。',
      map_url: 'this is map url',
      reward: '大根上げるよ！',
    },
    {
      id: 6,
      name: 'name6',
      content: 'これはイベント6です。',
      map_url: 'this is map url',
      reward: '大根上げるよ！',
    },
  ],
  item: {
    id: 1,
    name: 'イベント１',
    content: 'これはイベント1です。',
    qr_code: 'this is map url',
  },
})

export const getters = {
  counter(state) {
    return state.counter
  },
}

export const actions = {
  countAction({ commit }) {
    commit('countUp')
  },
}

export const mutations = {
  countUp(state) {
    state.counter++
  },
  add(state, text) {
    state.list.push({
      text,
      done: false,
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  },
}
