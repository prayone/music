$(function () {
	var targetUrl="http://119.29.254.72:3000";
	var sid=GetQueryString('sid')
	$.ajax({
			type:"GET",
			url:targetUrl+"/artists?id="+sid,
			dataType:"json",
			success:function(data){
				var html=template("songsData",data);
				$(".singsongs").html(html);
				// 图片旋转
				$(".songsUl").on("mouseover","li",function(){
					var $that = $(this).find('img');
					$that.addClass('roll')
					$that.css('-webkit-animation-duration','3s')

				});
				$(".songsUl").on("mouseout","li",function(){
					$(this).find('img').removeClass('roll')
				});
				//跳页面，带参数
				$('.songsUl').on('click','li',function(){
					var index=$(this).index();
					singData=data.hotSongs[index];
					var str=JSON.stringify(singData);
					localStorage.setItem("singData",str)
					var oid = $(this).attr('oid');
					console.log(oid)
					window.open('detail.html?oid='+oid);
				});

			},
			error:function(){
				console.log("请求错误")
			}
		});

	function GetQueryString(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
});