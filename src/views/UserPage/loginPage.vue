<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false, // 切換密碼可見性
      id: "",
    };
  },
  methods: {
    //登入方法
    LoginUser() {
      if (!this.email.trim() || !this.password.trim()) {
        alert("請填寫所有欄位的資料!!");
        return;
      }
      // 檢查電子郵件是否為空且符合格式
      if (!this.email.trim()) {
        alert("請填寫電子郵件!!");
        return;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(this.email);
        if (!isValidEmail) {
          alert("請輸入有效的電子郵件!!");
          return;
        }
      }
      // 檢查密碼是否為空
      if (!this.password.trim()) {
        alert("請填寫密碼!!");
        return;
      }
      // 密碼正規表達式，密碼至少8字元，要有英文+數字，其中包含至少一個字母及一個數字。
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      // 檢查密碼是否符合要求
      if (!passwordRegex.test(this.password)) {
        alert("請確認您的密碼至少8碼，其中包含至少一個字母及一個數字");
        return;
      }
      const userData = {
        email: this.email,
        password: this.password,
      };
      // 使用 Axios 發送 POST 請求
      axios.post("http://localhost:8080/user/login", userData)
        .then((response) => {
          const responseData = response.data;
          console.log(responseData.rtnCode);
          switch (responseData.rtnCode) { //判斷rtnCode 以下判斷rtnCode的訊息做分類
            case "SUCCESSFUL": // 登入成功
              console.log(responseData);
              console.log("User Photo:", responseData.user.user_photo);
              sessionStorage.setItem("loggedIn", "TRUE");
              sessionStorage.setItem("user_Id", responseData.user.id);
              sessionStorage.setItem("name", responseData.user.name);
              sessionStorage.setItem("points", responseData.user.points);
              sessionStorage.setItem("user_photo", responseData.user.user_photo);
              sessionStorage.setItem("seller_name", responseData.user.seller_name);
              sessionStorage.setItem("remittance_title", responseData.user.remittance_title);
              sessionStorage.setItem("remittance_number", responseData.user.remittance_number);
              sessionStorage.setItem("level", responseData.user.level);
              sessionStorage.setItem("phone_number", responseData.user.phone_number);

              this.showAlert("登入成功");
              this.$emit('userLoggedIn');

              this.$router.push("/");
              break;
            case "FOUND_TO_CHANGE_PASSWORD_PAGE": // 需要更改密碼
            this.showAlert1("登入成功，請更改密碼!!");
              this.$router.push("/UserPage/ChangeForgetPassword");
              break;
            case "EMAIL_NOT_FOUND": // 電子郵件未註冊
              alert("此電子郵件尚未註冊");
              break;
            case "PASSWORD_ERROR": // 密碼錯誤
              alert("密碼錯誤");
              break;
            default:
              console.error("未知錯誤:", responseData.code);
              alert("登入失敗，請稍後再試");
              break;
          }
        })
        .catch((error) => {
          console.error(error);
          // 處理網路或伺服器錯誤
          alert("發生了一些問題，請確保您的網路連線正常，並稍後再試!");
        });
      },
    //套件sweetalert2，顯示登入成功
    showAlert() {
      Swal.fire({
        title: "登入成功!!",
        text: "歡迎回來皮皮蝦!!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
      // 关闭弹窗后重新加载页面
      location.reload();
    });
      },
   //套件sweetalert2，引導更改密碼
    showAlert1() {
      Swal.fire({
        title: "登入成功!!",
        text: "請更改密碼!!",
        icon: "success",
        confirmButtonText: "OK",
      });
      },
    //切換密碼可見性
    togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
      },
  },
};
</script>

<template>
  <div class="mainLoginShow">
    <div class="leftShow">
      <h1>
        <i class="fa-solid fa-shrimp"><b> 皮皮蝦</b></i>
      </h1>
    </div>
    <div class="login-box">
      <div class="lb-header">
        <h3>歡迎回來</h3>
      </div>
      <br />

      <form class="email-login">
        <div class="u-form-group">
          <i class="fa-solid fa-user" style="margin-right: 2%;"></i> &nbsp;
          <input type="email" placeholder="Email" v-model="email" />
        </div>
        <div class="u-form-group">
          <i class="fa-solid fa-lock" style="margin-right: 5%;"></i>
        <input :type="showPassword ? 'text' : 'password'" placeholder="Password" v-model="password" class="pwd"/>
      <br><input type="checkbox"  @click="togglePasswordVisibility" style="margin-left: 8%;">顯示密碼
    </div>
        <div class="passwordright">
          <RouterLink class="btn" to="/UserPage/ForgotPasswordPage">忘記密碼?</RouterLink>
        </div>
        <div class="u-form-group">
          <button @click="LoginUser" class="loginBtn" type="button">登入</button>
        </div>
        <div class="u-form-group">
          <RouterLink class="signBtn" to="/UserPage/signUp">註冊</RouterLink>
        </div>
      </form>
      <div class="social-login">
        <!-- <a href="#">
          <i class="fa-brands fa-facebook"></i>
          Login facebook
        </a>
        <a href="#"> <i class="fa-brands fa-google"></i> Login Google </a> -->
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
  width: 100vw;
  background-color: rgb(246, 246, 246);

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
    height: 70vh;
    background-color: #fff;
    padding: 10px;
    border-radius: 3px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.33);
  }

  .lb-header {
    display: flex;
    justify-content: center;
    position: relative;
    color: #00415d;
    margin: 5px 5px 10px 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    text-align: center;
    height: 35px;

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
        background-color: #49639f;
      }

      &:last-child {
        background-color: #df4a32;
      }
    }
  }

  .email-login {
  .u-form-group {
    // width: 100%;
    margin-bottom: 10px;
    position: relative;

    .fa-solid.fa-eye {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }

    input[type="email"],
    input[type="password"],
    input[type="text"] {
      padding-right: 40px;
      width: 85%;
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

  .passwordright {
    display: flex;
    justify-content: space-between;
    border: 0px solid rgb(0, 0, 0);
    width: 27vw;
    margin-left: 70%;
  }
}



  .loginBtn {
    border: 2px solid rgb(0, 0, 0);

    color: #000000;
    font-size: 20px;
    border-radius: 4px;
    text-decoration: none;
    width: calc(75% + 20px); // 考慮到 padding
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
    width: calc(75% + 20px); // 考慮到 padding
    display: block;
    margin: 0 auto;
    padding: 10px;
    margin-top: 20px;
    text-align: center;
  }
}
</style>
