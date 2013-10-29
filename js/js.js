$(function(){
    // закрытие .download_app при клике на "закрыть"
    $('.download_app .close').click(function(){
//        $('.download_app').animate({top: "-35px"}, 200);
        $('.download_app').hide();
        return false;
    })
});