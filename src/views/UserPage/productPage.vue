<script>
import axios from 'axios';

export default {

  data() {
    return {
      product: {
        product_name: '',
        description: '',
        price: 0,
        inventory: 0,
      },
      quantity: 1,
      suggestArr: [], // 你的相關商品數據
      relatedProducts: [], // 你的相關商品數據


    };
  },
  mounted() {

    this.fetchProductDetails();
  },
  methods: {
    fetchProductDetails() {
      // 使用 this.$route.params.productId 获取路由中的 ID 参数
      const productId = this.$route.params.productId;
      console.log('productId:', productId);

      // 调用 API 获取商品详情
      axios.get(`http://localhost:8080/product/get/info?id=${productId}`)
        .then(response => {
          this.product = response.data.product;
          console.log('Fetched product:', this.product);
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
        });
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    incrementQuantity() {
      this.quantity++;
    },
    addToCart() {
      console.log('Adding to cart:', this.product, 'Quantity:', this.quantity);
    },
    buyNow() {
      console.log('Buying now:', this.product, 'Quantity:', this.quantity);
    },  
   


  },
};
</script>


<template>
   <div class="mainshow">
    <div class="sellinfo">
      <div class="sellinfHeader">
<h3>賣場資訊</h3>
</div>
<h4>賣家id：          <router-link :to="'/UserPage/sellerStore/' " class="productPageRoutBtn" title="前往賣家賣場"> 1</router-link>
</h4>

<h4>全部商品：</h4>
<h4>賣場評價：</h4>

</div>
  <div class="bg">
   
    <div class="product Area">
      <img :src="product.photo"  class="card-img-top fixed-size-image" alt="...">

      <div class="productText">
        <div class="title">
          <p>商品名稱：{{ product.product_name }}</p>
        </div>
        <p>商品描述：{{ product.description }}</p>

        <div class="price">
          <p>價格：${{ product.price }}</p>
        </div>


        <div class="title">
          <p>庫存：{{ product.inventory }}</p>
        </div>
        <div class="title">
          <p>上架時間：{{ product.upload_time }}</p>
        </div>
        <div class="quantity">
          <p>數量：</p>
          <button @click="decrementQuantity">-</button>
          <input v-model="quantity" type="number" min="1" />
          <button @click="incrementQuantity">+</button>
        </div>

        <div class="buttons">
          <router-link :to="'/UserPage/shoppingCart/' + product.productId" class="productPageRoutBtn"> 加入購物車 </router-link>


          <button @click="buyNow">立即購買</button>
        </div>

        <div class="updateTime">
          <p>商品更新日期：{{ updateTime }}</p>
        </div>
      </div>
    </div>
    <h2>相關商品</h2>
    <div class="Otherproducts">
      {{ response}} <!-- 在這裡輸出 products，確認是否有相關商品的資料 -->

  <div v-for="(product, index) in products" :key="index" class="related-product-item">
    <img :src="product.photo" alt="商品圖片" class="related-product-image">
    <p class="related-product-name">{{ product.product_name }}</p>
    <p class="related-product-price">${{ product.price }}</p>
    <!-- 其他相關商品的資訊 -->

    <!-- 你可以在這裡添加更多相關商品的資訊 -->
  </div>
</div>
  </div>
  </div>
</template>

<style lang="scss" scoped>

  .related-product-item {
    width: 150px; /* 設置正方形橫條的寬度 */
    height: 200px; /* 設置正方形橫條的高度 */
    border: 1px solid #ff0000; /* 添加邊框效果，可以根據需要進行調整 */
    margin: 10px; /* 設置正方形橫條之間的間距 */
    display: inline-block; /* 使正方形橫條水平排列 */
    text-align: center; /* 文字居中 */
  }

  .related-product-image {
    width: 100%; /* 使商品圖片充滿整個正方形橫條 */
    height: 100px; /* 設置商品圖片的高度 */
    object-fit: cover; /* 保持圖片比例，並填滿整個容器 */
  }

  .related-product-name {
    font-size: 14px;
    margin-top: 5px;
  }

  .related-product-price {
    font-size: 16px;
    font-weight: bold;
    color: #ff5733; /* 設置價格文字的顏色，可以根據需要進行調整 */
  }
.fixed-size-image {
  width: 30vw; /* Set your desired width */
  height: 70vh; /* Set your desired height */
  object-fit: cover; /* This property ensures that the image will cover the specified dimensions */
}
.mainshow {
  display: flex;
  width: 100vw;
  height: 150vh;
  border: 0px solid rgb(255, 0, 0);
  background-color: rgb(148, 148, 148);

  .sellinfo{
  width: 30vw; /* 設置正方形橫條的寬度 */
    height: 70vh; /* 設置正方形橫條的高度 */
  border: 1px solid #ff0000; /* 添加邊框效果，可以根據需要進行調整 */
top: 4%;
left: 8%;
position: relative;
background-color: rgb(225, 225, 225);
.sellinfHeader{
  background-color: rgb(104, 104, 104);
  height: 7vh; /* 設置正方形橫條的高度 */
  display: flex;
align-items: center;
left: 5%;


}

}

}
.bg {
  height: 156vh;

  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Area {
  display: flex;
}

.product {
  display: flex;
  margin-bottom: 80px;
  margin-top: 50px;

  .productText {
    padding: 30px;
    height: 35rem;
    width: 30rem;
    background-color: white;

    p {
      font-size: 20pt;
    }

    button {
      margin: 2px;
      height: 60px;
      width: 100px;
    }

    .selected {
      background-color: #666666;
      /* 或者其他你想要的顏色 */
      color: white;
    }
  }

  .quantity {
    margin-top: 10px;
    display: flex;
    align-items: center;

    input {
      width: 60px;
      text-align: center;
    }

    p {
      margin-right: 10px;
    }

    button {
      border: 0;
    }
  }

  .updateTime {
    margin-top: 20px;

    p {
      font-size: 10pt;
    }
  }
}</style>