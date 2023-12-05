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
    <div class="askUserPage"> <img src="../views/askAllPage/askHome.vue" alt="">

        <div class="askHeader">
            <RouterLink class="btn" to="/">
                <h1> <i class="fa-solid fa-shrimp"><b> 呱皮皮蝦</b> </i>
                </h1>
            </RouterLink>

            <div class="search">
                <input class="searchText" type="text" placeholder="請輸入搜尋內容……">
                <button><i class="fa-solid fa-magnifying-glass searchicon"></i></button>
            </div>

            <div> <i class="fa-solid fa-user usericon "></i>
                <RouterLink class="btn" to="/UserPage/loginPage">會員</RouterLink>
            </div>



            <div> <i class="fa-solid fa-cart-shopping usericon"> </i>
                <RouterLink class="btn" to="/UserPage/shoppingCart">購物車</RouterLink>
            </div>

        </div>


        <div class="announcement">
            <p>重要公告：這是第四組！</p>
        </div>

     


    </div>
   
</template>
<style lang="scss" scoped>
.btn {
    text-decoration: none;
    color: white;
}


.searchicon {
    font-size: 28pt;

}

.usericon {
    font-size: 20pt;

}

.askUserPage {
    background-color: rgb(0, 0, 0);
    display: flex;
    flex-direction: column;
    border: 0px solid rgb(255, 0, 0);
    color: white;

    .askHeader {
        justify-content: space-around;
        align-items: center;
        display: flex;
        font-size: 16pt;
        padding: 5px;
        border: 2px solid rgb(255, 0, 0);
        height: 15vh;

        .search {
            width: 40vw;
            display: flex;
            justify-content: space-around;
            height: 5vh;
            z-index: 2;

            .searchText {
                width: 50vw;
                font-size: 18pt;
            }
        }

    }


    //跑馬燈
    .announcement {
        position: absolute;
        top: 15%;
        right: 100%;
        /* 初始位置在页面右侧外部 */
        background-color: #ff9800;
        /* 公告条背景颜色 */
        color: #fff;
        /* 文字颜色 */
        padding: 10px;
        white-space: nowrap;
        /* 不换行 */
        animation: scrollFromRight 10s linear infinite;
        /* 使用动画效果 */

        p {
            margin: 0;
        }
    }

    @keyframes scrollFromRight {
        0% {
            right: 100%;
        }

        100% {
            right: 0;
        }
    }


}




</style>