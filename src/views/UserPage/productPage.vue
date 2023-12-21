<script >
import api from "../../api/api";
import axios from 'axios';
import Swal from 'sweetalert2';

export default {

  data() {
    return {
      product: {
        product_name: '',
        description: '',
        price: 0,
        inventory: 0,
      },
      quantity: 1,
      suggestArr: [], // 你的相關商品數據
      relatedProducts: [], // 你的相關商品數據
      products: [], // Save products data from the API
      isImageModalOpen: false,
      userId: sessionStorage.getItem('user_Id'),


    };
  },
  mounted() {
    this.fetchProducts();
    this.userId = sessionStorage.getItem('user_Id');
    console.log('User ID:', this.userId); // 檢查 userId 是否被設置
    this.fetchProductDetails();
  },
  methods: {
    openImageModal() {
      this.isImageModalOpen = true;
    },

    closeImageModal() {
      this.isImageModalOpen = false;
    },
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
    fetchProductDetails() {
      // 使用 this.$route.params.productId 获取路由中的 ID 参数
      const productId = this.$route.params.productId;
      console.log('productId:', productId);

      // 调用 API 获取商品详情
      axios.get(`http://localhost:8080/product/get/info?id=${productId}`)
        .then(response => {
          this.product = response.data.product;
          console.log('Fetched product:', this.product);
        })
        .catch(error => {
          console.error('Error fetching product details:', error);
        });
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    incrementQuantity() {
      this.quantity++;
    },
    buyNow() {
  // 检查是否购买自己的商品
  if (this.userId === this.product.user_id) {
    // 显示提示信息
    Swal.fire({
      title: '無法購買',
      text: '您不能購買自己的商品。',
      icon: 'warning',
    });
  } else {
    // 执行购买逻辑
    console.log('Buying now:', this.product);

    // 跳轉到結帳頁面
    this.$router.push(`/UserPage/checkoutshopping/${this.product.productId}`);
  }
},
    navigateToProductPage(productId) {
      // 使用 window.location.href 進行整頁刷新
      window.location.href = `/UserPage/productPage/${productId}`;
    },
    addToCartAndShowAlert() {
      // 调用 cartCreat 函数
      // const user_id = sessionStorage.getItem('user_Id');

      const addToCart = async () => {
        try {
          // 构建请求参数
          const req = {
            produce_id: this.product.productId,
            // quantity: this.quantity,
            user_id: sessionStorage.getItem('user_Id'), // 获取用户 ID
            cart_date: "2023-12-15T16:30:00",
            cart_count: this.quantity,
            cart_amount: this.product.price * this.quantity,
            product_name: this.product.product_name,
          };
          console.log('User ID:', this.user_id);
          // 调用 cartCreat 函数
          await api.cartCreat(req);

          // 成功添加到购物车后的逻辑
          Swal.fire({
            title: '商品已加入購物車',
            text: '請繼續您的購物!',
            icon: 'success',
            timer: 1700,
            showConfirmButton: false,
          });

          console.log('Adding to cart:', this.product, 'Quantity:', this.quantity);
        } catch (error) {
          console.error('Error adding to cart:', error);
          // 处理错误，例如显示错误提示
          Swal.fire({
            title: '加入購物車失敗',
            text: '請稍後再試!',
            icon: 'error',
          });
        }
      };

      // 调用 addToCart 函数
      addToCart();
    },
    handleCheckoutClick() {
    if (this.userId !== this.product.user_id) {
      // 這裡添加提示，表示不能購買自己的商品
      alert('您不能購買自己的商品。');
      // 如果你希望在此處執行其他邏輯，可以添加相應的代碼
    }
  },
  },
};
</script>


<template>
  <div class="mainshow">
    <div class="sellinfo">
      <div class="sellinfHeader">
        <h3>賣場資訊</h3>
      </div>
      <h4>賣家id： <router-link :to="'/UserPage/sellerStore/' + product.user_id" class="productPageRoutBtn" title="前往賣家賣場">
          {{ product.user_id }}</router-link>
      </h4>
      <h4>全部商品：</h4>
      <h4>賣場評價：</h4>

    </div>
    <div class="bg">

      <div class="product Area">
        <img :src="product.photo" class="card-img-top fixed-size-image" alt="..." @click="openImageModal">

        <div class="productText">
          <div class="title">
            <p>商品名稱：{{ product.product_name }}</p>
          </div>
          <p>產品分類：{{ product.product_type }}</p>

          <p>商品描述：{{ product.description }}</p>

          <div class="price">
            <p>價格：${{ product.price }}</p>
          </div>


          <div class="title">
            <p>庫存：{{ product.inventory }}</p>
          </div>
          <div class="title">
            <p>上架時間：{{ product.upload_time }}</p>
          </div>
          <div class="quantity">
            <p>數量：</p>
            <button @click="decrementQuantity">-</button>
            <input v-model="quantity" type="number" min="1" />
            <button @click="incrementQuantity">+</button>
          </div>

          <div class="product-buttons">
            <!-- <router-link :to="'/UserPage/shoppingCart/'" class="cart-button">
            <i class="fas fa-shopping-cart"></i> 加入購物車
          </router-link> -->
            <button v-if="this.userId != product.user_id" class="cart-button" @click="addToCartAndShowAlert"><i class="fas fa-shopping-cart"></i>加入購物車</button>

            <router-link v-if="this.userId != product.user_id" :to="'/UserPage/checkoutshopping/' + product.productId" class="buy-now-button" @click.prevent="handleCheckoutClick">
  <i class="fas fa-credit-card"></i> 立即購買
</router-link>
   
          </div>

        </div>
      </div>
      <h2>相關商品</h2>
      <div class="Otherproducts">
      

        <div v-for="(product, index) in products.slice(0, 14)" :key="index" class="related-product-item">
          <router-link :to="'/UserPage/productPage/' + product.productId" class="productPageRoutBtn"
            @click="navigateToProductPage(product.productId)">
            <img :src="product.photo" alt="商品圖片" class="related-product-image">
            <p class="related-product-name">{{ product.product_name }}</p>
            <p class="related-product-price">${{ product.price }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 放大圖片的覆蓋層 -->
    <div v-if="isImageModalOpen" class="image-modal-overlay" @click="closeImageModal">
      <div class="image-modal-container">
        <img :src="product.photo" class="image-modal-content" alt="放大後的圖片">
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.cart-button,
.buy-now-button {
  padding: 10px 20px;
  font-size: 16px;
  text-decoration: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cart-button {
  background-color: #007bff;
}

.buy-now-button {
  background-color: #28a745;
}

.cart-button:hover,
.buy-now-button:hover {
  background-color: #0056b3;
}

.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); // 半透明黑色背景
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999; // 確保覆蓋在其他元素上
}

.image-modal-container {
  max-width: 35%;
  max-height: 120%;
}

.image-modal-content {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.productPageRoutBtn {
  text-decoration: none;
}

.related-product-item {
  width: 150px;
  /* 設置正方形橫條的寬度 */
  height: 200px;
  /* 設置正方形橫條的高度 */
  border: 1px solid #000000;
  /* 添加邊框效果，可以根據需要進行調整 */
  margin: 10px;
  /* 設置正方形橫條之間的間距 */
  display: inline-block;
  /* 使正方形橫條水平排列 */
  text-align: center;
  /* 文字居中 */
}

.related-product-image {
  width: 100%;
  /* 使商品圖片充滿整個正方形橫條 */
  height: 100px;
  /* 設置商品圖片的高度 */
  object-fit: cover;
  /* 保持圖片比例，並填滿整個容器 */

}

.related-product-name {
  font-size: 14px;
  margin-top: 5px;
}

.related-product-price {
  font-size: 16px;
  font-weight: bold;
  color: #ff5733;
  /* 設置價格文字的顏色，可以根據需要進行調整 */
}

.fixed-size-image {
  border: 1px solid #000000;
  /* 添加邊框效果，可以根據需要進行調整 */

  width: 30vw;
  /* Set your desired width */
  height: 70.4vh;
  /* Set your desired height */
  object-fit: cover;
  /* This property ensures that the image will cover the specified dimensions */
}

.mainshow {
  display: flex;
  width: 100vw;
  height: 150vh;
  border: 1px solid rgb(255, 0, 0);
  background-color: rgb(148, 148, 148);


  .sellinfo {
    width: 30vw;
    /* 設置正方形橫條的寬度 */
    height: 71vh;
    /* 設置正方形橫條的高度 */
    border: 1px solid #000000;
    /* 添加邊框效果，可以根據需要進行調整 */
    top: 4%;
    left: 8%;
    position: relative;
    background-color: rgb(225, 225, 225);

    .sellinfHeader {
      background-color: rgb(104, 104, 104);
      height: 7vh;
      /* 設置正方形橫條的高度 */
      display: flex;
      align-items: center;
      left: 5%;


    }

  }

}

.bg {
  height: 150vh;
  border: 0px solid #ff0000;
  /* 添加邊框效果，可以根據需要進行調整 */
  width: 110vw;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.Area {
  display: flex;
}

.product {
  display: flex;
  margin-bottom: 80px;
  margin-top: 50px;
  border: 1px solid #000000;
  /* 添加邊框效果，可以根據需要進行調整 */

  .productText {
    padding: 30px;
    height: 35rem;
    width: 30rem;
    background-color: white;

    p {
      font-size: 20pt;
    }

    button {
      margin: 2px;
      height: 60px;
      width: 100px;
    }

    .selected {
      background-color: #666666;
      /* 或者其他你想要的顏色 */
      color: white;
    }
  }

  .quantity {
    margin-top: 10px;
    display: flex;
    align-items: center;

    input {
      width: 60px;
      text-align: center;
    }

    p {
      margin-right: 10px;
    }

    button {
      border: 0;
    }
  }

  .updateTime {
    margin-top: 20px;

    p {
      font-size: 10pt;
    }
  }
}</style>