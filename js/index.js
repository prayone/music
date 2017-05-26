$(function () {
	var targetUrl="http://119.29.254.72:3000";
	// 1.推荐新歌
	$.ajax({
		type:"GET",
		url:targetUrl+"/top/list?idx=0",
		dataType:"json",
		success:function(data){
			
			// 定义模板
			var html=template("listData",data.result);
			$(".songs").html(html);  
			//跳页面，带参数
			$('.songsUl').on('click','li',function(){
				var index=$(this).index();
				console.log(index);
				objData=data.result.tracks[index];
				var str=JSON.stringify(objData);
				localStorage.setItem("objData",str)
				var oid = $(this).attr('oid');
				window.open('detail.html?oid='+oid);
				
			});
			// 图片旋转
			$(".songsUl").on("mouseover","li",function(){
				var $that = $(this).find('img');
				$that.addClass('roll')
				$that.css('-webkit-animation-duration','3s')

			});
			$(".songsUl").on("mouseout","li",function(){
				$(this).find('img').removeClass('roll')
			});
		},
		error:function(){
			console.log("请求错误")
		}
	});
    //2.绑定搜索事件
	getList();
	$("#button").on('click',getList);
	$("#input").on('keyup',function(e){
	          if(e.keyCode === 13){
	              getList()
	          }
    });
    function getList() {
		var txt=$("#input").val();
    	$.ajax({
    		type:"GET",
    		url:targetUrl+"/search?keywords="+txt,
    		dataType:"json",
    		success:function (data) {
    			$(".songs").html('');//吧模板给清了，找不到
    			var html=template("searchData",data.result);
    			$(".songs").html(html);
				//跳页面，带参数
    			$('.songsUl').on('click','li',function(){
    				var index=$(this).index();
    				console.log(index);
    				objData=data.result.songs[index];
    				var str=JSON.stringify(objData);
    				localStorage.setItem("objData",str)
    				var oid = $(this).attr('oid');
    				window.open('detail.html?oid='+oid);
    				
    			});
    			// 图片旋转
    			$(".songsUl").on("mouseover","li",function(){
    				var $that = $(this).find('img');
    				$that.addClass('roll')
    				$that.css('-webkit-animation-duration','3s')

    			});
    			$(".songsUl").on("mouseout","li",function(){
    				$(this).find('img').removeClass('roll')
    			});
    		},
    		error:function () {
    			console.log("请求错误！")
    		}

    	});
    };
	//3.热门歌手
	$(".hotsinger").click(function(){
		$.ajax({
		    type:"GET",
		    url:targetUrl+"/top/artists?offset=0&limit=32",
		    dataType:"json",
		    success:function(data){
		    	$(".h2title").text("热门歌手")
		    	$(".songs").html('');//模板给清了，找不到
		    	var html=template("singerData",data);
		    	$(".songs").html(html);
				//跳页面，带参数
    			$('.singername').on('click','li',function(){
    				var sid = $(this).attr('sid');
    				console.log(sid);
    				window.open('singerSongs.html?sid='+sid);
    			});

		    },
		    error:function(){
		      console.log("请求错误！")
		    }
		  });
	})
	




});