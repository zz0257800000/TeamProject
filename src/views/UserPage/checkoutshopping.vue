<script>
import axios from 'axios';
import TWzipcode from 'twzipcode.js'; 

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
            address2:'',
            twzipcode: null, // 添加 twzipcode 屬性
        };
    },
    mounted() {
        this.fetchProductDetails();
        this.userId = sessionStorage.getItem('user_Id');  // Get user_Id from sessionStorage
        this.remittance_title = sessionStorage.getItem('remittance_title');  // Get user_Id from sessionStorage
        this.remittance_number = sessionStorage.getItem('remittance_number');  // Get user_Id from sessionStorage
        // 使用 TWzipcode.js 初始化地址選擇器
        this.twzipcode = new TWzipcode();
        this.twzipcode.init(this.$refs.twzipcodeRef);  // 修改這一行

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
            this.recipientAddress = this.address1 + this.address2;
            // 檢查是否所有必填項目都已經填寫
            if (!this.product || !this.recipientName || !this.recipientPhone || !this.recipientAddress || !this.selectedShipping) {
                alert('請填寫所有必填項目');
                return;

            }

            const phoneRegex = /^09\d{8}$/;
            const isValidPhone = phoneRegex.test(this.recipientPhone);
        if (!isValidPhone) {
            alert("請輸入有效的電話號碼!!");
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
        handleZipcodeChange(data) {
    // 使用 TWzipcode.js 的方法來獲取地址信息
    const addressInfo = this.twzipcode.get(["zipcode", "county", "district",]);
    
    if (addressInfo && addressInfo.length > 0) {
        const firstAddress = addressInfo[0];
        this.address1 = `${firstAddress.zipcode} ${firstAddress.county} ${firstAddress.district} `;
        console.log(this.address1);
    } else {
        console.error("Address Info is empty or not in the expected format.");
    }},
    },
};
</script>

<template>
    <div class="mainshow">
        <div class="countAll">
            <div class="leftInfo">
                <div class="productsInfo area">
                    <h3>XXX小舖</h3>
                    <div class="line"></div>
                    <!-- <div class="item_header">
                        <div class="item-image header" >商品照片</div>
                        <div class="item-name header">商品</div>  
                        <div class="item-type header">產品分類</div> 
                        <div class="item-price header">單價</div>
                        <div class="item-quantity header">數量</div>
                        <div class="item-total header">總計</div>
                    </div> -->
                    <div class="produtsrow" v-if="product">
                        <div class="item-image">
                            <img :src="'data:image/jpeg;base64,' + product.photo" alt="Product Image" class="item-image">
                        </div>
                        <div class="item-name product-details">
                            <p>{{ product.product_name }}</p>
                        </div>
                        <p class="item-type">{{ product.product_type }}</p>
                        <p class="item-price">${{ product.price }}</p>
                        <div class="item-quantity">
                            <button @click="decrementQuantity">-</button>
                            <input v-model="quantity" type="number" min="1" />
                            <button @click="incrementQuantity">+</button>
                        </div>
                        <div class="item-total">
                            <p class="total-value">${{ product.price * quantity }}</p>
                        </div>
                    </div>
                </div>
                <div class="RecipientInformation area">
                    <div class="info inp">
                        收件人：<input type="input" v-model="recipientName">
                        <label>
                        電話:<input type="input" v-model="recipientPhone" maxlength="10">
                    </label>
                    </div>
                    <div class="address inp">
                        地址：
                    <div class="twzipcode" ref="twzipcodeRef" @change="handleZipcodeChange" ></div>
                    <input type="input" v-model="address2">
                    </div>


                </div>
                <div class="ShippingInfo area">
                    <h3>運送方式</h3>
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

                <div class="payment area" v-if="selectedShipping !== '貨到付款'">
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
                <div class="remarksColumnInfo area">
                    <div class="remarks inp">
                        備註：<input type="input" v-model="remarksColumn">
                    </div>
                </div>
            </div>

            <div class="rightCount area">
                <p>商品總金額: $ {{ getTotalAmount }}</p>
                <p>運費: $ {{ getShippingFee }}</p>
                <div class="orderTotal">
                    <h4>訂單總金額：</h4>
                    <h4 class="orderAmount"> ${{ getOrderAmount }}</h4>
                </div>
                <button class="Checkout" @click="submitOrder">結帳</button>

            </div>


        </div>
    </div>
</template>

<style lang="scss" scoped>
.line{
    height: 1px;
    background-color: #f99b58;
}
.area{
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: white;
    padding: 15px;
}
.mainshow {
    height: 150vh;
    display: flex;
    align-items: center;

    .countAll {
        height: 140vh;
        width: 70vw;
        // border: 1px solid #ccc;
        /* Softer border color */
        display: flex;
        justify-content: space-around;
        border-radius: 10px;
        overflow: hidden;

        .leftInfo {
            height: 90vh;
            width: 60vw;
            justify-content: space-between;
            align-items: center;

            .productsInfo {
                height: 45vh;
                border-bottom: 1px solid #ccc;
                background-color: #ffffff;
                /* Lighter background color */
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

                .produtsrow {
                    padding: 5px;
                    display: flex;
                    align-items: center;
                    height: 15vh;
                    background-color: #ffffff;
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

            .RecipientInformation { //收件資料
                display: flex;
                flex-direction: column;
                height: 24vh;
                overflow: hidden;
                margin-bottom: 10px;
            }

            .ShippingInfo {
                height: 24vh;
                background-color: #ffffff;
                overflow: hidden;
                margin-bottom: 10px;
            }

            .payment {
                height: 15vh;
                overflow: hidden;
            }

            .remarksColumnInfo {
                height: 8vh;
                overflow: hidden;
            }
        }

    .rightCount {
        position: fixed;  // 將位置固定
        top: 40vh;         // 設置固定位置的上邊距
        right: 5vw;       // 設置固定位置的右邊距
        padding: 20px;
        transform: translateY(-50%);  // 使用 translateY 將位置調整到中心
        height: 30vh;
        width: 25vw;
        z-index: 10;

    .Checkout {
        margin-top: 20px;
        display: block;
        text-align: center;
        padding: 10px;
        background-color: #ff822a;
        color: white;
        text-decoration: none;
        border-radius: 5px;
        border: 0;
    }
}
    }
// .item_header{
//     margin: 10px;
//     padding: 5px;
//     display: flex;
//     align-items: center;
//     justify-content: space-around;
//     margin-bottom: 20px;
//     border-radius: 5px;
//     }
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
    margin-right: 15px;
    width: 30vw;
    }
.item-type{
    width: 8vw;
}
.item-price{
    width: 8vw;
}
.item-total{
    width: 8vw;
}
.orderTotal{
    display: flex;
    .orderAmount{
        color: #ff822a;
        font-weight: 1000;
    }
}

.address{
    display: flex;

}
.inp{
    margin-bottom: 20px;
}
.item-quantity{
    display: flex;
    width: 7vw;
    margin-top: -16px;
    input{
        width: 25px;
        border: 0;
    }
    button{
        width: 20px;
        border: 0;
        border-radius: 5px;
        background-color: #ff9800;
        color: white;
    }
}

}//
</style>
