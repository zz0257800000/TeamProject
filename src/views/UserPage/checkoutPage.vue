
<template>
  <div class="checkout-page">
    <h1>結帳</h1>
    
    <!-- 商品列表 -->
    <div class="product-list">
      <div v-for="(product, index) in cart" :key="index" class="product-item">
        <img :src="product.image" :alt="product.name" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }} 元</p>
        </div>
      </div>
    </div>

    <!-- 購物車總金額 -->
    <div class="total">
      <p>總金額: {{ calculateTotal() }} 元</p>
    </div>

    <!-- 付款方式 -->
    <div class="payment">
      <h2>付款方式</h2>
      <label>
        <input type="radio" v-model="selectedPayment" value="credit-card" />
        信用卡
      </label>
      <label>
        <input type="radio" v-model="selectedPayment" value="paypal" />
        PayPal
      </label>
    </div>

    <!-- 運送地址 -->
    <div class="shipping">
      <h2>運送地址</h2>
      <textarea v-model="shippingAddress" placeholder="輸入運送地址"></textarea>
    </div>

    <!-- 結帳按鈕 -->
    <RouterLink class="btn" to="/">結帳</RouterLink>

  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [
        { name: '商品1', price: 100, image: 'product1.jpg' },
        { name: '商品2', price: 150, image: 'product2.jpg' },
        // 其他商品
      ],
      selectedPayment: 'credit-card',
      shippingAddress: '',
    };
  },
  methods: {
    calculateTotal() {
      return this.cart.reduce((total, product) => total + product.price, 0);
    },
    checkout() {
      // 實際結帳邏輯，可以將資料送至伺服器進行處理
      console.log('結帳成功！');
    },
  },
};
</script>

<style scoped>
/* 根據實際需求設計樣式 */
.checkout-page {
  max-width: 600px;
  margin: 0 auto;
}

.product-list {
  margin-bottom: 20px;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.product-info {
  margin-left: 10px;
}

img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.total {
  margin-bottom: 20px;
}

.payment,
.shipping {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 80px;
}
</style>
