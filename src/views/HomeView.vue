<script setup>
import navbar from '../components/navbar.vue';
</script>

<template>

  <div class="mainshow">
    
    <div class="productAll">
      <div class="product">

      </div>
      <div class="product">

      </div>
      <div class="product">

      </div>
    </div>
  </div>
  <div id="scrollToTopBtn" onclick="scrollToTop()">↑</div>

</template>
<style lang="scss" scoped>
.mainshow {
  border: 1px solid rgb(255, 0, 0);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255); /* 添加背景颜色 */

  .mainshow {
   
  position: relative;
}

.productAll {

  border: 1px solid #ddd;
  height: 85vh;
  width: 70vw;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: rgb(0, 0, 0);
  overflow: hidden;

  .product {
    height: 40vh; /* 调整为适当的高度，以确保九宫格布局 */
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
      height: 60%;
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
#scrollToTopBtn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: #007bff;
  color: #fff;
  font-size: 24px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  border-radius: 50%;
  display: none; /* Initially hidden */
  /* Add additional styles for the button as needed */
}
</style>
