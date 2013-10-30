$(function(){
    // закрытие .download_app при клике на "закрыть"
    $('.download_app .close').click(function(){
//        $('.download_app').animate({top: "-35px"}, 200);
        $('.download_app').hide();
        return false;
    });

    // установка ширины для инфоблоков
    setWidthToInfoblocks();
    $(window).resize(function(){
        setWidthToInfoblocks();
    });


    // открытие левого меню
    $('.side_menu_link').click(function(){
        $('body').toggleClass('active');
        return false;
    });
});

// установка ширины для инфоблоков
function setWidthToInfoblocks () {
    var items_count = $('.info_blocks .item').size();
    var full_width = $('.wrapper').width();
    var item_margin = 6;
    $('.info_blocks .item').each(function(){
        $(this).width((full_width / items_count) - ((item_margin * items_count) - 1));
        console.log(item_margin * (items_count - 1))
    });
}