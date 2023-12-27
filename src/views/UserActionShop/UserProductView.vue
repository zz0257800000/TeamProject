<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../../api/api.js";

const router = useRouter();

const { getProductInfoByUserId } = api;
const userId = sessionStorage.getItem("user_Id");
const productInfo = ref([]);

const turnToData = (name, id) => {
  router.push({
    name: "productData",
    params: {
      product: name,
      id: id,
    },
  });
};

onMounted(async () => {
  productInfo.value = await getProductInfoByUserId(userId);
  console.log(productInfo.value);
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
          <h3></h3>
          <h6>
            <RouterLink class="btn" to="/"> Home</RouterLink> >
            <a href="">報表及分析</a>
          </h6>
        </div>
      </div>

      <div class="productManagement">
        <div class="productCreate">
          <h1>產品列表</h1>
        </div>
        <div class="productAdmimList">
          <table>
            <thead>
              <tr>
                <th>商品編號</th>
                <th class="productPic">商品圖片</th>
                <th class="">產品分類</th>
                <th class="productTitle">名稱</th>
                <th>庫存</th>
                <th>售價</th>
                <th>銷售數量</th>
                <th>商品狀態</th>
                <th>上架時間</th>
                <th>銷售報表</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in productInfo" :key="index">
                <td>{{ product.product_id }}</td>
                <td>
                  <img
                    :src="product.photo"
                    alt="商品圖片"
                    class="card-img-top fixed-size-image"
                    @click="() => openImageModal(product)"
                  />
                </td>
                <td>{{ product.product_type }}</td>

                <td>{{ product.product_name }}</td>
                <td>{{ product.inventory }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.sale_count }}</td>
                <td :style="{ color: product.shelves ? 'green' : 'red' }">
                  {{ product.shelves ? "上架中" : "下架中" }}
                </td>

                <td>{{ product.upload_time }}</td>
                <!-- 這裡我們假設有一個 shelfTime 屬性 -->
                <td class="action-btns">
                  <span
                    class="link"
                    @click="
                      turnToData(product.product_name, product.product_id)
                    "
                    >詳細資料</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

  .productManagement {
    border: 0px solid rgb(255, 0, 0);

    height: 42vw;
    background-color: #f5f5f5;
    /* Light gray background color */
    height: 209.4vh;

    .productCreate {
      display: flex;
      justify-content: space-between;
      width: 83vw;
      padding: 20px;

      h1 {
        margin: 0;
        color: #37474f;
        /* Dark teal heading color */
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        color: #eceff1;
        /* Light text color */
        background-color: #263238;
        /* Dark teal */
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
        text-align: center;

        &:hover {
          background-color: #37474f;
          /* Dark teal on hover */
        }
      }
    }

    .productAdmimList {
      height: 39vw;
      padding: 20px;

      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      action-btns,
      td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        height: 30vh;
      }

      .productPic {
        width: 20vw;
      }

      .productTitle {
        width: 15vw;
      }

      th {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        background-color: #b0bec5;
        /* Light teal background color */
      }

      tr:hover {
        background-color: #e0e0e0;
        /* Lighter gray on hover */
      }

      .action-btns {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        /* Separate buttons vertically */
        align-items: center;
        border: 0px solid red;
        height: 40vh;

        .edit-btn,
        .delete-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 7vh;
          width: 5vw;
          padding: 5px 10px;
          cursor: pointer;
          background-color: #37474f;
          /* Dark teal */
          color: #eceff1;
          /* Light text color */
          border: none;
          border-radius: 4px;

          &:hover {
            filter: brightness(85%);
          }
        }

        .delete-btn {
          color: #263238;
          /* Darker teal color */
          background-color: #ef5350;
          /* Stylish red color */
        }
      }
    }
  }

  .link {
    padding: 0.2rem 0.5rem;
    transition: 0.3s ease;
    &:hover {
      background-color: #263238;
      color: #e0e0e0;
      cursor: pointer;
    }
  }
}
</style>
