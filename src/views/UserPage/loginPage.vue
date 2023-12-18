<script>
import axios from 'axios';
export default {
    data() {
        return {
            showLogin: true,
            email: "",
            password: "",
        };
    },
    methods: {
        switchToLogin() {
            this.showLogin = true;
        },
        switchToSignup() {
            this.showLogin = false;
        },
        LoginUser() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      // 使用 Axios 發送 POST 請求
      axios
        .post("http://localhost:8080/user/login", userData)
        .then((response) => {
          console.log(response.data);
           // 登录成功后导航回首页
      this.$router.push('/');
        })
        .catch((error) => {
          console.error(error);
          // 處理錯誤，顯示錯誤訊息等
        });
    },
    },
};
</script>

<template>
 <div class="secondtitle2">
      <h3>
      </h3>
      <h6>
        <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">登入</a>
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
        
        <form class="email-login">
            <div class="u-form-group">
              <i class="fa-solid fa-user"></i> &nbsp;<input type="email" placeholder="Email" v-model="email"/>
            </div>
            <div class="u-form-group">
              <i class="fa-solid fa-lock"></i> &nbsp; <input type="password" placeholder="Password" v-model="password"/>
            </div>
          <div class="passwordright">
            <h1></h1>
            <RouterLink class="btn" to="/UserPage/forgotPasswordPage">忘記密碼</RouterLink>
          </div>
            <div class="u-form-group">
                <!-- <RouterLink class="loginBtn" to="/">Login</RouterLink> -->
                <button @click="LoginUser" class="loginBtn" type="button">登入</button>
            </div>
            <div class="u-form-group">
             
                <RouterLink class="signBtn" to="/UserPage/signUp">註冊</RouterLink>

            </div>
        </form>
        <div class="social-login">
            <a href="#">
              <i class="fa-brands fa-facebook"></i>
                Login  facebook
            </a>
            <a href="#">
              <i class="fa-brands fa-google"></i>                Login  Google
            </a>
        </div>
    </div>
    </div>
</template>
  
 
  
<style lang="scss" scoped>
 .secondtitle2 {
    justify-content: space-between;
    display: flex;
    align-items: center;
    border: 0px solid rgb(255, 0, 0);
    width: 95vw;
    height: 15vh;

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
  .secondtitle2 {
    justify-content: space-between;
    display: flex;
    border: 0px solid rgb(255, 0, 0);
    width: 90vw;

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
  }

  .lb-header {
    display: flex;
    
    position: relative;
    color: #00415d;
    margin: 5px 5px 10px 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    text-align: center;
    height: 28px;

    a {
      margin: 0 25px;
      padding: 0 20px;
      text-decoration: none;
      color: #666;
      font-weight: bold;
      font-size: 15px;
      transition: all 0.1s linear;

      &.active {
        color: #029f5b;
        font-size: 18px;
      }
    }
  }

  .social-login {
    position: relative;
    float: left;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    padding: 10px 0 15px 0;
    border-bottom: 1px solid #eee;
    border: 0px solid rgb(0, 0, 0);

    a {
      position: relative;
      float: left;
      width: calc(40% - 8px);
      text-decoration: none;
      color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.05);
      padding: 12px;
      border-radius: 2px;
      font-size: 12px;
      text-transform: uppercase;
      margin: 0 3%;
      text-align: center;

      i {
        position: relative;
        float: left;
        width: 20px;
        top: 2px;
      }

      &:first-child {
        background-color: #49639F;
      }

      &:last-child {
        background-color: #DF4A32;
      }
    }
  }

  .email-login,
  .email-signup {
    position: relative;
    float: left;
    width: 100%;
    height: auto;
    margin-top: 20px;
    text-align: center;
  }

  .u-form-group {
    width: 100%;
    margin-bottom: 10px;

    input[type="email"],
    input[type="password"] {
      width: 75%;
      height: 45px;
      outline: none;
      border: 1px solid #9c9c9c;
      padding: 0 10px;
      border-radius: 2px;
      color: #000000;
      font-size: 0.8rem;
      transition: all 0.1s linear;

      &:focus {
        border-color: #358efb;
      }
    }
  }
  .passwordright{
    display: flex;
    justify-content: space-between;
    border: 0px solid rgb(0, 0, 0);
width: 27vw;
  }

  .loginBtn {
    border: 2px solid rgb(0, 0, 0);

    color: #000000;
    font-size: 20px;
    border-radius: 4px;
    text-decoration: none;
    width: calc(75% + 20px);  // 考慮到 padding
    display: block;
    margin: 0 auto;
    padding: 10px;
    margin-top: 20px;
  }

  .signBtn {
    background-color: #000000;

    color: #ffffff;
    font-size: 20px;
    border-radius: 4px;
    text-decoration: none;
    width: calc(75% + 20px);  // 考慮到 padding
    display: block;
    margin: 0 auto;
    padding: 10px;
    margin-top: 20px;
  }
}


</style>
  