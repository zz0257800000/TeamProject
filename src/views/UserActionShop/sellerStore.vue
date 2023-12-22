<script>
import axios from 'axios';
export default {
  data() {
    return {
      userId: this.$route.params.userId, // 使用路由的userID
      product: [], // 保存從API獲取的商品數據
    };
  },
  methods: {
    fetchProducts() {
      // 发送获取产品列表的请求
      axios.get(`http://localhost:8080/product/get/info/user_id?id=${this.userId}`)
        .then(response => {
          // 成功获取数据，将数据保存到 products 数组中
          this.product = response.data.products;
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
      <h4>賣家名稱：</h4>
      <h4>
        賣家id：{{ userId }}
        <!-- <router-link :to="'/UserPage/sellerStore/' + userId" class="productPageRoutBtn" title="前往賣家賣場">
        </router-link> -->
      </h4>
      <h4>全部商品：</h4>
      <h4>賣場評價：</h4>
    </div>
    <!-- <div class="productsShow"></div> -->
    <div class="productsShow">
  <div class="product" v-for="(product, index) in product" :key="index">
    <router-link :to="'/UserPage/productPage/' + product.productId" class="productPageRoutBtn">
      <img :src="product.photo" class="card-img-top fixed-size-image" alt="...">
    </router-link>
      <div class="productInfo">
        <p class="productName">{{ product.product_name }}</p>
        <p class="productPrice">${{ product.price }}</p>
      </div>

      <div class="product-icons">
    <router-link :to="'/UserPage/shoppingCart/'" class="cart-button">
      <i class="fas fa-shopping-cart">加入購物車</i> 
    </router-link>
  </div>
  <div class="product-icons1">
    <router-link :to="'/UserPage/checkoutshopping/' + product.productId" class="buy-now-button">
      <i class="fas fa-credit-card"></i> 立即購買
    </router-link>
  </div>
    
  </div>
</div>
  </div>
</template>

<style scoped>
.mainshow {
  display: flex;
  width: 100vw;
  height: 115vh;
  border: 2px solid rgb(255, 0, 0);
  background-color: rgb(148, 148, 148);

  .sellinfo {
    width: 15vw;
    /* 設置正方形橫條的寬度 */
    height: 30vh;
    /* 設置正方形橫條的高度 */
    border: 1px solid #ff0000;
    /* 添加邊框效果，可以根據需要進行調整 */
    top: 4%;
    left: 1%;
    position: relative;
    background-color: rgb(225, 225, 225);

    .sellinfHeader {
      background-color: rgb(104, 104, 104);
      height: 7vh;
      /* 設置正方形橫條的高度 */
      display: flex;
      align-items: center;
      left: 5%;


    }

  }

  .productsShow {
    border: 1px solid #ff0000;
    /* 添加邊框效果，可以根據需要進行調整 */
    width: 80vw;
    /* 設置正方形橫條的寬度 */
    height: 95vh;
    /* 設置正方形橫條的高度 */
    top: 4%;
    left: 3%;
    background-color: rgb(104, 104, 104);

    position: relative;
  }
}</style>
  