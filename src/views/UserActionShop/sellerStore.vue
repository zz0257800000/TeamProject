<script>
import axios from 'axios';
export default {
  data() {
    return {
      userId: this.$route.params.userId, // 使用路由的userID
      product: [], // 保存從API獲取的商品數據
      productCount:"",
    };
  },
  methods: {
    fetchProducts() {
      // 发送获取产品列表的请求
      axios.get(`http://localhost:8080/product/get/info/user_id?id=${this.userId}`)
        .then(response => {
          // 成功获取数据，将数据保存到 products 数组中
          this.product = response.data.products;
          this.productCount = this.product.length; // 設定商品數量
          console.log('Fetched products:', this.product);


        })
        .catch(error => {
          console.error('Error:', error);
          // 处理错误，例如显示错误消息给用户
        });
    },
  },
  mounted(){
    this.fetchProducts();
  } 
};
</script>

<template>
  <div class="mainshow">
    <div class="sellinfo">
      <div class="sellinfHeader">
        <h3>賣場資訊</h3>
      </div>
      <!-- <h4>賣家名稱：</h4> -->
      <h4 v-if="product && product.length > 0">賣家名稱：
  <router-link :to="'/UserPage/sellerStore/' + userId" class="productPageRoutBtn" title="前往賣家賣場" >
    {{ product[0].seller_name }}
  </router-link>
</h4>
      <h4>全部商品：{{ productCount }}
      </h4>
    </div>
    <!-- <div class="productsShow"></div> -->
    <div class="productsShow">
      <div class="product card" v-for="(product, index) in product" :key="index" style="width: 14rem;">
        <router-link :to="'/UserPage/productPage/' + product.productId" class="productPageRoutBtn" :title="product.product_name">
          <img :src="'data:image/jpeg;base64,' + product.photo" class="card-img-top fixed-size-image" alt="...">
          <div class="card-body">
            <div class="card-text">
            <h5 class="productName">{{ product.product_name }}</h5>
            <p class="productPrice">${{ product.price }}</p>
            </div>
          <div class="product-icons">
          <router-link :to="'/UserPage/checkoutshopping/' + product.productId" class="buy-now-button btn btn-primary"  v-if="this.userId > 0 && this.userId != product.user_id && product.inventory > 0">
            <i class="fas fa-credit-card"></i>
          </router-link>
          </div>
        </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainshow {
  display: flex;
  width: 100vw;
  height: 115vh;
  border: 0px solid rgb(255, 0, 0);
  background-color: rgb(241, 241, 241);

  .sellinfo {
    width: 15vw;
    /* 設置正方形橫條的寬度 */
    height: 30vh;
    /* 設置正方形橫條的高度 */
    border: 0px solid #ff0000;
    /* 添加邊框效果，可以根據需要進行調整 */
    top: 4%;
    left: 1%;
    position: relative;
    background-color: rgb(225, 225, 225);

    .sellinfHeader {
      background-color: rgb(198, 198, 198);
      height: 7vh;
      /* 設置正方形橫條的高度 */
      display: flex;
      align-items: center;
      left: 5%;
      
    }
  }

  .productsShow {
    border: 0px solid #ff0000;
    /* 添加邊框效果，可以根據需要進行調整 */
    width: 80vw;
    /* 設置正方形橫條的寬度 */
    height: 95vh;
    /* 設置正方形橫條的高度 */
    top: 4%;
    left: 3%;
    background-color: rgb(224, 224, 224);
    position: relative;
    display: flex;
    flex-wrap: wrap;
  }
}

.card {
  height: 300px;
  margin: 3px;

  .card-img-top {
    height: 200px;
  }

  .card-body {
    display: flex;
    flex-direction: column; /* 讓內容垂直排列 */
  }

  .product-icons {
    margin-top: auto; /* 將 product-icons 推到 card-body 的底部 */
  }
  .productPageRoutBtn {
  text-decoration: none; /* 移除超連結的底線 */
  color: black;
  }
  }
.buy-now-button {
    position: absolute;
    bottom: 0;
    right: 0;
  }
.productName {
  height: 40px;
  font-size: 12pt;
  overflow: hidden;        /* 超出框框的內容隱藏 */
  text-overflow: ellipsis; /* 顯示省略號以表示文字被截斷 */
}
</style>
  