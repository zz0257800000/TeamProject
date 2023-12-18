User
<script>
import api from "../../api/api";
export default {
  data() {
    return {
      userId: 1,
      itemList: [
        { 
          cart_id: 1,
          cartDate: '2023-12-15T16:30:00',
          productId: '1',
          productName: '優質短袖白T',
          imgUrl: 'https://images.unsplash.com/photo-1534961880437-ce5ae2033053?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          cartAmount: 500,
          cartCount: 2,
        },
        // {
        //   productId: '2',
        //   itemName: '骷髏手短黑T',
        //   imgUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        //   price: '790',
        //   count: '3'
        // },
        // {
        //   productId: '3',
        //   itemName: '超時尚牛仔褲',
        //   imgUrl: 'https://images.unsplash.com/photo-1529391409740-59f2cea08bc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1124&q=80',
        //   price: '1200',
        //   count: '1'
        // },
        // {
        //   productId: '4',
        //   itemName: '質感褐色系大衣服',
        //   imgUrl: 'https://images.unsplash.com/photo-1491998664548-0063bef7856c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        //   price: '2300',
        //   count: '1'
        // },
      ]
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
    const deletedItem = this.itemList[index];

    // 从前端中删除项目
    this.itemList.splice(index, 1);

    // 打印被删除项目的id
    console.log('Deleted item id:', deletedItem.productId);

    // 调用API删除购物车中的项目
    api.cartDelete(deletedItem.productId)
      .then(response => {
        // 处理API响应，如果需要的话
        console.log('cartDelete:', response);
      })
      .catch(error => {
        // 处理错误，如果需要的话
        console.error('Error deleting item from cart:', error);
      });
    },
    
  //   getCart() {
  //   // 从你的用户数据中获取用户ID
  //   const id = this.itemList.userId; // 你需要替换为实际的用户ID，可以从你的用户数据中获取

  //   // 调用API获取购物车信息
  //   api.getCartInfoByUserId(id)
  //     .then(response => {
  //       // 处理API响应，更新购物车商品列表
  //       this.itemList = response.data.cartItems; // 假设响应中有一个名为 cartItems 的字段用于存储购物车商品列表
  //       console.log('Cart Info:', this.itemList); // 打印购物车信息到控制台
  //     })
  //     .catch(error => {
  //       // 处理错误，如果需要的话
  //       console.error('Error getting cart info:', error);
  //     });
  // },

  searchList() {
      fetch(`http://localhost:8080/cart/get/user_id?id=${this.userId}`)
        .then(response => response.json())
        .then(data => {
          // 在迭代之前检查data和data.itemList是否定义
          if (data && data.itemList && Array.isArray(data.itemList)) {
            this.itemList = data.itemList;
            data.itemList.forEach(item => {
              console.log('item:', item);
            });
          } else {
            console.log(data.cartList);
          }
        })
        .catch(error => console.error('获取数据时出错:', error));
    },

  },
  
  computed: {

  },
  mounted() {
    // 在发送请求之前检查 userId 是否有效
if (this.userId !== undefined) {
  fetch(`http://localhost:8080/cart/get/user_id?id=${this.userId}`)
    .then(response => response.json())
    .then(data => {
      // 处理响应数据
    })
    .catch(error => console.error('Error fetching data:', error));
} else {
  console.error('Invalid userId:', this.userId);
}

    // // 在 mounted 鉤子中觸發 cartCreate API
    // this.cartCreateAPI();
    this.searchList();
  },
}

</script>

<template>

  <!-- cartList: {{ this.cartList }} <br> -->
  itemList: {{ this.itemList }}
  <div class="mainShowDetail">
    <br>
    <br>
    <div class="secondtitle2">
      <h3>
      </h3>
      <h6>
        <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">購物車</a>
      </h6>

    </div>
    <div id="app">
      <div class="container">
        <div class="item_header">
          <div class="item_detail">商品</div>
          <div class="price">單價</div>
          <div class="count">數量</div>
          <div class="amount">總計</div>
          <div class="operate">操作</div>
        </div>
        <div class="item_container" v-for="(item, index) in itemList" :key="item.id">
          <div class="item_header item_body">
            <div class="item_detail">
              <img v-bind:src="item.imgUrl" alt="">
              <div class="name">{{ item.itemName }}</div>
            </div>

            <div class="price"><span>$</span>{{ item.price }}</div>
            <div class="count">
              <button @click="handleSub(item)">-</button>
              {{ item.count }}
              <button @click="handlePlus(item)">+</button>
            </div>
            <div class="amount">{{ item.price * item.count }}</div>
            <div class="operate">
              <button @click="handledelete(index)">刪除</button>
            </div>
          </div>
        </div>
      </div>

    </div>
    <br>
    <RouterLink class="submitbtn" to="/"> 結帳</RouterLink>

  </div>
</template>
<style lang="scss" scoped>
.mainShowDetail {
  border: 0px solid rgb(255, 0, 0);
  height: 120vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 10%;

  .secondtitle2 {
    justify-content: space-between;
    display: flex;
    border: 0px solid rgb(255, 0, 0);
    width: 90vw;

    a {

      border-radius: 10px;
      padding: 5px;
      transition: all 0.5s ease;
      text-decoration: none;
      color: black;

      &:hover {
        color: red;
        background-color: rgba(118, 118, 117, 0.5);
      }
    }

  }

  .submitbtn {
    background-color: rgba(118, 118, 117, 0.5);
    font-size: 24pt;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    width: 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.item_header {
  display: flex;
  width: 50vw;
  margin: 0 auto;
  height: 30px;
  background-color: #fff;
  border-radius: 3px;
  padding-left: 10px;
  border: 0px solid rgb(255, 0, 0);

}

.item_header div {
  width: 200px;
  color: #888;
  line-height: 30px;
}

.item_header .item_detail {
  width: 50%;
}

.item_body {
  margin-top: 20px;
  height: 100px;
  align-items: center;
}

.item_detail img {
  width: 80px;
  height: 80px;
  border-radius: 3px;
  /* margin-top: 10px; */
  float: left;
}

.item_detail .name {
  margin-left: 100px;
  margin-top: 20px;
}
</style>