
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
function move(obj,json,optional){	
	optional=optional||{};
	optional.time=optional.time || 300;
	optional.type=optional.type || 'ease-out';
	optional.fn=optional.fn || null;
	var start={};
	var dis={};
	for (var key in json){
		start[key]=parseFloat(getStyle(obj,key));
		dis[key]=json[key]-start[key];
	}
	var count=Math.round(optional.time/30);
	var n=0;
	clearInterval(obj.timer)
	obj.timer=setInterval(function(){
		n++;
		for(var key in json){
			switch(optional.type){
				case 'liner':
				var a=n/count;
				var cur=start[key]+dis[key]*a;
				break;
				case 'ease-in':
				var a=n/count;
				var cur=start[key]+dis[key]*a*a*a;
				break;
				case 'ease-out':
				var a=1-n/count;
				var cur=start[key]+dis[key]*(1-a*a*a);
				break;
			}
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[key]=cur+'px';
			}
		}

		if(n==count){
			clearInterval(obj.timer);
			optional.fn && optional.fn();
		}
	},30)
}


window.onload=window.onresize=function(){
	var H=document.documentElement.clientHeight;
	var oBox=document.getElementById('box');
	var oIcon=document.getElementById('icon');
	var aSection=oBox.children;
	var aSpan=oIcon.getElementsByTagName('span');
	var Now=0;

	oBox.style.height=H*4+'px';
	for(var i=0;i<aSection.length;i++){
		aSection[i].style.height=H+'px';
	}
	// oIcon.style.top=H/2+'px';	
	for(var i=0;i<aSpan.length;i++){
		(function(index){
			aSpan[i].onclick=function(){
				Now=index;
				tabNav();
				//oBox.style.top=-this.index*H+'px';
			}
		})(i)
	}

	function tabNav(){
		for(var j=0;j<aSpan.length;j++){
				aSpan[j].className='';
			}
			aSpan[Now].className='on';
			move(oBox,{top:-Now*H},{time:1000})
	}

	addMouseWheel(oBox,function(down){
		if(down){
			Now++;
			if(Now==aSpan.length)  Now=aSpan.length-1;
			tabNav();
		}else{
			Now--;
			if(Now==-1)  Now=0;
			tabNav();
		}
	})

	//封装滚轮事件
	function addMouseWheel(obj,fn){
		if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			//给FF添加滚轮
			obj.addEventListener('DOMMouseScroll',fnWheel,false);
		}else{
			//给其他	
			obj.onmousewheel=fnWheel;
		}
		function fnWheel(ev){
			var oEvt=ev||event;
			var down=false;
			
			if(oEvt.detail){
				down=oEvt.detail>0?true:false;
			}else{
				down=oEvt.wheelDelta>0?false:true;
			}
			
			fn(down);
			
			oEvt.preventDefault && oEvt.preventDefault();
			return false;
		}	
	}	


	//section1
	var oW=document.documentElement.clientWidth;
	var oImgBody=document.getElementById('imgBody');
	var aImgBodyLi=oImgBody.children;
	var oImgHead=document.getElementById('imgHead');
	var aImgHeadLi=oImgHead.children;
	var oPrev=document.getElementById('prev')
	var oNext=document.getElementById('next')
	var iNow=0;


	for(var i=0;i<aImgBodyLi.length;i++){
		aImgBodyLi[i].style.width=oW+'px';
	}

	for(var i=0;i<aImgHeadLi.length;i++){
		(function(index){
			aImgHeadLi[i].onclick=function(){
				iNow=index;
				tabSection1();
			}
		})(i)
	}
	oPrev.onclick=function(){
		iNow--;
		if(iNow==-1) iNow=aImgHeadLi.length-1;
		tabSection1();
	}
	oNext.onclick=function(){
		iNow++;
		if(iNow==aImgHeadLi.length) iNow=0;
		tabSection1();
	}

	function tabSection1(){
		for(var j=0;j<aImgHeadLi.length;j++){
			aImgHeadLi[j].className='';
		}
		aImgHeadLi[iNow].className='on';
		oImgBody.style.left=-iNow*oImgBody.children[0].offsetWidth+'px';
	}
	function next(){
		iNow++;
		if(iNow==aImgHeadLi.length) iNow=0;
		tabSection1();
	}
	var oListOne=document.getElementById('listOne');
	var oListLi=oListOne.getElementsByTagName('li');
	for(var i=0;i<oListLi.length;i++){
		oListLi[i].onmouseover=function(){
			this.children[1].style.height='200px';
			this.children[1].style.transition='1s all ease';
		}
		oListLi[i].onmouseout=function(){
			this.children[1].style.height='0px';
			this.children[1].style.transition='1s all ease';
		}
	}

		var oListTwoTxt=document.getElementById('listTwoTxt');
		var str="亚瑟说：'地球到底还在不在呢？我花了那么就寻找地球，找到的星球都有点像,但又不完全像。最糟的一个叫这他妈星,当地的坏脾气小动物还咬了我一口。。。。。'"
		for(var a=0;a<str.length;a++){
			var oSpan=document.createElement('span');
			oSpan.innerHTML=str[a];
			oListTwoTxt.appendChild(oSpan);
		}
		var j=0;
		var aSpan_list=oListTwoTxt.children;
		var timer_list=setInterval(function(){	
				aSpan_list[j].className='active';
				j++;
				if(j==str.length){
					clearInterval(timer_list)
				}
		},500)

		// var oElasticUl=document.getElementById('elasticUl');
		// var aElasticLi=oElasticUl.children;
		// var speed= 0;
		// var bottom=200;
		// function moveElastic(obj,iTarget){
		// 	clearInterval(obj.timer);
		// 	var timer=setInterval(function(){
		// 		speed+=(iTarget-bottom)/5;
		// 		speed*=0.7;
		// 		bottom+=speed;
		// 		obj.style.bottom=Math.round(bottom)+'px';
		// 		if(obj.style.bottom==iTarget && Math.abs(speed)<1){
		// 			clearInterval(obj.timer);
		// 		}
		// 	},300)
		// }
		
		// for(var a=0;a<aElasticLi.length;a++){
		// 	aElasticLi[a].onmouseover=function(){
		// 		moveElastic(this.children[0],0)
		// 	}
		// }






	//section2
	var oSkinList=document.getElementById('skinList');
	var aSkinImg=oSkinList.getElementsByTagName('img');
	var oSection2=oBox.children[1];
	for(var i=0;i<aSkinImg.length;i++){
		aSkinImg[i].index=i;
		aSkinImg[i].onclick=function(){
			//alert(this.index)
			switch(this.index){
				case 0:
					oSection2.className='section2 s1'
					break;
				case 1:
					oSection2.className='section2 s2'
					break;
				case 2:
					oSection2.className='section2 s3'
					break;
				case 3:
					oSection2.className='section2 s4'
					break;
				case 4:
					oSection2.className='section2 s5'
					break;
			}
		}
	}

	var oSearch_txt=document.getElementById('search_txt');
	var oSearchList=document.getElementById('searchList');
	function jsonp(options){
		options=options || {};
		if(!options.url) return;
		options.data=options.data || {};
		options.success =options.success || null;
		options.error=options.error || null;
		options.cbkey=options.cbkey || 'cb';
		options.timeout=options.timeout || 0;
		//data 少一个回调函数名
		var cbValue='jsonp'+Math.random();         //函数名随机产生  jsonp0.222999...
		options.data[options.cbkey]=cbValue.replace('.','');

		//在外面做个全局的show 属性
		window[options.data[options.cbkey]]=function(json){
			clearTimeout(timer)
			options.success && options.success(json);
			//删除script标签
			document.getElementsByTagName('head')[0].removeChild(oScript);
			window[options.data[options.cbkey]]=null;
		}

		var arr=[];
		for(var key in options.data){
			arr.push(key+'='+encodeURIComponent(options.data[key]))
		}
		var sData=arr.join('&');
		options.url=options.url+'?'+sData;  // wd=xulei&cb=jsonp....

		var oScript=document.createElement('script');
		oScript.src=options.url;
		document.getElementsByTagName('head')[0].appendChild(oScript);

		if(options.timeout){
			var timer=setTimeout(function(){
				options.error && options.error();
				window[options.data[options.cbkey]]=null;  //性能优化
			},timeout)
		}
	}

	oSearch_txt.onkeyup=function(){
		jsonp({
			url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
			data:{
				wd:oSearch_txt.value
			},
			success:function(json){
				var arr=json.s;
				oSearchList.innerHTML='';
				for(var i=0;i<arr.length;i++){
					createLi(arr[i]);
				}
			}
		})
	}

	function createLi(cont){
		var oLi=document.createElement('li');
		oLi.innerHTML=cont;
		oSearchList.appendChild(oLi)
	}

	var oChangeSkin=document.getElementById('changeSkin');
	var oSkin=document.getElementById('skin');
	var oCloseBtn=document.getElementById('closeBtn');
	var oDefaultSkin=document.getElementById('defaultSkin');
	oChangeSkin.onclick=function(){
		oChangeSkin.style.display='none';
		oChangeSkin.style.transition="0.2s all ease";
		oSkin.style.opacity='0.8';
		oSkin.style.transition="0.2s all ease";
	}
	oCloseBtn.onclick=function(){
		oChangeSkin.style.display='block';
		oChangeSkin.innerHTML="还是可以点我换肤哦~"
		oSkin.style.opacity='0';
		oSkin.style.transition="0.2s all ease";
	}

	//透明度调节
	var oScaleBtn=document.getElementById('scaleBtn');
	var oScaleBox=document.getElementById('scaleBox');
	oScaleBtn.onmousedown=function(ev){
		var oEvt=ev || event;
		var disX=oEvt.clientX-oScaleBtn.offsetLeft;
		document.onmousemove=function(ev){
			var oEvt=ev || event;
			var l=oEvt.clientX-disX;
			if(l<0) l=0;
			if(l>oScaleBox.offsetWidth-oScaleBtn.offsetWidth) l=oScaleBox.offsetWidth-oScaleBtn.offsetWidth;
			oScaleBtn.style.left=l+'px';
			oScaleBtn.parentNode.style.width=l+'px';
			oSection2.style.opacity=1-(oScaleBtn.offsetLeft/(oScaleBox.offsetWidth-oScaleBtn.offsetWidth));
		}
		document.onmouseup=function(){
			document.onmousemove=document.onmouseup=null;
			releaseCapture || releaseCapture;
		}
		setCapture || setCapture();
		return false;
	}


}






