<script>
import axios from 'axios';

export default {
    data() {
        return {
            product: null,
            quantity: '',
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
                    this.quantity = data.cartList.cart_count;
                    console.log(this.product);
                    })
                .catch(error => console.error('获取数据时出错:', error));
        },
        
        //欄位防呆
        submitOrder(item) {
        // 檢查是否所有必填項目都已經填寫
        if (!this.product || !this.recipientName || !this.recipientPhone || !this.recipientAddress || !this.selectedShipping) {
            alert('請填寫所有必填項目');
        return;
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');

        const orderData = {
            user_id: this.userId,
            product_id: item.product_id,  // 使用 this.product.product_id
            product_name: item.product_name,
            product_type: item.product_type,
            product_count: item.cart_count,
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
            record_date: `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`,
            status: "準備中",
            seller_id: item.seller_id,
            record_type: "購買",
            valid: true,
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
                    console.log(orderData)
                    // 處理成功響應
                })
                .catch(error => {
                    console.error('Error:', error);
                    console.log(orderData);
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
                    <div class="item_header">
                        <div class="item-image header" >商品照片</div>
                        <div class="item-name header">商品</div>  
                        <div class="item-type header">產品分類</div> 
                        <div class="item-price header">單價</div>
                        <div class="item-quantity header">數量</div>
                        <div class="item-total header">總計</div>
                    </div>
                    <div class="produtsrow" v-for="(item, index) in product" :key="item.id">
                        <div class="item-image">
                            <img :src="'data:image/jpeg;base64,' + item.photo" alt="Product Image" class="item-image">
                        </div>
                        <div class="item-name product-details">
                            <p>{{ item.product_name }}</p>
                        </div>
                        <p class="item-type">{{ item.product_type }}</p>
                        <p class="item-price">${{ item.cart_amount }}</p>
                        <div class="item-quantity">
                            <p>{{ item.cart_count }}</p>
                        </div>
                        <div class="item-total">
                            <p class="total-value">${{ item.cart_amount * item.cart_count }}</p>
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
                <router-link :to="''" class="Checkout" @click="submitOrder(item)" v-for="(item, index) in product" :key="item.id">結帳</router-link>

            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>

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
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    height: 15vh;
                    background-color: #d0d0d0;
                    /* Muted product row color */
                    margin: 10px;
                    align-items: center; 


                    .product-details {
                        h4 {
                            color: #333;
                            font-size: 1.5rem;
                            margin: 10px;
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
.item_header{
    margin: 10px;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
.item-image {
    display: flex;
    justify-content: center;
    width: 8vw;
    img {
        width: 7vw;
        height: 80px;
        border-radius: 5px;
    }
    }
.item-name {
    margin-left: 15px;
    width: 30vw;
    }
.item-type{
    width: 8vw;
}
.item-price{
    width: 8vw;
}
.item-quantity{
    width: 5vw;
}
.item-total{
    width: 8vw;
}
    
}
</style>