<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import Chart from "chart.js/auto";
import api from "../../api/api.js";

const route = useRoute();

const { getRecordInfoByProductId } = api;
const recordData = ref([]);

onMounted(async () => {
  //取得產品id
  const id = route.params.id;
  recordData.value = await getRecordInfoByProductId(id);

  //設定資料

  //銷售日期

  //銷售數量
  const salesData = [];
  recordData.value.forEach((item) => {
    salesData.push(item.product_count);
  });
  console.log(salesData);

  //繪製統計圖表
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ],
      datasets: [
        {
          label: "# of Votes",
          data: salesData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
});
</script>

<template>
  <div class="body">
    <div class="actionPageLeft">
      <div class="lefttHeader">
        <h2>報表及分析</h2>
      </div>

      <div class="leftAdmin">
        <RouterLink class="btn" to="/UserPage/actionShop"
          ><i class="fa-solid fa-wrench"></i> 產品管理</RouterLink
        >
        <RouterLink class="btn" to="/UserActionShop/bidOrder/"
          ><i class="fa-solid fa-bars-staggered"></i> 銷售訂單</RouterLink
        >
        <RouterLink class="btn" to="/UserActionShop/shippedOder/"
          ><i class="fa-solid fa-truck"></i>出貨訂單</RouterLink
        >
        <RouterLink class="btn" to="/UserActionShop/orderCompleted/"
          ><i class="fa-solid fa-flag-checkered"></i>完成訂單</RouterLink
        >
        <RouterLink class="btn" to="/UserActionShop/cancelBid/"
          ><i class="fa-regular fa-rectangle-xmark"></i> &nbsp; 取消訂單
        </RouterLink>

        <RouterLink class="btn" to="/UserProduct"
          ><i class="fa-solid fa-chart-line"></i> 報表及分析</RouterLink
        >
        <RouterLink class="btn" to=""
          ><i class="fa-solid fa-gear"></i> 設定</RouterLink
        >
      </div>
    </div>

    <div class="actionPageRight">
      <div class="RightHeader">
        <div class="secondtitle2">
          <h3>報表及分析</h3>
          <h6>
            <RouterLink class="btn" to="/"> Home</RouterLink> >
            <a href="">報表及分析</a>
          </h6>
        </div>
      </div>
      <div class="chart">
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  </div>
  {{ recordData }}
</template>

<style lang="scss" scoped>
.chart {
  width: 1200px;
  height: 600px;
}
.body {
  display: flex;
  .actionPageLeft {
    width: 15vw;
    display: flex;
    flex-direction: column;
    background-color: #37474f;
    /* Dark teal background color */
    height: 218vh;

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

  .productBox {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  .productBar {
    display: table-row;
  }

  .productBar table {
    width: 100%;
    border-collapse: collapse;
  }

  .productBar table td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  .productBar table td:first-child {
    width: 5%; /* 調整第一列的寬度 */
  }

  .productBar table td:nth-child(2) {
    width: 20%; /* 調整商品圖片列的寬度 */
  }
  .actionPageRight {
    display: flex;
    flex-direction: column;
    .RightHeader {
      height: 4vw;
      background-color: #bdbdbd;

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
          color: #37474f;
          /* Dark teal text color */

          &:hover {
            color: #e74c3c;
            /* Hover color */
            background-color: rgba(118, 118, 117, 0.5);
          }
        }
      }
    }
  }
}
</style>
