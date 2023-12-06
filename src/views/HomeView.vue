<script>
export default{
    data() {
        return {
          productArr:[
          "../../public/clothes1.jpg",
          "../../public/clothes2.jpg",
          "../../public/clothes3.jpg",
          "../../public/clothes4.jpg",
          1,2,3,4,5,6,7,8,
          ],

        }
      }
    }
</script>

<template>

  <div class="mainshow">
    
    <div class="productAll">
      <div class="product" style="width: 18rem ; height:20rem;" v-for="item in productArr">
        <RouterLink class="btn" to="UserPage/productPage">
        <img :src="item" class="card-img-top" alt="..."></RouterLink>
      </div>
<!--       
      <div class="product">
      </div>

      <div class="product">
      </div> -->
    </div>
  </div>

</template>
<style lang="scss" scoped>
.mainshow {
  position: relative;
  border: 0px solid rgb(255, 0, 0);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255); /* 添加背景颜色 */

.productAll {
  border: 1px solid #ddd;
  width: 70vw;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgb(0, 0, 0);
  overflow: hidden;

  .product {
    height: 30vh; /* 调整为适当的高度，以确保九宫格布局 */
    width: 20vw; /* 调整为适当的宽度，以确保九宫格布局 */
    margin: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }

    img {
      width: 100%;
      // height: 60%;
      object-fit: cover;
      border-radius: 8px;
    }

    h3 {
      margin: 10px 0;
      font-size: 1.2rem;
      color: #fff;
    }

    p {
      color: #ccc;
    }
  }
}
}

</style>
