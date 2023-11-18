<script>
export default {
    data() {
        return {
            username: "",
      password: "",
      registered: false,
      showDialog: false,

        }
    },
    methods: {
        registerUser() {
      // 获取已注册的用户列表
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // 检查是否已存在相同用户名
      const userExists = registeredUsers.some((user) => user.username === this.username);
      if (userExists) {
        alert("该用户名已被注册！");
        return;
      }

      // 注册新用户
      registeredUsers.push({ username: this.username, password: this.password });

      // 将用户信息保存到本地存储
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

      alert("注册成功！");

      // 使用Vue Router或其他导航方式跳转回主要功能页面
      // 例如，你可以使用以下方式：
      this.$router.push("/"); // 假设路由名为"main"
    },
       
    },
    components: {
      
}}
</script>

<template>
    <RouterLink class="btn" to="/">返回首頁</RouterLink>
    <div class="signup">
        <img src="../../../public/1.jpg" width="700"  height="500"  alt="">

       <div class="signupRIG"> 
        <div>
    <h1>註冊</h1>
    <form @submit.prevent="registerUser">
      <label for="username">用户名:</label>
      <input type="text" id="username" v-model="username" />
      <label for="password">密码:</label>
      <input type="password" id="password" v-model="password" />
      <button type="submit">注册</button>
    </form>
  </div>
  </div>
    </div>

</template>

<style lang="scss" scoped>
.btn{
    font-size: 16pt;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    width: 10vw;
    background-color: rgb(223, 223, 223);
}
.signup{
    margin: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    margin: 10px;
    justify-content: space-around;
    .signupRIG{
        border: 1px solid black;

    }
}

</style>