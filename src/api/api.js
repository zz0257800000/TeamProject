import axios from "axios";

/* post */
//註冊
const signUp = (req) => {
  return axios({
    method: "post",
    url: `http://localhost:8080/user/sign_up`,
    data: req,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      throw e;
    });
};

//登入
const login = (req) => {
  return axios({
    method: "post",
    url: `http://localhost:8080/user/login`,
    data: req,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      throw e;
    });
};

<<<<<<< HEAD
//加入購物車
const cartCreat = (req) => {
  return axios({
    method: "post",
    url: `http://localhost:8080/cart/create`,
    data: req,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      throw e;
    });
};

//刪除購物車
const cartDelete = (req) => {
  return axios({
    method: "post",
    url: `http://localhost:8080/cart/delete`,
    data: req,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      throw e;
    });
};

=======
>>>>>>> kamishu

export default {
  signUp,
  login,
  cartCreat,
  cartDelete,
};
