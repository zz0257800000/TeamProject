<script>
export default {
  data() {
    return {
      email: '',
      newPassword: '',
    };
  },
  methods: {
    submitForm() {
      // 调用后端服务发送重置密码的请求
      // 例如：this.$axios.post('/api/reset-password', { email: this.email, newPassword: this.newPassword })
      // 处理后端服务的响应，显示相应的信息给用户
    },
  },
};
</script>
<template>
    <div class="change-password-container">
      <h1>Change Password</h1>
      <form @submit.prevent="submitForm" class="change-password-form">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required class="input-field">
  
        <label for="newPassword">New Password:</label>
        <input type="password" v-model="newPassword" required class="input-field">
  
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </template>
<style lang="scss" scoped>
.change-password-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.change-password-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  margin-bottom: 5px;
  text-align: left;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 5px 0 15px 0;
  box-sizing: border-box;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}

</style>