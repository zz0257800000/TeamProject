<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import api from "../api/api.js";

const route = useRoute();

const { getProductInfo, getCommentInfo, postComment, addLike, addDislike } =
  api;
//接收url id
const id = ref(0);
//接收api資料
const productInfo = ref({});
const commentInfo = ref({});

//取得要發布的評論資料
const userId = JSON.parse(sessionStorage.getItem("user_Id"));
const commentInput = ref("");

//點擊發布留言儲存一筆資料
const postCommentHandler = () => {
  let commentReq = reactive({
    user_name: "ian",
    star: 5,
    comment: commentInput.value,
    like_count: 0,
    dislike_count: 0,
    user_id: userId,
    product_id: productInfo.value.product_id,
  });
  postComment(commentReq);
};

const addLikeHandler = (userId) => {
  addLike(userId);
};

const addDislikeHandler = (userId) => {
  addDislike(userId);
};

//監聽comment是否有變化
watch(commentInfo, async () => {
  //利用product_id取得評論內容
  try {
    const result = await getCommentInfo(productInfo.value.product_id);
    commentInfo.value = result;
  } catch (error) {
    throw error;
  }
});

//網頁渲染前加載商品及評論資訊
onMounted(async () => {
  id.value = route.params.id;
  //連接api商品資訊
  try {
    const result = await getProductInfo(userId);
    productInfo.value = result;
  } catch (error) {
    throw error;
  }

  //利用product_id取得評論內容
  try {
    const result = await getCommentInfo(productInfo.value.product_id);
    commentInfo.value = result;
  } catch (error) {
    throw error;
  }
});
</script>

<template>
  {{ userName }}
  <div class="body">
    <section class="product">
      <h1>商品資訊</h1>
      <p>商品名稱:{{ productInfo.product_name }}</p>
      <p>價格:{{ productInfo.price }}</p>
      <p>庫存:{{ productInfo.inventory }}</p>
      <p>銷售數:{{ productInfo.sale_count }}</p>
      <p>商品類型:{{ productInfo.product_type }}</p>

      <p>商品描述:{{ productInfo.description }}</p>
      <!-- <p>{{ productInfo }}</p> -->
    </section>

    <section class="commentBox">
      <h1>商品討論區</h1>
      <div v-for="item in commentInfo" class="comment">
        <p>{{ item.user_name }}</p>
        <p>{{ item.comment }}</p>
        <div class="likebar">
          <div class="like">
            <i
              @click="addLikeHandler(item.comment_id)"
              class="fa-regular fa-thumbs-up likeicon"
            ></i
            ><span>{{ item.like_count }}</span>
          </div>
          <div class="dislike">
            <i
              class="fa-regular fa-thumbs-down dislikeicon"
              @click="addDislikeHandler(item.comment_id)"
            ></i
            ><span>{{ item.dislike_count }}</span>
          </div>
        </div>
      </div>
      <!-- <p>{{ commentInfo }}</p> -->
      <h1>我要留言</h1>
      <div class="starBar">
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </div>
      <textarea type="text" v-model="commentInput"></textarea>
      <button type="button" @click="postCommentHandler()">發布</button>
    </section>
  </div>
</template>

<style scoped lang="scss">
.commentBox {
  border: 1px solid green;
  .comment {
    border: 1px solid red;
  }
}

.likebar {
  display: flex;
  border: 1px solid blue;
  width: 20vw;
  justify-content: space-around;
  .likeicon,
  .dislikeicon {
    margin-right: 0.5rem;
    font-size: 1.2rem;
    transition: 0.3s ease;

    &:hover {
      cursor: pointer;
      color: orange;
    }
  }
  span {
    font-size: 1.2rem;
  }
}
.starBar {
  display: flex;
}
</style>
