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
      orderQuantity: 0,
      UserorderQuantity: 0,
      cartTotalQuantity: 0,
      sellerNameExists: true, 
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
          sessionStorage.clear();

          this.showAlert("用戶登出成功");

         


        })
        .catch(error => {
          console.error(error);
          // 处理错误，显示错误消息等
        });
    },
    showAlert() {
      Swal.fire({
        title: "登出成功!!",
        text: "用戶登出成功!!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.reload();
        this.$router.push('/');

    });
      },

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
        const newPointsValue = response.data.user.points;
      sessionStorage.setItem('points', newPointsValue.toString());
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
      });

    //判斷交易中訂單數量(提示訊息)
    const bid = JSON.parse(sessionStorage.getItem("bidList"));
    const shipping = JSON.parse(sessionStorage.getItem("shippingList"));

    this.orderQuantity = bid + shipping;
    // console.log("訂單數量:"+ this.orderQuantity )
    const Userbid = JSON.parse(sessionStorage.getItem("UserbidList"));
    const Usershipping = JSON.parse(sessionStorage.getItem("UsershippingList"));

    this.UserorderQuantity = Userbid + Usershipping;

    const cartTotalQuantity = JSON.parse(sessionStorage.getItem("cartTotalQuantity"));

    this.cartTotalQuantity = cartTotalQuantity;

    const sellerName = sessionStorage.getItem('seller_name');

// // 检查 seller_name 是否为 null
//   if (this.sellerName == null) {
//     // 如果 seller_name 为 null，禁用链接并显示提示信息
//     Swal.fire({
//       icon: 'error',
//       title: '請先新增商家名稱',
//       text: '請到會員資料中新增商家名稱。',
//     });
//     this.sellerNameExists = false;
//   }
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
          <RouterLink class="btn" to="/UserPage/complainService" v-if="isLoggedIn" >客服信箱</RouterLink>
          <RouterLink class="btn" to="/UserPage/developerPage"><i class="fa-solid fa-dragon"></i>開發人員</RouterLink>
          <RouterLink v-if="user && user.id === 999" class="btn" to="/UserPage/WatchAllFeedback">觀看回饋</RouterLink>

        </div>

        <div class="righthead">
          <div class="profile-image userInfo">
            <!-- 显示预览图像 -->
            <img :src="previewImage" alt="圖片未上傳" v-if="previewImage" />
          </div>
          <span class="userInfo account" v-if="user">使用者帳號: {{ user.email }}</span>


        <RouterLink class="btn" to="/UserPage/addPoints"><span class="point" v-if="user" >餘額點數 : {{ user.points }}</span> &nbsp;</RouterLink>

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
          <h1> <i class="fa-solid fa-shrimp" style="color:#ffffff;"><b> 皮皮蝦購物</b> </i></h1>
        </RouterLink>

        <div class="headerRight">

          <div class="forSeller btn big">

            <RouterLink class="big" :to="'/UserPage/actionShop'" v-if="isLoggedIn && sellerNameExists">
    <i class="fa-solid fa-store"></i>
    <p>賣家中心</p>
    <span class="notification-badge" v-if="orderQuantity !== 0">{{ orderQuantity }}</span>
  </RouterLink>

          </div>

          <div class="buyList">
            <RouterLink class="big btn" to="/UserPage/buyingList" v-if="isLoggedIn">
              <i class="fa-solid fa-box"></i>
              <p>購買紀錄</p>
              <span class="notification-badge" v-if="UserorderQuantity != 0">{{ UserorderQuantity }}</span>

            </RouterLink>
          </div>

          <RouterLink class="cart btn big" to="/UserPage/shoppingCart" v-if="isLoggedIn">
            <i class="fa-solid fa-cart-shopping usericon"></i>
            <p>購物車</p>
            <span class="notification-badge" v-if="cartTotalQuantity != 0">{{ cartTotalQuantity }}</span>

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

.logo{
  width: 300px;
  height: 60px;
  text-align: center;
  // background-color: aqua;
}
.bgArea{

  width: 100vw;
}
.userInfo {
  margin-right: 10px;
  text-align: center;
}

.righthead {
  display: flex;
  align-items: center;
  border: 0px solid rgb(255, 0, 0);

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
    // background-color: rgba(245, 142, 24, 0.4); // 自行調整按鈕hover時的背景色
    // color: rgb(254, 165, 64);
     background-color: #4e4e4e; // 自行調整按鈕hover時的背景色
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
  border: 0px solid rgb(255, 0, 0);
  color: #ffffff;
  height: 20vh;

  .headerfirst {
    display: flex;
    justify-content: space-between;
    border: 0px solid rgb(255, 0, 0);
width: 99vw;
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