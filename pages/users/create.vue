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
      <validation-provider
        name="Password"
        rules="required"
        v-slot="{ errors }"
      >
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
      <v-btn type="submit"> Enviar </v-btn>
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
  data() {
    return {
      input_email: '',
      input_password: '',
      input_name: '',
      input_password_confirmation: '',
    }
  },
  methods: {
    submit: function (e) {
      const { full_name, email, password, password_confirmation } = e.target
      if (password.value !== password_confirmation.value) {
        console.log('dawpok');
        return
      }

      this.$axios
        .post('/users', {
          name: full_name.value,
          email: email.value,
          password: password.value,
        })
        .then(() => {
          this.$router.push('/users')
        })
    },
  },
}
</script>

<style>
</style>
