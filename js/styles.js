$(function () { //quando a pagina estiver carregada

// ANIMAÇÕES E CSS

    $("#menu").click(function () {
        $(".menu-opcoes").toggle()
    });

    $(".menu-opcoes ul").children("li").hover(function () {
        $(this).css("color", "#FF331F");
    });

    $(".menu-opcoes ul").children("li").mouseleave(function () {
        $(this).css("color", "#FBFBFF");
    });


//----------------------------------------------
}); // ON READY PAGINA HTML
