<script>
import axios from 'axios'; // 記得這行要加上
import Swal from "sweetalert2";

export default {
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
    // 修改 fetchProductDetails 方法


    fetchRecord() {
      const userId = this.userId;
      const apiUrl = `http://localhost:8080/record/get/user_id?id=${userId}`;

      axios.get(apiUrl)
        .then(response => {
          console.log('API Response:', response.data);
          this.recordList = response.data.recordList.filter(record => record.status === '出貨中');
          sessionStorage.setItem("UsershippingList",JSON.stringify(this.recordList.length));

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
    completeOrder(record_id) {
    // 弹出确认对话框
    this.showAlert("確認收貨成功", (result) => {
        // 用户点击确认后，result 是 true，执行实际的确认收货操作
        if (result) {
            // 调用将订单状态改为已完成的 API
            axios.post(`http://localhost:8080/record/completed?id=${record_id}`)
                .then(response => {
                    // 处理 API 调用成功的情况
                    console.log(response.data);

                    // 在确认收货后调用 showAlert2，并传递成功提示
                    this.showAlert2("確認收貨成功");

                    // 刷新数据或执行其他操作...
                    this.fetchRecord();
                })
                .catch(error => {
                    // 处理 API 调用失败的情况
                    console.error('Error completing order:', error);
                });
        }
    });
},
showAlert(message, confirmCallback) {
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
      }).then(() => {
      // 关闭弹窗后重新加载页面
      location.reload();
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
            <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">待收貨</a>
          </h6>

        </div>

      </div>

      <div class="productManagement">
        <div class="productCreate">
          <h1>待收貨
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
                <button class="btn" @click="cancelOrder"></button>
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

                <RouterLink class="btn" to="" @click="completeOrder(record.record_id)" > 確認收貨</RouterLink>

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
            background-color: #ffffff;
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