import axios from 'axios'

const backend = 'http://127.0.0.1:80'

export function login (email, password) {
  return new Promise((resolve, reject) => {
    axios.post(backend + '/auth/login', {
      email: email,
      password: password
    })
    .then((res) => {
      if(res.data.ok === true) {
        resolve({
          ok: true,
          sessid: res.data.sessid,
          nickname: res.data.nickname,
          email: res.data.email,
          isAdmin: res.data.isAdmin
        })
      } else {
        resolve({
          ok: false,
          reason: res.data.reason
        })
      }
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export function register (email, password, check_password,
  nickname, recaptcha_response) {
  return new Promise((resolve, reject) => {
    axios.post(backend + '/auth/register', {
      email: email,
      password: password,
      check_password: check_password,
      nickname: nickname,
      'g-recaptcha-response': recaptcha_response
    })
    .then((res) => {
      if(res.data.ok === true) {
        resolve({
          ok: true,
          sessid: res.data.sessid
        })
      } else {
        resolve({
          ok: false,
          reason: res.data.reason
        })
      }
    })
    .catch((error) => {
      reject(error)
    })
  })
}

export function checkEmail(email) {
  return new Promise((resolve, reject) => {
    axios.get(backend + '/auth/email/' + email)
      .then((res) => {
        resolve({
          ok: res.data.ok
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function checkNickname(nickname) {
  return new Promise((resolve, reject) => {
    axios.get(backend + '/auth/nickname/' + nickname)
      .then((res) => {
        resolve({
          ok: res.data.ok
        })
      })
      .catch((error) => {
        reject(error)
      })
  })
}
