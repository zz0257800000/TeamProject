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
  <div class="mainShowDetail">
    <div class="secondtitle2">
      <h3>
      </h3>
      <h6>
        <RouterLink class="btn" to="/"> Home</RouterLink> > <a href="">開發人員</a>
      </h6>

    </div>
    <h1>開發人員</h1>
    <br>
    <div class="developerShow">
      <div class="developerMemder">

<div class="flip-box">
  <div class="flip-box-inner">
    <div class="flip-box-front">
      <div class="informationTOP">
        <div class="informationTopPic">
          <img src="../../../public/3.jpg" height=150px>
        </div>
        <h3><i class="fa-regular fa-user"></i> :郭晴甄</h3>
        <h5>B-girl + Developer</h5>
        <h6>Tainan, Taiwan</h6>
        <h3>職位:前端工程師</h3>
        <hr>
        <div class="informationTopLink">
          <a href=""> <i class="fa-brands fa-github"></i></a>
          <a href=""><i class="fa-brands fa-instagram"></i></a>
          <a href=""><i class="fa-brands fa-facebook"></i></a>
        </div>
      </div>
    </div>
    <div class="flip-box-back">
      <h2>Back Side</h2>
      
    </div>
  </div>
</div>
</div>
      <div class="developerMemder">

        <div class="flip-box">
          <div class="flip-box-inner">
            <div class="flip-box-front">
              <div class="informationTOP">
                <div class="informationTopPic">
                  <img src="../../../public/武弄組的圖/1.jpg" height=150px>
                </div>
                <h3><i class="fa-regular fa-user"></i> :武弄組</h3>
                <h5>B-boy + Developer</h5>
                <h6>Yunlin, Taiwan</h6>
                <h3>職位:全端工程師</h3>
                <hr>
                <div class="informationTopLink">
                  <a href="https://github.com/zz0257800000?tab=repositories"> <i class="fa-brands fa-github"></i></a>
                  <a href="https://www.instagram.com/zz025784/"><i class="fa-brands fa-instagram"></i></a>
                  <a href="https://www.facebook.com/kami.siyu"><i class="fa-brands fa-facebook"></i></a>
                  <a href="https://www.youtube.com/channel/UCIgA5TcL1O_WDHc-CIBk0Tg"><i
                      class="fa-brands fa-youtube"></i></a>
                </div>
              </div>
            </div>
            <div class="flip-box-back">
              <img src="../../../public/武弄組的圖/18.jpg" alt="" class="backImg">
          
            </div>
          </div>
        </div>
      </div>
    
      <div class="developerMemder">

        <div class="flip-box">
          <div class="flip-box-inner">
            <div class="flip-box-front">
              <div class="informationTOP">
                <div class="informationTopPic">
                  <img src="../../../public/武弄組的圖/13.jpg" height=150px>
                </div>
                <h3><i class="fa-regular fa-user"></i> :蕭煜宸</h3>
                <h5>B-boy + Developer</h5>
                <h6>Taipei, Taiwan</h6>
                <h3>職位:矽谷工程師</h3>
                <hr>
                <div class="informationTopLink">
                  <a href=""> <i class="fa-brands fa-github"></i></a>
                  <a href=""><i class="fa-brands fa-instagram"></i></a>
                  <a href=""><i class="fa-brands fa-facebook"></i></a>
                </div>
              </div>
            </div>
            <div class="flip-box-back">
              <img src="../../../public/武弄組的圖/3.jpg" alt="" class="backImg">
            </div>
          </div>
        </div>
      </div>

      <div class="developerMemder">

        <div class="flip-box">
          <div class="flip-box-inner">
            <div class="flip-box-front">
              <div class="informationTOP">
                <div class="informationTopPic">
                  <img src="../../../public/武弄組的圖/12.jpg" height=150px>
                </div>
                <h3><i class="fa-regular fa-user"></i> :韓佳澄</h3>
                <h5>B-boy + Developer</h5>
                <h6>Kaohsiung, Taiwan</h6>
                <h3>職位:菜鳥工程師</h3>
                <hr>
                <div class="informationTopLink">
                  <a href=""> <i class="fa-brands fa-github"></i></a>
                  <a href=""><i class="fa-brands fa-instagram"></i></a>
                  <a href=""><i class="fa-brands fa-facebook"></i></a>
                </div>
              </div>
            </div>
            <div class="flip-box-back">
              <img src="../../../public/武弄組的圖/4.jpg" alt="" class="backImg">
            </div>
          </div>
        </div>
      </div>
      <div class="developerMemder">

        <div class="flip-box">
          <div class="flip-box-inner">
            <div class="flip-box-front">
              <div class="informationTOP">
                <div class="informationTopPic">
                  <img src="" height=150px>
                </div>
                <h3><i class="fa-regular fa-user"></i> :廖佳洪</h3>
                <h5>B-boy + Developer</h5>
                <h6>, Taiwan</h6>
                <h3>職位:XX工程師</h3>
                <hr>
                <div class="informationTopLink">
                  <a href=""> <i class="fa-brands fa-github"></i></a>
                  <a href=""><i class="fa-brands fa-instagram"></i></a>
                  <a href=""><i class="fa-brands fa-facebook"></i></a>
                </div>
              </div>
            </div>
            <div class="flip-box-back">
              <h2>Back Side</h2>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="developerMemder">
        <div class="informationTOP">
          <h3>離線中...</h3>
        </div>
      </div> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mainShowDetail {
  border: 0px solid rgb(255, 0, 0);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .secondtitle2 {
    justify-content: space-between;
    display: flex;
    border: 0px solid rgb(255, 0, 0);
    width: 90vw;

    a {

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

  .developerShow {
    border: 0px solid rgb(255, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70vh;
    width: 80vw;

    .developerMemder {
      border: 0px solid rgb(255, 0, 0);
      display: flex;
      justify-content: space-between;
      width: 15vw;
      height: 70vh;


      .informationTOP {
        background-color: rgb(239, 239, 239);
        height: 69vh;
        width: 15vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid rgb(0, 0, 0);

        .informationTopPic {
          height: 25vh;
          border: 0px solid black;
          display: flex;
          align-items: center;
          justify-content: center;

          img {

            border-radius: 50%;
          }
        }

       

        .informationTop {
          background-color: dodgerblue;
          color: white;
          transform: rotateY(180deg);
        }

      }

    }

    .flip-box {

      background-color: transparent;
      width: 15vw;
      height: 69vh;
      border: 1px solid #f1f1f1;
      perspective: 1000px;
    }

    .flip-box-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }

    .flip-box:hover .flip-box-inner {
      transform: rotateY(180deg);
    }

    .flip-box-front,
    .flip-box-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;

      .backImg {
        transform: scale(0.5)translate(-700px, -650px);
        /* 调整缩放比例和位置，可以根据需要调整值 */
        position: relative;

      } 
      .informationTopLink {
          width: 15vw;
          justify-content: space-around;
          display: flex;
          border: 0px solid black;
          font-size: 30pt;
        }
    }

    .flip-box-front {
      background-color: #bbb;
      color: black;
    }

    .flip-box-back {
      overflow: hidden;
      background-color: rgb(65, 65, 65);
      color: white;
      transform: rotateY(180deg);
    }
  }

}</style>
