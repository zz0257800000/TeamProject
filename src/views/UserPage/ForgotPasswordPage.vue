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
    
    <div class="mainLoginShow">
    <div class="leftShow">
      <h1> <i class="fa-solid fa-shrimp"><b> 呱皮皮蝦</b> </i>
        </h1>
    </div>
    <div class="login-box">
        <div class="lb-header">
          <h3>歡迎回來</h3>

        </div>
        <br>
        <div class="change-password-container">
      <h1>重新設定密碼</h1>
      <form @submit.prevent="submitForm" class="change-password-form">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required class="input-field">
  
        <label for="newPassword">New Password:</label>
        <input type="password" v-model="newPassword" required class="input-field">
  
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
       
    </div>
    </div>
  </template>
<style lang="scss" scoped>

.mainLoginShow {
  border: 0px solid red;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .leftShow {
    background-color: rgb(0, 0, 0);
    height: 70vh;
    width: 30vw;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .login-box {
    position: relative;
    margin: 10px;
    width: 500px;
    height: 67vh;
    background-color: #fff;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.33);
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
  }


}

</style>