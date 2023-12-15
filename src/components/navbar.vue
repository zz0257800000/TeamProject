<!-- //head navbar -->

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {


      showChat: false, messages: [],
      newMessage: '',


    }
  },

  methods: {




    toggleChat() {
      this.showChat = !this.showChat;
    },  sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push(this.newMessage);
        this.newMessage = '';

        // You can send the message to the server or perform other actions here
      }
    },


  },


  components: {
    RouterLink

  }
}
</script>
<template>
  
  <div class="askUserPage"> 
    
    <img src="../views/askAllPage/askHome.vue" alt="">
    
     <div class="headerfirst">
     <div class="POP">
      <RouterLink class="btn" to="/UserPage/complainService">客服人員</RouterLink>
      <RouterLink class="btn" to="/">注意事項</RouterLink>
      <RouterLink class="btn" to="/UserPage/developerPage"><i class="fa-solid fa-dragon"></i>開發人員</RouterLink>

    </div>
      <div>
      

      <RouterLink class="btn" to="/UserPage/actionShop"><i class="fa-solid fa-store"></i> 我的拍賣</RouterLink>
      <RouterLink class="btn" to="/UserPage/loginPage"><i class="fa-solid fa-user usericon "></i> 會員資料</RouterLink>


      
      <RouterLink class="btn" to="/UserPage/loginPage"><i class="fa-solid fa-user usericon "></i> 會員登入</RouterLink>
    </div>
      </div>

    <div class="askHeader">
      
      <RouterLink class="btn" to="/">
        <h1> <i class="fa-solid fa-shrimp"><b> 呱皮皮蝦</b> </i></h1>
      </RouterLink>

      <div class="search">
        <input class="searchText" type="text" placeholder="請輸入搜尋內容……">
        <button><i class="fa-solid fa-magnifying-glass searchicon"></i></button>
      </div>

      <div> 
        <RouterLink class="btn" to="/UserPage/buyingList"> <i class="fa-solid fa-box"></i> 購買清單</RouterLink>
      </div>

      <div> 


        <RouterLink class="btn" @click="toggleChat" to=""><i class="fa-regular fa-message"></i> 聊聊訊息</RouterLink>

      </div>
      <div>
        <RouterLink class="btn" to="/UserPage/shoppingCart"> <i class="fa-solid fa-cart-shopping usericon"> </i> 購物車</RouterLink>
      </div>

    </div>

   
  
  </div>
  <div class="Marquee">
    <div class="announcement">
      <p>變數使用小駝峰命名統一 不要底線XD！</p>
    </div>
 

    <!-- 產品分類下拉式選單 -->
    <div class="type">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                  aria-expanded="false" data-bs-auto-close="false">
                  產品分類
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                          食品專區
                        </button>
                      </h2>
                      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
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
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                          精品服飾
                        </button>
                      </h2>
                      <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
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
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                          data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                          日常用品
                        </button>
                      </h2>
                      <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample">
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

=======
<div class="chat-box" :class="{ 'show': showChat }">
    <div class="chat-header">
      <h2>Chat</h2>
      <button @click="toggleChat">Toggle</button>
    </div>
    <div class="chat-messages">
      <div v-for="(message, index) in messages" :key="index" class="message">{{ message }}</div>
    </div>
    <div class="chat-input">
      <input v-model="newMessage" type="text" placeholder="Type a message...">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
>>>>>>> main
</template>
<style lang="scss" scoped>
.type { 
  position: relative;
  top: 15%;
  width: 150px;
  margin-left: -10px;
  border: 0;



}

.btn {
  text-decoration: none;
  color: white;
  
  font-size: 20pt;
  &:hover{
  
    background-color: gray;
  }

}


.searchicon {
  font-size: 28pt;

}

.usericon {
  font-size: 20pt;

}
.memberInformation{
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}

.askUserPage {
  background-color: rgb(92, 92, 92);
  display: flex;
  flex-direction: column;
  border: 0px solid rgb(255, 0, 0);
  color: white;
  padding: 10px;
  height: 20vh;
  width: 100vw;
.headerfirst{
  display: flex;
  justify-content: space-between;
}
  .askHeader {
    justify-content: space-around;
    align-items: center;
    display: flex;
    font-size: 16pt;
    padding: 5px;
    border: 0px solid rgb(255, 0, 0);
    height: 15vh;


    


    .search {
      width: 40vw;
      display: flex;
      justify-content: space-around;
      height: 5vh;
      z-index: 2;

      i {
        font-size: 20pt;
        margin: 0 10px;


        

      }

      .searchText {
        padding: 10px;
        width: 50vw;
        font-size: 16pt;



      }
    }

  }


}
.Marquee{

  width: 100vw;

height: 10vh;

  border: 0px solid rgb(255, 0, 0);
height: 12vh;

background-color: rgb(48, 48, 48);


  //跑馬燈
  .announcement {
    position: absolute;
    top: 23%;
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
.chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: none;
}

.chat-box.show {
  display: block;
  z-index: 99;
}

.chat-header {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-messages {
  padding: 10px;
  max-height: 200px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.chat-input {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.chat-input input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
}

.chat-input button {
  background-color: #4CAF50;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #45a049;
}
</style>