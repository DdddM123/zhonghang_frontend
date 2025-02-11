<script setup>
import {ref} from "vue";
import {login} from "../api/system.js";
import router from "../router/index.js";

const username = ref('nekovo')
const password = ref('123456')

const loginin = async () => {
  await login(username.value, password.value);
}
</script>

<template>
  <span>系统管理</span>
  <el-card class="login-card">
    <h2>登录</h2>
    <el-input v-model="username" label="用户名"></el-input>
    <el-input v-model="password" label="密码"></el-input>
    <el-button @click="loginin">登录</el-button>
  </el-card>
</template>

<style scoped>
.login-card{
  flex-direction: column;
}
</style>