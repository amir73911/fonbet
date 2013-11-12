$(function(){
    // закрытие .download_app при клике на "закрыть"
    $('.download_app .close').click(function(){
//        $('.download_app').animate({top: "-35px"}, 200);
        $('.download_app').hide();
        return false;
    });

    // установка ширины для инфоблоков, плашки под меню и таблицы Live
    setWidthToInfoblocks();
    $('.sport_results_icons').width($('.slider.type-2').width());
    $('.top_nav .sub').width($('.wrapper').width() - 10);
    $(window).resize(function(){
        setWidthToInfoblocks();
        $('.top_nav .sub').width($('.wrapper').width() - 10);
        $('.sport_results_icons').width($('.slider.type-2').width());
    });

    // установка высоты сайта
    if ($('.site').height() < $(window).height()) {
        $('.site').height($(window).height());
    }

    // закрытие всплывающих новостей
    $('.news_popups .item .close').click(function(){
        $(this).parent('.item').hide();
        return false;
    });

    // открытие левого меню
    $('.side_menu_link').click(function(){
        $('body').addClass('active');
        return false;
    });
    $('.close_side').click(function(){
        $('body').removeClass('active');
    });

    // раскрытие блока киви
    $('.qiwi .link').click(function(){
        $(this).parent('.qiwi').toggleClass('active');
        return false;
    });

    $( ".phone_numbers" ).combobox();
    $( "#toggle" ).click(function() {
        $( ".phone_numbers" ).toggle();
    });

    // подключение слайдеров
    window.mySwipe1 = $("#sl-type-1").Swipe().data('Swipe');
    window.mySwipe2 = $("#sl-type-2").Swipe().data('Swipe');
    window.mySwipe3 = $("#sl-type-3").Swipe().data('Swipe');

    // показ результатов матчей и т.п. в Live
    $('.sport_results_icons .item a').click(function(){
        var id = $(this).attr('id');

        if ($(this).parents('.item').hasClass('active')) {
            $(this).parents('.item').removeClass('active');
            $('.sport_info .item').slideUp(200);
        } else {
            $('.sport_results_icons .item').removeClass('active');
            $(this).parents('.item').addClass('active');

            $('.sport_info .item').slideUp(200);
            $('#'+id+'-info').slideDown(250);
        }



        return false;
    });

});

// установка ширины для инфоблоков
function setWidthToInfoblocks () {
    var items_count = $('.info_blocks .item').size();
    var full_width = $('.wrapper').width();
    var item_margin = 6;
    var item_padding = 13;
    $('.info_blocks .item').each(function(){
        var width = (full_width - item_margin * items_count + item_margin)/items_count;
        $(this).width(width - item_padding);
    });
}

// виджет для селекта в киви
(function( $ ) {
    $.widget( "custom.combobox", {
        _create: function() {
            this.wrapper = $( "<span>" )
                .addClass( "custom-combobox" )
                .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
                value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
                .appendTo( this.wrapper )
                .val( value )
                .attr( "title", "" )
                .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy( this, "_source" )
                })

            this._on( this.input, {
                autocompleteselect: function( event, ui ) {
                    ui.item.option.selected = true;
                    this._trigger( "select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function() {
            var input = this.input,
                wasOpen = false;

            $( "<a>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Show All Items" )
                .appendTo( this.wrapper )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "custom-combobox-toggle ui-corner-right" )
                .mousedown(function() {
                    wasOpen = input.autocomplete( "widget" ).is( ":visible" );
                })
                .click(function() {
                    input.focus();

                    // Close if already visible
                    if ( wasOpen ) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                });
        },

        _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }) );
        },

        _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if ( valid ) {
                return;
            }

            // Remove invalid value
            this.input
                .val( "" )
                .attr( "title", value + " didn't match any item" );
            this.element.val( "" );
            this._delay(function() {
                this.input.attr( "title", "" );
            }, 2500 );
            this.input.data( "ui-autocomplete" ).term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });
})( jQuery );