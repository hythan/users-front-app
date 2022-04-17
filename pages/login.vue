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
    submit: function(e){
      const {email, password} = e.target
      this.$axios.post('http://localhost:3000/auth/login',{email: email.value, password: password.value})
      .then((response) => {
        localStorage.setItem('token', response.data.access_token)
        this.$store.commit('login', response.data.access_token);
        this.$router.push('/users')
      })
    }
  }
}
</script>
<style scoped>
</style>
