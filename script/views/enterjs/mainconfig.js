require.config({
	paths:{
		jquery:"../../libs/jquery.min",
		swiper:"../../plugs/swiper.min",
        diqu:"../js/diqu2",
        commonObj:"../js/commonObj"

	}
})
require(['jquery','swiper','commonObj','diqu'],function($,swiper,commonObj,diqu){
	$(function(){
        var topSlider=new Swiper('#topSlider', {
            slidesPerView: 1,
            centeredSlides: true,
            autoplay: 3000,
            loop: true,
            autoplayDisableOnInteraction: true
        });
        commonObj.loadCanvas();
        $(window).scroll(commonObj.scrollHandler);
        $("#productul").on("touchmove",commonObj.scrollHandler);
        $(".reduce").on("click",commonObj.reducenums);
        $(".add").on("click",commonObj.addnums);
        $("#addcart").on("click",commonObj.addcart);
        if($("#cartnumbers").val()>1){
            $("#cartnumbers").hide();
        }else{
            $("#cartnumbers").show();
        }

        $(".delbtn").on("click",function(){
            $(this).parents("li").remove();
            if($(".cartlist").children('li').length < 1){
                $(".cartlist").hide();
                $(".thebottom").hide();
                $(".null_shopping").show();
            }
        });
        
        $(".clearcart").on("click",function(){
           $(".cartlist").find("li").each(function(){
            $(this).remove;
           });
            $(".cartlist").hide();
            $(".thebottom").hide();
            $(".null_shopping").show();
        });

        if($("select[name='sheng']").length>0){
            new PCAS("sheng","shi","qu","","","");
        }
        $('input[name=address_options]').change(function(){
                if($(this).val()==0)
                {
                        $('#address_form').show();
                }else
                {
                        $('#address_form').hide();
                }
        });
        $(".ifvoicenot").on("click",function(){
            $(this).parent().next().toggle();
        });
        
        $(".peraddress").on("click",function(){
            $(this).children().eq(0).children().eq(0).attr('checked','checked')
            commonObj.set_address();
        });
        $(".address_list").on("click",".delete",function(){
            $(this).parents("li").remove();
        });
        $(".address_list").on("click",".edit",commonObj.address_huitian);
        $(".submit_address").on("click",commonObj.addAddressList);
        $(".order_active_cancel").on("click",function(){
            $(this).parents(".order_form").remove();
            if($(".order_form").length < 1){
                $(".null_order").show();
            }
        });
        if($(".myorder>.public>.order_form").length < 1){
                $(".null_order").show();
        };




    })
})