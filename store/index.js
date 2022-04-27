export const state = () => ({
  users: [],
})

export const mutations = {
  async getUsers(state, users) {
    state.users = users;
  },
}
