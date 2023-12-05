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
            <RouterLink class="btn" to="/"><h1> <i class="fa-solid fa-shrimp"><b> 呱皮皮蝦</b> </i>
            </h1></RouterLink>

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
.btn{
    text-decoration: none;
    color: white;
}
.ShowWriteDai {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);

    z-index: 999;

    .dialog1 {
        width: 60vw;
        height: 80vh;
        background: white;
        color: #000000;
        text-align: left;
        padding: 50px 100px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        border: 1px solid rgb(0, 0, 0);
        overflow: auto;



        .dispalyset {
            display: flex;
            border: 0px solid rgb(0, 0, 0);
            width: 50vw;

            .askheadtitle {
                font-size: 18pt;
                width: 40vw;
            }

        }

        .dialog1first {
            display: flex;
            border: 0px solid rgb(0, 0, 0);

            .dialog1firstbutton {
                position: relative;
                left: 10vw;
            }

        }

        .dialog1content {
            border: 1px solid rgb(0, 0, 0);
            height: 30vh;

            .asktitle {
                display: flex;

            }

            .askcont {
                display: flex;
                border: 1px solid rgb(0, 0, 0);
                height: 25vh;

            }
        }

        .tyty {
            position: relative;
            font-size: 25pt;
            left: 105%;
            bottom: 5%;
            border: 0px solid rgb(0, 0, 0);
            width: 3vw;

        }

        .createQuest {
            margin-top: 15px;
            width: 900px;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            background-color: #fff;

            label {
                font-weight: bold;
            }

            input[type="text"] {
                margin-top: 15px;
                margin-bottom: 15px;
                width: 80%;
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                margin-right: 15px;
            }

            input[type="radio"] {
                margin-right: 29px;
            }

            button {
                background-color: #007BFF;
                color: #fff;
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
        }
    }

    .continuebutton {
        position: relative;
        left: 85%;
    }
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
        border: 1px solid rgb(255, 0, 0);
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

    .otherPage {
        border: 0px solid black;
        height: 10vh;
        width: 100vw;


    }
}
</style>