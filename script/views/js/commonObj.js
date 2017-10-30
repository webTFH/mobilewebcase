contentMerch = '<meta charset="UTF-8">\
    <a href="%page%">\
    <div class="fl">\
    <p class="ptitle">%merchName%</p>\
    <canvas data-src="%coverPath%" ></canvas>\
	<div style="bottom:20px;position: relative;">价格:<span style="color: #ff7301;background-color: white">%price%￥</span></div>\
    <p class="bl" style="bottom:18px;position: relative"><span class="green" >%rowId%</span></p>\
    </div>\
    </a>';
pagenumberGlobla = 0;
define(function(require){
	return commonObj = {
		ajaxstatus: true,
		pagesize:12,
		loadCanvas:function(){
			var imglength = $("#productul").find("canvas").length;
			if (imglength >0 ){
				$("#productul").find("canvas").each(function(){
					var imgSrc = $(this).data("src");
					var imgObj = new Image();
					imgObj.canvas = $(this)[0];
					var cvs = imgObj.canvas.getContext("2d");
					if(cvs){
						imgObj.onload = function(){
							imgObj.canvas.width = this.width;
							imgObj.canvas.height = this.height;
							cvs.drawImage(this, 0, 0);
							$(imgObj.canvas).css("backgroud-image","none");	
						}
					}
					imgObj.src = imgSrc;
				})
			}
		},
		getData: function(pagenumber){
			$.ajax({
				type:"get",
				url:"script/test.json",
				dataType: "json",
                data: {
                    page:pagenumberGlobla,
                    row:commonObj.pagesize
                },
				success: function(result) {
                    if (result.length > 0) {
						$(".loaddiv").hide();
						for (var i = commonObj.pagesize*pagenumberGlobla; i < commonObj.pagesize*(pagenumberGlobla+1); i++) {
							console.info("load");
							if(i < result.length) {
                                commonObj.ajaxstatus = true;
                                commonObj.insertDiv(contentMerch.replace("%coverPath%", result[i].coverPath)
									.replace("%merchName%", result[i].merchName)
									.replace("%page%", result[i].page)
                                    .replace("%price%", result[i].price)
                                    .replace("%rowId%", result[i].rowId));
                                commonObj.loadCanvas();
                            }
						}
                        pagenumberGlobla++;
                	}
				},
				beforeSend: function(){
					$(".loaddiv").show();
				},
				error: function(){
					$(".loaddiv").hide();
				}
			});
		},
		insertDiv: function(html){
			var $mainDiv = $("#scrollAdd");
			$mainDiv.append(html);
		},
		scrollHandler:function(){
			var pageH = $(document).height(),
			scrollT = $(window).scrollTop(),
			windowH = $(window).height();
			if(parseInt(scrollT) + parseInt(windowH) + 50 >= parseInt(pageH)&&commonObj.ajaxstatus){
				if($("#pagenumlength").val() == "1"){	
					commonObj.ajaxstatus = false;
					commonObj.currentpage ++;
					commonObj.getData(commonObj.currentpage);
				}
				else{
					return;
				}
			}
		},
		addnums: function(){
			var number = parseInt($(this).prev().val());
			if(!isNaN(number)){
				if(number < 1){
					number = 1;
				}else{
					number += 1;
				}
			}else{
				number = 1;
			}
			$(this).prev().val(number);
		},
		reducenums: function(){
			var number = parseInt($(this).next().val());
			console.log(number);
			if(!isNaN(number)){
				if(number < 2){
					number = 1;
				}else{
					number -= 1;
				}
			}else{
				number = 1;
			}
			$(this).next().val(number);
		},
		addcart: function(e){
			e.stopPropagation();
			var number = Number($("#cartnumbers").val()),
			productImg = $("#productImg"),
			imgSrc = $("#productImg").children("img").attr("src"),
			x = productImg.offset().left +30,
			y = productImg.offset().top - 10,
			X = $("#n_1").offset().left,
			Y = $("#n_1").offset().top;
			if ($("#flydiv").length <= 0){
				$('body').append('<div id="flydiv"><img src="'+imgSrc+'" width="50" height="50"/></div>');
			}
			var $obj = $("#flydiv");
			if(!$obj.is(':animated')){
				$obj.css({'left':x,'top':y}).animate({'left':X,'top':Y - 80},500,function(){
					$obj.stop(false,false).animate({'top': Y - 10,'opacity':0},400,function(){
						$obj.fadeOut('200', function() {
							$obj.remove();
							var num = Number($(".cartnums").text());
							$(".cartnums").text(num + number);
							$(".cartnums").show();
						});
					})
				});
			}
		},
		set_address:function(){
                    var addr_id = $("input[name='address_options']:checked").val();
                    if(addr_id == 0)
                    {

                            $('#address_form').show();
                    }
                    else
                    {
                            $('#address_form').hide();

                    }
        },
        address_huitian:function(){
        	var name=$(this).parents("li").find(".name").text(),
	        	phone = $(this).parents("li").find(".phone").text(),
	        	allAddress = $(this).parents("li").find(".alladdress").html(),
	        	addressArray = allAddress.split("&nbsp;"),
        		s1 = addressArray[0],
        		s2 = addressArray[1],
        		s3 = addressArray[2],
        		addressinfo = addressArray[3]; 
        	$("#consignee").val(name);
        	$("#s1").val(s1);
        	$("#s1").trigger("change");
        	$("#s2").val(s2);
        	$("#s2").trigger("change");
        	$("#s3").val(s3);
        	$("#addressdet").val(addressinfo);
        	$("#phone_mob").val(phone);
        },
        addAddressList:function(){
        	var name = $("#consignee").val(),
        		phone= $("#phone_mob").val(),
        		s1 = $("#s1").val(),
        		s2 = $("#s2").val(),
        		s3 = $("#s3").val(),
        		addressdet = $("#addressdet").val();
        	var addressliHtml = '<li>'+
				'<p><em class="name">'+name+'</em>(<em class="phone">'+phone+'</em>)</p>'+
				'<p class="alladdress">'+s1+'&nbsp;'+s2+'&nbsp;'+s3+'&nbsp;'+addressdet+'</p>'+
				'<p class="new-line"><br></p>'+
				'<p class="address-action">'+
					'<span class="edit"><a href="#"><i class="edit_icon"></i>编辑</a></span>'+
					'<span class="delete"><a href="#" ><i class="delete_icon"></i>删除</a></span>'+
				'</p>'+
			'</li>';
			if($.trim(name)!=""&& $.trim(phone)!=""&& $.trim(s1)!=""&& $.trim(addressdet)!=""){
				$(".address_list").append(addressliHtml);
				commonObj.clearAddress();
			}
        },
        clearAddress:function(){
        	$("#consignee").val(""),
        	$("#phone_mob").val(""),
        	$("#s1").val(""),
        	$("#s2").val(""),
        	$("#s3").val(""),
        	$("#addressdet").val("");
        },

	
	}

})