//点击就能移动
window.onload=function(){
var  bn_imgs=document.getElementsByClassName("bn_img");
var  btns=document.getElementsByClassName("bannner-middle-box-y");
var  banner_boxs=document.getElementsByClassName("banner-boxb")[0]
var  boxcolor=["#e8e8e8","#f5f5f5","#D2EBF2","#FFFFFF","#2CB1F6"]
	for (var i = 0; i < bn_imgs.length; i++) {
		 btns[i].index=i;
		 btns[i].onmouseover=function(){
		 for (var i = 0; i < bn_imgs.length; i++) {
		 	   btns[i].style.background="#ccc"
		 	   bn_imgs[i].style.zIndex="1";
		 };
        btns[this.index].style.background="#fff"
        bn_imgs[this.index].style.zIndex="2";
        banner_boxs.style.backgroundColor=boxcolor[this.index]
		 }
	};
var lunbo=setInterval(move,3000);//move为回调函数
     var num=0;
     function move(){
     	num++;
     	if(num==btns.length){
     		num=0;
     	    }
     	for (var i = 0; i < bn_imgs.length; i++) {
     		bn_imgs[i].style.zIndex="1";
     		btns[i].style.backgroundColor="#ccc";
     	}
     	btns[num].style.backgroundColor="#fff";
        bn_imgs[num].style.zIndex="2";
        banner_boxs.style.backgroundColor=boxcolor[num];

     bn_imgs.onmouseover=function(){
            clearInterval(lunnbo)
     }
     bn_imgs.onmouseover=function(){
            lunbo=setInterval(move,3000)
     }
     }


//遮罩部分

 var items=document.getElementsByClassName("logo-middlexp");
	var masks=document.getElementsByClassName("mask");
    for (var i = 0; i < items.length; i++) {
    	items[i].index=i;
    	items[i].onmouseover=function(){
	    masks[this.index].style.opacity="0.8"
 
    }
    items[i].onmouseout=function(){
    	masks[this.index].style.opacity="0"
    }
    }; 


//侧导航和搜索栏
    var topbar=$(".topbar")[0];
        var floor=$(".liftsidebar_box")[0];
        document.documentElement.scrollTop=1;
        if(document.documentElement.scrollTop==1){
            var scrollobj=document.documentElement;
        }else{
            var scrollobj=document.body;
        }
        var flag=true,flag2=false;
        addEvent(window,"scroll",function(){
            var st=scrollobj.scrollTop;
            if(st>750){
                if(flag){
                    flag=false; flag2=true;
                animate(topbar,{top:0})
                animate(floor,{width:38,height:371})
                }
            }else{
                flag=true;flag2=false;
                animate(topbar,{top:-50})
                animate(floor,{width:0,height:0})
            }
        })
        //通过点击不同的按钮 获取对应楼层的offsetTOP
        //再把获取道德这个值通过动画
        //赋给可视窗口的scrollTop
        var floorbtn=$(".liftsidebarboxp");
        var contents=$(".logo-bboxbtwz");
        for (var i = 0; i < floorbtn.length; i++) {
            floorbtn[i].index=i;
            floorbtn[i].onclick=function(){
                var ot=contents[this.index].offsetTop;
                animate(scrollobj,{scrollTop:ot})
            }
        };
        

//右拉侧导航行
var lists=$(".banner_boxls");
var nav2s=$(".cdh")
        for (var i = 0; i < nav2s.length; i++) {
            var lis=$("div",nav2s[i]);
            var height=lis.length*3.55;
            nav2s[i].height=height;
        };
        for (var i = 0; i < lists.length; i++) {
            lists[i].index=i;
            hover(lists[i],function(){
                nav2s[this.index].style.display="block";
                animate(nav2s[this.index],{height:nav2s[this.index].height})
            },function(){
                nav2s[this.index].style.display="none";
                nav2s[this.index].style.height="0";
            })
        };

//右侧导航
var items=$(".item");
    var names=$(".name");
    var  t;
    for (var i = 0; i < items.length; i++) {
        items[i].index=i;
        hover(items[i],function(){
        var that=this
        t=setTimeout(function(){})
        clearTimeout()
        names[this.index].style.display="block";
        animate(names[this.index],{left:-100,opacity:1},300)
    },function(){
        animate(names[this.index],{left:-120,opacity:0.6},200,function(){this.style.display="none"
            
        })
    })
    };
//图片放大缩小部分
         var one=$(".tjbox-l-bodys2");
         var img=$(".img")[0];
        for (var i = 0; i < one.length; i++) {
            one[i].index=i;
            one[i].onmouseover=function(){
                var img=$("img",this);
                animate(img[0],{width:120,height:120,top:-15,left:-15},200);  
                /*console.log("in");  */ 
            }
            one[i].onmouseout=function(){
                    var img=$("img",this);
                    animate(img[0],{width:100,height:100,top:0,left:0},200);
                   /* console.log("out");  */ 
                    
            }
        };

//返回顶部
        var obj=document.documentElement;
        var hhtop=$(".boxcdhxL")[0];
            hhtop.onclick=function(){
                var obj=document.body.scrollTop==0?document.documentElement:document.body;
                animate(obj,{scrollTop:0})
            }  




//左侧导航特效2

 var leftt=$(".liftsidebarboxp");
    var text=$(".logo-bboxbtwz");
    for (var i = 0; i < leftt.length; i++) {
        leftt[i].index=i;

        leftt[i].onclick=function(){
            var ot=text[this.index].offsetTop;
            animate(document.documentElement,{scrollTop:ot}) 
        }     
        }  
           addEvent(window,"scroll",function(){
             
             var st=document.documentElement?document.documentElement:document.body;    
             var ht=st.scrollTop;
            for (var i = 0; i < text.length; i++) {
                var lt=text[i].offsetTop;
            if(ht+400>lt){
                for (var j = 0; j < leftt.length; j++) {
               leftt[j].style.background="" 
            };
            leftt[i].style.background="red"    
            };   
            } 
           })


//按需加载
    var floors=$(".lipeng");
        var arr=[];
        var doc=getDoc()
        var h=doc.clientHeight;
        for (var i = 0; i < floors.length; i++){
            arr.push(floors[i].offsetTop);
        };
        doc.scrollTop=1;
        window.onscroll=function(){
            //var scrollT=doc.scrollTop;
            for (var i = 0; i < arr.length; i++){
                  if((doc.scrollTop+h+60)>arr[i]&&floors[i].getAttribute("flag")!="true"){
                    var imgs=$("img",floors[i]);
                    for (var j= 0; j < imgs.length; j++) {
                        imgs[j].src=imgs[j].getAttribute("asrc")
                    };
                    floors[i].setAttribute("flag",true)
                  }
                    
            };
        }


//奶粉遮罩部分
 var itemss=document.getElementsByClassName("masknf");
    var maskss=document.getElementsByClassName("masknfz");
    for (var i = 0; i < itemss.length; i++) {
        itemss[i].index=i;
        itemss[i].onmouseover=function(){
        maskss[this.index].style.opacity="0.3"
 
    }
    itemss[i].onmouseout=function(){
        maskss[this.index].style.opacity="0"
    }
    }; 











}