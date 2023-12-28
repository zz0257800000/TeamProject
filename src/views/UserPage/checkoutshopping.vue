<script>
import axios from 'axios';

export default {
    data() {
        return {
            product: null,
            quantity: 1,
            selectedShipping: '', // Initially no option selected
            paymentMethod: '', // Add a payment method property
            remarksColumn: '',
            recipientName: '',
            recipientPhone: '',
            recipientAddress: '',
        };
    },
    mounted() {
        this.fetchProductDetails();
        this.userId = sessionStorage.getItem('user_Id');  // Get user_Id from sessionStorage
        this.remittance_title = sessionStorage.getItem('remittance_title');  // Get user_Id from sessionStorage
        this.remittance_number = sessionStorage.getItem('remittance_number');  // Get user_Id from sessionStorage

    },
    computed: {
        getShippingFee() {
            // Compute and return the shipping fee based on the selected option
            switch (this.selectedShipping) {
                case '7-11取貨':
                case '全家取貨':
                case '萊爾富取貨':
                    return 60;
                case '宅配':
                    return 80;
                case '貨到付款':
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
        submitOrder() {
            // 檢查是否所有必填項目都已經填寫
            if (!this.product || !this.recipientName || !this.recipientPhone || !this.recipientAddress || !this.selectedShipping) {
                alert('請填寫所有必填項目');
                return;

            }
            // 获取当前时间并格式化
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');

            const orderData = {
                user_id: this.userId,  // Use the userId property
                product_id: this.product.productId,  // 使用 this.product.product_id
                product_name: this.product.product_name,
                product_count: this.quantity,
                consumer_name: this.recipientName,
                consumer_address: this.recipientAddress,
                consumer_phone: this.recipientPhone,
                shipping_method: this.selectedShipping,
                shipping_cost: this.getShippingFee,
                payment_method: this.paymentMethod,
                remittance_title: this.remittance_title,
                remittance_number: this.remittance_number,
                remarks_column: this.remarksColumn,
                product_amount: this.getOrderAmount,
                record_date: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
                status: "準備中",
                valid: true,
                seller_id: this.product.user_id,
                seller_name: this.product.seller_name,

            };
            console.log('Success:', orderData);

            fetch('http://localhost:8080/record/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Success:', data);
                    // 處理成功響應
                })
                .catch(error => {
                    console.error('Error:', error);
                    // 處理錯誤
                });
            this.$router.push('/UserPage/buyingList');
            


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
                <div class="RecipientInformation">
                    <label>
                        收件人:<input type="input" v-model="recipientName">
                    </label>
                    <label>
                        電話:<input type="input" v-model="recipientPhone">
                    </label>
                    <label>
                        地址:<input type="input" v-model="recipientAddress">
                    </label>
                </div>
                <div class="ShippingInfo">
                    <h3>運費方式</h3>
                    <label>
                        <input type="radio" v-model="selectedShipping" value="7-11取貨"> 7-11取貨$60
                    </label>
                    <label>
                        <input type="radio" v-model="selectedShipping" value="全家取貨"> 全家取貨$60
                    </label>
                    <label>
                        <input type="radio" v-model="selectedShipping" value="萊爾富取貨"> 萊爾富取貨$60
                    </label>
                    <label>
                        <input type="radio" v-model="selectedShipping" value="宅配"> 宅配/快遞$80
                    </label>
                    <label>
                        <input type="radio" v-model="selectedShipping" value="貨到付款"> 貨到付款$100
                    </label>

                </div>

                <div class="payment" v-if="selectedShipping !== '貨到付款'">
                    <h3>付款方式</h3>

                    <label>
                        <input type="radio" v-model="paymentMethod" value="ATM轉帳">ATM轉帳
                    </label>

                    <label>
                        <input type="radio" v-model="paymentMethod" value="餘額付款">餘額付款
                    </label>

                    <label>
                        <input type="radio" v-model="paymentMethod" value="信用卡(一次付清)">信用卡(一次付清)
                    </label>
                </div>
                <div class="remarksColumnInfo">
                    <label>
                        備註:<input type="input" v-model="remarksColumn">
                    </label>
                </div>
            </div>

            <div class="rightCount">
                <h3>商品總金額: ${{ getTotalAmount }}</h3>
                <h4>運費: ${{ getShippingFee }}</h4>
                <h2>訂單金額: ${{ getOrderAmount }}</h2>
                <router-link :to="''" class="Checkout" @click="submitOrder">結帳</router-link>
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
    height: 150vh;
    background-color: #557475;
    /* Slightly muted background color */
    display: flex;
    justify-content: center;
    align-items: center;

    .countAll {
        height: 140vh;
        width: 90vw;
        border: 1px solid #ccc;
        /* Softer border color */
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
                background-color: #f0f0f0;
                /* Lighter background color */
                overflow: hidden;
                margin-bottom: 10px;

                .produtsrow {
                    display: flex;
                    align-items: center;
                    height: 15vh;
                    background-color: #d0d0d0;
                    /* Muted product row color */
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

            .RecipientInformation {
                height: 24vh;
                background-color: #f0f0f0;
                overflow: hidden;
                margin-bottom: 10px;
            }

            .ShippingInfo {
                height: 24vh;
                background-color: #f0f0f0;
                overflow: hidden;
                margin-bottom: 10px;
            }

            .payment {
                height: 15vh;
                background-color: #f0f0f0;
                overflow: hidden;
            }

            .remarksColumnInfo {
                height: 8vh;
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

