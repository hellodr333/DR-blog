
window.onload=function(){

	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	}
	//封装 运动 move
	function move1(obj,json,optional){
		optional = optional || {};
		optional.time = optional.time || 300;
		optional.fn = optional.fn || null;
		optional.type = optional.type || 'ease-out';
		
		var start={};
		var dis={};
		for(var key in json){
			start[key]=parseInt(getStyle(obj,key));
			dis[key]=json[key]-start[key];
		}
		
		var count=Math.round(optional.time/30);
		var n=0;
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;		
			for(var key in json){
				//办事
				switch(optional.type){
					case 'linear':
						var a = n/count;
						var cur=start[key]+dis[key]*a;
						break;
					case 'ease-in':
						var a=n/count;
						var cur=start[key]+dis[key]*a*a*a
						break;
					case 'ease-out':
						var a=1-n/count;
						var cur=start[key]+dis[key]*(1-a*a*a)
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
		},30);
	}

	//封装滚轮事件
	function addMouseWheel(obj,fn){
		if(navigator.userAgent.toLowerCase().indexOf('firefox') != -1){
			//给FF添加滚轮
			obj.addEventListener('DOMMouseScroll',fnWheel,false);
		}else{	
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

	//通过类名获取元素
	function getByClass(oParent,sClass){
		if(oParent.getElementsByClassName)
			return oParent.getElementsByClassName(sClass);

		var result=[];
		var re=new RegExp('\\b'+sClass+'\\b');
		var aEle=oParent.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++){
			if(re.test(aEle[i].className==sClass)){
				result.push(aEle[i])
			}
		}	
		return result;
	}

	//nav 
	var oFullpage=document.getElementById('fullpage');
	var aSection=oFullpage.children;
	var oImgList=document.getElementById('imgList');
	var aListBody=oImgList.children;
	var oNavList=document.getElementById('nav_list');
	var aNavbar=oNavList.children;

	//添加顶部导航滚轮事件
	addMouseWheel(window,function(down){
		var index=window.location.hash.match(/\d+/);
		if(down){
			if(index==4) {
				aNavbar[index].className='on';
				return;
			}
			for(var i=0;i<aNavbar.length;i++){
		 		aNavbar[i].className='';
		 	}
		 	aNavbar[index].className='on';

		}else{
			if(index==1){
				aNavbar[0].className='on';
				return;
			}
			for(var i=0;i<aNavbar.length;i++){
		 		aNavbar[i].className='';
		 	}
		 	aNavbar[index-2].className='on';
		}
	})
	
	
	var oHeight=document.documentElement.clientHeight;
	var oWidth=document.documentElement.clientWidth;
	for(var i=0;i<aListBody.length;i++){
		aListBody[i].style.width=oWidth+'px';
		aListBody[i].style.height=oHeight+'px';
	}

	//首屏tab
	var iNow=0;
	var oListHead=document.getElementById('imgHead')
	var oSection1=document.getElementById('section1')
	var aListHead=oListHead.children;
	var oPrev=document.getElementById('prev')
	var oNext=document.getElementById('next')
	for(var i=0;i<aListHead.length;i++){
		(function(index){
			aListHead[i].onclick=function(){
				iNow=index;
				tab();
			}
		})(i)
	}
	oPrev.onclick=function(){
		iNow--;
		if(iNow==-1) iNow=aListHead.length-1;
		tab();
	}
	oNext.onclick=function(){
		iNow++;
		if(iNow==aListHead.length) iNow=0;
		tab();
	}

	function tab(){
		for(var j=0;j<aListHead.length;j++){
			aListHead[j].className='';
		}
		aListHead[iNow].className='on';
		// var l=-iNow*oImgList.children[0].offsetWidth;
		// move1(oImgList,{left:l},{time:300})
		oImgList.style.left=-iNow*oImgList.children[0].offsetWidth+'px';
	}
	function next(){
		iNow++;
		if(iNow==aListHead.length) iNow=0;
		tab();
	}
	var timer=setInterval(next,1500);
	oPrev.onmouseover=oNext.onmouseover=function(){
		clearInterval(timer);
	}
	oPrev.onmouseout=oNext.onmouseout=function(){
		timer=setInterval(next,1500);
	}


	// 2 屏 百度
	var oSection2=document.getElementById('section2');
	
}

