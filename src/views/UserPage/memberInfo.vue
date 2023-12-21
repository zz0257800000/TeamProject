<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        userPhoto: null, // 添加 userPhoto 属性用于保存图像文件
      },
      previewImage: null, // 用于保存图像预览的 Base64 编码字符串
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
      const userData = new FormData();
      
      // Append user data
      userData.append('name', this.user.name);
      userData.append('phone_number', this.user.phone_number);
      userData.append('address', this.user.address);
      userData.append('remittance_title', this.user.remittance_title);
      userData.append('remittance_number', this.user.remittance_number);

      // Append image file (if available)
      if (this.user.userPhoto) {
        userData.append('image', this.user.userPhoto);
      }
      const user_Id = sessionStorage.getItem('user_Id');

     // 发送 JSON 格式的请求
   axios.post(`http://localhost:8080/user/edit?id=${user_Id}`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('User info updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating user info:', error);
      });
  },

    handleImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        // 将用户选择的图像文件保存到 userPhoto 属性中
        this.user.userPhoto = file;

        // 使用FileReader API预览图像
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImage = reader.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },

};
</script>


<template>
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
          </div>
        </div>
        <div class="address-details">
          <div class="detail-group" v-if="user">
            填寫地址: <input type="text" name="" id="" class="input-field" v-model="user.address">
          </div>
          <div class="detail-group" v-if="user">
            填寫匯款銀行: <input type="text" name="" id="" class="input-field" v-model="user.remittance_title">
          </div>
          <div class="detail-group" v-if="user">
            填寫銀行帳號: <input type="text" name="" id="" class="input-field" v-model="user.remittance_number">
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
  background-color: #121212; /* 深色背景 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  .info-content{
width: 65vw;
border: 0px solid rgb(255, 0, 0);
justify-content: space-around;
    display: flex;
    align-items: center;
    height: 50vh;
  }
}

.info-show {
  width: 70vw;
  height: 80vh;
  background-color: #1e1e1e; /* 深色卡片背景 */
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
  color: #64b5f6; /* 蓝色标题 */
}

.button-group button {
  padding: 10px 20px;
  background-color: #2196F3; /* 按钮蓝色 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
}

.cancel-button {
  background-color: #f44336; /* 取消按钮红色 */
}

.user-profile {
  display: flex;
  flex-direction: column;
  border: 0px solid rgb(255, 0, 0);

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
  background-color: #2196F3; /* 更改按钮蓝色 */
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
  color: #64b5f6; /* 蓝色图标 */
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
  background-color: #333; /* 深色输入框 */
  color: white; /* 字体颜色 */
}
</style>


  