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
        photo: '',
      },
      quantity: 1,
      suggestArr: [], // 你的相關商品數據
      relatedProducts: [], // 你的相關商品數據
      products: [], // Save products data from the API
      isImageModalOpen: false,
      userId: sessionStorage.getItem('user_Id'),
      name: sessionStorage.getItem('name'),

      comments: [], // 用於存儲商品留言的陣列
      newCommentText: '',

    };
  },
  mounted() {
    this.fetchProducts();
    this.userId = sessionStorage.getItem('user_Id');
    this.name = sessionStorage.getItem('name');

    console.log('User ID:', this.userId); // 檢查 userId 是否被設置
    this.fetchProductDetails(); // 現有的方法
    this.fetchProductComments(); // 獲取商品留言
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
      if (this.quantity < this.product.inventory) {
        this.quantity++;
      } else {
        // 庫存不足的提示，你可以自行調整
        alert('已達到庫存上限');
      }
    },
    buyNow() {
      if (this.product.inventory <= 0) {
        // 库存不足，显示提示
        alert('庫存不足');
        return;
      }
      // 检查是否购买自己的商品
      if (this.userId === this.product.user_id) {
        // 显示提示信息
        Swal.fire({
          title: '購買成功',
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
            product_id: this.product.productId,
            // quantity: this.quantity,
            user_id: sessionStorage.getItem('user_Id'), // 获取用户 ID
            cart_date: "2023-12-15T16:30:00",
            cart_count: this.quantity,
            inventory: this.product.inventory,
            cart_amount: this.product.price * this.quantity,
            product_name: this.product.product_name,
            product_type: this.product.product_type,
            photo: this.product.photo,
            seller_id: this.product.user_id,
            seller_name: this.product.seller_name,

          };
          console.log('User ID:', this.user_id);
          console.log('User ID:', this.userId);

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

    fetchProductComments() {
      const productId = this.$route.params.productId;

      axios.get(`http://localhost:8080/comment/info?id=${productId}`)
        .then(response => {
          this.comments = response.data;
          console.log('獲取的留言:', this.comments);
        })
        .catch(error => {
          console.error('獲取留言時出錯:', error);
        });
    },


    addProductComment() {
      axios.post(`http://localhost:8080/comment/create`, {
        user_name: sessionStorage.getItem('name'),
        star: 5,
        comment: this.newCommentText, // 使用你的输入字段
        like_count: 0,  // 根据需要设置初始值
    dislike_count: 0,  // 根据需要设置初始值
        user_id: sessionStorage.getItem('user_Id'),
        product_id: this.product.productId
      })
        .then(response => {
          // 根据需要处理响应
          console.log('新增的留言:', response.data);
          this.newCommentText = "";
          // 可选地，在添加新留言后刷新留言
          this.fetchProductComments();
        })
        .catch(error => {
          console.error('添加留言时出错:', error);
        });
    },
    addLike(commentId) {
  axios.post(`http://localhost:8080/comment/like?id=${commentId}`)
    .then(response => {
      // 处理成功响应
      console.log('点赞成功:', response.data);

        })
    .catch(error => {
      // 处理错误
      console.error('点赞失败:', error);
    });
    alert('按讚成功！');

},

// 踩评论
addDislike(commentId) {
  axios.post(`http://localhost:8080/comment/dislike?id=${commentId}`)
    .then(response => {
      // 处理成功响应
      console.log('踩成功:', response.data);
  })
    .catch(error => {
      // 处理错误
      console.error('踩失败:', error);
    });
    alert('倒讚成功！');

},


  },
};
</script>

<template>
  <div class="mainshow">
    <div class="productInfo">
      <div class="product">
        <img :src="product.photo" class="photoShow" alt="..." @click="openImageModal">
        <div class="productText">
          <div class="title">
            <p class="product-name">商品名稱：{{ product.product_name }}</p>
          </div>
          <p class="product-category">產品分類：{{ product.product_type }}</p>
          <div class="price">
            <p>價格：${{ product.price }}</p>
          </div>
          <div class="title">
            <p>庫存：{{ product.inventory }}</p>
          </div>
          <div class="title">
            <h5>上架時間：{{ product.upload_time }}</h5>
          </div>
          <div class="quantity" v-if="this.userId > 0 && this.userId != product.user_id && product.inventory > 0">
            <p>數量：</p>
            <button @click="decrementQuantity">-</button>
            <input v-model="quantity" type="number" min="1" />
            <button @click="incrementQuantity">+</button>
          </div>
          <div class="product-buttons">
            <button v-if="this.userId > 0 && this.userId != product.user_id && product.inventory > 0" class="cart-button"
              @click="addToCartAndShowAlert">
              <i class="fas fa-shopping-cart"></i>加入購物車
            </button>
            <router-link v-if="this.userId > 0 && this.userId != product.user_id && product.inventory > 0"
              :to="'/UserPage/checkoutshopping/' + product.productId" class="buy-now-button">
              <i class="fas fa-credit-card"></i> 立即購買
            </router-link>

          </div>
          <h1>
            <div v-if="!userId || userId === product.user_id || product.inventory <= 0" class="not-logged-in-message">
              請先登入以購買產品
            </div>
          </h1>
        </div>
      </div>
      <div class="sellinfo">
        <div class="seller-details">
          <router-link :to="'/UserPage/sellerStore/' + product.user_id" title="前往賣家賣場" class="routerseller">
            <h4>賣家名稱：{{ product.seller_name }}</h4>
          </router-link>
          <div class="divider"></div>
        </div>
        <div class="seller-details">
          <h4>全部商品：</h4>
          <div class="divider"></div>
        </div>
        <div class="seller-details" @click="openViewReplies">
          <div></div>
        </div>
      </div>
      <div class="productDescrip">
        <h4>商品描述：</h4>
        <div class="product-description" style="white-space: pre-line;">
          <p>{{ product.description }}</p>
        </div>
      </div>
      <div class="viewReplies">
        <!-- 弹窗内容 -->
        <div class="modal-content">
          <h4>商品留言 ： </h4>
          <div class="firstshow" >
            <!-- 顯示現有的留言 -->
            <div v-for="(comment, index) in comments.commentList" :key="index" class="commentitem">
              <span>{{ comment.user_name }}</span>
              <p>{{ comment.comment }}</p>
              <div class="thumb"  v-if="this.userId > 0 && this.userId != product.user_id && product.inventory > 0">
              <span>
                
                <i class="fa-regular fa-thumbs-up" @click="addLike(comment.comment_id)"></i> {{ comment.like_count }}
              </span>&nbsp;
              <span>
                <i class="fa-regular fa-thumbs-down" @click="addDislike(comment.comment_id)"></i> {{ comment.dislike_count }}
              </span>
             
            </div>
           <hr>
          </div>
            <!-- 新增留言的輸入框 -->
          </div>
          <div class="secondShow">
            <div v-if="this.userId > 0 && this.userId != product.user_id && product.inventory > 0">

              <input type="text" name="" id="" v-model="newCommentText" placeholder="添加留言" class="textEnter">
              <button @click="addProductComment" class="commitBtn">添加留言</button>
            </div>
          </div>
        </div>
      </div>
      <h2>最新商品</h2>
      <div class="Otherproducts">
        <div v-for="(product, index) in products.slice(0, 8)" :key="index" class="related-product-item">
          <router-link :to="'/UserPage/productPage/' + product.productId" class="productPageRoutBtn"
            @click="navigateToProductPage(product.productId)">
            <img :src="product.photo" alt="商品圖片" class="related-product-image">
            <p class="related-product-name">{{ product.product_name }}</p>
            <p class="related-product-price">${{ product.price }}</p>
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="isImageModalOpen" class="image-modal-overlay" @click="closeImageModal">
      <div class="image-modal-container">
        <img :src="product.photo" class="image-modal-content" alt="放大後的圖片">
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.photoShow {

  scale: 1.0;
}

.mainshow {
  display: flex;
  width: 100vw;
  height: 250vh;
  background-color: rgb(148, 148, 148);
  justify-content: center;
  align-items: center;
}

.productInfo {
  width: 70vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .product {
    display: flex;
    margin-bottom: 20px;
    margin-top: 20px;
    background-color: white;
    border: 0px solid #ff0000;
    border-radius: 10px;
    height: 70vh;
    width: 70vw;
    overflow: hidden;
    /* 添加溢出隐藏，以确保内容不会突破边界 */

    .container {
      height: 200px;
      /* 设置容器的固定高度 */
      line-height: 200px;
      /* 设置行高等于容器高度，实现垂直居中 */
      text-align: center;
      /* 设置文本居中 */
    }

    img {
      border: 0px solid #ff0000;
      max-width: 100%;
      /* 图片最大宽度为容器宽度 */
      max-height: 100%;
      /* 图片最大高度为容器高度 */
      overflow: hidden;
      /* 添加溢出隐藏，以确保内容不会突破边界 */
      display: inline-block;
      /* 设置为行内块级元素 */
      vertical-align: middle;
      /* 设置垂直对齐方式为居中 */
    }

    .productText {
      padding: 30px;
      width: 30rem;

      p {
        font-size: 20pt;
      }

      .product-name {
        font-weight: bold;
        font-size: 24px;
        margin-bottom: 10px;
        color: #333;
        /* 根据实际情况调整颜色 */
      }

      .product-category {
        font-size: 18px;
        margin-bottom: 20px;
        color: #666;
        /* 根据实际情况调整颜色 */
      }

      .price {
        font-size: 20px;
        margin-bottom: 20px;
        color: #007bff;
        /* 根据实际情况调整颜色 */
      }

      .quantity {
        margin-top: 10px;
        display: flex;
        align-items: center;

        p {
          margin-right: 10px;
          font-size: 16px;
          color: #555;
          /* 根据实际情况调整颜色 */
        }

        button {
          border: 0;
          padding: 5px 10px;
          font-size: 16px;
          background-color: #007bff;
          /* 根据实际情况调整颜色 */
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s ease;

          &:hover {
            background-color: #0056b3;
          }
        }

        input {
          width: 60px;
          text-align: center;
          font-size: 16px;
          border: 1px solid #ced4da;
          /* 根据实际情况调整颜色 */
          border-radius: 5px;
          margin: 0 10px;
          padding: 5px;
        }
      }

      .product-buttons {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;

        .cart-button,
        .buy-now-button {
          padding: 10px 20px;
          font-size: 16px;
          text-decoration: none;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
          border: 0;
          transition: background-color 0.3s ease;
        }

        .cart-button {
          background-color: #007bff;
          /* 根据实际情况调整颜色 */
        }

        .buy-now-button {
          background-color: #28a745;
          /* 根据实际情况调整颜色 */
        }

        .cart-button:hover,
        .buy-now-button:hover {
          background-color: #0056b3;
          /* 根据实际情况调整颜色 */
        }
      }
    }
  }

  .sellinfo {
    display: flex;
    width: 70vw;
    height: 15vh;
    background-color: #ffffff;
    color: #ecf0f1;
    border: 0px solid #000000;
    border-radius: 10px;
  }

  .seller-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;

    .routerseller {
      text-decoration: none;
    }

    h4 {
      color: #000000;
      text-decoration: none;

      margin: 10px 0;
      font-size: 16px;
    }

    .productPageRoutBtn {
      text-decoration: none;
      color: inherit;

      h4 {

        margin: 0;
        font-weight: bold;
      }
    }

    .divider {
      height: 1px;
      background: linear-gradient(to right, #3498db, #ecf0f1);
      margin: 10px 0;
    }
  }

  .productDescrip {
    height: 50vh;
    width: 70vw;
    border: 0px solid #ff0000;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    overflow: auto;

    p {
      font-size: 16px;
    }
  }

  .viewReplies {
    border-radius: 10px;
    height: 60vh;
    width: 70vw;
    background-color: white;
    padding: 20px;
    margin-top: 20px;

    .modal-content {
      border: 0px solid #ff0000;
      height: 55vh;

      .firstshow {
        margin: 5px;
        border: 1px solid #000000;
        height: 48vh;
        overflow: auto;

        .commentitem {
          border: 0px solid #ff0000;
          top: 10%;
          margin: 5px;

        }
      }

      .secondShow {
        border: 0px solid #000000;

        .textEnter {
          border: 1px solid #000000;
          width: 60vw;
          height: 5vh;
          border-radius: 5px;
        }

        .commitBtn {
          padding: 10px 20px;
          background-color: #2196F3;
          /* 按钮蓝色 */
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }
      }

    }
  }

  h2 {
    font-size: 28px;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .Otherproducts {
    display: flex;
    justify-content: space-around;
  }

  .related-product-item {
    width: 150px;
    height: 200px;
    border: 1px solid #000000;
    border-radius: 10px;
    margin: 10px;
    background-color: white;
    display: inline-block;
    text-align: center;
    overflow: hidden;
    /* 添加溢出隐藏，确保内容不会突破边界 */

    .productPageRoutBtn {
      text-decoration: none;
      color: inherit;

      img {
        width: 100%;
        height: 100px;
        object-fit: cover;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
      }

      p {
        font-size: 14px;
        margin-top: 5px;
        overflow: hidden;
        /* 添加溢出隐藏，确保内容不会突破边界 */
        text-overflow: ellipsis;
        /* 显示省略号以表示文本被截断 */
        white-space: nowrap;
        /* 不换行 */
      }

      .related-product-price {
        font-size: 16px;
        font-weight: bold;
        color: #ff5733;
      }
    }
  }
}

.image-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
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
</style>
