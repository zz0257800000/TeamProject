<script>
import axios from 'axios';

export default {
  data() {
    return {
      feedbackList: [], // 儲存所有回饋的訊息
      selectedFeedback: null, // 儲存選中的回饋訊息 預設null
      feedbackHeight: '0px', // 儲存詳細資料的高度
    };
  },
  created() {
    this.getFeedback();
  },
  methods: {
    async getFeedback() {
      try {
        const response = await axios.get('http://localhost:8080/feedBack/getAllFeedBackInfo');
        this.feedbackList = response.data.feedbackList; 
      } catch (error) {
        console.error(error);
      }
    },
    showDetails(index) {
      if (this.selectedFeedback === this.feedbackList[index]) {
        this.selectedFeedback = null;
        this.feedbackHeight = '0px'; // 收回時將高度設為 0
      } else if (this.selectedFeedback !== null) {
        const prevIndex = this.feedbackList.indexOf(this.selectedFeedback);
        this.selectedFeedback = this.feedbackList[index];
        this.feedbackHeight = `${document.querySelectorAll('.details')[prevIndex].scrollHeight}px`;
      } else {
        this.selectedFeedback = this.feedbackList[index];
        const detailsElement = document.querySelectorAll('.details')[index];
        this.feedbackHeight = `${detailsElement.scrollHeight}px`; // 展開時根據內容高度設定
      }
    },
  },
};
</script>

<template>
  <div class="feedback-list">
    <h2 style="text-align: center;">★用戶意見與回饋★</h2>
    <ul class="feedback-items">
      <li v-for="(feedback, index) in feedbackList" :key="index" class="feedback-item">
        <div @click="showDetails(index)" class="feedback-title">
          <span>● 用戶意見與回饋 {{ index + 1 }}:</span>
          <span style="flex: 1; text-align: left;">{{ feedback.name }}</span>
          <div class="arrow-icon">{{ selectedFeedback === feedback ? '▲' : '▼' }}</div>
        </div>
        <div class="details" :style="{ maxHeight: selectedFeedback === feedback ? feedbackHeight : '0px' }">
          <h3>詳細資料 :</h3>
          <b>姓名:</b> {{ feedback.name }}<br />
          <b>電話:</b> {{ feedback.phone }}<br />
          <b>Email:</b> {{ feedback.email }}<br />
          <b>意見與回饋:</b> {{ feedback.feedback }}<br />
        </div>
      </li>
    </ul>
  </div>
</template>



  <style scoped>
  .feedback-list {
    margin: 20px;
    height: 100vh;

  }
  
  .feedback-items {
    list-style: none;
    padding: 0;
  }
  
  .feedback-item {
    margin-bottom: 10px; /* 調整條列間距 */
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  
  .details {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.5s ease-out; /* 過渡效果 */
  }
  
  .show-details {
    max-height: 500px; /* 調整過場動畫的最大高度 */
  }
  
  .feedback-title {
    display: flex; /* 讓資料居左並對齊 */
    justify-content: space-between; /* 讓箭頭與資料之間有空間 */
    align-items: center; /* 垂直置中箭頭 */
  }
  
  .arrow-icon {
    font-size: 20px; /* 調整箭頭大小 */
  }
  </style>
  
