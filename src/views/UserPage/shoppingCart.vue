<script>
import { arrow } from "@popperjs/core";
import api from "../../api/api";
export default {
  data() {
    return {

    };
  },
  methods: {
    handlePlus: function (item) {
      item.count++;
    },
    handleSub: function (item) {
      if (item.count > 1) {
        item.count--;
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
        console.log('Product Names:', productName);
      })
      .catch(error => console.error('获取数据时出错:', error));
  },
  },
  computed: {

  }
}

</script>

<template>
  <div class="cart-page">
    <div class="page-header">
      <RouterLink class="home-link" to="/">Home</RouterLink>
      <span class="breadcrumb-separator">></span>
      <span class="current-page">購物車</span>
    </div>

   
  <!-- {{ cartList }}-->
  <!-- <div v-for="(item, index) in cartList" :key="item.id">
        {{ "商品名稱：" + item.product_name }}
        {{ "單價：" + item.cart_amount }}
        {{ "數量：" + item.cart_count }}
  </div> -->
  
      <div class="cart-items">
        <div class="cart-item" v-for="(item, index) in cartList" :key="item.id" >
          <div class="item-image">
            <img :src="item.imgUrl" alt="">
          </div>
          <div class="item-quantity">
            <button @click="handleSub(item)">-</button>
            <span class="quantity-value">{{ item.count }}</span>
            <button @click="handlePlus(item)">+</button>
          </div>
          <div class="item-total">
            <span class="total-label">總計：</span>
            <span class="total-value">{{ item.price * item.count }}</span>
          </div>
          <button @click="handledelete(index)" class="delete-button">刪除</button>
        </div>
      </div>
    </div>

    <RouterLink class="checkout-button" to="/">結帳</RouterLink>
  
</template>

<style lang="scss" scoped>
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

.breadcrumb-separator {
  margin: 0 5px;
}

.current-page {
  font-weight: bold;
}

.cart-items {
  width: 100%;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .item-image {
    margin-right: 20px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 5px;
    }
  }

  .item-details {
    flex-grow: 1;

    .item-name {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .item-price,
    .item-quantity,
    .item-total {
      margin-bottom: 8px;
    }

    .quantity-value {
      margin: 0 5px;
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
  }
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