<script>
import axios from "axios";
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone_number: "",
      phoneError: "", // 顯示電話號碼錯誤訊息
      showPassword: false, // 切換密碼可見性
      showConfirmPassword: false, // 切換確認密碼可見性
    };
  },
  methods: {
    //註冊方法&防呆
    registerUser() {
      // 檢查所有欄位是否為空
      if (
        !this.name.trim() ||
        !this.email.trim() ||
        !this.phone_number.trim() ||
        !this.password.trim() ||
        !this.confirmPassword.trim()
      ) {
        alert("請填寫所有欄位的資料!!");
        return;
      }
      // 檢查姓名是否為空
      if (!this.name.trim()) {
        alert("請填寫姓名!!");
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
      // 檢查電話號碼是否為空且符合格式
      if (!this.phone_number.trim()) {
        alert("請填寫電話號碼!!");
        return;
      } else {
        const phoneRegex = /^09\d{8}$/;
        const isValidPhone = phoneRegex.test(this.phone_number);
        if (!isValidPhone) {
          alert("請輸入有效的電話號碼!!");
          return;
        }
      }
      // 檢查密碼是否為空
      if (!this.password.trim()) {
        alert("請填寫密碼!!");
        return;
      }
      // 密碼正規表達式，密碼至少8字元，要有英文+數字，字母及一個數字。
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      // 檢查密碼是否符合要求
      if (!passwordRegex.test(this.password)) {
        alert("密碼至少要包含8個字元，要有英文+數字，其中需包含至少一個字母及一個數字!!");
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert("密碼與確認密碼不同，請確認後重新输入。");
        return;
      }
      // 若通過所有條件，才可進行註冊
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        phone_number: this.phone_number,
      };
      axios.post("http://localhost:8080/user/sign_up", userData)
        .then((response) => {
          console.log(response.data);
          const responseData = response.data;
          console.log(responseData.rtnCode);
          if(responseData.rtnCode === "EMAIL_IS_EXIST"){
            alert("此電子郵件已被註冊，請使用其他電子郵件註冊!!")
          }else{
          // 如果不是 "EMAIL_IS_EXIST"，代表註冊成功
          this.showAlert("註冊成功!!")
          this.$router.push("/UserPage/loginPage"); // 註冊完成導回登入頁面
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    //套件sweetalert2，顯示註冊成功
    showAlert() {
      Swal.fire({
        title: '註冊成功!!',
        text: '歡迎加入皮皮蝦大家庭，即將幫您導向登入頁面!!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
    },
    //mail防呆，正規表達式
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
    //電話號碼防呆，正規表達式
    validatePhoneNumber() {
      const phoneRegex = /^09\d{8}$/;
      if (!phoneRegex.test(this.phone_number)) {
        this.phoneError = "請輸入有效的電話號碼";
      } else {
        this.phoneError = "";
      }
    },
  },
};
</script>

<template>
  <div class="signup-container">
    <div class="backbtn">
      <RouterLink class="btn" to="/UserPage/loginPage">返回登入頁面</RouterLink>
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
                maxlength=""
                placeholder="Enter user name"
              />
            </div>
            <span class="col-sm-6"><p id="errUName"></p></span>
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
            <!-- Email錯誤訊息的顯示 -->
            <span class="col-sm-6">
              <p
                id="errEmail"
                :style="{ color: phoneError ? 'red ' : '' }"
                ref="errEmail"
              ></p>
            </span>
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
                maxlength="10"
              />
            </div>
            <span class="col-sm-6">
              <p id="errPhone" :style="{ color: phoneError ? 'red ' : '' }">
                {{ phoneError }}
              </p>
            </span>
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
                  placeholder="Password"
                />
                <!-- <i
                  class="fa-solid fa-eye A"
                  @click="showPassword = !showPassword"
                ></i> -->
                <input type="checkbox" @click="showPassword = !showPassword">顯示密碼
              </div>
            </div>
            <span class="col-sm-6"><p id="errPwd"></p></span>
          </div>

          <div class="form-group">
            <label for="cnfrmPwd" class="control-label col-sm-2"
              >確認密碼:</label>
            <div class="col-sm-4">
              <div class="input-form-control">
                <input
                  v-model="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="form-control"
                  name="confirmPassword"
                  placeholder="Re-type password"/>
                <!-- <i
                  class="fa-solid fa-eye A"
                  @click="showConfirmPassword = !showConfirmPassword"
                ></i> -->
                <input type="checkbox" @click="showConfirmPassword = !showConfirmPassword">顯示密碼
              </div>
            </div>
            <span class="col-sm-6"><p id="errConfirmPwd"></p></span>
          </div>

        

          <div class="submitBtn">
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
.input-form-control {
  position: relative;

  .A {
    position: absolute;
  }
}

/* 模态框样式 */
.success-modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>