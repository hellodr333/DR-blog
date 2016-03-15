
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
	var aLi=oBox.children;
	var aSpan=oIcon.getElementsByTagName('span');
	var Now=0;

	oBox.style.height=H*4+'px';
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.height=H+'px';
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
		// var l=-iNow*oImgList.children[0].offsetWidth;
		// move1(oImgList,{left:l},{time:300})
		oImgBody.style.left=-iNow*oImgBody.children[0].offsetWidth+'px';
	}
	function next(){
		iNow++;
		if(iNow==aImgHeadLi.length) iNow=0;
		tabSection1();
	}
	var timer=setInterval(next,1500);
	oPrev.onmouseover=oNext.onmouseover=function(){
		clearInterval(timer);
	}
	oPrev.onmouseout=oNext.onmouseout=function(){
		timer=setInterval(next,1500);
	}


	//section2
	var oSkinList=document.getElementById('skinList');
	var aSkinImg=oSkinList.getElementsByTagName('img');
	var oSection2=oBox.children[1];

	var z=1;
	for(var i=0;i<aSkinImg.length;i++){
		aSkinImg[i].onmouseover=function(){
			this.style.zIndex=z++;
			//move(this,{'width':'200'})
			this.style.width="200px";
			this.style.marginTop="-60px"
			this.style.marginLeft="-40px"
		}
		aSkinImg[i].onmouseout=function(){
			this.style.marginTop='0';
			this.style.marginLeft=""
			this.style.width="120px";
		}
		
	}
	for(var i=0;i<aSkinImg.length;i++){
		aSkinImg[i].index=i;
		aSkinImg[i].onclick=function(){
			//alert(this.index)
			switch(this.index){
				case 0:
				alert(0)
					oSkinList.style.className='on';
					break;
				case 1:
					oSection2.style.className='section2 s2'
					break;
				case 2:
					oSection2.style.className='section2 s3'
					break;
				case 3:
					oSection2.style.className='section2 s4'
					break;
				case 4:
					oSection2.style.className='section2 s5'
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
}






