<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
    
}
};
</script>
<template>
  <div class="mainShowDetail">
    <div class="addProductPage">
    <h1>新增商品</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="productImage">商品圖片:</label>
        <input type="file" id="productImage" accept="image/*" @change="handleImageChange" />
        <img v-if="productImagePreview" :src="productImagePreview" alt="商品圖片預覽" />
      </div>

      <div class="form-group">
        <label for="productName">商品名稱:</label>
        <input type="text" id="productName" v-model="productName" required />
      </div>

      <div class="form-group">
        <label for="productDescription">商品描述:</label>
        <textarea id="productDescription" v-model="productDescription" required></textarea>
      </div>

      <div class="form-group">
        <label for="productPrice">價格:</label>
        <input type="number" id="productPrice" v-model="productPrice" required />
      </div>

      <div class="form-group">
        <label for="productQuantity">商品數量:</label>
        <input type="number" id="productQuantity" v-model="productQuantity" required />
      </div>

      <div class="form-group">
        <label for="shippingFee">運費:</label>
        <input type="number" id="shippingFee" v-model="shippingFee" required />
      </div>
      <RouterLink class="button" to="/UserPage/actionShop">上架商品</RouterLink>

    </form>
  </div>
  </div>
  </template>
<style lang="scss" scoped>
.mainShowDetail{
  border: 1px solid rgb(255, 0, 0);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .addProductPage {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
}


.button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.button:hover {
  background-color: #45a049;
}
}
</style>