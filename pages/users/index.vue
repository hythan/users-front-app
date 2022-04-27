<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="this.$store.state.users.data"
      items-key="id"
      :loading="loading"
      :options="options"
      sort-by="name"
      loading-text="Loading Users . . ."
      caption="Users"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Users</v-toolbar-title
          ><v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <nuxt-link to="/users/create" class="teste">
            <v-btn color="primary" class="mb-2"> Create user</v-btn>
          </nuxt-link>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
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
        {
          text: 'Actions',
          value: 'actions',
        },
      ]
    },
  },
  methods: {
    editItem: function (item) {
      this.$router.push('/users/' + item.id)
    },
    deleteItem: function (item) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.$axios.delete('users/' + item.id).then((response) => {
            Swal.fire(
              'Deleted!',
              `The user ${response.data.name} has been deleted.`,
              'success'
            )
            this.$axios.get('users').then((users) => {
              this.$store.commit('getUsers', users)
            })
          })
        }
      })
    },
  },
  mounted() {
    this.$axios.get('users').then((users) => {
      this.$store.commit('getUsers', users)
      this.loading = false
    })
  },
}
</script>

<style scoped>
.teste {
  text-decoration: none;
}
</style>
