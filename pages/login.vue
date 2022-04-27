<template>
  <div class="container">
    <form @submit.prevent="submit">
      <h1>Login</h1>

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
          required
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
          required
        />
      </validation-provider>
      <v-btn type="submit"> Enviar </v-btn>
    </form>
  </div>
</template>

<script>
import { email, required } from 'vee-validate/dist/rules'
import { ValidationProvider, extend, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('email', {
  ...email,
  message: 'Email must be valid.',
})
extend('required', {
  ...required,
  message: '{_field_} cannot be empty.',
  computesRequired: true
})
export default {
  layout: 'login',
  components: {
    ValidationProvider,
  },
  data() {
    return {
      input_email: '',
      input_password: '',
    }
  },
  methods: {
    submit: async function (e) {
      const { email, password } = e.target
      this.$auth
        .loginWith('local', {
          data: {
            email: email.value,
            password: password.value,
          },
        })
    },
  },
}
</script>
<style scoped>
</style>
