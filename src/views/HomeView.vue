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
          productName:[
            "黑/白色素T",
            "紅色素T",
            "灰色素T",
            "粉色素T"
          ],
          productPrice:[
            "200","250","200","180"
          ],

        }
      }
    }
</script>

<template>
  <div class="mainshow">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../../public/stock1.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../../public/stock1.jpg" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../../public/stock1.jpg" class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    
    <div class="productAll">
      <div class="product" style="width: 18rem ; height:18rem;" v-for="(item, index) in productArr" :key="index">
        <RouterLink class="btn" to="UserPage/productPage">
          <img :src="item" class="card-img-top" alt="...">
          <p class="productName">{{ productName[index] }}</p>
          <p class="productPrice">{{ productPrice[index] }}</p>
        </RouterLink>
        <div class="product-body"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mainshow {
  position: relative;
  border: 0px solid rgb(255, 0, 0);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255); /* 添加背景颜色 */

.carousel{
  width: 70vw;
  
  margin-bottom: 20px;
  background-color: aqua;
}
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
    .productName{
      margin-top: 10px;
    }

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
