<template>
  <div class="container">
    <v-card>
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
        <v-row>
          <div>
            <small>Esqueceu sua senha?</small>
            <v-btn color="primary">Recuperar Senha</v-btn>
          </div>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="green"> Entrar </v-btn>
        </v-row>
      </form>
    </v-card>
  </div>
</template>

<script>
import { email, required } from 'vee-validate/dist/rules'
import { ValidationProvider, extend, setInteractionMode } from 'vee-validate'
import Swal from 'sweetalert2'
setInteractionMode('eager')
extend('email', {
  ...email,
  message: 'Email must be valid.',
})
extend('required', {
  ...required,
  message: '{_field_} cannot be empty.',
  computesRequired: true,
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
    submit: async function () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.input_email,
            password: this.input_password,
          },
        })
      } catch (error) {
        Swal.fire({
              position: 'center',
              type: 'error',
              title: 'Email or password is incorrect.',
              showConfirmButton: false,
              timer: 2000,
            })
      }
    },
  },
}
</script>
<style scoped>
.v-card {
  padding: 20px;
}

.v-card h1 {
  text-align: center;
}
.row {
  margin-top: 20px;
}
</style>
