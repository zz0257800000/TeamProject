<script>
import axios from 'axios'; // 記得這行要加上

export default {
  data() {
    return {
      currentPage: 1,
      perPage: 2, // 每頁顯示的商品數量
      record: {},
      userId: '', // Add userId to data
      recordList: [],
      showCommetModal: false,
      name: sessionStorage.getItem('name'),

    };
  },
  mounted() {
    this.userId = sessionStorage.getItem('user_Id');
    this.fetchData();
    this.name = sessionStorage.getItem('name');


  },
  computed: {
    paginatedProducts() {
      // 逆序 recordList
      const reversedRecordList = [...this.recordList].reverse();

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;

      // 返回分页后的逆序记录列表
      return reversedRecordList.slice(start, end);
    },
    pageCount() {
      return Math.ceil(this.recordList.length / this.perPage);
    },
  },
  methods: {
    fetchData() {
      this.fetchRecord();
    },
    // 修改 fetchProductDetails 方法


    fetchRecord() {
      const userId = this.userId;
      const apiUrl = `http://localhost:8080/record/get/user_id?id=${userId}`;

      axios.get(apiUrl)
        .then(response => {
          console.log('API Response:', response.data);
          this.recordList = response.data.recordList.filter(record => record.status === '已完成');
          this.fetchRecord();

        })

        .catch(error => {
          console.error('Error fetching data:', error);
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
    addCommet() {
      // 点击 + 點數儲值 按钮时，显示弹窗
      this.showCommetModal = true;
    },
    closeCommet() {
      // 关闭弹窗
      this.showCommetModal = false;
    },
    addProductComment() {
      axios.post(`http://localhost:8080/comment/create`, {
        user_name: sessionStorage.getItem('name'),
        star: 5,
        comment: this.newCommentText, // 使用你的输入字段
        like_count: 10,
        dislike_count: 2,
        user_id: sessionStorage.getItem('user_Id'),
        product_id: this.product.productId
      })
        .then(response => {
          console.log('新增的留言:', response.data);

         
        })
        .catch(error => {
          console.error('添加留言时出错:', error);
        });
    },
  },
};
</script>
<template>
  <div class="actionPage">
    <div class="actionPageLeft">
      <div class="lefttHeader">
        <h3>你的購買紀錄</h3>
      </div>

      <div class="leftAdmin">

        <RouterLink class="btn" to="/UserPage/buyingList"><i class="fa-solid fa-bars-staggered"></i> &nbsp;訂單明細
        </RouterLink>
        <RouterLink class="btn" to="/UserPage/waitingReceipt"><i class="fa-solid fa-truck"></i>&nbsp; 待收貨 </RouterLink>
        <RouterLink class="btn" to="/UserPage/completeReceipt"><i class="fa-solid fa-flag-checkered"></i> &nbsp;訂單已完成</RouterLink>

        <RouterLink class="btn" to="/UserPage/buyCancelOrder"><i class="fa-regular fa-rectangle-xmark"></i> &nbsp; 取消訂單 </RouterLink>



      </div>

    </div>

    <div class="actionPageRight">
      <div class="RightHeader">
        <div class="secondtitle2">
          <h3>
          </h3>
          <h6>
            <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">訂單已完成</a>
          </h6>

        </div>

      </div>

      <div class="productManagement">
        <div class="productCreate">
          <h1>訂單已完成
          </h1>
          <RouterLink class="btn" to="/">繼續購物</RouterLink>
        </div>
        <div class="productAdmimList">
          <div class="orderDetails" v-for="(record, recordIndex) in paginatedProducts" :key="recordIndex">
            <!-- 订单信息 -->
            <div class="orderDetailshead">
              <div class="orderDetailsheadleft">
                <h4>訂單編號 : {{ record.record_id }} &nbsp; </h4>
                <h4>賣家帳號 :<router-link :to="'/UserPage/sellerStore/' + record.seller_id" class="nameRouter"
                    title="前往賣家賣場">
                    {{ record.seller_name }}</router-link> &nbsp; </h4>
                <h4 :style="{ color: record.status === '準備中' ? 'green' : (record.status === '出貨中' ? 'red' : 'black') }">
                  訂單狀態 : {{ record.status }} &nbsp;
                </h4>
              </div>
              <div class="orderDetailsheadright">
                <button class="btn" @click="addCommet" >評價商品</button>
              </div>
            </div>

            <!-- 商品信息 -->
            <div class="orderDetailsSecond">
              <table>
                <thead>
                  <tr>
                    <th>商品編號</th>
                    <th class="productTitle">商品名稱</th>
                    <th>訂購數量</th>
                    <th>商品價格</th>
                    <th>結帳時間</th>

                  </tr>
                </thead>
                <tbody>
                  <!-- 循环遍历商品信息 -->
                  <tr>
                    <td>{{ record.product_id }}</td>
                    <td> <router-link :to="'/UserPage/productPage/' + record.product_id" class="nameRouter">
                        {{ record.product_name }} </router-link></td>
                    <td>{{ record.product_count }}</td>
                    <td>{{ record.product_amount - record.shipping_cost }}</td>
                    <td>{{ record.record_date }}</td>

                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 订单详情和总计信息 -->
            <div class="orderDetailsThird">

              <div class="orderInfo">
                <h5>運送方式 : {{ record.shipping_method }}</h5>
                <h5>收件人 : {{ record.consumer_name }}</h5>
                <h5>手機 : {{ record.consumer_phone }}</h5>
                <h5>地址 : {{ record.consumer_address }}</h5>
                <h6 style="color: red;">備註 : {{ record.remarks_column }}</h6>
              </div>
              <div v-if="record.shipping_method !== '貨到付款'" class="orderInfo1">
                <h6>付款方式 : {{ record.payment_method }}</h6>
                <h6 v-if="record.payment_method !== '餘額付款' && record.payment_method !== '信用卡(一次付清)'">銀行 : {{
                  record.remittance_title }}</h6>
                <h6 v-if="record.payment_method !== '餘額付款' && record.payment_method !== '信用卡(一次付清)'">匯款帳號 : {{
                  record.remittance_number }}</h6>

              </div>


              <div class="totalCount">
                <h6>商品金額小計 : ${{ record.product_amount - record.shipping_cost }}</h6>
                <h6>運費 : ${{ record.shipping_cost }}</h6>
                <h3>結帳總金額 : ${{ record.product_amount }}</h3>
              </div>
              <div class="orderInfo2">

                <RouterLink class="btn" to=""> </RouterLink>

              </div>

            </div>
          </div>

        </div>
        <div class="pagination-container">
          <button class="pagination-button" @click="handleCurrentChange(currentPage - 1)" :disabled="currentPage === 1">
            上一頁
          </button>
          <span class="pagination-current-page">第 {{ currentPage }} 頁</span>
          <button class="pagination-button" @click="handleCurrentChange(currentPage + 1)"
            :disabled="currentPage === pageCount">
            下一頁
          </button>
        </div>
      </div>
    </div>
    <div class="comment-modal" v-show="showCommetModal">
      <!-- 弹窗内容 -->
      <div class="modal-content">
        <div class="firstshow">
          <h3>評論商品畫面</h3>
          <button class="closebutton" @click="closeCommet">X</button>
        </div>
        <div class="secondShow">
          <p>你的名字 : {{ user_name }}</p>
          <p for="starRating">Star：</p>
<div class="commentText">
  <p for="newCommentText">留言：</p>
  <input v-model="newCommentText" id="newCommentText" placeholder="添加留言" class="textEnter">
</div>
  <div class="star-rating">
    <span v-for="starIndex in 5" :key="starIndex">
      <i
        class="fas"
        :class="{ 'fa-star': starIndex < commentStars, 'fa-star-o': starIndex >= commentStars }"
        @click="setCommentStars(starIndex + 1)"
      ></i>
    </span>
  </div>

  <button @click="addProductComment" class="commitBtn">添加留言</button>
</div>



      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.comment-modal {
    /* 其他样式属性... */
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* 半透明的背景遮罩 */
    z-index: 999;

    .input-field {
      color: white;

    }
  }
  .modal-content {
    height: 50vh;
    width: 50vw;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .firstshow {
      display: flex;
      justify-content: space-between;

      .closebutton {
        width: 30px;
        /* 调整按钮的宽度 */
        height: 30px;
        /* 调整按钮的高度 */
        font-size: 20px;
        /* 设置字体大小 */
        color: #fff;
        /* 字体颜色 */
        background-color: #2196F3;
        /* 按钮蓝色 */
        border: none;
        border-radius: 50%;
        /* 将按钮形状设置为圆形 */
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        /* 移除点击时的边框 */
        transition: background-color 0.3s;
        /* 添加过渡效果 */

      }

      .closebutton:hover {
        background-color: #2196F3;
        /* 按钮蓝色 */
      }

    }

    .secondShow {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid rgb(255, 0, 0);
      height: 30vh;
      justify-content: center;

    }

    .button-group {
      position: fixed;
      bottom: 25%;
      right: 25%;
      margin: 20px;
      /* 距离边缘的距离，根据需要调整 */
    }

    .button-group button {
      padding: 10px 20px;
      background-color: #2196F3;
      /* 按钮蓝色 */
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
.nameRouter {
  text-decoration: none;
}

.actionPage {
  display: flex;
  width: 100vw;
  height: 170vh;
  border: 0px solid rgb(255, 0, 0);
}

.actionPageLeft {
  width: 15vw;
  height: 170vh;
  display: flex;
  flex-direction: column;
  background-color: #2c3e50;
  /* Stylish dark background color */

  .lefttHeader {
    height: 4vw;
    background-color: rgb(100, 119, 148);
    /* Slightly lighter shade */
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      color: #56b3ca;
      /* Light text color */
      margin: 0;
    }
  }

  .leftAdmin {
    background-color: #34495e;
    height: 42vw;
    flex-direction: column;
    display: flex;

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      color: #ecf0f1;
      background-color: #2c3e50;
      padding: 10px;
      margin: 10px auto;
      border-radius: 5px;
      text-decoration: none;
      text-align: center;

      &:hover {
        background-color: #1d2b3a;
        /* Darker shade on hover */
      }
    }
  }
}

.actionPageRight {
  width: 85vw;

  .RightHeader {
    height: 4vw;
    background-color: #bdc3c7;
    /* Light gray background color */

    .secondtitle2 {
      justify-content: space-between;
      display: flex;
      border: 0px solid #e74c3c;
      /* Border color */
      width: 82vw;
      height: 10vh;
      align-items: center;

      a {
        border-radius: 10px;
        padding: 5px;
        transition: all 0.5s ease;
        text-decoration: none;
        color: #34495e;
        /* Dark text color */

        &:hover {
          color: #e74c3c;
          /* Hover color */
          background-color: rgba(118, 118, 117, 0.5);
        }
      }
    }
  }

  .productManagement {
    background-color: #ecf0f1;
    height: 161vh;

    .productCreate {
      display: flex;
      justify-content: space-between;
      width: 83vw;
      padding: 20px;

      h1 {
        margin: 0;
        color: #3498db;
        /* 修改标题颜色 */
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        color: #ecf0f1;
        background-color: #2c3e50;
        /* 修改按钮颜色 */
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
        text-align: center;

        &:hover {
          background-color: #34495e;
          /* 修改按钮悬停颜色 */
        }
      }
    }

    .productAdmimList {
      height: 120vh;
      padding: 20px;
      border: 0px solid #e74c3c;

      .orderDetails {
        height: 55vh;
        border: 1px solid #808080;
        background-color: #fbfffc;
        transition: 0.5s;
        margin-bottom: 20px;
        /* 添加20px的底部间隔 */

        &:hover {
          box-shadow: 0 0 20px rgba(71, 227, 255, 0.8);
        }

        .orderDetailshead {
          border: 0px solid #e74c3c;
          margin: 10px;
          justify-content: space-around;
          display: flex;

          .orderDetailsheadleft {
            display: flex;
            width: 70vw;
            border: 0px solid #e74c3c;
          }

          .orderDetailsheadright {
            display: flex;
            justify-content: center;
            border-radius: 10px;
            width: 10vw;
            background-color: #2793ff;
            /* 修改右侧头部背景颜色 */
            color: rgb(255, 255, 255);
          }
        }

        .orderDetailsSecond {
          border: 1px solid #afafaf;
          height: 25vh;
          margin: 10px;
          overflow: auto;

          table {
            width: 100%;
            border-collapse: collapse;

            th,
            td {
              border: 1px solid #aaaaaa;
              /* 将 border 值更改为 1px，颜色为 #ddd */
              padding: 8px;
              text-align: left;
            }
          }
        }

        .orderDetailsThird {
          border: 1px solid #8e8e8e;
          width: 81.3vw;
          margin: 10px;
          height: 20vh;
          display: flex;
          justify-content: space-around;


          border: 0px solid rgb(255, 0, 0);
          display: flex;

          .orderInfo {
            border: 0px solid rgb(255, 0, 0);
            width: 54vw;
            margin: 2px;

            .orderInfo1 {
              border: 0px solid rgb(251, 0, 0);
              width: 15vw;
              margin: 2px;

            }

          }


          .orderInfo2 {
            border: 0px solid rgb(255, 0, 0);
            margin: 2px;

            .btn {
              border: 0px solid rgb(255, 0, 0);

              font-size: 12pt;
              width: 9vw;
              background-color: white;
              color: white;
              transition: 0.5s;
              position: relative;
              top: 70%;
              right: 10%;

              &:hover {
                background-color: #517a53;
              }
            }
          }

          .totalCount {
            border: 0px solid rgb(255, 0, 0);

            margin: 2px;
            padding: 2px;
            width: 17vw;
          }
        }
      }
    }
  }

}

.pagination-container {
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>