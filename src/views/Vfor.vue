<script>
import askDetail from "./../components/askDetail.vue"
import child2 from './child2.vue';

export default {
    data() {
        return {
            showDia: false,
            selectedOption: "",
            options: ["選擇題",],
            questionForms: [],
            textarea: "",
            keyinfo: {
                askTitle: "",

                starttime: "",
                endtime: "",
                asktexttitle: "",
                answer: "",

            },
            page: 1,
             questions: [
        {
          text: '',
          answers: [
            { selected: false, text: '' },
            { selected: false, text: '' },
            { selected: false, text: '' },
            { selected: false, text: '' }
          ],
        },
      ],
        }
    },
    methods: {
        logout() {
            // 清除用户认证状态（这里示例清除本地存储中的令牌）
            localStorage.removeItem("userToken");

            // 导航到登出页面或首页
            this.$router.push("/askDetail"); // 或者使用首页路径
        },
        ShowWriteDai() {
            this.showDia = true;
        },

        CloseWriteDai() {
            this.showDia = false;
        },

        addQuestionForm() {
            if (this.questionForms.length < 10) {
                this.questionForms.push({
                    question: "",
                    answer: ""
                });
            }
        },
        removeQuestionForm(index) {
            this.questionForms.splice(index, 1);
        },
        ChangePage() {
            this.page = 2
        },
        BackPage() {
            this.page = 1
        },
        addQuestion: function() {
      if (this.questions.length < 10) {
        this.questions.push({
          text: '',
          answers: [
            { selected: false, text: '' },
            { selected: false, text: '' },
            { selected: false, text: '' },
            { selected: false, text: '' },
          ],
        });
      }
    },
    removeQuestion: function(qIndex) {
      this.questions.splice(qIndex, 1);
    },
    addAnswer: function(qIndex) {
      if (this.questions[qIndex].answers.length < 4) {
        this.questions[qIndex].answers.push({ selected: false, text: '' });
      }
    },
    removeAnswer: function(qIndex, aIndex) {
      this.questions[qIndex].answers.splice(aIndex, 1);
    },
 
  },
  

    
    components: {
        askDetail,
        child2,
    }
}




</script>
<template>
    <askDetail />

    <div class="icon">
        <button @:click="ShowMainDai"> <i class="fa-solid fa-trash fs-2"></i></button>
        <button @:click="ShowWriteDai"> <i class="fa-solid fa-plus fs-2 "></i></button>
    </div>
    <div class="ShowWriteDai" v-if="showDia">

        <div class="dialog1">
            <div class="tyty">
                <button @:click="CloseWriteDai">X</button>
            </div>
            <h1>新增問卷</h1>
            <br>
            <div class="dispalyset">
                <h3>問卷名稱 :</h3>

                <input type="text" placeholder="請輸入問卷名稱" class="askheadtitle" v-model="keyinfo.askTitle">

            </div>
            <br>
            <div class="dialog1first">

                <h3>開始時間 :</h3>
                <input type="date" name="bday" v-model="keyinfo.starttime" />
                <h3> / </h3>
                <h3>結束時間 :</h3>
                <input type="date" name="bday" v-model="keyinfo.endtime" />
                <div class="dialog1firstbutton">
   
                </div>

            </div>
            <div class="dialog1content" v-for="(form, index) in questionForms" :key="index">
                <div>
    <div v-for="(question, qIndex) in questions" :key="qIndex">
      <h2>问题 {{ qIndex + 1 }}</h2>
      <input type="text" v-model="question.text" :placeholder="'请输入问题 ' + (qIndex + 1)">
      <div v-for="(answer, aIndex) in question.answers" :key="aIndex">
        <div>
          <input type="radio" :id="'radioOption' + (aIndex + 1)" :name="'radioGroup' + (qIndex + 1)" :value="'Option ' + (aIndex + 1)" v-model="answer.selected">
          <label :for="'radioOption' + (aIndex + 1)">{{ '' + (aIndex + 1) }}</label>
          <input type="text" v-model="answer.text" :placeholder="'请输入答案 ' + (aIndex + 1)">
          <button @click="removeAnswer(qIndex, aIndex)">删除回答</button>
        </div>
      </div>
      <button @click="addAnswer(qIndex)" v-if="question.answers.length < 4">新增回答</button>
      <button @click="removeQuestion(qIndex)">删除问题</button>
    </div>
    <button @click="addQuestion" v-if="questions.length < 10">新增问题</button>
  </div>


            </div>
            <br>

            <button type="button" @click="ChangePage()" class="continuebutton">確認填寫範圍</button>
            <br>
            <hr>
            <div v-if="page == 2" class="show2">
                <button style="width: 100px; height: 50px; margin-left: 44vw;" type="button" @click="BackPage()">取消回上頁</button>

                <child2 :checkinfo="keyinfo" />

            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.ShowWriteDai {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);

    z-index: 999;

    .dialog1 {
        width: 60vw;
        height: 80vh;
        background: white;
        color: #000000;
        text-align: left;
        padding: 50px 100px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        border: 1px solid rgb(0, 0, 0);
        overflow: auto;

        

        .dispalyset {
            display: flex;
            border: 0px solid rgb(0, 0, 0);
            width: 50vw;

            .askheadtitle {
                font-size: 18pt;
                width: 40vw;
            }

        }

        .dialog1first {
            display: flex;
            border: 0px solid rgb(0, 0, 0);

            .dialog1firstbutton {
                position: relative;
                left: 10vw;
            }

        }

        .dialog1content {
            border: 1px solid rgb(0, 0, 0);
            height: 30vh;

            .asktitle {
                display: flex;

            }

            .askcont {
                display: flex;
                border: 1px solid rgb(0, 0, 0);
                height: 25vh;

            }
        }

        .tyty {
            position: relative;
            font-size: 25pt;
            left: 105%;
            bottom: 5%;
            border: 0px solid rgb(0, 0, 0);
            width: 3vw;

        }

    }

    .continuebutton {
        position: relative;
        left: 85%;
    }
}

.icon {
    position: relative;
    bottom: 85%;
    left: 80%;
    width: 10vw;
    border: 0px solid black;
    justify-content: space-around;
    display: flex;
    font-size: 18pt;
}
</style>