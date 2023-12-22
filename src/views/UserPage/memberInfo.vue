<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        name: '', // 初始值
        userPhoto: null, // 添加 userPhoto 属性用于保存图像文件
      },
      //綁定pwd input v-model
      pwdInput: ("")
    };
  },
  mounted() {
    // 使用 sessionStorage 中的 user_Id
    const userId = sessionStorage.getItem('user_Id');
    console.log(userId);

    // 调用获取用户信息的 API
    axios.get(`http://localhost:8080/user/info?id=${userId}`)
      .then(response => {
        // 確保 response.data.user 存在
        this.user = response.data.user; // 将获取到的用户信息存储在组件的数据中
        console.log(response.data);

      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });
  },
  methods: {


    saveUserInfo() {
      if (!this.pwdInput || this.pwdInput.trim() === '') {
    alert('請輸入正確的密碼');
    return;
  }
      const req = (
        {
          id: this.user.id,
          name: this.user.name,
          email: this.user.email,
          address: this.user.address,
          level: 0,
          userPhoto: this.user.userPhoto,
          password: this.pwdInput,
          phone_number: this.user.phone_number,
          remittance_title: this.user.remittance_title,
          remittance_number: this.user.remittance_number,
          seller_name: this.user.seller_name
        }
      )


      // 发送 JSON 格式的请求
      axios.post(`http://localhost:8080/user/edit`, req, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
    console.log('User info updated successfully:', response.data);

    // 检查后端返回的数据，如果密码验证失败，显示相应的提示
    if (response.data && response.data.rtnCode === 'PASSWORD_ERROR') {
            alert('密碼錯誤請重新登入');
    } else {
      // 如果密码验证成功，执行其他操作
      alert('資料修改成功');
      this.pwdInput = '';
    }
  })
        .catch(error => {
       

          console.error('Error updating user info:', error);
          if (error.response && error.response.status === 401) {
        // 401 Unauthorized status typically indicates a password error
        alert('密碼錯誤請重新登入');
      } else {
        alert('密碼錯誤請重新登入');
      }
        });
    },


  },

};
</script>


<template>
  <!-- {{ user }} -->
  <div class="main-show">
    <div class="info-show">
      <div class="info-header">
        <h2 class="title">修改會員資料</h2>
        <div class="button-group">
          <button class="save-button" @click="saveUserInfo">儲存</button>
          <button class="cancel-button">取消</button>
        </div>
      </div>
      <div class="info-content">
        <div class="user-profile">
          <div class="profile-image" v-if="previewImage">
            <!-- 显示预览图像 -->
            <img :src="previewImage" alt="User Photo" />
          </div>
          <label for="userPhoto"></label>
          <input type="file" @change="handleImageChange" id="userPhoto" />

          <div class="user-details">
            <div class="detail-group" v-if="user">
              <i class="fa-regular fa-user"></i>
              信箱: <input type="text" name="" id="" class="input-field" v-model="user.email" disabled>
            </div>

            <div class="detail-group" v-if="user">
              <i class="fa-regular fa-user"></i>
              更改名字: <input type="text" name="" id="" class="input-field" v-model="user.name">
            </div>
            <div class="detail-group" v-if="user">
              <i class="fa-regular fa-user"></i>
              更改電話: <input type="text" name="" id="" class="input-field" v-model="user.phone_number">
            </div>

            <div class="detail-group" v-if="user"> <i class="fa-regular fa-user"></i>

              填寫地址: <input type="text" name="" id="" class="input-field" v-model="user.address">
            </div>
          </div>
        </div>
        <div class="address-details">
          <div class="detail-group" v-if="user"> <i class="fa-regular fa-user"></i>

            賣場名: <input type="text" name="" id="" class="input-field" v-model="user.seller_name">
          </div>
          <div class="detail-group" v-if="user"> <i class="fa-regular fa-user"></i>

            填寫匯款銀行: <input type="text" name="" id="" class="input-field" v-model="user.remittance_title">
          </div>
          <div class="detail-group" v-if="user"> <i class="fa-regular fa-user"></i>

            填寫銀行帳號: <input type="text" name="" id="" class="input-field" v-model="user.remittance_number">
          </div>
          <div class="detail-group" v-if="user">
            <i class="fa-regular fa-user"></i>

            確認密碼才能改資料: <input type="text" name="" id="" class="input-field" v-model="pwdInput">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
    width: 65vw;
    border: 0px solid rgb(255, 0, 0);
    justify-content: space-around;
    display: flex;
    align-items: center;
    height: 70vh;
  }
}

.info-show {
  width: 70vw;
  height: 80vh;
  background-color: #1e1e1e;
  /* 深色卡片背景 */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
  flex-direction: column;
  border: 0px solid rgb(255, 0, 0);
  width: 40vw;

}

.profile-image {
  margin-right: 20px;
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
  display: flex;
  flex-direction: column;
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
}</style>


  