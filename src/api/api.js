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


export default {
  signUp,
  login,
};
