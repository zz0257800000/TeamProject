<script>
import axios from 'axios';
import Swal from "sweetalert2";

export default {
  data() {
    return {
      productName: '',

      productType: "書籍動漫",

      productDescription: '',
      productPrice: 1,
      inventory: 1,
      sale_count: 0,
      shelves: true,
      productImagePreview: null,
      isImageModalOpen: false,
      photo: null,
      user_Id: null,
      imageUrl: null,

    };
  },
  computed: {
    // 在计算属性中加上前缀
    getImageUrlWithPrefix() {
      return `data:image/jpeg;base64,${this.imageUrl}`;
    },
  },
  methods: {
    handleImageChange(event) {
      const file = event.target.files[0];

      // 在這裡宣告 reader
      const reader = new FileReader();

      reader.onload = (event) => {
        // 獲取整個 base64 圖片數據
        const fullBase64String = event.target.result;

        // 找到逗號後的位置，即真正的 base64 圖片數據的開始位置
        const commaIndex = fullBase64String.indexOf(',');

        // 切除 'data:image/jpeg;base64,' 部分，得到實際的 base64 圖片數據
        const base64Data = fullBase64String.substring(commaIndex + 1);

        // 將 base64 圖片數據設置為 imageUrl
        this.imageUrl = base64Data;

        // 記錄處理後的 base64 圖片數據
        console.log(this.imageUrl);
      };

      reader.readAsDataURL(file);
    },
    cancelImageUpload() {
      // 取消上传逻辑，清空 imageUrl
      this.imageUrl = '';
      // 检查是否有已选择的图片
      if (this.productImagePreview || this.photo) {
        this.productImagePreview = null;
        this.photo = null;
      }
    },
    submitForm() {
      if (!this.productName || !this.productDescription || !this.productPrice) {
        alert('請填寫所有必填欄位');
        return;
      }
      const formData = {
        product_name: this.productName,
        product_type: this.productType,

        description: this.productDescription,
        price: this.productPrice,
        inventory: this.inventory,
        sale_count: this.sale_count,
        shelves: this.shelves,
        user_id: this.user_Id,
        seller_name: this.seller_name,
        remittance_title: this.remittance_title,
        remittance_number: this.remittance_number,
        photo: this.imageUrl,
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
      const seller_name = sessionStorage.getItem('seller_name');
      const remittance_title = sessionStorage.getItem('remittance_title');
      const remittance_number = sessionStorage.getItem('remittance_number');
      // 添加 user_Id 到请求数据
      data.seller_name = seller_name;

      data.user_id = user_Id;
      console.log(data);

      axios.post('http://localhost:8080/product/create', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {


          console.log('Response:', response.data);
          this.showAlert("商品新增成功");

          this.$router.push('/UserPage/actionShop');
        })
        .catch(error => {
          console.error('Error:', error);
          // 處理錯誤，向使用者顯示錯誤訊息
        });
    },
    showAlert() {
      Swal.fire({
        title: "商品新增",
        text: "你的商品新增成功",  // 使用传入的消息参数
        icon: "success",
        confirmButtonText: "OK",
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

    <label for="imageUrl">商品圖片:</label>
    <input type="file" id="imageUrl" accept="image/*" @change="handleImageChange" />
    
    <!-- 在src属性中加上前缀 -->
    <img v-if="imageUrl" :src="getImageUrlWithPrefix" alt="商品圖片預覽" class="preview-image" @click="openImageModal" />

    <!-- 取消上传按钮，只有在imageUrl存在时才显示 -->
    <div class="form-group" v-if="imageUrl">
      <button type="button" class="button" @click="cancelImageUpload">取消上傳圖片</button>
    </div>
  </div>
          <div class="form-group">
            <label for="productName">商品名稱:</label>
            <input type="text" id="productName" v-model="productName" required />
          </div>
          <div class="form-group">
            <label for="productType">產品分類:</label>
            <select id="productType" v-model="productType" required>
              <option value="書籍動漫">書籍動漫</option>
              <option value="食品專區">食品專區</option>
              <option value="精品服飾">精品服飾</option>
              <option value="日常用品">日常用品</option>
              <option value="3C產品">3C產品</option>
              <option value="寵物專區">寵物專區</option>
              <option value="寵物專區">樂器專區</option>
              <option value="機車零件">機車零件</option>
              <option value="其他">其他</option>

            </select>
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
    </div>
  </div>
  <div v-if="isImageModalOpen" class="image-modal" @click="closeImageModal">
    <img :src="getImageUrlWithPrefix" alt="商品圖片" class="modal-image" />
  </div>
</template>

<style lang="scss" scoped>
#productDescription {
  width: 400px;
  /* 设置宽度 */
  height: 200px;
  /* 设置高度 */
  resize: none;
  /* 防止用户手动调整大小 */
  /* 其他样式可以根据需要添加 */
}

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
  height: 142vh;
  border: 0;

  .mainShowDetail {
    border: 0px solid rgb(255, 0, 0);
    height: 142vh;
    width: 100vw;

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(219, 219, 219);
    color: rgb(78, 78, 78);

    .addProductPage {
      max-width: 600px;
      margin: 0 auto;

      h1 {
        text-align: center;
        color: rgb(78, 78, 78);
        margin-bottom: 20px;
      }

      .form-group {
        margin-bottom: 20px;

        label {
          display: block;
          margin-bottom: 5px;
          color: rgb(78, 78, 78);
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
        position: relative;
        left: 70%;
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
  }
}</style>