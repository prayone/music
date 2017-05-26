var s = "[00:00.00] 作曲 : 高磊"+
"[00:01.00]作词 : Jane欢欢/张维"+
"[00:19.450]洁白的婚纱 手捧着鲜花"+
"[00:23.940]美丽得像童话"+
"[00:28.110]想起那年初夏 我为你牵挂"+
"[00:32.440]在一起就犯傻"+
"[00:34.910]丘比特轻轻飞过月光下"+
"[00:39.250]潘多拉她听到了回答"+
"[00:43.610]礼堂钟声 在敲打 幸福的密码"+
"[00:52.430]哦 My Love 咱们结婚吧"+
"[00:56.950]好想和你拥有一个家"+
"[01:00.870]这一生最美的梦啊"+
"[01:05.530]有你陪伴我同闯天涯"+
"[01:09.500]哦 My Love 咱们结婚吧"+
"[01:14.100]我会用一生去爱你的"+
"[01:18.500]我愿把一切都放下"+
"[01:22.990]给你幸福的家"+
"[01:47.310]洁白的婚纱 手捧着鲜花"+
"[01:51.780]美丽得像童话"+
"[01:56.030]想起那年初夏 我为你牵挂"+
"[02:00.410]在一起就犯傻"+
"[02:02.600]丘比特轻轻飞过月光下"+
"[02:07.270]潘多拉她听到了回答"+
"[02:11.460]礼堂钟声 在敲打 幸福的密码"+
"[02:20.190]哦 My Love 咱们结婚吧"+
"[02:25.850]好想和你拥有一个家"+
"[02:29.770]这一生最美的梦啊"+
"[02:35.390]有你陪伴我同闯天涯"+
"[02:39.350]哦 My Love 咱们结婚吧"+
"[02:42.970]我会用一生去爱你的"+
"[02:48.310]我愿把一切都放下"+
"[02:52.800]给你幸福的家"+
"[02:58.460]哦 My Love 咱们结婚吧"+
"[03:02.300]好想和你拥有一个家"+
"[03:07.210]这一生最美的梦啊"+
"[03:11.920]有你陪伴我同闯天涯"+
"[03:15.770]哦 My Love 咱们结婚吧"+
"[03:20.380]我会用一生去爱你的"+
"[03:24.660]我愿把一切都放下"+
"[03:29.350]给你幸福的家";


if(typeof binlyric != 'object') {binlyric = {};}
binlyric = {
	edition:"1.1",
	obj:"",
	lyricCSS:new Object(),
	txt:"",
	index:0,
	time:new Array(),
	lyric:new Array(),
	sort:function(){ // 冒泡排序（从小到大）
		var third;
		for(var j=0;j<this.index-1;j++)
		{
			for(var i=0;i<this.index-1;i++)
			{
				if(this.time[i]>this.time[i+1])
				{
					third = this.time[i];
					this.time[i] = this.time[i+1];
					this.time[i+1] = third;
					third = this.lyric[i];
					this.lyric[i] = this.lyric[i+1];
					this.lyric[i+1] = third;
				}
			}
		}
	},
	createPanel:function(){ // 创建歌词面板
		var i=0;
		$(this.obj).html("");
		for(i=0;i<this.index;i++)
		{
			$(this.obj).append("<div>"+this.lyric[i]+"</div>");
		}
		for(i in this.lyricCSS)
		{
			$(this.obj).find("div").css(this.lyricCSS,this.lyricCSS[i]);
		}
	},
	findTags:function(index,strArray,number){ // 查找标签（包括任何扩展的标签）
		// 此方法能匹配所有格式的标签
		// 因为此方法是在后面写的，所以时间标签并没有使用此方法
		number = number || this.txt.length;
		number = (number>this.txt.length) ? this.txt.length:number;
		var i,j,complete=0,value;
		var obj = new Object();
		obj.booble = false;
		obj.value = "[";
		for(i=index;i<number;i++)
		{
			if(this.txt.substr(i,1)==strArray[complete].s)
			{
				complete+=1;
				if(complete>1)
				{
					if(complete<strArray.length)
					{
						obj.value += '{value:"'+this.txt.substr(value+1,i-value-1)+'"},';
					}
					else
					{
						obj.value += '{value:"'+this.txt.substr(value+1,i-value-1)+'"}]';
					}
				}
				if(complete==strArray.length)
				{
					obj.txt = this.txt.substr(index,i-index+1);
					obj.value = eval('('+obj.value+')');
					obj.index = i+1;
					obj.booble = true;
					break
				}
				value = i;
			}
			else if(this.txt.substr(i,1)=="\n")
			{
				obj.booble = false;
				return obj;
			}
			else if(this.txt.substr(i,1)==strArray[0].s && complete>0) // 遇到2次开始标志就退出
			{
				obj.booble = false;
				return obj;
			}
		}
		return obj;
	},
	findlyric:function(index){ // 查找歌词： 有则返回 歌词、继续查找的位置， 否则只返回继续查找的位置
		var obj = {};
		var str = this.txt;
		var i;
		for(i=index;i<str.length;i++)
		{
			if(str.charAt(i)=="[")
			{
				var _obj = this.findTags(i,[{s:"["},{s:":"},{s:"]"}]);
				if(_obj.booble)
				{
					obj.index = i;//i + _obj.txt.length;
					obj.lyric = str.substr(index,i-index);
					return obj;
				}
			}
			else if(str.charAt(i)=="\n")
			{
				obj.index = i+1;
				obj.lyric = str.substr(index,i-index);
				return obj
			}
		}
		if(i==str.length) // 专处理最后一句歌词（最后一句歌词比较特殊）
		{
			obj.index = i+1;
			obj.lyric = str.substr(index,i-index);
			return obj;
		}
		obj.index = i;
		return obj;
	},
	findTime:function(index){ // 查找时间 ： 有则返回 时间、继续查找的位置， 否则只返回继续查找的位置
		// 此功能可以用 findTags 方法实现，更简单、更强大、代码更少
		// findTags方法 是在后面写的，所以这里就不改了，具体可参考 findID方法里的使用实例
		var obj = {};
		var thisobj = this;
		var str = this.txt;
		obj.index = index;
		function recursion()
		{
			var _obj = thisobj.findTime(obj.index);
			if(_obj.time)
			{
				obj.time += _obj.time;
				obj.index = _obj.index;
			}
		}
		// --------------- 可以在这里 扩展 其它功能 ---------------
		// lrc歌词只能精确到每句歌词，可以通过扩展lrc 精确 到 每个字
		if(/\[\d{1,2}\:\d{1,2}\.\d{1,2}\]/.test(str.substr(index,10))) // [mm:ss.ff]
		{
			obj.time = str.substr(index+1,8) + "|";
			obj.index = index+9+1;
			recursion();
		}
		else if(/\[\d{1,2}\:\d{1,2}\]/.test(str.substr(index,7))) // [mm:ss]
		{
			obj.time = str.substr(index+1,5) + ".00" + "|";
			obj.index = index+6+1;
			recursion();
		}
		// 以下标签均属于合法标签，但很少被使用，请根据需要进行扩展
		// [mm:ss.f] [mm:s.ff] [mm:s.f] [m:ss.ff] [m:s.ff] [m:s.f]
		// [mm:s] [m:ss] [s:s]
		return obj;
	},
	findID:function(index){ // 查找预定义标识
		//[ar:艺人名]
		//[ti:曲名]
		//[al:专辑名]
		//[by:编者（指编辑LRC歌词的人）]
		//[offset:时间补偿值] 其单位是毫秒，正值表示整体提前，负值相反。这是用于总体调整显示快慢的。（很少被使用）
		// 注：本程序也不支持 offset 功能（但是能取值），如需要 请自行在 sort 方法添加此功能
		// 此处功能 使用 findTags方法 实现
		var obj;
		obj = this.findTags(index,[{s:"["},{s:":"},{s:"]"}]);
		if(obj.booble)
		{
			if(obj.value[0].value=="ar")
			{
				this.ar = obj.value[1].value;
			}
			else if(obj.value[0].value=="ti")
			{
				this.ti = obj.value[1].value;
			}
			else if(obj.value[0].value=="al")
			{
				this.al = obj.value[1].value;
			}
			else if(obj.value[0].value=="by")
			{
				this.by = obj.value[1].value;
			}
			else if(obj.value[0].value=="offset") // 这里是 offset 的值
			{
				this.offset = obj.value[1].value;
			}
		}
	},
	analysis:function(){ // 解析
		if(this.txt=="") return false;
		var str = this.txt;
		this.index = 0;
		for(var i=0;i<str.length;i++)
		{
			if(str.charAt(i)=="[")
			{
				var time = this.findTime(i); 
				if(time.time) // 时间标签
				{
					var lyric = this.findlyric(time.index);
					if(lyric.lyric!="\n" && lyric.lyric!="") // 去掉无意义歌词
					{
						var timeArray = time.time.split("|");
						for(var j=0;j<timeArray.length;j++)
						{
							if(timeArray[j])
							{
								this.time[this.index] = timeArray[j];
								this.lyric[this.index] = lyric.lyric;
								this.index+=1;
							}
						}
					}
					i = time.index;
				}
				else // 预定义标签
				{
					this.findID(i);
				}
			}
		}
		this.sort();
		this.createPanel();
	},
	play:function(position,CSS){ // 定位指定时间的歌词
		var time;
		var obj = this;
		function set(index)
		{
			var height = parseInt($(obj.obj).find("div").css("height"));
			var top = parseInt($(obj.obj).find("div").css("margin-top"));
			$(obj.obj).animate({
				scrollTop:(index*height+index*top-parseInt($(obj.obj).css("height"))/2+height/2)
			},300);
			for(var i in CSS)
			{
				$(obj.obj).find("div").eq(index).css(CSS,CSS[i]);
			}
		}
		for(var i=0;i<this.index;i++)
		{
			if(position==this.time[i])
			{
				Set(i);
				return;
			}
			else if(position>this.time[i])
			{
				time = i;
			}
		}
		set(time);// 没找到匹配时间 则就近最小选择
	}
};

binlyric.txt = s;
binlyric.obj = ".lyricPanel";
binlyric.lyricCSS = {"font-size":"16px","margin-top":"15px","text-align":"center"};
binlyric.analysis();
binlyric.play("01:20.22",{
	color:"red"
});
alert("艺人名："+binlyric.ar);
alert("专辑名："+binlyric.al);
alert("歌词编者："+binlyric.by);
alert("歌曲名："+binlyric.ti);





//[ti:有谁能够一夜之间长大]
//[ar:戊道子]
//[al:有谁能够一夜之间长大]
//[by:珍妮]
//匹配时间为: 04 分 44 秒 的歌曲
//[00:00]我爱歌词网 [www.5ilrc.com]
//[00:00.90]有谁能够一夜之间长大 - 戊道子
//[00:07.10]词：[盘子]
//[00:10.99]曲：[陈绍楠]
//[00:13.11]编曲：[SEVEN]
//[00:16.76][00:17]
//[00:35.44][02:09]走去忘记 旧的人旧的自己
//[00:42.60][02:16.16]远离回忆 找个人说我爱你
//[00:49.79][02:23.22]别带着沉重去飞行
//[00:53.31][02:26.68]别怀疑内心深处的勇气
//[00:56.88][02:30.34]放纵地拥抱晨曦
//[01:00.16][02:33.61]在路上遇见新的自己
//[01:06.52][03:11.60]有谁能够一夜之间长大
//[01:13.65][03:18.93]爱情碾过还能喘气就不算差
//[01:20.73][03:25.99]何必羡慕那不凋败的塑料花
//[01:27.66][03:32.96]没有花期不会枯萎 难道美吗
//[01:34.76][03:40]尽情亲吻爱情留下的疤
//[01:41.66][03:46.96]童话也不只是有水晶鞋和白马
//[01:49.01][03:54.40]何必为了一段插曲哭到沙哑
//[01:55.91][04:01.08]过程不留遗憾结果也就伟大
//[04:13.18]Lrc By：珍妮 QQ：929964514




