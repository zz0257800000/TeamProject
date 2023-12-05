  
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
    
    <div class="signup-container">
        <RouterLink class="btn" to="/UserPage/loginPage">返回首頁</RouterLink>

        <div class="signup">
            <img src="../../../public/1.jpg" width="700" height="500" alt="">

            <div class="signupRIG">
                <div>
                    <h1>註冊</h1>
                    <form @submit.prevent="registerUser">
                        <div class="form-group">
                            <label for="email">信箱:</label>
                            <input type="email" id="email" v-model="email" class="form-control" required />
                        </div>

                        <div class="form-group">
                            <label for="password">密碼:</label>
                            <input type="password" id="password" v-model="password" class="form-control" required />
                        </div>

                        <div class="form-group">
                            <label for="name">姓名:</label>
                            <input type="text" id="name" v-model="name" class="form-control" required />
                        </div>

                        <div class="form-group">
                            <label for="birthday">生日:</label>
                            <input type="date" id="birthday" v-model="birthday" class="form-control" required />
                        </div>

                        <div class="form-group">
                            <label for="address">地址:</label>
                            <input type="text" id="address" v-model="address" class="form-control" required />
                        </div>

                        <RouterLink class="btn" to="/">返回首頁</RouterLink>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>



  
<style lang="scss" scoped>
.btn {
    font-size: 16pt;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    width: 10vw;
    background-color: rgb(223, 223, 223);
}

.signup-container {
    border: 1px solid red;
    width: 100vw;
    height: 100vh;
   
}

.signup {
    display: flex;
    justify-content: space-around;
    width: 100vw;
    border: 1px solid red;

    display: flex;
    justify-content: space-around;
align-items: center;
    .signupRIG {
        border: 1px solid black;
        padding: 20px;
    }
}
</style>
  