<script>
import axios from 'axios';

export default {
    data() {
        return {
            product: null,
            quantity: 1,
            selectedShipping: '', // Initially no option selected

        };
    },
    mounted() {
        this.fetchProductDetails();
    }, 
    computed: {
        getShippingFee() {
            // Compute and return the shipping fee based on the selected option
            switch (this.selectedShipping) {
                case '711':
                case 'family':
                case 'hilife':
                    return 60;
                case 'delivery':
                return 80;
                case 'cod':
                    return 100;
                default:
                    return 0; // Default to 0 if no option is selected
            }
        },
        getTotalAmount() {
      if (this.product) {
        return this.product.price * this.quantity;
      }
      return 0;
    },  
     getOrderAmount() {
      return this.getTotalAmount + this.getShippingFee;
    },
    },
    methods: {
        fetchProductDetails() {
            // 使用 this.$route.params.productId 获取路由中的 ID 参数
            const productId = this.$route.params.productId;
            console.log('productId:', productId);

            // 调用 API 获取商品详情
            axios.get(`http://localhost:8080/product/get/info?id=${productId}`)
                .then(response => {
                    this.product = response.data.product;
                    console.log('Fetched product:', this.product);
                })
                .catch(error => {
                    console.error('Error fetching product details:', error);
                });
        },
        decrementQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        incrementQuantity() {
            this.quantity++;
        },
    },
};
</script>
<template>
    <div class="mainshow">
        <div class="countAll">
            <div class="leftInfo">
                <div class="productsInfo">
                    <h3>XXX小舖</h3>

                    <div class="produtsrow" v-if="product">
                        <img :src="product.photo" alt="Product Image" class="product-image">
                        <div class="product-details">
                            <h4>{{ product.product_name }}</h4>
                            <p>{{ product.product_type }}</p>
                            <p>${{ product.price }}</p>
                        </div>
                        <div class="quantity">
                            <p>數量：</p>
                            <button @click="decrementQuantity">-</button>
                            <input v-model="quantity" type="number" min="1" />
                            <button @click="incrementQuantity">+</button>
                        </div>
                    </div>
                </div>

                <div class="ShippingInfo">
                    <h3>運費方式</h3>
        <label>
            <input type="radio" v-model="selectedShipping" value="711"> 7-11取貨$60
        </label>
        <label>
            <input type="radio" v-model="selectedShipping" value="family"> 全家取貨$60
        </label>
        <label>
            <input type="radio" v-model="selectedShipping" value="hilife"> 萊爾富取貨$60
        </label>
        <label>
            <input type="radio" v-model="selectedShipping" value="delivery"> 宅配/快遞$80
        </label>
        <label>
            <input type="radio" v-model="selectedShipping" value="cod"> 貨到付款$100
        </label>

                </div>

                <div class="payment" v-if="selectedShipping !== 'cod'">
                    <h3>付款方式</h3>
                    <input type="radio" >ATM轉帳
                    <input type="radio" >餘額付款
                    <input type="radio" >信用卡(一次付清)
                
                </div>
            </div>

            <div class="rightCount">
                <h3>商品總金額: ${{ getTotalAmount }}</h3>
                <h4>運費: ${{ getShippingFee }}</h4>
                <h2>訂單金額: ${{ getOrderAmount }}</h2>
                <router-link :to="'/UserPage/buyingList/'" class="Checkout">結帳</router-link>
            </div>
        </div>
    </div>
</template>
  
 
  
<style lang="scss" scoped>
.quantity {
  margin-top: 10px;
  display: flex;
  align-items: center;

  input {
    width: 60px;
    text-align: center;
  }

  p {
    margin-right: 10px;
  }

  button {
    border: 0;
  }
}

.mainshow {
  height: 100vh;
  background-color: #557475; /* Slightly muted background color */
  display: flex;
  justify-content: center;
  align-items: center;

  .countAll {
    height: 90vh;
    width: 90vw;
    border: 1px solid #ccc; /* Softer border color */
    display: flex;
    justify-content: space-around;
    border-radius: 10px;
    overflow: hidden;

    .leftInfo {
      height: 90vh;
      width: 60vw;
      border-right: 1px solid #ccc;
      justify-content: space-between;
      align-items: center;

      .productsInfo {
        height: 45vh;
        border-bottom: 1px solid #ccc;
        background-color: #f0f0f0; /* Lighter background color */
        overflow: hidden;
        margin-bottom: 10px;

        .produtsrow {
          display: flex;
          align-items: center;
          height: 15vh;
          background-color: #d0d0d0; /* Muted product row color */
          margin: 10px;

          .product-image {
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            margin-right: 10px;
            margin: 5px;
            border-radius: 5px;
          }

          .product-details {
            h4 {
              color: #333;
              font-size: 1.5rem;
              margin: 10px;
            }

            p {
              margin: 5px 0;
            }
          }
        }
      }

      .ShippingInfo {
        height: 24vh;
        background-color: #f0f0f0;
        overflow: hidden;
        margin-bottom: 10px;
      }

      .payment {
        height: 20vh;
        background-color: #f0f0f0;
        overflow: hidden;
      }
    }

    .rightCount {
      height: 50vh;
      width: 25vw;
      background-color: #e0e0e0;
      border-left: 1px solid #ccc;
      border-radius: 0 10px 10px 0;

      h3,
      h4,
      h2 {
        color: #333;
        margin: 10px;
      }

      .Checkout {
        display: block;
        text-align: center;
        padding: 10px;
        background-color: #4caf50;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      }
    }
  }
}
</style>

