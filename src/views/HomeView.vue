<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      products: [], // Save products data from the API
      currentPage: 1,
      perPage: 12, // Number of products per page
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
  },
};
</script>


<template>
  <div class="mainshow">
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

    <div class="productAll">
      <div class="product" v-for="(product, index) in paginatedProducts" :key="index">
  <router-link :to="'/UserPage/productPage/' + product.productId" class="productPageRoutBtn">
    <img :src="product.photo"  class="card-img-top fixed-size-image" alt="...">
    
    <p>{{ product.product_name }}  <button @click="addToFavorites(product.productId)" class="addToFavoritesBtn">Add to Favorites</button>
</p>

    <p class="productPrice">${{ product.price }}</p>
  </router-link>
  
</div>
</div>
   

    <div class="pagination-container">
    <button class="pagination-button" @click="handleCurrentChange(currentPage - 1)" :disabled="currentPage === 1">
      上一页
    </button>
    <span class="pagination-current-page">第 {{ currentPage }} 页</span>
    <button class="pagination-button" @click="handleCurrentChange(currentPage + 1)" :disabled="currentPage === pageCount">
      下一页
    </button>
  </div>
  </div>


</template>

<style lang="scss" scoped>
.fixed-size-image {
  width: 300px; /* Set your desired width */
  height: 300px; /* Set your desired height */
  object-fit: cover; /* This property ensures that the image will cover the specified dimensions */
}
.productPageRoutBtn{
  text-decoration: none;
  color: white;
  font-size: 14pt;
}
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center; // 这一行使得子元素在水平方向上居中
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
.mainshow {
  position: relative;
  border: 0px solid rgb(255, 0, 0);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);

  /* 添加背景颜色 */

  .carousel {
    width: 70vw;
    margin-bottom: 20px;
    background-color: aqua;
  }

  .productAll {
    border: 1px solid #ddd;
    width: 70vw;
    height: 170vh;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: rgb(0, 0, 0);
    overflow: hidden;
  }

  .product {
    border: 2px solid rgb(255, 0, 0);

    height: 50vh;
    /* 调整为适当的高度，以确保九宫格布局 */
    width: 20vw;
    /* 调整为适当的宽度，以确保九宫格布局 */
    margin: 10px;
    border-radius: 8px;
    transition: transform 0.2s ease-in-out;

    .productName {
      margin-top: 10px;
    }

    &:hover {
      transform: scale(1.05);
    }

    img {
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    h3 {
      margin: 10px 0;
      font-size: 1.2rem;
      color: #fff;
    }

    p {
      color: #ccc;
    }
  }
}
</style>