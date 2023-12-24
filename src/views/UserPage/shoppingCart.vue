<script>
import { arrow } from "@popperjs/core";
import api from "../../api/api";
export default {
  data() {
    return {

      del:"",
      // cartTotalQuantity:[],
      cartList:[],
      userId: sessionStorage.getItem('user_Id'),
    };
  },
  methods: {
  handlePlus: function (item) {
    item.cart_count++;
    // 使用 api.cartCreate 更新商品數量和價格
    this.updateCartItem(item);
  },
  handleSub: function (item) {
    if (item.cart_count > 1) {
      item.cart_count--;
      // 使用 api.cartCreate 更新商品數量和價格
      this.updateCartItem(item);
    }
  },
  handledelete: function (index) {

  // 获取要删除的项目
  const deletedItem = this.cartList[index];
  // 从前端中删除项目
  this.cartList.splice(index, 1);

  // 打印被删除项目的id
  console.log('Deleted item id:', deletedItem.cartId);

  // 调用API删除购物车中的项目
  api.cartDelete(deletedItem.cartId)
    .then(response => {
      // 处理API响应，如果需要的话
      console.log('cartDelete:', response);
    })
    .catch(error => {
      // 处理错误，如果需要的话
      console.error('Error deleting item from cart:', error);
    });
},

  searchList() {
    fetch(`http://localhost:8080/cart/get/user_id?id=${this.userId}`)
      .then(response => response.json())
      .then(data => {
        this.cartList = data.cartList;

        // 提取所有的 product_name
        const productName = data.cartList.map(item => item.product_name);

        // 在这里可以使用 productNames，例如打印到控制台
        console.log('Product Names:', this.cartList);
      })
      .catch(error => console.error('获取数据时出错:', error));
  },
  updateCartItem: function (item) {
    // 調用 API 更新購物車中的商品數量和價格
    api.cartCreat({
      cartId: item.cartId,
      cart_date: "2023-12-15T16:30:00",
      product_name: item.product_name,
      cart_count: item.cart_count,
      cart_amount: item.cart_amount * item.cart_count,
      user_id: sessionStorage.getItem('user_Id'), // 获取用户 ID
      product_id: item.product_id,
      photo: item.photo,
    })
    .then(response => {
      // 处理 API 响应，如果需要的话
      console.log('cartCreate:', response);
    })
    .catch(error => {
      // 处理错误，如果需要的话
      console.error('Error updating item in cart:', error);
    });
  },
  },
  
  computed: {

  },
  mounted() {
    this.searchList();
    const user_id = sessionStorage.getItem('user_Id');
    console.log('User ID:', user_id);
  },
}

</script>

<template>
  <div class="cart-page">
    <div class="page-header">
      <RouterLink class="home-link" to="/">Home</RouterLink>
      <span class="breadcrumb-separator">></span>
      <span class="current-page">購物車</span>
    </div>

    <div class="cart-items">
      <div class="item_header">
        <div class="item-image header">商品照片</div>
        <div class="item-name header">商品</div>  
        <div class="item-price header">單價</div>
        <div class="item-quantity header">數量</div>
        <div class="item-total header">總計</div>
        <div class="operate header">操作</div>
      </div>
      <div class="cart-item" v-for="(item, index) in cartList" :key="item.id" >
        <div class="item-details">
          <div class="item-image">
          <img :src="item.photo" alt="Product Image" class="product-image">
        </div>
          <div class="item-name">{{ item.product_name }}</div>
          <div class="item-price">
            <span class="price-value">{{ item.cart_amount }}</span>
          </div>
          <div class="item-quantity">
            <button @click="handleSub(item)">-</button>
            <span class="quantity-value">{{ " " + item.cart_count + " " }}</span>
            <button @click="handlePlus(item)">+</button>
          </div>
          <div class="item-total">
            <span class="total-value">{{ item.cart_amount * item.cart_count }}</span>
          </div>
          <button @click="handledelete(index)" class="operate delete-button">刪除</button>
        </div>
      </div>
      <RouterLink class="checkout-button" to="/UserPage/cartToCheckOut/">結帳</RouterLink>
    </div>

  </div>

</template>

<style lang="scss" scoped>
.home-link {
  border-radius: 5px;
  padding: 5px;
  transition: background 0.3s ease;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: #ddd;
  }
}
.cart-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  color: #333;
}
.page-header {
  margin-bottom: 20px;
}
.item_header{
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

//> 符號
.breadcrumb-separator {
  margin: 0 5px;
}
.current-page {
  font-weight: bold;
}

.cart-items {
  padding: 10px;
  width: 100%;
  .item-image {
    display: flex;
    justify-content: center;
    width: 8vw;
    img {
      width: 80px;
      height: 80px;
      border-radius: 5px;
      border: 2px solid#c9c9c9;
    }
  }
  .item-name {
      width: 30vw;
      font-size: 18px;
    }
  .item-price{
    width: 8vw;
  }
  .item-quantity{
      width: 5vw;
  }
  .item-total{
    width: 8vw;
  }
  .operate{
    width: 5vw;
  }
  .delete-button {
      background-color: #e74c3c;
      color: white;
      border: none;
      padding: 8px;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #c0392b;
      }
    }
  .item-details {
    flex-grow: 1;
    display: flex;  
    justify-content: space-around;


  }
}

.cart-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.checkout-button {
  margin-top: 20px;
  background-color: #2ecc71;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #27ae60;
  }
}
</style>