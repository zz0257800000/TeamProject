<!-- //recordList -->

<script>
import axios from 'axios'; // 記得這行要加上
import Swal from "sweetalert2";

export default {
  props: {
  },
  data() {
    return {
      currentPage: 1,
      perPage: 2, // 每頁顯示的商品數量
      record: {},
      userId: '', // Add userId to data
      recordList: [],

    };
  },
  mounted() {
    this.userId = sessionStorage.getItem('user_Id');
    this.fetchData();


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
    
    fetchRecord() {
      const userId = this.userId;
      const apiUrl = `http://localhost:8080/record/get/seller_id?id=${userId}`;

      axios.get(apiUrl)
        .then(response => {
          console.log('API Response:', response.data);
          this.recordList = response.data.recordList.filter(record => record.status === '準備中');
          console.log('Record List Length:', this.recordList.length); // 添加这行打印语句

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

    cancelOrder(record_id) {
      // 弹出确认对话框
      this.showAlert("確認取消訂單", "你確定要取消訂單嗎？", (result) => {
        // 用户点击确认后，result 是 true，执行实际的取消交易操作
        if (result) {
          // 调用取消订单的 API
          axios.post(`http://localhost:8080/record/cancel?id=${record_id}`)
            .then(response => {
              // 处理 API 调用成功的情况
              console.log(response.data);

              // 在取消交易后调用 showAlert2，并传递成功提示
              this.showAlert2("取消訂單成功");

              // 刷新数据或执行其他操作...
              this.fetchData();
            })
            .catch(error => {
              // 处理 API 调用失败的情况
              console.error('Error cancelling order:', error);
            });
        }
      });
    },
    showAlert(title, text, confirmCallback) {
      Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確認",
        cancelButtonText: "取消"
      }).then((result) => {
        // 将用户的确认结果传递给回调函数
        if (confirmCallback && typeof confirmCallback === 'function') {
          confirmCallback(result.isConfirmed);
        }
      });
    },
    showAlert2(message) {
      Swal.fire({
        title: "確認",
        text: message,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "確認"
      });
    },
    shipOrder(record_id) {
      // 弹出确认对话框
      this.showAlert1("確認要出貨嗎？", (result) => {
        // 用户点击确认后，result 是 true，执行实际的出货操作
        if (result) {
          // 调用将订单状态改为已出货的 API
          axios.post(`http://localhost:8080/record/shipping?id=${record_id}`)
            .then(response => {
              // 处理 API 调用成功的情况
              console.log(response.data);

              // 弹出成功提示
              this.showAlert2("出貨成功");

              // 刷新数据或执行其他操作...
            })
            .catch(error => {
              // 处理 API 调用失败的情况
              console.error('Error shipping order:', error);
            });
        }
      });
    },
    showAlert1(message, callback) {
      Swal.fire({
        title: "確認",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "確認",
        cancelButtonText: "取消"
      }).then((result) => {
        // 将用户的确认结果传递给回调函数
        callback(result.isConfirmed);
      });
    },
    showAlert2(message) {
      Swal.fire({
        title: "確認",
        text: message,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "確認"
      });
    },

  },
};
</script>
<template>

  <div class="actionPage">
    <div class="actionPageLeft">
      <div class="lefttHeader">
        <h2>我的拍賣</h2>
      </div>

      <div class="leftAdmin">
        <RouterLink class="btn" to="/UserPage/actionShop"><i class="fa-solid fa-wrench"></i> 產品管理</RouterLink>
        <RouterLink class="btn" to="/UserActionShop/bidOrder/"><i class="fa-solid fa-bars-staggered"></i> 銷售訂單
        </RouterLink>
        <RouterLink class="btn" to="/UserActionShop/shippedOder/"><i class="fa-solid fa-truck"></i>出貨訂單</RouterLink>
        <RouterLink class="btn" to="/UserActionShop/orderCompleted/"><i class="fa-solid fa-flag-checkered"></i>完成訂單
        </RouterLink>
        <RouterLink class="btn" to="/UserActionShop/cancelBid/"><i class="fa-regular fa-rectangle-xmark"></i> &nbsp; 取消訂單
        </RouterLink>


      </div>

    </div>

    <div class="actionPageRight">
      <div class="RightHeader">
        <div class="secondtitle2">
          <h3>
          </h3>
          <h6>
            <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">銷售訂單</a>
          </h6>

        </div>

      </div>

      <div class="productManagement">
        <div class="productCreate">
          <h1>銷售訂單
          </h1>
        </div>
        <div class="productAdmimList">
          <div class="orderDetails" v-for="(record, recordIndex) in paginatedProducts" :key="recordIndex">
            <!-- 订单信息 -->
            <div class="orderDetailshead">
              <div class="orderDetailsheadleft">
                <h4>訂單編號 : {{ record.record_id }} &nbsp; </h4>
                <h4>買家帳號 :<router-link :to="'/UserPage/sellerStore/' + record.seller_id" class="nameRouter"
                    title="前往賣家賣場">
                    {{ record.seller_name }}</router-link> &nbsp; </h4>
                <h4 :style="{ color: record.status === '準備中' ? 'green' : (record.status === '出貨中' ? 'red' : 'black') }">
                  訂單狀態 : {{ record.status }} &nbsp;
                </h4>
              </div>
              <div class="orderDetailsheadright">
                <button class="btn" @click="cancelOrder(record.record_id)">取消交易</button>
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

                <RouterLink class="btn" to="" @click="shipOrder(record.record_id)"> 出貨</RouterLink>

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

  </div>
</template>
<style lang="scss" scoped>
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
  display: flex;
  flex-direction: column;
  background-color: #37474f;
  /* Dark teal background color */
  height: 170vh;

  .lefttHeader {
    height: 4vw;
    background-color: #3b4c53;
    /* Teal background color */
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      color: #eceff1;
      /* Light text color */
      margin: 0;
    }
  }

  .leftAdmin {
    background-color: #546e7a;
    /* Teal background color */
    height: 42vw;
    flex-direction: column;
    display: flex;

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      color: #eceff1;
      /* Light text color */
      background-color: #263238;
      /* Darker teal */
      padding: 10px;
      margin: 10px auto;
      border-radius: 5px;
      text-decoration: none;
      text-align: center;

      &:hover {
        background-color: #37474f;
        /* Dark teal on hover */
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
    background-color: #c8d5d8;
    height: 161vh;

    .productCreate {
      display: flex;
      justify-content: space-between;
      width: 83vw;
      padding: 20px;

      h1 {
        margin: 0;
        color: #000000;
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
          box-shadow: 0 0 20px rgba(65, 65, 65, 0.8);
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
            background-color: #e74c3c;
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
            width: 40vw;
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
              background-color: #ff6c22;
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