<script>
import axios from 'axios';

export default {
  data() {
    return {
      productName: '',
      productDescription: '',
      productPrice: 1,
      inventory: 1,
      sale_count: 0,
      shelves: true,
      productImagePreview: null,
      isImageModalOpen: false,
      photo: null,
      user_Id: null,

    };
  },
  methods: {
    handleImageChange(event) {
      // 处理图像更改和预览逻辑
      const file = event.target.files[0];
      this.productImagePreview = URL.createObjectURL(file);
      this.photo = file;
    },
    cancelImageUpload() {
      this.productImagePreview = null;
      this.photo = null;
    },
    submitForm() {
      if (!this.productName || !this.productDescription || !this.productPrice) {
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
        user_id: this.user_Id,
        upload_time: new Date(),  // 设置上传时间为当前时间

      };  // 如果有選擇圖片，將其轉換為 Base64 字符串
  if (this.photo) {
    const reader = new FileReader();
    reader.readAsDataURL(this.photo);
    reader.onload = () => {
      formData.photo = reader.result;
      this.sendData(formData);
    };
  } else {
    this.sendData(formData);
  }
},

sendData(data) {
   // 从 sessionStorage 中获取 user_Id
   const user_Id = sessionStorage.getItem('user_Id');
    
    // 添加 user_Id 到请求数据
    data.user_id = user_Id;
  axios.post('http://localhost:8080/product/create', JSON.stringify(data), {
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
      // 處理錯誤，向使用者顯示錯誤訊息
    });
},
    openImageModal() {
      this.isImageModalOpen = true;
    },

    closeImageModal() {
      this.isImageModalOpen = false;
    },
    toggleShelves() {
      this.shelves = !this.shelves;
    },
  },
};
</script>
<template>
   <div class="actionPage">
  <div class="mainShowDetail">
    <div class="addProductPage">
      <br>
      <h1>新增商品</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="productImage">商品圖片:</label>
          <input type="file" id="productImage" accept="image/*" @change="handleImageChange" />
          <img v-if="productImagePreview" :src="productImagePreview" alt="商品圖片預覽" class="preview-image"
            @click="openImageModal" />

        </div>
        <div class="form-group">
          <button type="button" class="button" @click="cancelImageUpload">取消上傳圖片</button>
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
          <label>是否上架商品:</label>
          <button type="button" @click="toggleShelves"
            :style="{ backgroundColor: shelves ? 'red' : 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease' }">
            {{ shelves ? '關閉商品' : '開啟商品' }}
          </button>
        </div>
        <button type="submit" class="button">上架商品</button>

      </form>
    </div>
  </div></div>
  <div v-if="isImageModalOpen" class="image-modal" @click="closeImageModal">
    <img :src="productImagePreview" alt="商品圖片" class="modal-image" />
  </div>
  
</template>

<style lang="scss" scoped>

.preview-image {
  max-width: 100px;
  /* 设置最大宽度 */
  max-height: 100px;
  /* 设置最大高度 */
  margin-top: 10px;
  /* 设置上边距 */
  cursor: pointer;

}

.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.modal-image {
  max-width: 80%;
  max-height: 80%;
}
.actionPage {
  display: flex;
  width: 100vw;
  height: 132vh;
  border: 0;

.mainShowDetail {
  border: 0px solid rgb(255, 0, 0);
  height: 132vh;  
  width: 100vw;

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
}}
</style>
