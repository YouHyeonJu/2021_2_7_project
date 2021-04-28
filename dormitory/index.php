<?php 
include $_SERVER['DOCUMENT_ROOT'].'/dormitory/include/lib.php';
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>띄워볼래</title>
    <link rel="stylesheet" href="./src/css/style.css">
</head>
<body>
    <section class="pageWrap">
      <button class="closeBtn">닫기</button>
      <section class="cards">
        <div class="balloon"> 
          <h1 class="titleBox">띄워볼래</h1>
          <div class="page" data-page="호실명단">
            <div class="pageTop">
              <span>호실 명단</span>
              <input type="radio" class="radioBtn" name="floor" id="threeFloor" checked="checked">
              <label for="threeFloor">3층</label>
              <input type="radio" class="radioBtn" name="floor" id="fourFloor">
              <label for="fourFloor">4층</label>
            </div>
            <div class="pageContainer">
              <div class="roomBox">
                <div class="threeFloorBox">
                <?php 
                    for($k = 301; $k <= 320; $k++) {
                ?> 
                  <input type="checkbox" id="chkBox<?= $k ?>" class="chk" checked="checked">
                  <label for="chkBox<?= $k ?>"> 
                    <div class="room">
                      <div class="roomNum">
                        <?php 
                          $query3 = $db->query("select * from member where roomNum='{$k}' order by roomNum asc");
                          $count2 = $query3->rowCount();
                          $query4 = $db->query("select * from member where roomNum='{$k}'and u_print='1'");
                          $chk2 = $query4->rowCount();
                        ?>
                        <span><?= $chk2 ?>/<?= $count2 ?></span>
                        <span><?= $k ?>호</span>
                        <div class="triangleBox">
                          <div class="triangle"></div>
                        </div>
                      </div>
                      <div class="roomMember">
                        <ul>
                          <?php 
                          $query = $db->query("select * from member where roomNum='{$k}' order by roomNum asc");
                            for($l = 0; $rs = $query->fetch(); $l++) {              
                          ?>
                          <li><?= $rs->u_name ?><?php if($rs->u_print == 0){ ?><div class="led red"></div><?php } else if($rs->u_print == 1){ ?><div class="led green"></div><?php } ?></li>
                          <?php }  ?>
                        </ul>
                      </div>
                    </div>
                  </label>
                <?php } ?>
                </div>
                <div class="fourFloorBox">
                <?php 
                    for($i = 401; $i <= 421; $i++) {
                ?> 
                  <input type="checkbox" id="chkBox<?= $i ?>" class="chk" checked="checked">
                  <label for="chkBox<?= $i ?>"> 
                    <div class="room">
                      <div class="roomNum">
                        <?php 
                          $query = $db->query("select * from member where roomNum='{$i}' order by roomNum asc");
                          $count = $query->rowCount();
                          $query2 = $db->query("select * from member where roomNum='{$i}'and u_print='1'");
                          $chk = $query2->rowCount();
                        ?>
                        <span><?= $chk ?>/<?= $count ?></span>
                        <span><?= $i ?>호</span>
                        <div class="triangleBox">
                          <div class="triangle"></div>
                        </div>
                      </div>
                      <div class="roomMember">
                        <ul>
                          <?php 
                          
                            for($j = 0; $rs = $query->fetch(); $j++) { 
                                       
                          ?>
                          <li><?= $rs->u_name ?><?php if($rs->u_print == 0){ ?><div class="led red"></div><?php } else if($rs->u_print == 1){ ?><div class="led green"></div><?php } ?></li>
                          <?php }  ?>
                        </ul>
                      </div>
                    </div>
                  </label>
                <?php } ?>
                </div>
              </div>
            </div>
          </div>
          <div class="page" data-page="호실 바꾸기">
            <div class="pageTop">
              <span>호실 바꾸기</span>
            </div>
            <div class="pageContainer"></div>
          </div>
          <div class="page" data-page="공지">
            <div class="pageTop">
              <span>공지</span>
            </div>
            <div class="pageContainer">
              <form action="/dormitory/include/notice_ok.php" method="POST">
                <fieldset>
                  <legend>공지</legend>
                    <textarea name="inputText" placeholder="공지사항을 입력해주세요"></textarea>
                </fieldset>
                <button class="btn">전송</button>
              </form>
            </div>
          </div>
          <div class="page" data-page="인원체크">
            <div class="pageTop">
              <span>인원체크</span>
            </div>
            <div class="pageContainer">
              <div class="led green"></div>
             
            </div>
          </div>
        </div>
      </section>
      <section class="bubbleBox">
        <div class="bubbleContent">
          <div class="bubble" data-x="" data-y="" data-page="호실명단">1</div>
        </div>
        <div class="bubbleContent">
          <div class="bubble" data-x="" data-y="" data-page="호실 바꾸기">2</div>
        </div>
        <div class="bubbleContent">
          <div class="bubble" data-x="" data-y="" data-page="공지">3</div>
        </div>
        <div class="bubbleContent">
          <div class="bubble" data-x="" data-y="" data-page="인원체크">4</div>
        </div>
      </section>
      <section class="monsterBox">
        <div class="monsterLocate">
          <div class="Monster">
            <div class="monsterEye left" id="eye1"></div>
            <div class="monsterEye right" id="eye2"></div>
          
            <div class="monsterMouth">
              <div class="teeth left"></div>
              <div class="teeth right"></div>
            </div>
         </div>
        </div>
      </section>
    </section>
    
    
    <script src="./src/js/jquery-3.5.1.js"></script>
    <script src="./src/js/jquery-ui.js"></script>
    <script src="./src/js/script.js"></script>
</body>
</html>