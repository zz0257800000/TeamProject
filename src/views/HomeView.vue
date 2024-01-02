<script>
import axios from 'axios';
import api from "../api/api";
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

    // handleNavClick() {
    //   api.searchByType(this.searchKeyword)
    //     .then(response => {
    //       // 處理搜索結果
    //       this.products = response.data.products;
    //     })
    //     .catch(error => {
    //       console.error('Error searching products by type:', error);
    //     });
    // },
    handleNavClick(productType) {
  axios.get(`http://localhost:8080/product/searchByType?productType=${productType}`)
    .then(response => {
      this.products = response.data.products;
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error searching products:', error);
    });
},

  },
};
</script>

<template>
    <div class="navbar Area">
      <ul class="nav justify-content-center">
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" @click="handleNavClick('')">新品上架</a>
    </li>
    <li class="nav-item">
      <a class="nav-link active" aria-current="page" @click="handleNavClick('書籍動漫')">書籍動漫</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" @click="handleNavClick('食品專區')">食品專區</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" @click="handleNavClick('精品服飾')">精品服飾</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" @click="handleNavClick('日常用品')">日常用品</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" @click="handleNavClick('3C產品')">3C產品</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" @click="handleNavClick('寵物專區')">寵物專區</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" @click="handleNavClick('樂器專區')">樂器專區</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" @click="handleNavClick('機車零件')">機車零件</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" aria-current="page" @click="handleNavClick('其他')">其他</a>
    </li> 
  </ul>
  <div class="search">
        <input v-model="searchResults" placeholder="輸入搜尋關鍵字">
        <button @click="handleSearch">搜尋</button>
      </div>  
    </div>

  <div class="Marquee">
    <div class="announcement">
    <!-- <p> 魔剣の継承者漫画、イラスト発売中!!! </p> -->
      <p> 系統公告：春節活動折扣即將開跑，詳情請至活動頁面！</p>
    </div>
  </div>

  <div class="mainshow">

    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../../public/2024.jpg" class="d-block w-100" alt="...">
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

    <h1 v-if="products.length == 0">找不到查詢商品,請再次輸入</h1>
    <div class="productAll">
      <div class="product card" v-for="(product, index) in paginatedProducts" :key="index" style="width: 16rem;">
            <router-link :to="'/UserPage/productPage/' + product.productId" class="productPageRoutBtn" :title="product.product_name">
              <img :src=" 'data:image/jpeg;base64,' + product.photo" class="card-img-top fixed-size-image" alt="...">
              <div class="card-body">
                <div class="card-text">
                <h5 class="productName">{{ product.product_name }}</h5>
                <p class="productPrice">${{ product.price }}</p>
                </div>
            </div>
            </router-link>
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
.Marquee {
  height: 32px;
  // background-color: #f5f5f5;

  //跑馬燈
  .announcement {
    position: absolute;
    right: 100%;
    background-color: #ff9800;
    color: #fff;
    padding: 5px 10px;
    white-space: nowrap;
    animation: scrollFromRight 10s linear infinite;
    font-size: 11pt;
    p {
      margin: 0;
    }
  }

  @keyframes scrollFromRight {
    0% {
      right: 100%;
    }

    100% {
      right: 0;
    }
  }
}

.navbar{
  background-color: rgb(255, 255, 255);
  box-shadow: inset 0px 0px 5px #e0e0e0;
  .nav-link{
    font-size: 14pt;
    color: #ff9800;
    font-weight: 1000;
    cursor: pointer;
    &:hover {
      color:#4e4e4e;
  }
  }
}
.search {
  display: flex;
  // align-items: center;
  height: 5vh;
  width: 25vw;
  margin-right: 20px;

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
    background-color: #ff9800;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #4d4d4d;
  }
}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  height: 15vh;
}

.pagination-button {
  background-color: #000000; /* 時尚科技風格的主要顏色 */
  color: #fff;
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
  position: relative;
  border: 0px solid rgb(255, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .carousel {
    width: 75vw;
    margin: 20px;
    img{
      border-radius: 10px;
    }
  }

  .productAll {
    // background-color: #e0e0e0;
    // border: 1px solid #ddd;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    // background-color: #ffffff;
    border-radius: 10px;
    width: 75vw;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 2px;
    overflow: hidden;
  }

.product {
  position: relative;
  height: 54vh;
  margin: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    border: 2px solid #ff822a;
  }
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    // border-radius: 8px;
  }

.card {
  height: 300px;
  margin: 3px;
  .card-img-top {
    height: 200px;
  }
  .card-body {
    display: flex;
    flex-direction: column; /* 讓內容垂直排列 */
  }
  }
  .productName {
    height: 40px;
    font-size: 12pt;
    overflow: hidden;        /* 超出框框的內容隱藏 */
    text-overflow: ellipsis; /* 顯示省略號以表示文字被截斷 */
    text-decoration: none;
}
  .productPageRoutBtn {
    text-decoration: none;
    color: #4d4d4d; 
    font-size: 14pt;
    }
  .productPrice{
    color: #ff822a;
  }
}
}
</style>
