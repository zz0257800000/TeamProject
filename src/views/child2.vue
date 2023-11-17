<script>
export default {
    props: [
        "person",
        "checkinfo",
    ],
    methods:{
        ok(){
            alert("填寫成功")
        }
    }
}
</script>

<template>
    <div class="body">
        <div class="textshow">
            <h1 style="text-align: center;">填寫清單</h1>
            <!-- {{ this.checkinfo }} -->
            <div class="outsm">
                <div class="flexcon">
              <label for="">問卷題目：</label>
                <p v-text="checkinfo.askTitle"></p> 
            </div>
            <div class="flexcon">
                <label for="">開始時間：</label>
                <p v-text="checkinfo.starttime"></p>
                &nbsp; 

                <label for="">結束時間:</label>
                <p v-text="checkinfo.endtime"></p>
            </div>
            <div class="flexcon">

                <label for="">問答</label>
                <p v-text="checkinfo.asktexttitle"></p>
            </div>
            <div class="flexcon">

                <label for="">答案</label>
                <p v-text="checkinfo.answer"></p>
            </div>

              


                <button style="margin-left: 47vw; width: 150px; height: 50px;" v-on:click="ok()" type="button">確定填寫送出</button>
            </div>
        </div>
    </div>
</template>

<style>
.body {
    width: 60vw;
    display: flex;
    justify-content: center;
   
    .textshow {
        width: 55vw;
        height: 600px;
        border: 1px solid black;
        overflow: auto;
        background-color: #e7e7e7;
        position: relative;
        right: 10%;
    
        
       
       
        .outsm{
   
            .flexcon{
                width: 55vw;
                font-size: 20pt;
                border: 1px solid black;

                display: flex;

            }
        }
    }
}
</style>