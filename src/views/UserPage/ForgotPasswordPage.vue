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
    <div class="secondtitle2">
        <RouterLink class="backbtn" to="/UserPage/loginPage">返回登入面</RouterLink>
        <h3>
      </h3>
      <h6>
        <RouterLink class="btn1" to="/"> Home</RouterLink> > <a href="">重新設定密碼</a>
      </h6>

    </div>
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
      <br>
      <form @submit.prevent="submitForm" class="change-password-form">
        <div class="inputList">
        <label for="email">信箱:</label>
        <input type="email" v-model="email" required class="input-field">
        <button type="submit" class="sendBtn">發送驗證碼</button>

      </div>
      <div class="inputList1">
        <label for="newPassword">驗證碼:</label>&nbsp; &nbsp; 
        <input type="password" v-model="newPassword" required class="input-field">
      </div>

      <div class="inputList1">
        <label for="newPassword">新密碼:</label>&nbsp; &nbsp; 
        <input type="password" v-model="newPassword" required class="input-field">
      </div>
        <RouterLink class="submit-button" to="/"> 確定</RouterLink> 

      </form>
    </div>
       
    </div>
    </div>
  </template>
<style lang="scss" scoped>

.secondtitle2 {
    justify-content: space-between;
    display: flex;

    border: 0px solid rgb(255, 0, 0);
    width: 98vw;
    height: 10vh;
    align-items: center;
.backbtn{
  font-size: 16pt;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  width: 10vw;
  justify-content: center;
    display: flex;
    align-items: center;

  background-color: rgb(223, 223, 223);

}
    a {

      border-radius: 10px;
      padding: 5px;
      transition: all 0.5s ease;
      text-decoration: none;
      color: black;

      &:hover {
        color: red;
        background-color: rgba(118, 118, 117, 0.5);
      }
    }

  }
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
    width: 700px;
    height: 67vh;
    background-color: #fff;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.33);
    .inputList{
      border: 0px solid rgb(255, 0, 0);
width: 30vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      left: 3%;
      .sendBtn{
        height:5vh;
        width: 18%;
      }
    }

    .inputList1{
      border: 0px solid rgb(255, 0, 0);
width: 30vw;
      display: flex;
      align-items: center;
      .input-field{
        width: 21vw;

      }
      
    }
    .change-password-container {
  max-width: 600px;

  border: 0px solid rgb(255, 0, 0);
  height: 57vh;

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
  width: 70%;
  padding: 10px;
  margin: 5px 0 15px 0;
  box-sizing: border-box;
  
}

.submit-button {
  background-color: rgb(76, 155, 175);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 50%;

}

.submit-button:hover {
  background-color: rgb(27, 191, 197);
}
  }


}

</style>