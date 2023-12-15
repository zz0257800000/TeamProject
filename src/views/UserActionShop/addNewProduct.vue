<script>
import axios from 'axios';

export default {
  data() {
    return {
      productName: '',
      productDescription: '',
      productPrice: 0,
      inventory: 0,
      sale_count: 0,
      shelves: false,
      productImagePreview: null,
      photo: null,
      user_id: 1, // Update this with the actual user_id or fetch it dynamically
    };
  },
  methods: {
    handleImageChange(event) {
      // Handle image change and preview logic here
    },
    submitForm() {
      if (!this.productName || !this.productDescription || !this.productPrice || !this.inventory || !this.sale_count) {
    alert('請填寫所有必填欄位');
    return;
  }
      const formData = {
        product_name: this.productName,
        description: this.productDescription,
        price: this.productPrice,
        inventory: this.inventory,
        sale_count: this.sale_count,
        shelves: this.shelves,
        photo: this.photo,
        user_id: this.user_id,
      };

      axios.post('http://localhost:8080/product/create', JSON.stringify(formData), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('Response:', response.data);
          alert('商品新增成功');
          this.$router.push('/UserPage/actionShop');

        })
        .catch(error => {
          console.error('Error:', error);
          // Handle error, show error message to the user
        });
    },
  },
};
</script>
<template>
  <div class="mainShowDetail">
    <div class="addProductPage">
      <br>
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
          <label for="inventory">新增數量:</label>
          <input type="number" id="inventory" v-model="inventory" required />
        </div>


        <div class="form-group">
          <label for="shelves">是否開啟商品:</label>
          <input type="checkbox" id="shelves" v-model="shelves" />
        </div>

        <button type="submit" class="button">上架商品</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mainShowDetail {
  border: 0px solid rgb(255, 0, 0);
  height: 130vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(47, 47, 47);
  color: white;

  .addProductPage {
    max-width: 600px;
    margin: 0 auto;

    h1 {
      text-align: center;
      color: white;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 5px;
        color: white;
      }

      input[type="text"],
      input[type="number"],
      textarea {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        border: 1px solid #ddd;
        /* Light border color */
        border-radius: 5px;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #4CAF50;
          /* Focus border color */
        }
      }
    }

    .button {
      background-color: #4CAF50;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #45a049;
        /* Hover background color */
      }
    }
  }
}</style>
