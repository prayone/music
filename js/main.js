$(function () {
	// 绑定事件
	getList()
	$("#btn").on('click',getList);
	$('#search').on('keyup',function(e){
	          if(e.keyCode === 13){
	              getList()
	          }
    });
	function getList(){
			$("#showInfo").html("");
			var showInfo=$("#showInfo");
			var txt=$("#search").val();
			if(!txt){
				txt ='告白气球'
			}
			showInfo.text("正在为您查找歌词...");
			//获取用户输入的内容，并进行转码
			var url="http://119.29.254.72:3000";
		// ajax请求
		$.ajax({
			type:"POST",
			url:url,
			data:{musicname:txt},
			dataType:"json",
			success:function(data){
				//定义模板
				dataList = data;
				var obj = new Object;
				obj.list = data;
				var html=template("tmp",obj);
				showInfo.html(html);
				$('#songList').on('click','li',function(){
					var index = $(this).index();//获取选取dom数组的序号
					// var dataInfo = dataList[index];//数组中当前点击的具体一条的所有信息
					// localStorage.setItem('dimagetaList',JSON.stringify(dataList))
					// window.open('detail.html?index='+index)
					// templateRender('footer',dataInfo)
					// getListDetail(dataInfo)
				})
			},error:function(){
				showInfo.text("请求错误!");
			}
			});
		};
	})
