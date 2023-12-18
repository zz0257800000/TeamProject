<script>
export default {
    data() {
        return {
            productName: "黑白素T",
            productPrice: "200",
            updateTime:"2023-12-10",
            sizeArr: ["S", "M", "L"],
            selectedSize: null,
            quantity: 1, // 初始購買數量為1
            suggestArr:[
            "../../public/clothes2.jpg",
            "../../public/clothes1.jpg",
            "../../public/clothes2.jpg",
            "../../public/clothes1.jpg",
            "../../public/clothes2.jpg",
            ],
        };
    },
    methods: {
        selectSize(size) {
            this.selectedSize = size;
        },
        addToCart() {
            // 在這裡處理將商品加入購物車的邏輯
            console.log("商品已加入購物車");
            alert("商品已加入購物車");
        },
        buyNow() {
            // 在這裡處理立即購買的邏輯
            console.log("立即購買");
            this.$router.push({ name: 'shoppingCart' })
        },
        incrementQuantity() {
            this.quantity += 1;
        },
        decrementQuantity() {
            if (this.quantity > 1) {
        this.quantity -= 1;}
        },
    },
};
</script>


<template>
    <div class="bg">
        <div class="product Area">
        <img src="../../../public/clothes1.jpg" alt="" srcset="" style="width: 50rem; height: 35rem;">

        <div class="productText">

        <div class="title"><p>商品名稱：{{ productName }}</p></div>

        <div class="price"><p>價格：${{ productPrice }}</p></div>

        <div class="size">
            <p>規格：</p>
            <button type="button" v-for="item in sizeArr" :key="item" :class="{ 'selected': selectedSize === item }"
            @click="selectSize(item)">{{ item }}</button>
            </div>
        
        <div class="quantity">
            <p>數量：</p>
            <button @click="decrementQuantity">-</button>
            <input v-model="quantity" type="text" min="1" inputmode="numeric" pattern="[0-9]*" />
            <button @click="incrementQuantity">+</button>
            </div>

        <div class="buttons">
            <button @click="addToCart">加入購物車</button>
            <button @click="buyNow">立即購買</button>
            </div>

        <div class="updateTime"><p>商品更新日期：{{ updateTime }}</p></div>
        
        </div>
    </div>
    <h2>相關商品</h2>
    <div class="suggest Area">
        <div class="suggest" style="width: 16rem ; height:20rem;" v-for="item in suggestArr">
            <RouterLink class="btn" to="/UserPage/productPage">
        <img :src="item" class="card-img-top" alt="..."></RouterLink>
        </div>

        </div>
    </div>


</template>

<style lang="scss" scoped>
.bg{
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(148, 148, 148);
}
.Area{
    display: flex;
}
.product {
    display: flex;
    margin-bottom: 80px;
    margin-top: 50px;

    .productText {
        padding: 30px;
        height: 35rem;
        width: 30rem;
        background-color: white;
        p {
        font-size: 20pt;
    }
    button {
        margin: 2px;
        height: 60px;
        width: 100px;
        }
    .selected {
        background-color: #666666; /* 或者其他你想要的顏色 */
        color: white;
        }
    }
    .quantity {
        margin-top: 10px;
        display: flex;
        align-items: center;
        input{
            width: 60px;
            text-align: center;
        }
        p {
        margin-right: 10px;
        }
        button{
        border: 0;
        }
        }
    .updateTime{
        margin-top: 20px;
        p {
        font-size: 10pt;
        }
    }
    }
</style>