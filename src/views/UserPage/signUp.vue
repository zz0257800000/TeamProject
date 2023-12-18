<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone_number: "",
      phoneError: "", // 用于显示电话号码错误信息
      message: "", // 用於顯示訊息
      showMessage: false, // 控制顯示註冊成功提示的變數
      showPassword: false, // 控制密码输入框的可见性
      showConfirmPassword: false, // 控制确认密码输入框的可见性
    };
  },
  methods: {
    registerUser() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        phone_number: this.phone_number,
      };
      // 使用 Axios 發送 POST 請求
      axios
        .post("http://localhost:8080/user/sign_up", userData)
        .then((response) => {
          console.log(response.data);
          this.showMessage = true;
          this.message = "註冊成功";
          setTimeout(() => {
            this.message = ""; // 一段时间后隐藏消息
            this.showMessage = false;
            this.$router.push("/UserPage/loginPage"); // 导航到登陆页面
          }, 3000);
        })
        .catch((error) => {
          console.error(error);
          // 處理錯誤，顯示錯誤訊息等
        });
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(this.email);
      if (!isValidEmail) {
        // 非有效的電子郵件格式時，設定錯誤訊息
        this.$refs.errEmail.innerText = "請輸入有效的電子郵件";
      } else {
        // 驗證成功時，清除錯誤訊息
        this.$refs.errEmail.innerText = "";
      }
    },
    validatePhoneNumber() {
      const phoneRegex = /^09\d{8}$/;
      if (!phoneRegex.test(this.phone_number)) {
        this.phoneError = "請輸入有效的電話號碼";
      } else {
        this.phoneError = "";
      }
    },
    // showMessageListener() {
    //   // 監聽 showMessage 事件
    //   this.$on("showMessage", (msg) => {
    //     this.message = msg; // 將接收到的訊息顯示在畫面上
    //     setTimeout(() => {
    //       this.message = ""; // 一段時間後清除訊息
    //     }, 3000); // 設定時間（3秒）後清除訊息
    //   });
    // },
  },
};
</script>

<template>
  <div class="signup-container">
    <div class="backbtn">
      <RouterLink class="btn" to="/UserPage/loginPage">返回登入面</RouterLink>
      <h3></h3>
      <h6>
        <RouterLink class="btn1" to="/"> Home</RouterLink> > <a href="">註冊</a>
      </h6>
    </div>
    <div class="signup">
      <img src="../../../public/1.jpg" width="700" height="500" alt="" />

      <div class="signupRight">
        <form
          role="form"
          action=""
          class="form-horizontal container jumbotron"
          name="regForm"
        >
          <div class="form-group">
            <label for="userName" class="control-label col-sm-2">姓名:</label>
            <div class="col-sm-4">
              <input
                v-model="name"
                type="text"
                class="form-control"
                name="userName"
                maxlength="7"
                placeholder="Enter user name"
              />
            </div>
            <span class="col-sm-6"><p id="errUName"></p></span>
            <div>{{ message }}</div>
          </div>

          <div class="form-group">
            <label for="email" class="control-label col-sm-2">信箱:</label>
            <div class="col-sm-4">
              <input
                v-model="email"
                @input="validateEmail"
                type="email"
                class="form-control"
                name="email"
                placeholder="someone@example.com"
              />
            </div>
            <!-- 在這裡加入錯誤訊息的顯示 -->
            <span class="col-sm-6"><p id="errEmail" ref="errEmail"></p></span>
          </div>

          <div class="form-group">
            <label for="phone" class="control-label col-sm-2">電話號碼:</label>
            <div class="col-sm-4">
              <input
                v-model="phone_number"
                @input="validatePhoneNumber"
                type="tel"
                class="form-control"
                name="phone"
                placeholder="0912345678"
              />
            </div>
            <span class="col-sm-6"
              ><p id="errPhone" :style="{ color: phoneError ? 'red ' : '' }">
                {{ phoneError }}
              </p></span
            >
          </div>

          <div class="form-group">
            <label for="pwd" class="control-label col-sm-2">密碼:</label>
            <div class="col-sm-4">
              <div class="input-form-control">
                <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-control"
                  name="password"
                  placeholder="Enter password"
                />
                <i class="fa-solid fa-eye A" @click="showPassword = !showPassword"></i>
              </div>
            </div>
            <span class="col-sm-6"><p id="errPwd"></p></span>
          </div>

          <div class="form-group">
            <label for="cnfrmPwd" class="control-label col-sm-2"
              >確認密碼:</label
            >
            <div class="col-sm-4">
              <div class="input-form-control">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-control"
                  name="confirmPassword" placeholder="Re-type password"/>
                <i class="fa-solid fa-eye A" @click="showConfirmPassword = !showConfirmPassword"></i>
              </div>
            </div>
            <span class="col-sm-6"><p id="errConfirmPwd"></p></span>
          </div>

          <div class="form-group">
            <label for="gender" class="control-label col-sm-2">性別:</label>
            <div class="radio btn col-sm-1">
              <label class="radio-inline">
                <input type="radio" name="optGender" />男
              </label>
            </div>
            <div class="radio btn col-sm-3">
              <label class="radio-inline">
                <input type="radio" name="optGender" />女
              </label>
            </div>
            <span class="col-sm-6"><p id="errGender"></p></span>
          </div>

          <div class="submitBtn">
            <!-- 透過表單的 submit 事件呼叫註冊方法 -->
            <button @click.prevent="registerUser" class="btn">送出</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  font-size: 16pt;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  width: 10vw;
  background-color: rgb(223, 223, 223);
}

.signup-container {
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  background-color: rgb(156, 156, 156);
  display: flex;
  flex-direction: column;

  .backbtn {
    border: 0px solid red;
    background-color: rgb(156, 156, 156);
    justify-content: space-between;
    display: flex;
    align-items: center;
    width: 97vw;
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
}

.signup {
  display: flex;
  width: 90vw;
  border: 0px solid red;
  align-items: center;
  background-color: rgb(156, 156, 156);
  justify-content: space-around;

  .signupRIG {
    border: 1px solid black;
    padding: 20px;

    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 5px;
        color: #333; /* Dark text color */
      }

      input[type="text"],
      input[type="password"] {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        border: 1px solid #ddd; /* Light border color */
        border-radius: 5px;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #4caf50; /* Focus border color */
        }
      }
    }

    .submitBtn {
      border: 0px solid red;
      display: flex;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      .btn {
        background-color: #4caf50;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #45a049; /* Hover background color */
        }
      }
    }
  }

  .signupRight {
    border: 0px solid red;
  }

  .form-control {
    width: 27vw;
  }
}
.input-form-control{
        position: relative;
        
        .A {
          position: absolute;
          
        }
      }
</style>
