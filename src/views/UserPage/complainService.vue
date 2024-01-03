<script>
import axios from "axios";
//意見回饋頁面
export default {
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      address: "",
      feedback: "",
    };
  },
  methods: {
    //意見回饋方法
    sendFeedback() {
      if (
        !this.name.trim() ||
        !this.phone.trim() ||
        !this.email.trim() ||
        !this.feedback.trim()
      ) {
        alert("填寫所有欄位!!");
        return;
      }
      //電話號碼&電子郵件防呆
      const phoneRegex = /^09\d{8}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!phoneRegex.test(this.phone)) {
        alert("請輸入有效的電話號碼!");
        return;
      }
      if (!emailRegex.test(this.email)) {
        alert("請輸入有效的電子郵件!");
        return;
      }
      const feedbackData = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        feedback: this.feedback,
      };
      axios
        .post("http://localhost:8080/feedBack/sendFeedBack", feedbackData)
        .then((response) => {
          const responseData = response.data; // 取得回應的資料
          if (responseData && responseData.rtnCode === "SUCCESSFUL") {
            console.log(responseData.rtnCode);
            alert("發送成功，感謝您寶貴的意見!");
            localStorage.setItem("feedback_name", this.name);
            localStorage.setItem("feedback_phone", this.phone);
            localStorage.setItem("feedback_email", this.email);
            localStorage.setItem("feedback_text", this.feedback);
            this.name = "";
            this.phone = "";
            this.email = "";
            this.feedback = "";
          } else {
            alert("發送失敗，請稍後再試!");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("發生錯誤，請稍後再試!");
        });
    },
  },
  computed: {},
};
</script>

<template>
  <div class="contactPosition">
    <div class="contact page">
      <div class="secondtitle1">
        <h2>CONTACT-聯絡我們</h2>
      </div>
      <div class="secondtitle2"></div>
      <br />
      <div class="secondContent">
        <b>● 姓名</b>
        <br />
        <input type="text" class="textinput" v-model="name" />
        <br />
        <b>● 聯絡電話</b>
        <br />
        <input type="text" class="textinput" v-model="phone" maxlength="10" />
        <br />
        <b>● E-mail</b>
        <br />
        <input type="text" class="textinput" v-model="email" />
        <br />
        <b>● 意見與回饋</b>
        <br />
        <textarea
          cols="30"
          rows="10"
          class="textinput"
          v-model="feedback"
        ></textarea>
        <br />
        <br />
        <button class="ContactButton" @click="sendFeedback">SEND</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contactPosition {
  width: 100vw;
  background-color: rgb(246, 246, 246);
  .contact {
    display: flex;

    margin: 30px;
    flex-direction: column;
    border: 0px solid rgb(255, 0, 0);

    .secondtitle1 {
      justify-content: center;
      display: flex;
    }
    .secondtitle2 {
      justify-content: space-between;
      display: flex;
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
    .secondContent {
      position: relative;
      left: 20%;
      border: 0px solid black;
      height: 100vh;
      width: 60vw;
      .textinput {
        width: 59vw;
      }
      .ContactButton {
        border: 0px solid black;
        transition: 0.5s;
        background-color: black;
        color: white;
        width: 10vw;
        height: 5vh;
        position: relative;
        left: 39%;
        &:hover {
          background-color: red;
        }
      }
    }
  }
}
</style>
