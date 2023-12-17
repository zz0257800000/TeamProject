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
      updateTime: '', // 你的更新時間數據
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
  <div class="bg">
    <div class="product Area">
      <img src="../../../public/clothes1.jpg" alt="" srcset="" style="width: 50rem; height: 35rem;">

      <div class="productText">
        <div class="title">
          <p>商品名稱：{{ product.product_name }}</p>
        </div>
        <p>{{ product.description }}</p>

        <div class="price">
          <p>價格：${{ product.price }}</p>
        </div>


        <div class="price">
          <p>庫存：{{ product.inventory }}</p>
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
    <div class="suggest Area">
      <div class="suggest" style="width: 16rem ; height:20rem;" v-for="item in suggestArr">
        <RouterLink v-for="relatedProduct in relatedProducts" :key="relatedProduct.productId"
          :to="'/UserPage/productPage/' + relatedProduct.productId" class="btn">
          <img :src="relatedProduct.photo" class="card-img-top" alt="...">
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bg {
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgb(148, 148, 148);
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