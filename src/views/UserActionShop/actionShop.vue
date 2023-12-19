<script>
import axios from 'axios';
import Paginate from 'vuejs-paginate';

export default {
  components: {
    Paginate,

  },
  data() {
    return {
      products: [], // 保存從API獲取的商品數據
      currentPage: 1,
      perPage: 4, // 每頁顯示的商品數量
      isImageModalOpen: false,
      selectedImage: null, // 新增 selectedImage 屬性
      isEditModalOpen: false,
      editedProduct: null,

    };
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.products.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.products.length / this.perPage);
    },
  },
  mounted() {
    // 在组件被挂载后，调用 fetchProducts 方法获取商品数据
    this.fetchProducts();

  },
  methods: {

    fetchProducts() {
      // 发送获取产品列表的请求
      axios.get('http://localhost:8080/product/get')
        .then(response => {
          // 成功获取数据，将数据保存到 products 数组中
          this.products = response.data.products;
          console.log('Fetched products:', this.products);

        })
        .catch(error => {
          console.error('Error:', error);
          // 处理错误，例如显示错误消息给用户
        });
    },

    deleteProduct(productId) {
      // 发送删除请求，并将 productId 作为参数传递
      axios.delete(`http://localhost:8080/product/delete?id=${productId}`)
        .then(response => {
          // 删除成功后，刷新产品列表或者做其他操作
          console.log('Product deleted successfully:', response.data);

          // 刷新产品列表，可以重新调用获取产品列表的方法
          this.fetchProducts();
        })
        .catch(error => {
          console.error('Error:', error);
          // 处理错误，例如显示错误消息给用户
        });
    },
    handleSizeChange(size) {
      // Handle page size change
      this.perPage = size;
    },
    handleCurrentChange(currentPage) {
      // Handle current page change
      this.currentPage = currentPage;
    },
    openImageModal(product) {
      this.selectedImage = product.photo;
      this.isImageModalOpen = true;
    },

    closeImageModal() {
      this.isImageModalOpen = false;
    },

    closeEditModal() {
      // 关闭编辑弹窗
      this.isEditModalOpen = false;
    },
    handleImageChange(event) {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        // 使用選取的文件更新 'photo' 屬性
        this.photo = selectedFile;

        // 如果您想預覽圖像，可以使用FileReader
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
          this.editedProduct.photo = reader.result;
        };
      }
    },

    editProduct(index) {
      // 获取要编辑的产品数据
      this.editedProduct = { ...this.paginatedProducts[index] };
      // 打开编辑弹窗 // 初始化 shelves 属性，如果商品没有该属性，可以设置默认值
      if (!this.editedProduct.hasOwnProperty('shelves')) {
        this.$set(this.editedProduct, 'shelves', true); // 默认为 true，你可以根据需要设置其他默认值
      }
      this.isEditModalOpen = true;
    },
    submitForm() {
      if (!this.editedProduct.product_name || !this.editedProduct.description || !this.editedProduct.price) {
        alert('請填寫所有必填欄位');
        return;
      }
      // 确保 'shelves' 属性已定义，如果未定义，则设置默认值
      if (!this.editedProduct.hasOwnProperty('shelves')) {
        this.$set(this.editedProduct, 'shelves', true); // 默认为 true，你可以根据需要设置其他默认值
      }
      const formData = { ...this.editedProduct };

      // 將上傳時間設置為當前日期
      formData.upload_time = new Date();
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
      axios.post('http://localhost:8080/product/create', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          console.log('Response:', response.data);
          alert('商品新增成功');
          this.isEditModalOpen = false;
          window.location.reload(true);

        })
        .catch(error => {
          console.error('Error:', error);
          // 處理錯誤，向使用者顯示錯誤訊息
        });
    },
    toggleShelves() {
      this.editedProduct.shelves = !this.editedProduct.shelves;
    },

  },

};
</script>
<template>
  <div class="actionPage">
    <div class="actionPageLeft">
      <div class="lefttHeader">
        <h2>賣場管理</h2>
      </div>

      <div class="leftAdmin">

        <RouterLink class="btn" to="/UserPage/actionShop"><i class="fa-solid fa-wrench"></i> 產品管理</RouterLink>
        <RouterLink class="btn" to="/"><i class="fa-solid fa-bars-staggered"></i> 訂單管理</RouterLink>
        <RouterLink class="btn" to=""><i class="fa-solid fa-envelope-open"></i> 訊息中心</RouterLink>
        <RouterLink class="btn" to=""><i class="fa-solid fa-chart-line"></i> 報表及分析</RouterLink>
        <RouterLink class="btn" to=""><i class="fa-solid fa-gear"></i> 設定</RouterLink>

      </div>

    </div>

    <div class="actionPageRight">
      <div class="RightHeader">
        <div class="secondtitle2">
          <h3>
          </h3>
          <h6>
            <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">賣場管理</a>
          </h6>

        </div>

      </div>

      <div class="productManagement">
        <div class="productCreate">
          <h1>產品管理</h1>
          <RouterLink class="btn" to="/UserPage/addNewProduct">添加新產品</RouterLink>
        </div>
        <div class="productAdmimList">
          <table>
            <thead>
              <tr>
                <th>商品編號</th>

                <th class="productPic">商品圖片</th>
                <th class="productTitle">名稱</th>
                <th>庫存</th>
                <th>售價</th>
                <th>銷售數量</th>
                <th>商品狀態</th>
                <th>上架時間</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in paginatedProducts" :key="index">
                <td>{{ product.productId }}
                </td>
                <td>
                  <img :src="product.photo" alt="商品圖片" class="card-img-top fixed-size-image"
                    @click="() => openImageModal(product)">
                </td>
                <td>{{ product.product_name }}</td>
                <td>{{ product.inventory }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.sale_count }}</td>
                <td :style="{ 'color': product.shelves ? 'green' : 'red' }">{{ product.shelves ? '上架中' : '下架中' }}</td>



                <td>{{ product.upload_time }}</td> <!-- 這裡我們假設有一個 shelfTime 屬性 -->
                <td class="action-btns">

                  <button class="edit-btn" @click="editProduct(index)">編輯</button>
                  <button class="delete-btn" @click="deleteProduct(product.productId)">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination-container">
            <button class="pagination-button" @click="handleCurrentChange(currentPage - 1)" :disabled="currentPage === 1">
              上一页
            </button>
            <span class="pagination-current-page">第 {{ currentPage }} 页</span>
            <button class="pagination-button" @click="handleCurrentChange(currentPage + 1)"
              :disabled="currentPage === pageCount">
              下一页
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isImageModalOpen" class="image-modal" @click="closeImageModal">
      <img :src="selectedImage" alt="商品圖片" class="modal-image">
    </div>


    <div v-if="isEditModalOpen" class="edit-modal">
      <div class="edit-content">
        <!-- 编辑表单 -->
        <div class="close-button" @click="closeEditModal">X</div>
        <div class="form-group">
          <img v-if="editedProduct.photo" :src="editedProduct.photo" alt="商品圖片" class="modal-image" />
        </div>
        <div class="edit-form">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="productImage">商品圖片:</label>
              <input type="file" @change="handleImageChange" id="productImage" />
            </div>

            <div class="form-group">
              <label for="productName">商品名称:</label>
              <input v-model="editedProduct.product_name" id="productName" placeholder="商品名称" />
            </div>

            <div class="form-group">
              <label for="description">商品描述:</label>
              <input v-model="editedProduct.description" id="productDescription" placeholder="商品描述" />
            </div>

            <div class="form-group">
              <label for="inventory">庫存:</label>
              <input v-model="editedProduct.inventory" id="inventory" placeholder="庫存" />
            </div>

            <div class="form-group">
              <label for="price">售價:</label>
              <input v-model="editedProduct.price" id="productPrice" placeholder="售價" />
            </div>

            <div class="form-group">
              <label>是否上架商品:</label>
              <button type="button" @click="toggleShelves"
                :style="{ backgroundColor: editedProduct.shelves ? 'red' : 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease' }">
                {{ editedProduct.shelves ? '關閉商品' : '開啟商品' }}
              </button>
            </div>

            <!-- 其他编辑项 -->
            <button type="submit">保存编辑</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.edit-modal {
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
  z-index: 9999;

  .edit-content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 60%; // 调整为更小的百分比
    max-width: 800px; // 最大宽度，防止过宽
    position: relative;
  }

  .edit-form {
    display: flex;
    flex-direction: column;
    width: 100%; // 占据整个宽度
    max-width: 400px; // 最大宽度，防止过宽
    border: 0px solid rgb(255, 0, 0);
    position: relative;
    left: 2%;


  }

  .form-group {
    margin-bottom: 10px; // 将间距调整为更小
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }

  .modal-image {
    max-width: 100%;
    height: auto;
  }

  /* 其他样式调整 */
}

.fixed-size-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
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
  z-index: 9999;
  /* 確保模態框處於最上層 */
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  /* 保持圖片原始比例並使其完全顯示 */
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.pagination-button {
  background-color: #409eff;
  color: #fff;
  border: 1px solid #409eff;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover {
  background-color: #66b1ff;
}

.pagination-button:disabled {
  background-color: #d3dce6;
  color: #bbb;
  cursor: not-allowed;
}

.pagination-current-page {
  margin: 0 10px;
  font-size: 16px;
}

.actionPage {
  display: flex;
  width: 100vw;
  height: 202.3vh;
  border: 0;
}

.actionPageLeft {
  width: 20vw;
  display: flex;
  flex-direction: column;
  background-color: #37474f;
  /* Dark teal background color */
  height: 202.3vh;

  .lefttHeader {
    height: 4vw;
    background-color: #3b4c53;
    /* Teal background color */
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      color: #eceff1;
      /* Light text color */
      margin: 0;
    }
  }

  .leftAdmin {
    background-color: #546e7a;
    /* Teal background color */
    height: 42vw;
    flex-direction: column;
    display: flex;

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      color: #eceff1;
      /* Light text color */
      background-color: #263238;
      /* Darker teal */
      padding: 10px;
      margin: 10px auto;
      border-radius: 5px;
      text-decoration: none;
      text-align: center;

      &:hover {
        background-color: #37474f;
        /* Dark teal on hover */
      }
    }
  }
}

.actionPageRight {
  width: 80vw;
  height: 202.3vh;
  border: 0px solid rgb(255, 0, 0);

  .RightHeader {
    height: 4vw;
    background-color: #bdbdbd;

    /* Light gray background color */
    .secondtitle2 {
      justify-content: space-between;
      display: flex;
      border: 0px solid #e74c3c;
      /* Border color */
      width: 75vw;
      height: 10vh;
      align-items: center;

      a {
        border-radius: 10px;
        padding: 5px;
        transition: all 0.5s ease;
        text-decoration: none;
        color: #37474f;
        /* Dark teal text color */

        &:hover {
          color: #e74c3c;
          /* Hover color */
          background-color: rgba(118, 118, 117, 0.5);

        }
      }
    }
  }

  .productManagement {
    border: 0px solid rgb(255, 0, 0);

    height: 42vw;
    background-color: #f5f5f5;
    /* Light gray background color */
    height: 193.7vh;

    .productCreate {
      display: flex;
      justify-content: space-between;
      width: 79vw;
      padding: 20px;

      h1 {
        margin: 0;
        color: #37474f;
        /* Dark teal heading color */
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        color: #eceff1;
        /* Light text color */
        background-color: #263238;
        /* Dark teal */
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
        text-align: center;

        &:hover {
          background-color: #37474f;
          /* Dark teal on hover */
        }
      }
    }

    .productAdmimList {
      height: 39vw;
      padding: 20px;

      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      action-btns,
      td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        height: 30vh;
      }

      .productPic {
        width: 20vw;
      }

      .productTitle {
        width: 15vw;
      }

      th {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        background-color: #b0bec5;
        /* Light teal background color */
      }

      tr:hover {
        background-color: #e0e0e0;
        /* Lighter gray on hover */
      }

      .action-btns {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        /* Separate buttons vertically */
        align-items: center;
        border: 0px solid red;
        height: 40vh;

        .edit-btn,
        .delete-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 7vh;
          width: 5vw;
          padding: 5px 10px;
          cursor: pointer;
          background-color: #37474f;
          /* Dark teal */
          color: #eceff1;
          /* Light text color */
          border: none;
          border-radius: 4px;

          &:hover {
            filter: brightness(85%);
          }
        }

        .delete-btn {
          color: #263238;
          /* Darker teal color */
          background-color: #ef5350;
          /* Stylish red color */
        }
      }
    }
  }
}
</style>
