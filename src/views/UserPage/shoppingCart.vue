User
<script>
import api from "../../api/api";
export default {
  data() {
    return {
      cartList:[],
      userId: 1,
      
      // itemList: [
      //   { 
      //     cartDate: '2023-12-15T16:30:00',
      //     productId: '1',
      //     productName: '優質短袖白T',
      //     imgUrl: 'https://images.unsplash.com/photo-1534961880437-ce5ae2033053?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      //     cartAmount: 500,
      //     cartCount: 2,
      //   },
      //   {
      //     productId: '2',
      //     itemName: '骷髏手短黑T',
      //     imgUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      //     price: '790',
      //     count: '3'
      //   },
      //   {
      //     productId: '3',
      //     itemName: '超時尚牛仔褲',
      //     imgUrl: 'https://images.unsplash.com/photo-1529391409740-59f2cea08bc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1124&q=80',
      //     price: '1200',
      //     count: '1'
      //   },
      //   {
      //     productId: '4',
      //     itemName: '質感褐色系大衣服',
      //     imgUrl: 'https://images.unsplash.com/photo-1491998664548-0063bef7856c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      //     price: '2300',
      //     count: '1'
      //   },
      // ]
    };
  },
  methods: {
    handlePlus: function (item) {
      item.cart_count++;
    },
    handleSub: function (item) {
      if (item.cart_count > 1) {
        item.cart_count--;
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

  },
  mounted() {
    this.searchList();
  },
}

</script>

<template>
{{ cartList }}
<!-- <div v-for="(item, index) in cartList" :key="item.id">
      {{ "商品名稱：" + item.product_name }}
      {{ "單價：" + item.cart_amount }}
      {{ "數量：" + item.cart_count }}
</div> -->
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
        <div class="item_container" v-for="(item, index) in cartList" :key="item.id">
          <div class="item_header item_body">
            <div class="item_detail">
              <img v-bind:src="item.imgUrl" alt="">
              <div class="name">{{ item.product_name }}</div>
            </div>

            <div class="price"><span>$</span>{{ item.cart_amount }}</div>
            <div class="count">
              <button @click="handleSub(item)">-</button>
              {{ item.cart_count }}
              <button @click="handlePlus(item)">+</button>
            </div>
            <div class="amount">{{ item.cart_amount * item.cart_count }}</div>
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