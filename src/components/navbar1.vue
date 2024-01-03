<!-- //Footer用 -->

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
    data() {
        return {

        }
    },

    methods: {



    },


    components: {
        RouterLink
    }
}
</script>

<template>
<div class="footer page">
    
        <!-- <div class="footerHead a">
            <a href="">PAGE TOP 🔼</a>
        </div> -->

        <div class="footerlefter">
            <a href="https://www.facebook.com/profile.php?id=100063916394661"> <img src="./../picture/11.png" height="80px"
                    alt=""></a>
            <img src="./../picture/12.png" height="80px" alt="">
            <div class="footerwords">
                <p>第三組<br>
                    如有任何需聯繫或反映事項請點選：客服信箱
                    或透過網站之聯絡我們頁面填寫表單，謝謝。</p>
                <p>客服時間：週一至週五 10:00 ~ 17:00</p>
            </div>
            <div class="laderwords">
                <p> 最新消息 | 品牌介紹 | 人才招募 | 聯絡我們 | 免責聲明 | 使用條款 | 隱私權保護政策
                </p>

            </div>

        </div>

        <div class="footerRighter">
            <div class="iconALink">
                <a href="https://www.facebook.com/profile.php?id=100063916394661"><i class="fa-brands fa-facebook"></i></a>
                <a href="https://www.facebook.com/profile.php?id=100063916394661"><i class="fa-brands fa-instagram"></i></a>
                <a href="https://www.facebook.com/profile.php?id=100063916394661"><i class="fa-brands fa-line"></i></a>
                <a href="https://www.facebook.com/profile.php?id=100063916394661"><i class="fa-regular fa-envelope"></i></a>

            </div>
            <div class="rightwords">
                <p>Copyright © 第三組 All Rights Reserved. 網頁設計 │ <a href="https://www.instagram.com/zz025784/">第三組</a></p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.footer {
    display: flex;
    height: 40vh;
    width: 100vw;
    border: 0px solid rgb(255, 0, 0);
    background-image: url("./../../public/9.jpg");
    z-index: -2;
    color: rgb(197, 197, 197);
    font-size: 10pt;
    .footerHead {
        height: 10vh;
        border: 0px solid black;
        background-color: black;
        opacity: 0.5;
        display: flex;
        align-items: center;
        justify-content: center;

        a {
            border-radius: 10px;
            padding: 5px;
            transition: all 0.5s ease;
            text-decoration: none;
            color: rgb(231, 231, 231);

            &:hover {
                color: red;
                background-color: rgba(118, 118, 117, 0.5);
            }
        }


    }

    .footerlefter {
        height: 40vh;
        width: 58vw;
        margin-left: 50px;
        border: 0px solid rgb(255, 255, 255);

        .footerwords {
            height: 80px;
        }

        .laderwords {
            width: 60vw;
            height: 30px;
            position: relative;
            top: 15%;
            border: 0px solid rgb(255, 255, 255);
        }

    }

    .footerRighter {
        width: 35vw;
        border: 0px solid rgb(255, 255, 255);

        .iconALink {
            margin-top: 15vh;
            border: 0px solid rgb(255, 255, 255);
            font-size: 25pt;
            display: flex;
            justify-content: space-around;
            width: 17vw;
            position: relative;
            left: 50%;
            transition: all 0.5s ease;

        }

        .rightwords {
            border: 0px solid rgb(255, 255, 255);
            display: flex;
            align-items: center;
            margin: 10px;
            width: 28vw;
            position: relative;
            left: 27%;
        }

    }
}

</style>