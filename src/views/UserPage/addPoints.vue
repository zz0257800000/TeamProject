<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../api/api.js";
import Swal from "sweetalert2";

const router = useRouter();

const { getUserEmail, getMail, addPoints } = api;

//取得user_id
const userId = JSON.parse(sessionStorage.getItem("user_Id"));
console.log(userId)
//取得user_email
let email = "";
//v-model
const cash = ref(0);
const verifyInput = ref("");

//點擊點數卡，送出郵件
const getEailHandeler = async () => {
  if (cash.value <= 0) {
    // 儲值點數小於等於 0 時的處理
    Swal.fire({
      title: "儲值點數不能為負值或 0!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    // cash.value 大於 0 時的處理
    const code = await getMail(email);
    sessionStorage.setItem("verify", JSON.stringify(code));
    sessionStorage.setItem("cash", JSON.stringify(cash.value));

    // 这里可以添加发送邮件成功的提示框
    Swal.fire({
      title: "序號已發送至您的Mail！",
      icon: "success",
      confirmButtonText: "OK",
    });
  }
};

//點擊取消按鈕
const turnToBack = async () => {
  router.go(-1); // 或者使用 router.back();
};

const checkVerify = () => {
  // 取得 session storage 資料
  const pointValue = JSON.parse(sessionStorage.getItem("cash"));
  const verifyCode = JSON.parse(sessionStorage.getItem("verify"));
  console.log(pointValue);

  if (!verifyInput.value) {
    Swal.fire({
      title: "請輸入序號!!",
      icon: "warning",
      confirmButtonText: "OK",
    });
    return;
  }

  if (verifyInput.value !== verifyCode) {
    Swal.fire({
      title: "輸入錯誤!請再次確認!",
      icon: "error",
      confirmButtonText: "OK",
    });
    return;
  }

  if (verifyInput.value == verifyCode) {
    // 儲值點數大於等於 0 時的處理
    addPoints(userId, pointValue);
      sessionStorage.removeItem("verify");

      Swal.fire({
        title: "儲值成功! 新增" + pointValue + "點!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setTimeout(() => {
      window.location.reload();
    }, 1500);
      return;
    } 
};

onMounted(async () => {
  email = await getUserEmail(userId);
});
</script>


<template>
<div class="main-show">
    <div class="info-show">
      <h2 class="title">儲值</h2>
  <div class="info-content">
    <div class="detail-group">
      <label for="">儲值點數：</label>
      <input type="number area" v-model="cash" placeholder="請輸入欲儲值點數數量" min="0" class="input-field" />
    </div>
    <button @click="getEailHandeler()" class="sendMail">送出序號信</button>

    <div class="detail-group">
      <label for="">點數序號：</label>
      <input type="text" v-model="verifyInput" placeholder="請輸入點數序號" class="input-field" />
    </div>

    <div class="btnn area">
      <button type="cancelBtn button" @click="turnToBack()" style="margin-right: 10px; background-color: rgb(139, 139, 139);">取消</button>
      <button type="addBtn button" @click="checkVerify()">確認</button>
    </div>
  </div>
    </div>

</div>
</template>

<style scoped>
.title {
  font-size: 24px;
  color: #64b5f6;
  /* 蓝色标题 */
}

.main-show {
  width: 100vw;
  height: 85vh;
  background-color: #121212;
  /* 深色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  .info-content {
    border: 0px solid rgb(255, 0, 0);
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* 修改这里将项目右对齐 */
    justify-content: center;
    width: 50vw;
  }
}

.detail-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%; /* 调整宽度 */
  margin-top: 20px;
  text-align: right; /* 修改这里将文本右对齐 */
}

.info-show {
  width: 85vw;
  height: 80vh;
  background-color: #1e1e1e;
  /* 深色卡片背景 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 0px solid rgb(255, 0, 0);
}

.input-field {
  padding: 8px;
  width: 70%; /* 调整宽度 */
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #333;
  /* 深色输入框 */
  color: white;
  /* 字体颜色 */
}

button {
  padding: 10px 20px; /* 调整按钮宽度 */
  background-color: #2196F3;
  /* 按钮蓝色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}


.cancelBtn{
  background-color: #2196F3;
}
</style>



  