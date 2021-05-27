$(document).ready(function(){
    let nums = '';
    $('.btns').mousedown(function(){
        nums += $(this).children().first().text();
        $('.showNum').val(nums);
    });
    $('.del').click(function(){
        nums = nums.slice(0,-1);
        console.log(nums);
        $('.showNum').val(nums);
    })
    $('.cancel').click(function(){
        $('.numberBtnBox').css({
            top : '-50%'
        });
        nums = '';
        $('.showNum').val(nums);
    });

    $('.register').click(function(){
        $('.numberBtnBox').css({
            top : '50%',
            transition : 'all 1s',
            zIndex : '99',
        });
    });
    let shadow = '';
    for(var i = 0; i < 10; i++){
        shadow += (shadow? ',':'')+ i*1+'px '+ i*1+'px 0 #01ded3';
    }
    $('.showNumBox').css({
        textShadow : shadow,
        fontSize : '5rem',
    });
    $('.showNum').css({
        textShadow : shadow,
        fontSize : '5rem',
    });
    $('.confirm').click(function(){
        let gradeNum = $('.showNum').val();
        alert('등록기에 등록 할 지문의 손가락을 올려주세요');
        alert('등록기에서 손가락을 뗀 후 3초후에 다시 올려주세요');
        alert(gradeNum+'학생의 지문이 등록되었습니다');
    })
});