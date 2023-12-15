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

    editProduct(index) {
      // 在這裡添加編輯商品的邏輯
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


    handlePageChange(newPage) {
      this.currentPage = newPage;
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
                <th class="productPic">商品圖片</th>
                <th class="productTitle">名稱</th>
                <th>描述</th>
                <th>售價</th>
                <th>上架時間</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in paginatedProducts" :key="index">
                <td>
                  <img :src="product.photo" alt="商品圖片" style="width: 50px; height: 50px;">
                </td>
                <td>{{ product.product_name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.shelfTime }}</td> <!-- 這裡我們假設有一個 shelfTime 屬性 -->
                <td class="action-btns">
                  <button class="edit-btn" @click="editProduct(index)">編輯</button>
                  <button class="delete-btn" @click="deleteProduct(product.productId)">刪除</button>
                </td>
              </tr>
            </tbody>
          </table>
          <paginate :page-count="pageCount" :click-handler="handlePageChange" :prev-text="'上一頁'" :next-text="'下一頁'"
  :container-class="'pagination'" :page-class="'page-item'" :prev-class="'page-item'" :next-class="'page-item'"
  :page-link-class="'page-link'" :prev-link-class="'page-link'" :next-link-class="'page-link'" :clickable="'true'"
  :disable-ellipsis="'true'" v-if="pageCount > 1">
</paginate>
        </div>

      </div>
    
    </div>

  </div>
  
</template>
<style lang="scss" scoped>
.actionPage {
  display: flex;
  width: 100vw;
  height: 172vh;
}

.actionPageLeft {
  width: 20vw;
  display: flex;
  flex-direction: column;
  background-color: #37474f;
  /* Dark teal background color */
  height: 178vh;

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
    height: 42vw;
    background-color: #f5f5f5;
    /* Light gray background color */
    height: 170vh;

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

      td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        height: 30vh;
      }

      .productPic {
        width: 25vw;
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
}</style>
