<template lang="pug">
  .valign-wrapper.container
    form.row(style="width: 100%", @submit.prevent="onSubmit")
      .col.s10.m10.l10
        .input-field
          input#email(type="email", placeholder="E-Mail", v-model="email")
          label(for="email") E-Mail
          span.red-text.text-accent-1(v-if="!$v.email.required") 반드시 필요합니다.
          span.red-text.text-accent-1(v-if="!$v.email.email") 이메일만 넣을 수 있습니다.
        .input-field(style="margin-top: 30px;")
          input#password(type="password", placeholder="Password", v-model="password")
          label(for="password") Password
          span.red-text.text-accent-1(v-if="!$v.password.required") 반드시 필요합니다.
          span.red-text.text-accent-1(v-if="!$v.password.minLength") 
            | 비밀번호는 {{ $v.password.$params.minLength.min }}글자 이상이여야 합니다.
          span.red-text.text-accent-1(v-if="!$v.password.maxLength") 
            | 비밀번호는 {{ $v.password.$params.maxLength.max }}글자이하이여야 합니다.
      .col.s2.m2.l2.button-parent
        button.btn.btn-large.big-button.blue.lighten-2(type="submit") Login
</template>

<style>
.button-parent {
  position: relative;
  height: 120px;
}
.big-button {
  width: 130px;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 20px;
}
</style>

<script>
import { login } from '~/assets/backend.js'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'

import swal from 'sweetalert'

Vue.use(Vuelidate)

export default {
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    async onSubmit() {
      try {
        const response = await login(this.email, this.password)
        if(!response.ok) {
          swal('Login Fail', '로그인에 실패하였습니다.', 'error')
        } else {
          swal('Login Success', '로그인에 성공하였습니다.', 'success')
          this.$store.commit('insert', response.sessid, response.nickname, response.email, response.isAdmin)
        }
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      maxLength: maxLength(20)
    }
  }
}
</script>
