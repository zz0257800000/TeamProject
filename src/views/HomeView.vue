<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      products: [], // Save products data from the API
      currentPage: 1,
      perPage: 9, // Number of products per page
      searchKeyword: '',
      searchResults: [],
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
    // Fetch products when the component is mounted
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      // Send a request to get the product list from the API
      axios.get('http://localhost:8080/product/get')
        .then(response => {
          // Save the fetched products to the data property
          this.products = response.data.products.filter(product => product.shelves);
          console.log('Fetched products:', this.products);
        })
        .catch(error => {
          console.error('Error:', error);
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
    handleSearch() {
      // 执行产品搜索请求
      axios.get(`http://localhost:8080/product/search?productName=${this.searchResults}`)
        .then(response => {
          this.products = response.data.products;
          console.log(response.data);
          this.searchResults="";
        })
        .catch(error => {
          console.error('Error searching products:', error);
        });
    },
  },
};
</script>


<template>
  <div class="mainshow">
    <div class="search">
        <input v-model="searchResults" placeholder="輸入搜尋關鍵字">
        <button @click="handleSearch">搜尋</button>
      </div>
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../../public/stock1.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../../public/stock1.jpg" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../../public/stock1.jpg" class="d-block w-100" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <h1 v-if="products.length==0">找不到查詢商品,請再次輸入</h1>
    <div class="productAll">
  <div class="product" v-for="(product, index) in paginatedProducts" :key="index">
    <router-link :to="'/UserPage/productPage/' + product.productId" class="productPageRoutBtn">
      <img :src="product.photo" class="card-img-top fixed-size-image" alt="...">
    </router-link>
      <div class="productInfo">
        <p class="productName">{{ product.product_name }}</p>
        <p class="productPrice">${{ product.price }}</p>
      </div>
     
    
    
  </div>
</div>
   

    <div class="pagination-container">
    <button class="pagination-button" @click="handleCurrentChange(currentPage - 1)" :disabled="currentPage === 1">
      上一頁
    </button>
    <span class="pagination-current-page">第 {{ currentPage }} 頁</span>
    <button class="pagination-button" @click="handleCurrentChange(currentPage + 1)" :disabled="currentPage === pageCount">
      下一頁
    </button>
  </div>
  </div>


</template>

<style lang="scss" scoped>
.search {
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 16px;
  }

  button {
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #2980b9;
  }
}
.product-icons {
  display: flex;
  flex-direction: column;
  width: 8vw;
  position: relative;
  bottom: 20%;
  left: 58%;
}

.product-icons1 {
  display: flex;
  flex-direction: column;
  width: 8vw;
  position: relative;
  bottom: 18%;
  left: 58%;
}

.cart-button {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #46799b; /* 第一个按钮的颜色 */
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #296593; /* 鼠标悬停时的颜色 */
    transform: scale(1.05);
  }

  i {
    margin-right: 5px;
  }
}

.buy-now-button {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #319241; /* 第二个按钮的颜色 */
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #29b930; /* 鼠标悬停时的颜色 */
    transform: scale(1.05);
  }

  i {
    margin-right: 5px;
  }
}
.fixed-size-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
}

.productPageRoutBtn {
  text-decoration: none;
  color: #3498db; /* 時尚科技風格的主要顏色 */
  font-size: 14pt;
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.pagination-button {
  background-color: #3498db; /* 時尚科技風格的主要顏色 */
  color: #fff;
  border: 1px solid #3498db; /* 時尚科技風格的主要顏色 */
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover {
  background-color: #5aa6e0; /* 更亮的色調 */
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

.mainshow {
.search{
  border: 0px solid rgb(255, 0, 0);
  height: 10vh;
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;

}
  position: relative;
  border: 0px solid rgb(255, 0, 0);
  height: 240vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;

  .carousel {
    width: 80vw;
    margin-bottom: 20px;
    img{
      border-radius: 10px;
    }
  }

  .productAll {
    border: 1px solid #ddd;
    width: 80vw;
    height: 175vh;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #2c3e50;
    border-radius: 10px;
    overflow: hidden;
  }



.product {
  position: relative;
  border: 1px solid #fff;
  height: 54vh;
  width: 20vw;
  margin: 10px;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
  background-color: #34495e; /* 時尚科技風格的次要背景色 */

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .productInfo {
    border: 0px solid rgb(255, 0, 0);
    height: 15vh;

    display: flex;
    flex-direction: column;
    background-color: rgba(52, 73, 94, 0.7); /* 半透明背景 */
    color: #ecf0f1; /* 時尚科技風格的文字顏色 */
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    .productName {
    border: 0px solid rgb(255, 0, 0);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  white-space: normal;
}
.productPrice{
  border: 0px solid rgb(255, 0, 0);

}
  }


}
}
</style>
