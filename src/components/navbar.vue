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

    <div class="type">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="false">
            產品分類
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        食品專區
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        零食
      </div>
      <div class="accordion-body">
        泡麵
      </div>
      <div class="accordion-body">
        生鮮食品
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        精品服飾
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        全部
      </div>
      <div class="accordion-body">
        男性服飾
      </div>
      <div class="accordion-body">
        女性服飾
      </div>
      <div class="accordion-body">
        嬰幼服飾
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        日常用品
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
    <div class="accordion-body">
        洗浴用品
      </div>
      <div class="accordion-body">
        生活小物
      </div>
    </div>
  </div>
</div>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </div>


    </div>
    <div class="footer">

        
    </div>
</template>
<style lang="scss" scoped>
.type{
    width:150px;
    .dropdown-menu{
        width:250px;
        margin-top: 8px;
        margin-left: -10px;
    }
    .accordion-body{
        height: 50px;
        margin-bottom: 2px;
        background-color: #e3e3e3;
    }
}
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