<template lang="pug">
  .valign-wrapper.container
    form.row(style="width: 100%", @submit.prevent="onRegister")
        .input-field.col.s12.m8.l8
          input#email(type="email", placeholder="E-Mail", v-model="email")
          label(for="email") E-Mail
          span.red-text.text-accent-1(v-if="!$v.email.required") 반드시 필요합니다.
          span.red-text.text-accent-1(v-if="!$v.email.email") 이메일만 넣을 수 있습니다.
        .input-field.col.s12.m4.l4(style="margin-top: 30px;")
          button.btn.btn-large.blue.lighten-2(@click.stop.prevent="checkEmail") 이메일 중복확인
        .input-field.col.s12.m12.l12(style="margin-top: 30px;")
          input#password(type="password", placeholder="Password", v-model="password")
          label(for="password") Password
          span.red-text.text-accent-1(v-if="!$v.password.required") 반드시 필요합니다.
          span.red-text.text-accent-1(v-if="!$v.password.minLength") 
            | 비밀번호는 {{ $v.password.$params.minLength.min }}글자 이상이여야 합니다.
          span.red-text.text-accent-1(v-if="!$v.password.maxLength") 
            | 비밀번호는 {{ $v.password.$params.maxLength.max }}글자이하이여야 합니다.
        .input-field.col.s12.m12.l12(style="margin-top: 30px;")
          input#check_password(type="password", placeholder="Password Check", v-model="check_password")
          label(for="check_password") Password Check
          span.red-text.text-accent-1(v-if="!$v.check_password.required") 반드시 필요합니다.
          span.red-text.text-accent-1(v-if="!$v.check_password.sameAsPassword") 
            | 비밀번호와 비밀번호 확인이 일치하지 않습니다.
        .input-field.col.s12.m8.l8(style="margin-top: 30px;")
          input#nickname(type="text", placeholder="Nickname", v-model="nickname")
          label(for="nickname") Nickname
          p 4~16자로 이루어진 영어 대소문자, 숫자 또는 _ 이여야 하며, 숫자로 시작할 수 없습니다.
          span.red-text.text-accent-1(v-if="!$v.nickname.required") 반드시 필요합니다.
          span.red-text.text-accent-1(v-if="!$v.nickname.minLength") 
            | 닉네임은 {{ $v.nickname.$params.minLength.min }}글자 이상이여야 합니다.
          span.red-text.text-accent-1(v-if="!$v.nickname.maxLength") 
            | 닉네임은 {{ $v.nickname.$params.maxLength.max }}글자이하이여야 합니다.
          span.red-text.text-accent-1(v-if="!$v.nickname.nickname") 
            | 조건에 맞지 않습니다.
        .input-field.col.s12.m4.l4(style="margin-top: 30px;")
          button.btn.btn-large.blue.lighten-2(@click.stop.prevent="checkNickname") 닉네임 중복확인
        .input-field.col.s12.m12.l12(style="margin-top: 30px;")
          vue-recaptcha(:sitekey="recaptcha_key", @verify="onVerify", @expired="onExpired")
        .input-field.col.s12.m12.l12(style="margin-top: 30px; text-align: center;")
          button.btn.btn-large.blue.lighten-2(type="submit", style="display: inline-block;", :class="(!valid_recaptcha ? 'disabled' : '')") Register
</template>

<script>
import { register, checkEmail as emailChecker, checkNickname as nicknameChecker} from '~/assets/backend.js'
import VueRecaptcha from 'vue-recaptcha'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
function nickValidator (value) {
  return /^(?![0-9])[a-zA-Z0-9\_]+$/.test(value)
}

import swal from 'sweetalert'

Vue.use(Vuelidate)

export default {
  components: {
    'vue-recaptcha': VueRecaptcha
  },
  asyncData (context) {
    return {
      recaptcha_key: context.env.recaptcha
    }
  },
  data () {
    return {
      email: null,
      password: null,
      check_password: null,
      nickname: null,
      valid_recaptcha: false,
      recaptcha_response: null
    }
  },
  methods: {
    async onRegister() {
      try {
        const response = await register(this.email, this.password, this.check_password,
          this.nickname, this.recaptcha_response)
        if(!response.ok) {
          swal('Login Fail', '회원가입에 실패하였습니다.', 'error')
        } else {
          swal('Login Success', '회원가입에 성공하였습니다.', 'success')
          setTimeout(() => {
            this.$nuxt.$router.replace({ path: '/login' })
          }, 1500)
        }
      } catch (error) {
        console.log(error)
      }
    },
    onVerify (data) {
      this.recaptcha_response = data
      this.valid_recaptcha = true
    },
    onExpired () {
      this.valid_recaptcha = false
    },
    async checkEmail () {
      try {
        let result = await emailChecker(this.email)
        console.log(result)
        if (result.ok == true) {
          swal('Check Success', '사용할 수 있는 이메일입니다.', 'success')
        } else {
          swal('Check Fail', '사용할 수 없는 이메일입니다.', 'error')
        }
      } catch (error) {
        console.log(error)
      }
    },
    async checkNickname () {
      try {
        let result = await nicknameChecker(this.nickname)
        if (result.ok == true) {
          swal('Check Success', '사용할 수 있는 닉네임입니다.', 'success')
        } else {
          swal('Check Fail', '사용할 수 없는 닉네임입니다.', 'error')
        }
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
    },
    check_password: {
      required,
      sameAsPassword: sameAs('password')
    },
    nickname: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(16),
      nickname: nickValidator
    }
  }
}
</script>