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

            userId: sessionStorage.getItem('user_Id'),
            cartList:[],
        };
    },
    mounted() {
        this.fetchProductDetails();
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
            if (this.product && this.product.length > 0) {
                return this.product.reduce((total, item) => {
                    return total + (item.cart_amount * item.cart_count);
                }, 0);
            }
            return 0;
        },
        getOrderAmount() {
            return this.getTotalAmount + this.getShippingFee;
        },
    },
    methods: {
        // 調用 API 獲取商品列表
        fetchProductDetails() {
            fetch(`http://localhost:8080/cart/get/user_id?id=${this.userId}`)
                .then(response => response.json())
                .then(data => {
                    this.product = data.cartList;
                    this.quantity = data.cartList.cart_count})
                .catch(error => console.error('获取数据时出错:', error));
        },

        //控制各品項數量
        // decrementQuantity(item) {
        //     if (item.cart_count > 1) {
        //         item.cart_count--;
        //     }
        // },
        // incrementQuantity(item) {
        //     item.cart_count++;
        // },
        
        //欄位防呆
        submitOrder() {
        // 檢查是否所有必填項目都已經填寫
        if (!this.product || !this.recipientName || !this.recipientPhone || !this.recipientAddress || !this.selectedShipping) {
            alert('請填寫所有必填項目');
        return;
        }
            const orderData = {
            user_id: this.product.user_id,
            product_id: this.product.productId,  // 使用 this.product.product_id
            product_name: this.product.product_name,
            product_count: this.quantity,
            consumer_name: this.recipientName,
            consumer_address: this.recipientAddress,
            consumer_phone: this.recipientPhone,
            shipping_method: this.selectedShipping,
            shipping_cost: this.getShippingFee,
            payment_method: this.paymentMethod,
            remittance_title: "中國信託",
            remittance_number: "812-00000087888",
            remarks_column: this.remarksColumn,
            product_amount: this.getOrderAmount,
            record_date: new Date(),
            status: "準備中",
            record_type: "購買",
            valid: true

            };

            // 發送 POST 請求
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

                    <div class="produtsrow" v-for="(item, index) in product" :key="item.id">
                        <img :src="cartList.photo" alt="Product Image" class="product-image">
                        <div class="product-details">
                            <p>{{ item.product_name }}</p>
                        </div>
                        <p>單價${{ item.cart_amount }}</p>
                        <div class="quantity">
                            <!-- <p>數量：</p> -->
                            <p>{{ item.cart_count }}</p>
                            <!-- <button @click="decrementQuantity(item)">-</button>
                            <input v-model="item.cart_count" type="number" min="1" />
                            <button @click="incrementQuantity(item)">+</button> -->
                        </div>
                        <div class="item-total">
                            <span class="total-value">總價：{{ item.cart_amount * item.cart_count }}</span>
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

