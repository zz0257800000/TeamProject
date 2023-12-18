
  
  <script>
  export default {
    data() {
      return {
      
      };
    },
    methods: {
     
    },
  };
  </script>
  <template>
     <div class="mainshow">
        <div class="sellinfo">
      <div class="sellinfHeader">
<h3>賣場資訊</h3>
</div>
<h4>賣家id：          <router-link :to="'/UserPage/sellerStore/' " class="productPageRoutBtn" title="前往賣家賣場"> 1</router-link>
</h4>

<h4>全部商品：</h4>
<h4>賣場評價：</h4>

</div>
<div class="productsShow">

</div>

     </div>
  </template>
  <style scoped>
.mainshow {
  display: flex;
  width: 100vw;
  height: 115vh;
  border: 2px solid rgb(255, 0, 0);
  background-color: rgb(148, 148, 148);
  .sellinfo{
  width: 15vw; /* 設置正方形橫條的寬度 */
    height: 30vh; /* 設置正方形橫條的高度 */
  border: 1px solid #ff0000; /* 添加邊框效果，可以根據需要進行調整 */
top: 4%;
left: 1%;
position: relative;
background-color: rgb(225, 225, 225);
.sellinfHeader{
  background-color: rgb(104, 104, 104);
  height: 7vh; /* 設置正方形橫條的高度 */
  display: flex;
align-items: center;
left: 5%;


}

}

.productsShow{
    border: 1px solid #ff0000; /* 添加邊框效果，可以根據需要進行調整 */
    width: 80vw; /* 設置正方形橫條的寬度 */
    height: 95vh; /* 設置正方形橫條的高度 */
    top: 4%;
left: 3%;
background-color: rgb(104, 104, 104);

position: relative;
}
}
  </style>
  