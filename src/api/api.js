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

// 刪除購物車
const cartDelete = (cartId) => {
  return axios({
    method: "post",
    url: `http://localhost:8080/cart/delete?id=${cartId}`,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      throw e;
    });
};

//尋找購物車
const getCartInfoByUserId = (userId) => {
  return axios({
    method: "get",
    url: `http://localhost:8080/cart/get/user_id?id=${userId}`,
    data: userId,
  })
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      throw e;
    });
};

/* product */
const getProductInfoByUserId = (id) => {
  return axios
    .get(`http://localhost:8080/product/get/info/user_id?id=${id}`)
    .then((res) => {
      // console.log(res.data.products);
      return res.data.products;
    })
    .catch((e) => {
      throw e;
    });
};

/* record */
const getRecordInfoByProductId = (id) => {
  return axios
    .get(`http://localhost:8080/record/get/product_id?id=${id}`)
    .then((res) => {
      // console.log(res.data.recordList);
      return res.data.recordList;
    })
    .catch((e) => {
      throw e;
    });
};

export default {
  signUp,
  login,
  cartCreat,
  cartDelete,
  getCartInfoByUserId,
  getProductInfoByUserId,
  getRecordInfoByProductId,
};
