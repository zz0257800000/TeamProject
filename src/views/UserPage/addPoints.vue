<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        name: '', // 初始值
        userPhoto: null, // 添加 userPhoto 属性用于保存图像文件
        pwdInput:null,

      },
      showPointsModal: false,
      imageUrl: null,
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
        // Ensure that response.data.user exists
        this.user = response.data.user; // 将获取到的用户信息存储在组件的数据中

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
      // 創建一個 FormData 對象
      const formData = new FormData();
      const req = (
        {
          id: this.user.id,
          name: this.user.name,
          email: this.user.email,
          address: this.user.address,
          level: 0,
          userPhoto: this.imageUrl,
          password: this.pwdInput,
          phone_number: this.user.phone_number,
          remittance_title: this.user.remittance_title,
          remittance_number: this.user.remittance_number,
          seller_name: this.user.seller_name,
          points: this.points,

        }
      )
      if (this.userPhotoFile) {
        formData.append('userPhoto', this.userPhotoFile);
      }
      console.log(req);

      axios.post(`http://localhost:8080/user/edit`, req, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('User info updated successfully:', response.data);
          this.user.points = response.data.newPoints;
          const responseData = response.data;
          console.log(responseData.rtnCode);
          // 检查后端返回的数据，如果密码验证失败，显示相应的提示
          if (responseData.rtnCode === "PARAM_ERROR") {
            alert("密碼錯誤，請確認密碼是否正確後重新輸入資料。");
          } else {
            // 如果密码验证成功，执行其他操作
            this.user.points = '';

            this.pwdInput = '';
            alert('儲值成功！');

          }
        })
        .catch(error => {


          console.error('Error updating user info:', error);

        });
    },


    addPoints() {
      // 点击 + 點數儲值 按钮时，显示弹窗
      this.showPointsModal = true;
    },
    closePointsModal() {
      // 关闭弹窗
      this.showPointsModal = false;
    },incrementQuantity() {
      if (this.quantity < this.product.inventory) {
        this.quantity++;
      } else {
        // 庫存不足的提示，你可以自行調整
        alert('已達到庫存上限');
      }
    },


  },

};
</script>


<template>
  <!-- {{ user }} -->
  <div class="main-show">
    <div class="info-show">
      <div class="info-header">
        <h2 class="title">儲值點數</h2>
        <div class="button-group">
          <!-- <button class="save-button" @click="addPoints">+ 點數儲值</button> -->

          <!-- <button class="cancel-button">取消</button> -->
        </div>
      </div>
      <div class="info-content">
        <div class="address-details">
          <div class="detail-group">
            <i class="far fa-user"></i>
            點數儲值: &nbsp; <input type="number" name="" id="" class="input-field" v-model="points">
          </div>
          <div class="detail-group" v-if="user">
            <i class="fa-regular fa-user"></i>
            確認密碼:&nbsp; <input type="password" name="" id="" class="input-field" v-model="this.pwdInput" autocomplete="off">
          </div>

        </div>

      </div>
      <div class="info-footer">

        <div class="button-group">
            <button class="button-group save-button" @click="saveUserInfo">儲存</button>

        </div>

      </div>
    </div>
    <div class="points-modal" v-show="showPointsModal">
      <!-- 弹窗内容 -->
      <div class="modal-content">
        <div class="firstshow">
          <h3>儲值點數畫面</h3>
          <button class="closebutton" @click="closePointsModal">X</button>
        </div>




      </div>
    </div>
  </div>
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


  