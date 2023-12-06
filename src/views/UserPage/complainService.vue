<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {
   
  },
  computed: {

  }
}

</script>

<template>
    <div class="contactPosition">
   <div class="contact page">
<div class="secondtitle1">
 <h2>CONTACT-聯絡我們</h2>

</div>
<div class="secondtitle2">
  <h3>       
</h3>
  <h6>  <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">聯絡我們</a></h6>

</div>
<br>
<div class="secondContent">
  
<b>● 姓名</b>
<br>
<input type="text" class="textinput" >
<br>
<b>● 聯絡電話</b>
<br>
<input type="text" class="textinput" >
<br>
<b>● E-mail</b>
<br>
<input type="text" class="textinput" >
<br>
<b>聯絡地址</b>
<br>
<input type="text" class="textinput" >
<br>
<b>● 用餐店鋪</b>
<br>
<input type="text" class="textinput" >
<br>
<b>● 問題或建議</b>
<br>
<textarea name="" id="" cols="30" rows="10" class="textinput"></textarea>
<br>
<b>● 驗證碼</b>
<br>
<input type="text">
<br>
<br>
<button class=" ContactButton">SEND</button>
</div>
<br>


</div>
</div>
</template>
<style lang="scss" scoped>
.contactPosition{
.contact{
    display: flex;
    
    margin: 30px;
    flex-direction: column;
    border: 0px solid rgb(255, 0, 0);

    .secondtitle1{
justify-content: center;
        display: flex;
    }
    .secondtitle2{
        justify-content: space-between;
        display: flex;
        a{

            border-radius: 10px;
            padding: 5px;
            transition: all 0.5s ease; 
            text-decoration: none;
            color: black;
            &:hover {
            color: red;
            background-color: rgba(118, 118, 117, 0.5);
            }
            }

    }
.secondContent{
position: relative;
left: 20%;
border: 0px solid black;
height: 100vh;
width: 60vw;
.textinput{
    width: 59vw;


}
.ContactButton{
    border: 0px solid black;
    transition: 0.5s;
    background-color: black;
    color: white;
    width: 10vw;
    height: 5vh;
    position: relative;
    left: 39%;
    &:hover{
        background-color: red;
    }

}

}}
}
</style>
