  
<script>
export default {
    data() {
        return {
            email: "",
            password: "",
            name: "",
            birthday: "",
            address: "",
        };
    },
    methods: {
        registerUser() {
            // 在這裡添加註冊邏輯，例如發送 API 請求
            console.log("Email:", this.email);
            console.log("Password:", this.password);
            console.log("Name:", this.name);
            console.log("Birthday:", this.birthday);
            console.log("Address:", this.address);
            // 可以使用 Axios 或 Fetch 發送註冊請求
        },
    },
};
</script>

<template>
  <div class="actionPage">


    <div class="signup-container">
        <div class="backbtn">
        <RouterLink class="btn" to="/UserPage/loginPage">返回登入面</RouterLink>
        <h3>
      </h3>
      <h6>
        <RouterLink class="btn1" to="/"> Home</RouterLink> > <a href="">註冊</a>
      </h6>
    </div>
        <div class="signup">

            <img src="../../../public/9.jpg" width="700" height="500" alt="">

      
        <div class="signupRight">
        <form role="form" action="" class=" form-horizontal container jumbotron" name="regForm">
            
           
            <div class="form-group">
                <label for="userName" class="control-label col-sm-2">姓名:</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" name="userName" maxlength="7" placeholder="Enter user name">
                </div>
                 <span class="col-sm-6"><p id="errUName"> </p></span>
            </div>
            
            <div class="form-group">
                <label for="email" class="control-label col-sm-2">信箱:</label>
                <div class="col-sm-4">
                    <input type="email" class="form-control" name="email" placeholder="someone@example.com">
                </div>
                 <span class="col-sm-6" ><p id="errEmail"> </p></span>
            </div>
            <div class="form-group">
                <label for="phone" class="control-label col-sm-2">電話號碼:</label>
                <div class="col-sm-4">
                     <input type="tel" class="form-control" name="phone" placeholder="0912345678">
                </div>
                <span class="col-sm-6" ><p id="errPhone"> </p></span>
            </div>
           
            <div class="form-group">
                <label for="pwd" class="control-label col-sm-2">密碼:</label>
                <div class="col-sm-4">
                    <input type="password" class="form-control" name="password" maxlength="6" placeholder="Enter password">
                </div>
                 <span class="col-sm-6" ><p id="errPwd"> </p></span>
            </div>
            
            <div class="form-group">
                <label for="cnfrmPwd" class="control-label col-sm-2">確認密碼:</label>
                <div class="col-sm-4">
                    <input type="password" class="form-control" name="confirmPassword" maxlength="6" placeholder="Re-type password">
                </div>
                 <span class="col-sm-6" ><p id="errConfirmPwd"> </p></span>
            </div>
            
            <div class="radiogroup">
                <label for="gender" class="control-label col-sm-2">性別:</label>
                <div class="radio btn col-sm-1">
                    <label class="radio-inline"><input type="radio" name="optGender">男</label>
                </div>
                <div class="radio btn col-sm-3">
                    <label class="radio-inline"><input type="radio" name="optGender">女 </label>
                </div>
            </div>
            
            <div class="submitBtn">
                
                <RouterLink class="btn" to="/UserPage/loginPage">送出</RouterLink>

            </div>
        </form></div>
        </div>
    </div>  </div>
</template>



  
<style lang="scss" scoped>
.actionPage {
  display: flex;
  width: 100vw;
  height: 93vh;
  border: 0;
}
.btn {
  font-size: 16pt;
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  width: 10vw;
  background-color: rgb(223, 223, 223);
}

.signup-container {
  border: 0px solid red;
  width: 100vw;
  height: 100vh;
  background-color: rgb(156, 156, 156);
  display: flex;
  flex-direction: column;

  .backbtn {
    border: 0px solid red;
    background-color: rgb(156, 156, 156);
    justify-content: space-between;
    display: flex;
    align-items: center;
    width: 97vw;
    height: 15vh;

    a {
      border-radius: 10px;
      padding: 5px;
      transition: all 0.5s ease;
      text-decoration: none;
      color: black;

      &:hover {
        color: red;
        background-color: rgba(118, 118, 117, 0.5);
      }
    }
  }
}

.signup {
  display: flex;
  width: 90vw;
  border: 0px solid red;
  align-items: center;
  background-color: rgb(156, 156, 156);
  justify-content: space-around;

  .signupRIG {
    border: 1px solid black;
    padding: 20px;

    .form-group {
      margin-bottom: 20px;

      label {
        display: block;
        margin-bottom: 5px;
        color: #333; /* Dark text color */
      }

      input[type="text"],
      input[type="password"] {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        margin-bottom: 10px;
        border: 1px solid #ddd; /* Light border color */
        border-radius: 5px;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #4CAF50; /* Focus border color */
        }
      }
    }

    .submitBtn {
      border: 0px solid red;
      display: flex;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      .btn {
        background-color: #4CAF50;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #45a049; /* Hover background color */
        }
      }
    }
  }

  .signupRight {
    border: 0px solid red;
  }

  .form-control {
    width:27vw;
  }
  .radiogroup{
    display: flex;
    align-items: center;
  }
}
</style>

  