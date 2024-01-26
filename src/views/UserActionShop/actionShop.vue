<script>
import axios from 'axios';
import Paginate from 'vuejs-paginate';
import Swal from "sweetalert2";

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
      userId: null, // 確保在這裡定義 userId

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
    getImageUrlWithPrefix() {
      return `data:image/jpeg;base64,${this.imageUrl}`;
    },
  },
  mounted() {
    this.userId = sessionStorage.getItem('user_Id');
    console.log('User ID:', this.userId); // 檢查 userId 是否被設置
    this.fetchProducts();


  },
  methods: {

    fetchProducts() {
      // 发送获取产品列表的请求
      axios.get(`http://localhost:8080/product/get/info/user_id?id=${this.userId}`)
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
      // 显示删除确认弹窗
      this.showAlert(productId);
    },

    showAlert(productId) {
      Swal.fire({
        title: "你確定要刪除嗎?",
        text: "您將無法恢復此狀態！",
        icon: "warning", // 修改为 "warning"
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確認刪除!",
        cancelButtonText: "取消!"

      }).then((result) => {
        if (result.isConfirmed) {
          // 用户点击了确认删除，执行删除操作
          this.deleteConfirmedProduct(productId);
        }
      });
    },

    deleteConfirmedProduct(productId) {
      // 发送删除请求，并将 productId 作为参数传递
      axios.delete(`http://localhost:8080/product/delete?id=${productId}`)
        .then(response => {
          // 删除成功后，刷新产品列表或者做其他操作
          console.log('Product deleted successfully:', response.data);

          // 刷新产品列表，可以重新调用获取产品列表的方法
          this.fetchProducts();
          this.showDeleteSuccessAlert();
        })
        .catch(error => {
          console.error('Error:', error);
          // 处理错误，例如显示错误消息给用户
          this.showDeleteErrorAlert();
        });
    },

    showDeleteSuccessAlert() {
      Swal.fire({
        title: "刪除成功!",
        text: "你的商品刪除成功",
        icon: "success"
      });
    },

    showDeleteErrorAlert() {
      Swal.fire({
        title: "刪除失敗",
        text: "刪除商品時發生錯誤",
        icon: "error"
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
    // 使用选择的文件更新 'photo' 属性
    this.photo = selectedFile;

    // 如果您想预览图像，可以使用FileReader
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      // 切掉前缀 'data:image/jpeg;base64,'
      const imageDataWithoutPrefix = reader.result.replace(/^data:image\/(png|jpeg);base64,/, '');
      // console.log('ImageDataWithoutPrefix:', imageDataWithoutPrefix); // 添加此行

      // 存储没有前缀的图像数据
      this.editedProduct.photo = imageDataWithoutPrefix;
      // this.sendData(this.editedProduct);

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
  // 将上传时间设置为当前日期
  formData.upload_time = new Date();

  // 保存 Vue 组件实例的引用
  const self = this;

  if (this.photo) {
    const reader = new FileReader();
    reader.readAsDataURL(this.photo);
    reader.onload = () => {
      // 切掉前缀 'data:image/jpeg;base64,'
      const imageDataWithoutPrefix = reader.result.replace(/^data:image\/(png|jpeg);base64,/, '');
      console.log('ImageDataWithoutPrefix:', imageDataWithoutPrefix);

      // 将没有前缀的图像数据存储到 formData 中
      formData.photo = imageDataWithoutPrefix;

      // 使用保存的 Vue 组件实例引用调用 sendData 方法
      self.sendData(formData);
      console.log('FormData:', formData); // 添加此行
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
          this.isEditModalOpen = false;
          alert("編輯成功");
           console.log('Product deleted successfully:', response.data);

        })
        .catch(error => {
          console.error('Error:', error);
          // 處理錯誤，向使用者顯示錯誤訊息
        })
        .finally(() => {
          // 在弹窗关闭后执行页面跳转
          this.$router.go(0);
        });
    }, 

    toggleShelves() {
      this.editedProduct.shelves = !this.editedProduct.shelves;
    },
    turnToData(name, id) {
      this.$router.push({
        name: "productData",
        params: {
          product: name,
          id: id,
        },
      });
    },
  },

};
</script>
<template>
  <div class="actionPage">
    <div class="actionPageLeft">
      <div class="lefttHeader">
        <h2>我的拍賣</h2>
      </div>

      <div class="leftAdmin">

        <RouterLink class="btn" to="/UserPage/actionShop"><i class="fa-solid fa-wrench"></i>  &nbsp;產品管理</RouterLink>
        <RouterLink class="btn" to="/UserActionShop/bidOrder/"><i class="fa-solid fa-bars-staggered"></i> &nbsp; 銷售訂單
        </RouterLink>
        <RouterLink class="btn" to="/UserActionShop/shippedOder/"><i class="fa-solid fa-truck"></i>  &nbsp;出貨訂單</RouterLink>
        <RouterLink class="btn" to="/UserActionShop/orderCompleted/"><i class="fa-solid fa-flag-checkered"></i>  &nbsp;完成訂單
        </RouterLink>
        <RouterLink class="btn" to="/UserActionShop/cancelBid/"><i class="fa-regular fa-rectangle-xmark"></i> &nbsp; 取消訂單
        </RouterLink>


      </div>

    </div>

    <div class="actionPageRight">
      <div class="RightHeader">
        <div class="secondtitle2">
          <h3>
          </h3>
          <h6>
            <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">產品管理</a>
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
                <th class="">產品分類</th>

                <th class="productTitle">名稱</th>
                <th>庫存</th>
                <th>售價</th>
                <th>銷售數量</th>
                <th>商品狀態</th>
                <th>上架時間</th>
                <th>銷售報表</th>

                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in paginatedProducts" :key="index">
                <td>{{ product.productId }}
                </td>
                <td>
                  <img :src="'data:image/jpeg;base64,' + product.photo" alt="商品圖片" class="card-img-top fixed-size-image"
                    @click="() => openImageModal(product)">
                </td>
                <td>{{ product.product_type }}</td>

                <td>{{ product.product_name }}</td>
                <td>{{ product.inventory }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.sale_count }}</td>
                <td :style="{ 'color': product.shelves ? 'green' : 'red' }">{{ product.shelves ? '上架中' : '下架中' }}</td>



                <td>{{ product.upload_time }}</td> <!-- 這裡我們假設有一個 shelfTime 屬性 -->
                <td>
                  <span class="link" @click="
                    turnToData(product.product_name, product.productId)
                    ">詳細資料</span>
                </td>
                <td class="action-btns">

                  <button class="edit-btn" @click="editProduct(index)">編輯</button>
                  <button class="delete-btn" @click="deleteProduct(product.productId)">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination-container">
            <button class="pagination-button" @click="handleCurrentChange(currentPage - 1)" :disabled="currentPage === 1">
              上一頁
            </button>
            <span class="pagination-current-page">第 {{ currentPage }} 頁</span>
            <button class="pagination-button" @click="handleCurrentChange(currentPage + 1)"
              :disabled="currentPage === pageCount">
              下一頁
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isImageModalOpen" class="image-modal" @click="closeImageModal">
      <img :src="'data:image/jpeg;base64,' + selectedImage" alt="商品圖片" class="modal-image">
    </div>


    <div v-if="isEditModalOpen" class="edit-modal">
      <div class="edit-content">
        <!-- 编辑表单 -->
        <div class="close-button" @click="closeEditModal">X</div>
        <div class="editPhoto">
          <img v-if="this.editedProduct.photo" :src="'data:image/jpeg;base64,' + this.editedProduct.photo" alt="商品圖片" class="modal-image" />
        </div>
        <div class="edit-form">
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="productImage">商品圖片: &nbsp;</label>
              <input type="file" @change="handleImageChange" id="productImage" class="form-productImage" />
            </div>

            <div class="form-group">
              <label for="productName">商品名稱: &nbsp;</label>
              <input v-model="editedProduct.product_name" id="productName" placeholder="商品名称" class="productName" />
            </div>
            <div class="form-group">

              <label for="productType">產品分類:  &nbsp;</label>
              <select id="productType" v-model="editedProduct.product_type" placeholder="產品分類">
                <option value="書籍動漫">書籍動漫</option>
                <option value="食品專區">食品專區</option>
                <option value="精品服飾">精品服飾</option>
                <option value="日常用品">日常用品</option>
                <option value="3C產品">3C產品</option>
                <option value="寵物專區">寵物專區</option>
                <option value="樂器專區">樂器專區</option>
                <option value="機車零件">機車零件</option>
                <option value="其他">其他</option>

              </select>
            </div>

            <div class="form-group">
              <label for="description">商品描述: &nbsp;</label>
              <textarea v-model="editedProduct.description" id="productDescription" placeholder="商品描述"
                @input="adjustTextareaHeight"></textarea>
            </div>

            <div class="form-group">
              <label for="inventory">庫存: &nbsp;</label>
              <input v-model="editedProduct.inventory" id="inventory" placeholder="庫存" />
            </div>

            <div class="form-group">
              <label for="price">售價: &nbsp;</label>
              <input v-model="editedProduct.price" id="productPrice" placeholder="售價" />
            </div>

            <div class="form-group">
              <label>是否上架商品: &nbsp;</label>
              <button type="button" @click="toggleShelves"
                :style="{ backgroundColor: editedProduct.shelves ? 'red' : 'green', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s ease' }">
                {{ editedProduct.shelves ? '關閉商品' : '開啟商品' }}
              </button>
            </div>
            <div class="form-group">

              <!-- 其他编辑项 -->
              <button type="submit" class="subBtn">保存編輯</button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.link {
  padding: 0.2rem 0.5rem;
  transition: 0.3s ease;

  &:hover {
    background-color: #263238;
    color: #e0e0e0;
    cursor: pointer;
  }
}

#productDescription {
  width: 400px;
  /* 设置宽度 */
  height: 300px;
  /* 设置高度 */
  resize: none;
  /* 防止用户手动调整大小 */
  overflow: auto;
  /* 显示滚动条以便查看溢出内容 */
}

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
  border: 0px solid rgb(255, 0, 0);

  .edit-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 70vw;
    position: relative;
    border: 0px solid rgb(255, 0, 0);


  }

  .edit-form {
    display: flex;
    flex-direction: column;
    width: 100%; // 占据整个宽度
    max-width: 400px; // 最大宽度，防止过宽
    border: 0px solid rgb(255, 0, 0);
    position: relative;
    right: 4%;

    height: 80vh;


  }

  .form-group {
    margin-bottom: 10px; // 将间距调整为更小

    .productName {

      width: 19vw;
    }

    .subBtn {
      position: relative;
      left: 85%;
      border: 0px solid rgb(255, 0, 0);

      padding: 8px 16px;
      background-color: #2196F3;
      /* 更改按钮蓝色 */
      color: white;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 5px;
    }
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
    font-size: 20pt;
  }

  .editPhoto {
    border: 0px solid rgb(255, 0, 0);
    height: 90vh;
    width: 40vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-image {

    scale: 1.2;
    border: 0px solid rgb(255, 0, 0);
    overflow: auto;
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
  max-width: 80%;
  max-height: 80%;
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
  height: 218vh;
  border: 0;
}

.actionPageLeft {
  width: 15vw;
  display: flex;
  flex-direction: column;
  background-color: #37474f;
  /* Dark teal background color */
  height: 218vh;

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
  width: 85vw;
  height: 204vh;
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
      width: 82vw;
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
    height: 209.4vh;

    .productCreate {
      display: flex;
      justify-content: space-between;
      width: 83vw;
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