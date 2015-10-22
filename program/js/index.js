requirejs.config({
    paths: {
        "jquery": "baseLib/jquery-1.11.3"
    }
});
require(["jquery","menu"], function($,menudata) {
    $(function(){

        $(".btn-logout").click(function(event) {
            /* Act on the event */
            alert("请重新登录");
        });
        $(".btn-modify").click(function(event) {
            /* Act on the event */
            alert("跳转修改信息");
        });
        $(".personal-info").on("click",".img-manager",function(){
            alert("跳转个人信息查看页面");
        });
        
        function renderMenu(data,tpl){
            var str="";
            if(data.length){
                data.forEach(function(elm,idx,ths){
                    var _tpl=tpl.replace("{{text}}",elm.text)
                    .replace("{{url}}",elm.url)
                    .replace("{{sub-menu-cls}}",elm["sub-menu-cls"])
                    .replace("{{fn-cls}}",elm["fn-cls"])
                    .replace("{{icon-cls}}",elm["icon-cls"]);
                    str+=_tpl;
                });
            }
            return str;
        }
        /*一级菜单切换控制*/
        var menu=$(".sub-menu .menu-list"),tpl=menu.html();
        menu.html(renderMenu(menudata["server-group"],tpl));
        menu.find("li").eq(0).siblings('li').removeClass('active');
        $(".list-menu").on("click",".menu-list .menu-item",function(){
            var cmd=$(this).attr("data-cmd"),submenu=menudata[cmd];
            $(this).addClass('active').siblings('.menu-item').removeClass('active');
            menu.html(renderMenu(submenu,tpl));
        });

        /*二级菜单切换控制*/
        var $iframe=$("#iframe"),url=$iframe.attr("src");
        $.get(url,function(data){ 
    　　　　$iframe.html(data);
    　　});
    　　$('.sub-menu').on("click","li",function() {
      　　// 找出 li 中的超链接 href(#id)
            var $this = $(this);
            $this.addClass('active');
    　　　　$this.siblings("li").removeClass("active");　
        　　　_clickTab = $this.find('a').attr('data-href'); // 找到链接a中的targer的值
    　　　　$.get(_clickTab,function(data){
    　　　　　　$iframe.html(data); 
    　　　　});
    　　});
    });
});