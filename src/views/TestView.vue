<script setup>
import { reactive, ref } from "vue";
import api from "../api/api.js";

const { signUp, login } = api;

/* email要設定正規表達式 */
/* password至少8字元，要有英文+數字*/
//註冊
const nameInput = ref("");
const emailInput = ref("");
const pwdInput = ref("");
//登入
const emailLogin = ref("");
const pwdLogin = ref("");

const signUpReq = reactive({
  name: nameInput,
  email: emailInput,
  password: pwdInput,
});

const loginReq = reactive({
  email: emailLogin,
  password: pwdLogin,
});

const signUpHandler = () => {
  signUp(signUpReq);
};

const loginHandler = () => {
  login(loginReq);
};
</script>

<template>
  <h1>sign up</h1>
  <form>
    <label for="">name</label>
    <input type="text" v-model="nameInput" />
    <label for="">email</label>
    <input type="text" v-model="emailInput" />
    <label for="">pwd</label>
    <input type="text" v-model="pwdInput" />
    <button type="button" @click="signUpHandler()">sign up</button>
    {{ signUpReq }}
  </form>

  <div class="line"></div>

  <h1>login</h1>
  <form>
    <label for="">email</label>
    <input type="text" v-model="emailLogin" />
    <label for="">pwd</label>
    <input type="text" v-model="pwdLogin" />
    <button type="button" @click="loginHandler()">login</button>
    {{ loginReq }}
  </form>
</template>

<style scoped lang="scss">
form {
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  margin: 2rem 0;
}

.line {
  border-bottom: 2px solid red;
}
</style>
