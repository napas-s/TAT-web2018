// aboutThailand
$(document).ready(function() {
    var showChar = 800;
    var ellipsestext = "...";
    var moretext = "<div class='style-view'>Read More <i class='fa fa-plus-circle'></i></div>";
    var lesstext = "<div class='style-view'>Read Less <i class='fa fa-angle-up'></i></div>";
    $('.more').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar-1, content.length - showChar);

            var html = c + '<span class="moreelipses">'+ellipsestext+'</span><span class="morecontent"><span>' + h + '</span><div class="text-center margin_top_10"><a href="" class="morelink">'+moretext+'</a></div></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(".moreelipses").toggle();
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});

// destination_detail
$(document).ready(function() {
    var showChar = 320;
    var ellipsestext = "...";
    var moretext = "<div class='style-view'>Read More <i class='fa fa-angle-down'></i></div>";
    var lesstext = "<div class='style-view'>Read Less <i class='fa fa-angle-up'></i></div>";
    $('.more-des').each(function() {
        var content = $(this).html();

        if(content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar-1, content.length - showChar);

            var html = c + '<span class="moreelipses">'+ellipsestext+'</span><span class="morecontent"><span>' + h + '</span><div class="text-center margin_top_10"><a href="" class="morelink">'+moretext+'</a></div></span>';

            $(this).html(html);
        }
    });

    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(".moreelipses").toggle();
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});