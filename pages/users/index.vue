<template>
  <div>
    <NuxtLink to="/users/create">Create user</NuxtLink>
    <v-data-table
      :headers="headers"
      :items="users"
      items-key="id"
      :loading="loading"
      :options="options"
      sort-by="name"
      loading-text="Loading Users . . ."
      caption="Users"
    >
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      errorMessage: '',
      loading: true,
      options: {
        itemsPerPage: 5,
      },
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Name',
          value: 'name',
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Role',
          value: 'role',
        },
      ]
    },
  },
  mounted() {
    this.$axios
      .get('users')
      .then((response) => {
        this.users = response.data
        this.loading = false
      })
      .catch((error) => {})
  },
}
</script>

<style scoped>
</style>
