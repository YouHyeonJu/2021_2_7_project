$(document).ready(function(){
    var monsterHeight = $('.monsterLocate').width();
    $('.monsterLocate').css({
        height : monsterHeight,
    });

    let bubbleHeight = $('.bubble').width();
        $('.bubble').css({
            height : bubbleHeight,
    });
    // let bubbles = document.querySelectorAll('.bubble');
    // console.log(bubbles);

    // bubbles.forEach(function(bubble){
    //     console.log(bubble.offset.top);
    // });

    function mouthClose()
    {
        $('.monsterMouth').css({
            width: '30%',
            height: '0%',
        });
        $('.teeth').css({
            borderTopWidth: '2vw',
            transition : 'all 1s',
        });
        setTimeout(function(){
            mouthOpen();
        },1000);
       
    }

    function mouthOpen() 
    {
        $('.monsterMouth').css({
            width: '30%',
            height: '30%',
        });
        $('.teeth').css({
            borderTopWidth: '2vw',
        });
    }

    // function thisOffset(ui)
    // {
    //     if(objX == undefined){
    //         let objX = ui.offset.left;
    //         let objY = ui.offset.top;
    //     } else 
    //     {

    //     }
        
    // }

    let offset;
    let x;
    let y;
    $('.bubble').draggable({
        scroll: false,
        cursor: "grab",
        
        start : function(){
            offset = $(this).offset();
             x = offset.left;
             y = offset.top;
            console.log(x,y);

            
            $(this).attr('data-x',x);
            $(this).attr('data-y',y);
            
        },
        drag: function(){
            $(this).css('z-index', 10);
            $('.monsterMouth').css({
                width: '55%',
                height: '45%',
                transition : 'all 1s',
            });
            $('.teeth').css({
                borderTopWidth: '4vw',
                transition : 'all 1s',
            });
            $('.monsterMouth').attr('data-before','Drop here!');
          
        },
        stop : function(){
            if(isRevert)
            {
                mouthClose();
            } else {
                mouthOpen();
            }
            $('.monsterMouth').attr('data-before','');
        },
       
        revert:function(event,ui){
            if(event==false){

                isRevert=false;

                return true;
            }else{

                isRevert=true;
            }
        } 
    });

    $('.bubble').mousedown(function(){
        $(this).css({
            cursor : 'grabbing',
        })
    });
    $('.bubble').mouseup(function(){
        $(this).css({
            cursor : 'grab',
        })
    });

    let delObj;
    $('.monsterMouth').droppable({
        drop:function(event,ui){
            
            
            console.log(delObj);
            if(delObj == undefined)
            {
                delObj = ui.draggable;
                
            } else 
            {
                
                console.log(delObj);
                delObj.css({
                    display : 'block',
                });
                var x = delObj.attr('data-x');
                var y = delObj.attr('data-y');
                delObj.offset({
                    top : y,
                    left : x,
                });
                
                delObj = ui.draggable;
            }
            delObj.css({
                display : 'none',
            });
            let pageName = ui.draggable.attr('data-page');
            $('.page').each(function(n,page){
                if($(page).attr('data-page') == pageName)
                {
                    $(page).css({
                        display : 'block',
                    });
                    b = $('.balloon').find('.page').first().attr('data-page');
                    console.log(b);
                } else {
                    $(page).css({
                        display : 'none',
                    });
                }
            });
            
          
            
            console.log(delObj);
        }
    });

    
    
    window.addEventListener('resize', function() {
        let monsterHeight = $('.monsterLocate').width();
        $('.monsterLocate').css({
            height : monsterHeight,
        });
        let bubbleHeight = $('.bubble').width();
        console.log(bubbleHeight);
        console.log($('.bubble').width());
        console.log($('.monsterMouth').width());
        if(bubbleHeight > ($('.monsterMouth').width() + 7))
        {
            bubbleHeight = $('.monsterMouth').width() + 7;
        }
        $('.bubble').css({
            height : bubbleHeight,
        });
        let balloonHeight = ( 100 * parseFloat($('.balloon').width()) / parseFloat($('.balloon').parent().width()) ) -20 + '%';
        console.log(balloonHeight);
        $('.balloon').css({
            height : balloonHeight,
        });
      }, true)
    
    
    // let pageWrap = document.querySelector('.pageWrap');
    // pageWrap.addEventListener('mousemove',(e) => {
    //     let eye1 = document.getElementById('eye1');
    //     let eye2 = document.getElementById('eye2');
    //     let cursorXLeft = (eye1.getBoundingClientRect().left);
    //     let cursorYLeft = (eye1.getBoundingClientRect().top);
    //     let cursorXRight = (eye2.getBoundingClientRect().left);
    //     let cursorYRight = (eye2.getBoundingClientRect().top);
    //     let cursorSpinLeft = Math.atan2(e.clientX - cursorXLeft, e.clientY - cursorYLeft);
    //     let cursorSpinRight = Math.atan2(e.clientX - cursorXRight, e.clientY - cursorYRight);
    //     let eyeSpinLeft = (cursorSpinLeft * (180/ Math.PI) * -1) + 180;
    //     let eyeSpinRight = (cursorSpinRight * (180/ Math.PI) * -1) + 180;
    //     eye1.style.transform = `rotate(${eyeSpinLeft}deg)`
    //     eye2.style.transform = `rotate(${eyeSpinRight}deg)`

        let pageWrap = document.querySelector('.pageWrap');
    pageWrap.addEventListener('mousemove',(e) => {
        let eye = document.querySelectorAll('.monsterEye');
        eye.forEach(function(eye){
            let cursorX = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
            let cursorY = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
            let cursorSpin = Math.atan2(e.clientX - cursorX, e.clientY - cursorY);
            let eyeSpin = (cursorSpin * (180/ Math.PI) * -1) + 270;
            eye.style.transform = `rotate(${eyeSpin}deg)`
        });
        
        
    });
    
    $('.page').click(function(){
            var page = $(this);
            pageClick(page);
        
    });
        
    
     
    function pageClick(page){
            let thisPage = page;
            let size =  $('.pageWrap').children(':first').attr('data-page');
            if($(thisPage).attr('data-page') != size)
            {
                console.log('다름');
                console.log(thisPage);
                console.log(size);
                $('.pageWrap').prepend(thisPage);
            $(thisPage).css({
                width : '100%',
                height : '100%',
                left : '0',
                zIndex : '99',
                backgroundColor : '#FFFFFF',
                transition : 'all 0.5s',
                cursorEvent : 'none',
            });
            $('.closeBtn').css({
                display : 'block',
            });
            } 
            
    }
        
  
    

    $('.closeBtn').click(function(){
        let page = $(this).prev();
        console.log(page);
        $('.balloon').append(page);
        $(page).css({
            width : '50%',
            height : '50%',
            left : '25%',
            zIndex : '5',
        });
        $(this).css({
            display : 'none',
        });
    });

    $('.roomNum').click(function(){
        console.log($(this).parent().parent().prev().attr('id'));
        let chk = $(this).parent().parent().prev();
        console.log($(chk).is(':checked'));
        let chkChk = $(chk).is(':checked');
        if (chkChk == true) {
            console.log($(this).next());
            $(this).next().css({
                display : 'block',
            });
            $(this).find('.triangle').css({
                transform : 'rotate(90deg)',
                transition : '0.5s',
            });
        }else if(chkChk == false){
             $(this).next().css({
                 display : 'none',
             });
             $(this).find('.triangle').css({
                 transform : 'rotate(0deg)',
                 transition : '0.5s',
             });
           
        }
        
    });

    $('.radioBtn').click(function(){
        let threeFloor = $('#threeFloor').is(':checked');
        let fourFloor = $('#fourFloor').is(':checked');
        console.log('3'+threeFloor);
        console.log('4'+fourFloor);
        if(threeFloor == true){
            $('.threeFloorBox').css({
                display : 'block'
            });
            $('.fourFloorBox').css({
                display : 'none',
            });
        } else if(fourFloor == true) {
            $('.threeFloorBox').css({
                display : 'none'
            });
            $('.fourFloorBox').css({
                display : 'block',
            });
        }
    })
            
    
    
});






