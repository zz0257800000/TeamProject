<script>
export default {
  data() {
    return {
      products: [
        { name: '商品1', category: '分類A', price: '$50.00' },
        { name: '商品2', category: '分類B', price: '$40.00' },
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
        <h1>你的賣場管理</h1>
      </div>
      
      <div class="leftAdmin">
        
        <RouterLink class="btn" to="/"><i class="fa-solid fa-wrench"></i> 產品管理</RouterLink>
        <RouterLink class="btn" to="/"><i class="fa-solid fa-bars-staggered"></i> 訂單管理</RouterLink>
        <RouterLink class="btn" to="/"><i class="fa-solid fa-envelope-open"></i> 訊息中心</RouterLink>
        <RouterLink class="btn" to="/"><i class="fa-solid fa-chart-line"></i> 報表及分析</RouterLink>
        <RouterLink class="btn" to="/"><i class="fa-solid fa-gear"></i> 設定</RouterLink>

      </div>

    </div>

    <div class="actionPageRight">
      <div class="RightHeader">


      </div>

      <div class="productManagement">
        <div class="productCreate">
          <h1>產品管理</h1>
          <RouterLink class="btn" to="/UserPage/addNewProduct">添加新產品</RouterLink>
        </div>
        <div class="productAdmimList">
          <table>
            <thead>
              <tr>
                <th>商品圖片</th>
                <th>名稱</th>
                <th>分類</th>
                <th>售價</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td>{{ }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.price }}</td>
                <td class="action-btns">
                  <button class="edit-btn" @click="editProduct(index)">編輯</button>
                  <button class="delete-btn" @click="deleteProduct(index)">刪除</button>
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

}

.actionPageLeft {
  width: 20vw;
  display: flex;
  flex-direction: column;
  background-color: rgb(243, 243, 243);

  .lefttHeader {
    height: 4vw;
    background-color: rgb(156, 156, 156);
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      color: white;
      margin: 0;
    }
  }

  .leftAdmin {
    background-color: rgb(243, 243, 243);
    height: 42vw;
    flex-direction: column;
    display: flex;

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80%;
      color: white;
      background-color: black;
      padding: 10px;
      margin: 10px auto;
      border-radius: 5px;
      text-decoration: none;
      text-align: center;

      &:hover {
        background-color: #333;
      }
    }
  }
}

.actionPageRight {
  width: 80vw;

  .RightHeader {
    height: 4vw;
    background-color: rgb(209, 209, 209);
  }

  .productManagement {
    height: 42vw;
    background-color: rgb(231, 231, 231);
    height: 170vh;

    .productCreate {
      display: flex;
      justify-content: space-between;
      width: 75vw;
      padding: 20px;

      h1 {
        margin: 0;
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        color: white;
        background-color: black;
        padding: 10px;
        border-radius: 5px;
        text-decoration: none;
        text-align: center;

        &:hover {
          background-color: #333;
        }
      }
    }

    .productAdmimList {
      height: 39vw;
      padding: 20px;
      height: 170vh;

      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }

      td {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        height: 30vh;
      }

      th {
        border: 1px solid #ddd;
        padding: 10px;
        text-align: left;
        background-color: #acacac;
      }

      tr:hover {
        background-color: #f5f5f5;
      }

      .action-btns {
        display: flex;
        justify-content: space-around;

        .edit-btn,
        .delete-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 7vh;
          width: 5vw;
          padding: 5px 10px;
          cursor: pointer;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;

          &:hover {
            filter: brightness(85%);
          }
        }

        .delete-btn {
          background-color: #f44336;
        }
      }
    }
  }
}

</style>