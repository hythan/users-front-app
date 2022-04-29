<template>
  <div class="container">
    <form @submit.prevent="submit">
      <h1>User Registration</h1>

      <validation-provider name="Name" rules="required" v-slot="{ errors }">
        <v-text-field
          v-model="input_name"
          label="Full Name"
          type="text"
          :error-messages="errors"
          name="full_name"
        />
      </validation-provider>
      <validation-provider
        name="Email"
        rules="required|email"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="input_email"
          type="email"
          label="Email"
          :error-messages="errors"
          name="email"
          placeholder="example@example.com"
        />
      </validation-provider>

      <validation-provider name="Role" rules="required" v-slot="{ errors }">
        <v-text-field
          v-model="input_role"
          type="text"
          :error-messages="errors"
          label="Role"
          name="role"
        />
      </validation-provider>
      <validation-provider name="Password" rules="required" v-slot="{ errors }">
        <v-text-field
          v-model="input_password"
          type="password"
          :error-messages="errors"
          placeholder="Password"
          label="Password"
          name="password"
        />
      </validation-provider>
      <validation-provider
        name="password_confirmation"
        rules="required|email_confirmation:@Password"
        v-slot="{ errors }"
      >
        <v-text-field
          v-model="input_password_confirmation"
          type="password"
          :error-messages="errors"
          placeholder="Password"
          label="Password Confirmation"
          name="password_confirmation"
        />
      </validation-provider>
      <v-checkbox v-model="input_active" label="Active"></v-checkbox>
      <v-btn type="submit"> Atualizar </v-btn>
    </form>
  </div>
</template>

<script>
import { email, required } from 'vee-validate/dist/rules'
import { extend, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('email', {
  ...email,
  message: 'Email must be a valid email.',
})
extend('required', {
  ...required,
  message: '{_field_} is required.',
})
extend('email_confirmation', {
  params: ['target'],
  validate(value, { target }) {
    return value === target
  },
  message: 'Password confirmation does not match.',
})

export default {
  components: {
    ValidationProvider,
  },
  middleware: 'auth',
  data() {
    return {
      input_email: '',
      input_password: '',
      input_name: '',
      input_password_confirmation: '',
      input_role: '',
      input_active: false,
    }
  },
  methods: {
    submit: function () {
      if (
        this.input_password &&
        this.input_password !== this.input_password_confirmation
      ) {
        return
      }

      this.$axios
        .patch('/users/' + this.$route.params.id, {
          name: this.input_name,
          email: this.input_email,
          role: this.input_role,
          active: this.input_active,
        })
        .then(() => {
          this.$router.push('/users')
        })
    },
  },
  mounted() {
    this.$axios.get('/users/' + this.$route.params.id).then((response) => {
      this.input_name = response.data.name
      this.input_email = response.data.email
      this.input_role = response.data.role
      this.input_active = response.data.active
    })
  },
}
</script>

<style>
</style>
