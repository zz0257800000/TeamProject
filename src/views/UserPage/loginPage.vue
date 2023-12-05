<script>
export default {
    data() {
        return {
            showLogin: true,
        };
    },
    methods: {
        switchToLogin() {
            this.showLogin = true;
        },
        switchToSignup() {
            this.showLogin = false;
        },
    },
};
</script>

<template>

<div class="mainLoginShow">
    <div class="leftShow">
        <h1>Hello word!!</h1>
    </div>
    <div class="login-box">
        <div class="lb-header">
                <h5>Login</h5>
        </div>
        <div class="social-login">
            <a href="#">
                <i class="fa fa-facebook fa-lg"></i>
                Login in with facebook
            </a>
            <a href="#">
                <i class="fa fa-google-plus fa-lg"></i>
                log in with Google
            </a>
        </div>
        <form class="email-login">
            <div class="u-form-group">
                <input type="email" placeholder="Email" />
            </div>
            <div class="u-form-group">
                <input type="password" placeholder="Password" />
            </div>
            <div class="u-form-group">
                <RouterLink class="loginBtn" to="/">Login</RouterLink>

            </div>
            <div class="u-form-group">
                <RouterLink class="btn" to="/UserPage/forgotPasswordPage">Forgot password?</RouterLink>
                &nbsp;
                <RouterLink class="btn" to="/UserPage/signUp">Sign Up</RouterLink>

            </div>
        </form>

    </div>
    </div>
</template>
  
 
  
<style lang="scss" scoped>

.mainLoginShow {
  border: 1px solid red;
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
  }

  .lb-header {
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
    padding: 10px 0 15px 0;
    border-bottom: 1px solid #eee;

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

  .loginBtn {
    background-color: #1CB94E;
    color: #fff;
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
  