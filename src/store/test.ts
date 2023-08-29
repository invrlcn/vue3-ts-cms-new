import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 100
  }),
  getters: {
    doubleCounter(state) {
      return state.count * 2
    }
  },
  actions: {
    incrementAction() {
      this.count += 10
    }
  }
})

export default useCounterStore
