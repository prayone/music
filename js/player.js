$(function(){
	// var objData={};
	// 获取在前一个页面存的数据并解析
	// var targetData=JSON.parse(localStorage.getItem("objData"));
	// var songname=targetData.name;
	// var album=targetData.album.name;
	// var singername=targetData.artists[0].name;
	// var blurPicUrl=targetData.album.blurPicUrl;
	var player=document.getElementById("player");
	var targetUrl="http://119.29.254.72:3000";
	var oid = GetQueryString('oid');
	// 获取播放地址
	$.ajax({
		type:"GET",
		url:targetUrl+"/music/url?id="+oid,
		dataType:"json",
		success:function(data){
			var getData=data.data;
			var musicUrl=getData[0].url;
			$("#player").attr("src",musicUrl);
		},
		error:function(){
			console.log("请求错误")
		}
	});
	// 获取歌曲详情
	$.ajax({
		type:"GET",
		url:targetUrl+"/song/detail?ids="+oid,
		dataType:"json",
		success:function(data){
			var songname=data.songs[0].name;
			var album=data.songs[0].al.name;
			var singername=data.songs[0].ar[0].name;
			var blurPicUrl=data.songs[0].al.picUrl;
			$("#songtitle").text(songname);
			$("#album").text(album);
			$("#singer").text(singername);
			$(".picUrl").attr("src",blurPicUrl);
			$(".picUrl").attr("title",songname)
			console.log(songname+album+singername)
		},
		error:function(){
			console.log("请求错误")
		}
	});
	// 获取歌词
	$.ajax({
		type:"GET",
		url:targetUrl+"/lyric?id="+oid,
		dataType:"json",
		success:function(data){
			var lyricArr = data.lrc.lyric;
			var obj = parseLyric(lyricArr);
			var html ='';
			for(var key in obj){
				html+='<li time="'+key+'">'+obj[key]+'</li>';
			}
			$('.lyrcList').html(html);
			doLyrc(obj);
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
	//歌词解析
	function parseLyric(lrc) {
	    var lyrics = lrc.split("\n");
	    var lrcObj = {};
	    for(var i=0;i<lyrics.length;i++){
	        var lyric = decodeURIComponent(lyrics[i]);
	        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
	        var timeRegExpArr = lyric.match(timeReg);
	        if(!timeRegExpArr)continue;
	        var clause = lyric.replace(timeReg,'');
	        for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
	            var t = timeRegExpArr[k];
	            var min = Number(String(t.match(/\[\d*/i)).slice(1)),
	                sec = Number(String(t.match(/\:\d*/i)).slice(1));
	            var time = min * 60 + sec;
	            lrcObj[time] = clause;
	        }
	    }
	    return lrcObj;
	}
	// 歌词滚动
	function doLyrc(obj){
		for(var key in obj){
			var timer=null;
			timer=setTimeout(function(obj){
				if(player.play()){
					$('.lyrcList').scrollTop(10)
				}
			},key);
			clearTimeout(timer);
		}
	}
// 单曲循环控制----------------------------------------------------------
	$(".loop").click(function(){
		$(".loop").toggleClass("loop1");
		if($(this).hasClass("loop1")){
			$("#player").attr("loop","loop");
		} else {
			$("#player").removeAttr("loop");
		}
	});
	// 进度条-------------------------------------------------------------------


	
});