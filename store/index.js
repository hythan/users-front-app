export const state = () => ({
  token: '',
})

export const mutations = {
  login(state, payload) {
      state.token = payload;
  },
  logout(state) {
      state.token = '';
  }
}
