<script>
import{ RouterLink,RouterView } from 'vue-router'

export default{
data(){
return{
showDialog: false,
username: "",
password: "",
loginFailed: false,
  
  }
},
methods:{
ShowDialog() {
this.showDialog = true;
},

closeDialog() {
this.showDialog = false;
},
login() {
const enteredUsername = this.enteredUsername;
const enteredPassword = this.enteredPassword;


const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
const user = registeredUsers.find((user) => user.username === enteredUsername && user.password === enteredPassword);
// 检查输入是否为空



if (user) {
alert("登录成功");

return this.$router.push({ name: 'Vfor' });




}  else   {
alert("登录失败，请检查用户名和密码");

this.loginFailed = true;
this.enteredUsername = "";
this.enteredPassword = "";

setTimeout(() => {
this.loginFailed = false;
}, 2000);
return;

}
},
},
components:{
RouterLink
  }
}
    

</script>
<template>
  <img src="../views/askAllPage/askHome.vue" alt="">
   <div class="askUserPage">
 <div class="askHeader">
    <h1><b>皮皮蝦</b></h1>
<div>
    <RouterLink class="btn" to="/signUp">註冊</RouterLink>

  
    <button  class="btn" v-on:click="ShowDialog" >登入</button>
</div>
 </div>
 <div class="askMainPage">
    <div class="search">
<input class="searchText" type="text"  placeholder="請輸入搜尋內容……" > 
<i class="fa-solid fa-magnifying-glass icon"></i> <button>搜尋</button>


 </div>


 
 <div class="login-box" v-if="showDialog">
  <h2>Login</h2>
  <form>
    <div class="user-box">
      <input type="text" v-model="enteredUsername" required="" :disabled="loginFailed">
      <label>Username</label>
    </div>
    <div class="user-box">
      <input type="password" v-model="enteredPassword" required="" :disabled="loginFailed">
      <label>Password</label>
    </div>
    <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
     <button @click="login" :disabled="loginFailed">  <RouterLink  to="/Vfor">Submit</RouterLink></button>
         <button style="user-select: none;" class="tyty" @click="closeDialog">X</button>

    </a>
  </form>
</div>



</div>

 <div class="otherPage">

 </div>
</div>

</template>
<style lang="scss" scoped>
.btn{
    font-size: 16pt;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    width: 5vw;
    background-color: rgb(223, 223, 223);
}
.icon{
    font-size: 28pt;

}
.askUserPage{
background-color: rgb(255, 255, 255);
border: 0px solid rgb(214, 255, 68);
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
.askHeader{
    justify-content: space-around;
    align-items: center;
    display: flex;
    font-size: 16pt;
    padding: 5px;
  

    } 
.askMainPage{
display: flex;
    border: 0px solid rgb(203, 255, 59);
    height: 80vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;


.search{
  width: 40vw;
  display: flex;
  justify-content: space-around;
height: 5vh;  
  border: 0px solid rgb(0, 0, 0);
  z-index: 2;
  
    .searchText{
        width: 50vw;
        font-size: 18pt;
    } 
}

.daysearch{
  display: flex;
}
.contentbox{
  border: 0px solid rgb(0, 0, 0);
  height: 80vh;
  width: 80vw;
  margin: 10px;
background-color: white;
  box-shadow: 1px 8px 20px 0px rgb(255, 255, 255);

  .contentboxheader{
    height: 10vh;
    border: 0px solid rgb(0, 0, 0);
    background-color: rgb(255, 210, 126);
    align-items: center;
    display: flex;
    justify-content: space-around;
    .dash{
      border: 0px solid rgb(0, 0, 0);
      width: 3vw;
    }
    .number{
      border: 1px solid rgb(0, 0, 0);
      width: 5vw;

    }
    .title{   
       border: 1px solid rgb(0, 0, 0);

      color: rgb(0, 0, 0);
      width: 45vw;
    }
    .daly{
      width: 25vw;
      justify-content: space-around;

      display: flex;
      border: 1px solid rgb(0, 0, 0);
    }
    .detail{
      border: 1px solid rgb(0, 0, 0);
      width: 12vw;


    }
  }
  .content{
    border: 1px solid rgb(0, 0, 0);
    height: 62vh;
    background-color: rgb(202, 202, 202);

    display: flex;
    justify-content: space-around;
    
    .dashcontent{
      border: 1px solid rgb(0, 0, 0);
      width: 3vw;
    }
    .numbercontent{
      border: 1px solid rgb(0, 0, 0);
      width: 5vw;

    }
    .titlecontent{   
       border: 1px solid rgb(0, 0, 0);

      color: rgb(0, 0, 0);
      width: 45vw;
    }
    .dalycontent{
      width: 25vw;
      justify-content: space-around;

      display: flex;
      border: 1px solid rgb(0, 0, 0);
    }
    .detailcontent{
      border: 1px solid rgb(0, 0, 0);
      width: 12vw;


    }

  }

}
  .login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgb(0, 0, 0);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(151, 151, 151, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.login-box .user-box label {
  position: absolute;
  top:0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
              0 0 25px #03e9f4,
              0 0 50px #03e9f4,
              0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}

        }
        .otherPage{
            border: 0px solid black;
            height: 10vh;
            width: 100vw;


        }
}

</style>