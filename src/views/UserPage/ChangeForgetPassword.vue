<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      email: "",
      oldPassword: "",
      newPassword: "",
      showPassword: false, // 切換密碼可見性
      showConfirmPassword: false, // 切換密碼可見性
    };
  },
  methods: {
    // 改密碼方法
    changePwd() {
      if(!this.email.trim() || !this.oldPassword.trim() || !this.newPassword.trim()){
        alert("請填寫所有欄位的資料!!");
        return;
      }
      // 檢查電子郵件是否為空且符合格式
      if (!this.email || !this.email.trim()) {
        alert("電子郵件欄位不得為空!!");
        return;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(this.email);
        if (!isValidEmail) {
          alert("請輸入有效的電子郵件!!");
          return;
        }
      }
      // 檢查驗證碼是否為空
      if (!this.oldPassword.trim()) {
        alert("請填寫驗證碼!!");
        return;
      }
      // 密碼正規表達式，密碼至少8字元，要有英文+數字，字母及一個數字。
      const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      // 檢查密碼是否符合要求
      if (!passwordRegex.test(this.newPassword)) {
        alert("密碼至少要包含8個字元，要有英文+數字，其中需包含至少一個字母及一個數字!!");
        return;
      }
      //更改密碼方法，通過所有條件才可更改密碼
      const userData = {
        email: this.email,
        old_password: this.oldPassword,
        new_password: this.newPassword,
      };
      axios.post("http://localhost:8080/user/changePwd", userData)
        .then((response) => {
          console.log(response.data);
          const responseData = response.data;
          console.log(responseData.rtnCode);
          if(responseData.rtnCode === "EMAIL_NOT_FOUND"){
            alert("電子郵件錯誤，請確認您的電子郵件是否正確!!")
          }else{
          this.showAlert("更改密碼成功!!");
          this.$router.push("/UserPage/loginPage"); //更改密碼成功後碼導回首頁
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //套件sweetalert2
    showAlert() {
      Swal.fire({
        title: "更改密碼成功!!",
        text: "歡迎回到皮皮蝦大家庭!!",
        icon: "success",
        confirmButtonText: "OK",
      });
    },
  },
};
</script>

<template>
  <div class="mainLoginShow">
    <div class="leftShow">
      <h1>
        <i class="fa-solid fa-shrimp"><b> 呱皮皮蝦</b> </i>
      </h1>
    </div>
    <div class="login-box">
      <div class="change-password-container">
        <h1>更改密碼</h1>
        <br />
        <form @submit.prevent="submitForm" class="change-password-form">
          <div class="inputList" style="margin-bottom: -10px;">
            <label for="email">信箱:</label>
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              required
              class="input-field"
            />
          </div>
          <br />

          <div class="inputList">
            <label for="oldPassword">驗證碼:</label>
            <input
              :type="showConfirmPassword ? 'text' : 'password'"
              v-model="oldPassword"
              placeholder="Verification-code"
              required
              class="input-field"
            />
          </div>
          <div class="box" style="margin-right: 27%; margin-top: -5px;">
            <input type="checkbox" v-model="showConfirmPassword" />
            <label>顯示密碼</label>
          </div>

          <div class="inputList">
            <label for="newPassword">新密碼:</label>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="newPassword"
              placeholder="NewPassword"
              required
              class="input-field"
            />
          </div>
          <div class="box" style="margin-right: 27%; margin-top: -5px;">
            <input type="checkbox" v-model="showPassword" />
            <label>顯示密碼</label>
          </div>
          <br />

          <button
            class="submit-button"
            type="submit"
            @click="changePwd"
            style="margin-left: 5%">
            確定
          </button>
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
  .backbtn {
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

    .input-with-checkbox {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      input[type="checkbox"] {
        margin-top: 5px;
      }
    }
    .inputList {
      border: 0px solid rgb(255, 0, 0);
      width: 30vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      left: 3%;
      /* 調整驗證碼及新密碼輸入框大小與信箱輸入框相同 */
      width: 100%;
      max-width: 70%;
      .sendBtn {
        height: 5vh;
        width: 18%;
      }
    }

    .inputList1 {
      border: 0px solid rgb(255, 0, 0);
      width: 30vw;
      display: flex;
      align-items: center;
      .input-field {
        width: 21vw;
        /* 避免字體被擠在同一行中 */
        width: 100%;
        max-width: unset;
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
      .inputPwd {
        width: 65%;
        height: 50px;
      }
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
      margin-right: 15%;
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