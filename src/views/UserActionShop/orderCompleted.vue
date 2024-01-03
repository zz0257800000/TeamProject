<script>
import axios from 'axios'; // 記得這行要加上
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      currentPage: 1,
      perPage: 2, // 每頁顯示的商品數量
      record: {},
      userId: '', // Add userId to data
      recordList: [],
      startDate: '',
      endDate: '',
      userInfo: null,

    };
  },
  mounted() {
    this.userId = sessionStorage.getItem('user_Id');
    this.fetchData();
    this.showUserInfo();


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

    showUserInfo(record) {
  // Check if the record has a valid user_id
  if (!record || !record.user_id) {
    console.error('Invalid user ID');
    return;
  }

  const buyId = record.user_id;

  axios.get(`http://localhost:8080/user/info?id=${buyId}`)
    .then(response => {
      console.log(response.data);
      const userData = response.data.user;
      this.previewImage = `data:image/jpeg;base64,${response.data.user.userPhoto}`;
      // console.log('previewImage:', this.previewImage);
      Swal.fire({
        title: '此買家帳號資料',
        html: `
        <p>買家ID: ${userData.id}</p>
          <p>買家姓名: ${userData.name}</p>
          <p>買家電話: ${userData.phone_number}</p>
          <p>買家郵箱: ${userData.email}</p>
          <img src="${this.previewImage}" alt="User Image" style="max-width: 100%; max-height: 200px;"/>

        `,
        confirmButtonText: 'Close',
      });
    })
    .catch(error => {
      console.error('Error fetching user info:', error);
      alert('此用戶不存在');
    });
},
    fetchRecord() {
      const userId = this.userId;
      const apiUrl = `http://localhost:8080/record/get/seller_id?id=${userId}`;

      axios.get(apiUrl)
        .then(response => {
          console.log('API Response:', response.data);
          this.recordList = response.data.recordList.filter(record => record.status === '已完成');
          // this.fetchRecord();

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
        <RouterLink class="btn" to="/UserPage/actionShop"><i class="fa-solid fa-wrench"></i>  &nbsp;產品管理</RouterLink>
        <RouterLink class="btn" to="/UserActionShop/bidOrder/"><i class="fa-solid fa-bars-staggered"></i> &nbsp; 銷售訂單
        </RouterLink>
        <RouterLink class="btn" to="/UserActionShop/shippedOder/"><i class="fa-solid fa-truck"></i>  &nbsp;出貨訂單</RouterLink>
        <RouterLink class="btn" to="/UserActionShop/orderCompleted/"><i class="fa-solid fa-flag-checkered"></i>  &nbsp;完成訂單
        </RouterLink>
        <RouterLink class="btn" to="/UserActionShop/cancelBid/"><i class="fa-regular fa-rectangle-xmark"></i> &nbsp; 取消訂單
        </RouterLink>


      </div>

    </div>

    <div class="actionPageRight">
      <div class="RightHeader">
        <!-- <div class="dateSearch" >
    <label for="startDate">開始日期:</label>
    <input type="date" id="startDate" v-model="startDate">

    <label for="endDate">結束日期:</label>
    <input type="date" id="endDate" v-model="endDate">

    <button @click="searchByDate" class="searchBtn">搜尋</button>

  </div> -->
        <div class="secondtitle2">
          <h3>
          </h3>
          <h6>
            <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">完成訂單</a>
          </h6>

        </div>

      </div>

      <div class="productManagement">
        <div class="productCreate">
          <h1>完成訂單
          </h1>
        </div>
        <div class="productAdmimList">
          <div class="orderDetails" v-for="(record, recordIndex) in paginatedProducts" :key="recordIndex">
            <!-- 订单信息 -->
            <div class="orderDetailshead">
              <div class="orderDetailsheadleft">
                <h4>訂單編號 : {{ record.record_id }} &nbsp; </h4>
                <h4 @click="showUserInfo(record)" style="color: rgb(68, 153, 192); font-weight: bold; ">買家帳號ID: {{ record.user_id }} &nbsp;</h4>

                <h4 :style="{ color: record.status === '準備中' ? 'green' : (record.status === '出貨中' ? 'red' : 'black') }">
                  訂單狀態 : {{ record.status }} &nbsp;
                </h4>
              </div>
              <div class="orderDetailsheadright">
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

                <RouterLink class="btn" to="/"> </RouterLink>

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
    background-color: #f5f5f5;
    height: 161vh;

    .productCreate {
      display: flex;
      justify-content: space-between;
      width: 83vw;
      padding: 20px;

      h1 {
        margin: 0;
        color: #37474f;
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
            background-color: #fbfffc;
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
              background-color: #fbfffc;
              color: white;
              transition: 0.5s;
              position: relative;
              top: 70%;
              right: 10%;

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