<script>
export default {
  data() {
    return {
      products: [
        { name: '商品1', category: '分類A', price: '$50.00', shelfTime: '2023-12-10' },
        { name: '商品2', category: '分類B', price: '$40.00', shelfTime: '2023-12-11' },
        // 添加更多商品數據
      ]
    };
  },
  methods: {
    editProduct(index) {
      // 添加編輯商品的邏輯
      console.log('Edit product:', this.products[index]);
    },
    deleteProduct(index) {
      // 添加刪除商品的邏輯
      this.products.splice(index, 1);
    }
  },
};
</script>
<template>
  <div class="actionPage">
    <div class="actionPageLeft">
      <div class="lefttHeader">
        <h1>你的購買清單</h1>
      </div>

      <div class="leftAdmin">

        <RouterLink class="btn" to="/UserPage/buyingList"><i class="fa-solid fa-bars-staggered"></i> &nbsp;購買清單
        </RouterLink>
        <RouterLink class="btn" to=""><i class="fa-solid fa-heart"></i> &nbsp; 收藏 </RouterLink>

        <RouterLink class="btn" to=""><i class="fa-solid fa-envelope-open"></i> &nbsp;訂單已完成</RouterLink>

        <RouterLink class="btn" to=""><i class="fa-solid fa-chart-line"></i> &nbsp;報表及分析</RouterLink>
        <RouterLink class="btn" to=""><i class="fa-solid fa-gear"></i> &nbsp;設定</RouterLink>

      </div>

    </div>

    <div class="actionPageRight">
      <div class="RightHeader">
        <div class="secondtitle2">
          <h3>
          </h3>
          <h6>
            <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">購買清單</a>
          </h6>

        </div>

      </div>

      <div class="productManagement">
        <div class="productCreate">
          <h1>購買清單</h1>
          <RouterLink class="btn" to="/">繼續購物</RouterLink>
        </div>
        <div class="productAdmimList">
          <table>
            <thead>
              <tr>
                <th class="productPic">商品圖片</th>
                <th class="productTitle">名稱</th>
                <th>分類</th>
                <th>售價</th>
                <th>上架時間</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td>{{ }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.shelfTime }}</td> <!-- Display the shelf time -->

                <td class="action-btns">
                  <button class="delete-btn" @click="deleteProduct(index)">取消訂單</button>
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
.actionPage {
  display: flex;
  width: 100vw;
  height: 170vh;
  border: 0px solid rgb(255, 0, 0);
}

.actionPageLeft {
  width: 20vw;
  height: 170vh;
  display: flex;
  flex-direction: column;
  background-color: #2c3e50; /* Stylish dark background color */

  .lefttHeader {
    height: 4vw;
    background-color: rgb(100, 119, 148); /* Slightly lighter shade */
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      color: #56b3ca; /* Light text color */
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
        background-color: #1d2b3a; /* Darker shade on hover */
      }
    }
  }
}

.actionPageRight {
  width: 80vw;

  .RightHeader {
    height: 4vw;
    background-color: #bdc3c7; /* Light gray background color */

    .secondtitle2 {
      justify-content: space-between;
      display: flex;
      border: 0px solid #e74c3c; /* Border color */
      width: 75vw;
      height: 10vh;
      align-items: center;

      a {
        border-radius: 10px;
        padding: 5px;
        transition: all 0.5s ease;
        text-decoration: none;
        color: #34495e; /* Dark text color */

        &:hover {
          color: #e74c3c; /* Hover color */
          background-color: rgba(118, 118, 117, 0.5);
        }
      }
    }
  }

  .productManagement {
    height: 42vw;
    background-color: #ecf0f1; /* Light background color */
    height: 161vh;

    .productCreate {
      display: flex;
      justify-content: space-between;
      width: 78vw;
      padding: 20px;

      h1 {
        margin: 0;
        color: #2c3e50; /* Dark heading color */
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        color: #ecf0f1;
        background-color: #3498db; /* Stylish blue color */
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
        text-align: center;

        &:hover {
          background-color: #2980b9; /* Darker blue on hover */
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

      td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        height: 35vh;
        width: 7vw;
      }

      .productPic {
        width: 25vw;
      }

      .productTitle {
        width: 25vw;
      }

      th {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        background-color: #bdc3c7;
      }

      tr:hover {
        background-color: #ecf0f1;
      }

      .action-btns {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;

        .edit-btn,
        .delete-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 7vh;
          width: 5vw;
          padding: 5px 10px;
          cursor: pointer;
          color: #ecf0f1;
          border: none;
          border-radius: 4px;

          &:hover {
            filter: brightness(85%);
          }
        }

        .delete-btn {
          background-color: #f44336; /* Stylish red color */
        }
      }
    }
  }
}
</style>
