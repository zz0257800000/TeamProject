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

  if (cash.value < 0) {
      // 儲值點數小於 0 時的處理
      Swal.fire({
        title: "儲值點數不能為負值!",
        icon: "error",
        confirmButtonText: "OK",
      });
  const code = await getMail(email);
  sessionStorage.setItem("verify", JSON.stringify(code));
  sessionStorage.setItem("cash", JSON.stringify(cash.value));
};}




//點擊取消按鈕
const turnToBack = async () => {
  // router.push("/stored/points");
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

      return;
    } 
};

onMounted(async () => {
  email = await getUserEmail(userId);
});
</script>


<template>
  <h1>儲值</h1>
  <label for="">點數序號</label>
  <input type="number" v-model="cash" placeholder="請輸入欲儲值點數數量" min="0" />
  <button @click="getEailHandeler()">送出</button>

  <label for="">點數序號</label>
  <input type="text" v-model="verifyInput" placeholder="請輸入點數序號" />
  <button type="button" @click="turnToBack()">取消</button>
  <button type="button" @click="checkVerify()">確認</button>
</template>

<style scoped>
.main-show {
  width: 100vw;
  height: 85vh;
  /* 深色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  .info-content {
    width: 80vw;
    border: 0px solid rgb(255, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60vh;

  }

  .points-modal {
    /* 其他样式属性... */
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明的背景遮罩 */
    z-index: 999;

    .input-field {
      color: rgb(0, 0, 0);

    }
  }

  .modal-content {
    height: 50vh;
    width: 50vw;
    background-color: #1e1e1e;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .firstshow {
      display: flex;
      justify-content: space-between;

      .closebutton {
        width: 30px;
        /* 调整按钮的宽度 */
        height: 30px;
        /* 调整按钮的高度 */
        font-size: 20px;
        /* 设置字体大小 */
        color: #fff;
        /* 字体颜色 */
        background-color: #2196F3;
        /* 按钮蓝色 */
        border: none;
        border-radius: 50%;
        /* 将按钮形状设置为圆形 */
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        /* 移除点击时的边框 */
        transition: background-color 0.3s;
        /* 添加过渡效果 */

      }

      .closebutton:hover {
        background-color: #2196F3;
        /* 按钮蓝色 */
      }

    }

    .button-group {
      position: fixed;
      bottom: 25%;
      right: 25%;
      margin: 20px;
      /* 距离边缘的距离，根据需要调整 */
    }

    .button-group button {
      padding: 10px 20px;
      background-color: #2196F3;
      /* 按钮蓝色 */
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }

}

.info-show {
  width: 85vw;
  height: 80vh;
  background-color: #ffffff;
  /* 深色卡片背景 */
  padding: 20px;
  border-radius: 10px;
  color: #1e1e1e;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border: 0px solid rgb(255, 0, 0);

  .info-footer {
    height: 10vh;
    position: relative;
    left: 94%;
    top: 2%;
    width: 5vw;
    border: 0px solid rgb(255, 0, 0);


  }

}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border: 0px solid rgb(255, 0, 0);

}

.title {
  font-size: 24px;
  color: #64b5f6;
  /* 蓝色标题 */
}

.button-group button {
  padding: 10px 20px;
  background-color: #2196F3;
  /* 按钮蓝色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.cancel-button {
  background-color: #f44336;
  /* 取消按钮红色 */
}

.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px solid rgb(255, 0, 0);
  width: 40vw;
  height: 60vh;

}

.profile-image {
  margin-right: 20px;
  border: 0px solid rgb(255, 0, 0);
  height: 25vh;
}

.profile-image img {
  height: 150px;
  width: 150px;

  border-radius: 50%;
  margin-bottom: 10px;
}

.change-image-button {
  padding: 8px 16px;
  background-color: #2196F3;
  /* 更改按钮蓝色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;
}

.user-details {

  display: flex;
  flex-direction: column;
}

.detail-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.detail-group i {
  margin-right: 10px;
  color: #64b5f6;
  /* 蓝色图标 */
}

.address-details {
  top: 23%;
  position: relative;
  display: flex;
  flex-direction: column;
  border: 0px solid rgb(255, 0, 0);
  width: 40vw;



}

.input-field {
  padding: 8px;
  width: 25vw;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #333;
  /* 深色输入框 */
  color: white;
  /* 字体颜色 */
}
</style>


  