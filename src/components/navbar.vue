<!-- //head navbar -->

<script>
import { RouterLink, RouterView } from 'vue-router'
import { mapActions } from 'vuex';
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  props: {

  },
  data() {
    
    return {
      searchKeyword: '',
      cartTotalQuantity: "",
      isUserLoggedIn: sessionStorage.getItem('loggedIn') === 'TRUE',
      user: null, // 初始化为 null 或一个空对象

    }
  },

  methods: {
 
    ...mapActions('search', ['searchProduct']),
    handleSearch() {
      // 调用搜索方法
      this.searchProduct(this.searchKeyword);
    }, 
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // 平滑滾動效果
      });
    },
    
    logoutUser() {
      axios.post("http://localhost:8080/user/logout")
        .then(response => {
          // 清除前端的用户状态
          sessionStorage.removeItem('loggedIn');
          sessionStorage.removeItem('user_Id');
          sessionStorage.removeItem('name');
          sessionStorage.removeItem('points');
          sessionStorage.removeItem('user_photo');
          sessionStorage.removeItem('level');
          sessionStorage.removeItem('seller_name');
          sessionStorage.removeItem('remittance_title');
          sessionStorage.removeItem('remittance_number');
          sessionStorage.removeItem('phone_number');

          alert('用戶登出成功');
          window.location.reload();

        })
        .catch(error => {
          console.error(error);
          // 处理错误，显示错误消息等
        });
    }

  },
  computed: {
    isLoggedIn() {
      return this.isUserLoggedIn;
    },
    hasSomeData() {
      return sessionStorage.getItem('someData');
    },
    
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
        this.previewImage = `data:image/jpeg;base64,${response.data.user.userPhoto}`;
        // console.log('previewImage:', this.previewImage);

      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });

  },
 

 
  components: {
    RouterLink

  }
}
</script>

<template>
  <div class="bgArea">
    <div class="titleUserPage">

      <!-- <img src="../views/askAllPage/askHome.vue" alt=""> -->

      <div class="headerfirst">

        <div class="POP">
          <RouterLink class="btn" to="/UserPage/complainService">客服信箱</RouterLink>
          <RouterLink class="btn" to="/UserPage/developerPage"><i class="fa-solid fa-dragon"></i>開發人員</RouterLink>
    <RouterLink v-if="user && user.id === 999" class="btn" to="/UserPage/WatchAllFeedback">觀看回饋</RouterLink>

        </div>

          <div class="righthead">
            <div class="profile-image userInfo">
              <!-- 显示预览图像 -->
              <img :src="previewImage" alt="圖片未上傳" v-if="previewImage" />
            </div>
            

                <span v-if="user">餘額點數 : {{ user.points }}</span> &nbsp;

            <span class="userInfo account" v-if="user">使用者帳號: {{ user.email }}</span>

            <span class="userInfo point" v-if="user">賴皮點數 : {{ user.points }}</span> &nbsp;
            
            <button class="logout btn" @click="logoutUser" v-if="isLoggedIn">登出</button>
            
            <RouterLink class="btn" v-if="isLoggedIn" to="/UserPage/memberInfo">
              <i class="fa-solid fa-user usericon"></i> 會員資料
            </RouterLink>

            <RouterLink v-if="!isLoggedIn" class="btn" to="/UserPage/loginPage">
              <i class="fa-solid fa-user usericon"></i>
              <p>會員登入</p>
            </RouterLink>

          </div>
        
        </div>

      <div class="titleHeader">

        <RouterLink class="logo" to="/">
          <h1> <i class="fa-solid fa-shrimp" style="color:#ffffff;"><b> 呱皮皮蝦</b> </i></h1>
        </RouterLink>

        <div class="headerRight">

          <div class="forSeller btn big">
            <RouterLink class="big" v-if="isLoggedIn" to="/UserPage/actionShop">
              <i class="fa-solid fa-store"></i>           <div>{{ orderQuantity  }}</div>


              <p>賣家中心</p>
            </RouterLink>
          </div>

          <div class="buyList">
            <RouterLink class="big btn" to="/UserPage/buyingList" v-if="isLoggedIn">
              <i class="fa-solid fa-box"></i>
              <p>購買紀錄</p>
            </RouterLink>
          </div>

          <RouterLink class="cart btn big" to="/UserPage/shoppingCart" v-if="isLoggedIn">
            <i class="fa-solid fa-cart-shopping usericon"></i>
            <p>購物車</p>
            <span class="notification-badge">{{ cartTotalQuantity }}</span>
          </RouterLink>

        </div>
      </div>


      <button @click="scrollToTop" class="scroll-to-top-btn">
        <i class="fas fa-arrow-up"></i>
      </button>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.userInfo{
  margin-right: 10px;
  text-align: center;
}
.righthead {
  display: flex;
  align-items: center;

  .profile-image img {
    height: 25px;
    width: 25px;
    border-radius: 50%;
  }
}

.scroll-to-top-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #ff822a; // 自行調整按鈕背景色
  color: #fff; // 自行調整按鈕文字顏色
  z-index: 99;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4d4d4d; // 自行調整按鈕hover時的背景色
  }

  i {
    margin-top: 1px;
  }
}

.notification-badge {
  //購物車內數量
  height: 40px;
  width: 40px;
  background-color: rgb(253, 60, 60);
  color: rgb(255, 255, 255);
  border-radius: 50%;
  padding: 2px 12px;
  font-size: 12px;
  position: relative;
  top: -90px;
  left: 25px;
}

.btn {
  text-decoration: none;
  color: #ffffff;
  font-size: 11pt;

  &:hover {
    color: #4e4e4e;
  }

}

.titleUserPage {
  background-color: #ff9800;
  display: flex;
  flex-direction: column;
  border: px solid rgb(255, 0, 0);
  color: #ffffff;
  height: 20vh;

  .headerfirst {
    display: flex;
    justify-content: space-between;
    border: 0px solid rgb(255, 0, 0);

  }

  .titleHeader {
    display: flex;
    border: 0px solid rgb(255, 0, 0);

    justify-content: space-between;
    align-items: center;
    font-size: 16pt;
    padding: 0px 50px;
    position: relative;
    height: 100px;

    .headerRight {
      display: flex;
    }

  }
}

.Marquee {
  height: 32px;
  // background-color: #f5f5f5;

  //跑馬燈
  .announcement {
    position: absolute;
    right: 100%;
    background-color: #ff9800;
    color: #fff;
    padding: 5px 10px;
    white-space: nowrap;
    animation: scrollFromRight 10s linear infinite;
    font-size: 11pt;

    p {
      margin: 0;
    }
  }

  @keyframes scrollFromRight {
    0% {
      right: 100%;
    }

    100% {
      right: 0;
    }
  }
}

.navbar {
  background-color: rgb(255, 255, 255);
  box-shadow: inset 0px 0px 5px #e0e0e0;

  .nav-link {
    font-size: 14pt;
    color: #ff9800;
    font-weight: 1000;

    &:hover {
      color: #4e4e4e;
    }
  }
}

.big {
  height: 70px;
  color: white;
  text-decoration: none;

  i {
    font-size: 30pt;
  }

  &:hover {
    color: #4e4e4e;
  }
}
</style>