<template>
    <div class="profile-container">
      <h2>用户信息修改</h2>
  
      <!-- 显示当前用户信息 -->
      <div class="user-info">
        <p><strong>用户名：</strong> {{ user.name }}</p>
        <p><strong>Email：</strong> {{ user.email }}</p>
      </div>
  
      <!-- 修改区域 -->
      <div class="edit-section">
        <label for="name">新用户名：</label>
        <input v-model="newUser.name" type="text" id="name" />
  
        <label for="email">新 Email：</label>
        <input v-model="newUser.email" type="text" id="email" />
  
        <button @click="updateUser">更新用户信息</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: "John Doe",
          email: "john@example.com",
        },
        newUser: {
          name: "",
          email: "",
        },
      };
    },
    methods: {
      updateUser() {
        // 模拟更新用户信息的操作，实际应用中可以发送请求到服务器
        this.user.name = this.newUser.name;
        this.user.email = this.newUser.email;
  
        // 清空新用户信息
        this.newUser.name = "";
        this.newUser.email = "";
  
        alert("用户信息已更新！");
      },
    },
  };
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .user-info {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  