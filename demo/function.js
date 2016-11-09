   function getClass(selector,context){
   	context=context||document;
   	if(document.getElementsByClassName){
   	 return context.getElementsByClassName(selector)
    }else{
      var all=context.getElementsByTagName("*");
      var newarr=[];
      for (var i = 0; i < all.length; i++) {
      	  if(checkstr(all[i].className==selector)){
      	  	newarr.push(all[i])
      	  }
      };
      return newarr;
    }
   }
   // "one two three"   "one"
   function checkstr(lstr,str){
      var arr=lstr.split(" ")
      for (var i = 0; i < arr.length; i++) {
      	 if(arr[i]==str){
      	 	return true;
      	 }
      };
      return false;
   }
//兼容的获取或者设置元素的文本内容
  // 1先判断浏览器  
  // 2是获取还是要设置
  // 3分别执行对应的操作
  function getText(obj,text){
  	if(obj.textContent!=undefined){
        if(text==undefined){
         return obj.textContent;	
        }else{
         obj.textContent=text;	
        }
  	}else{
        if(text==undefined){
         return obj.innerText;	
        }else{
         obj.innerText=text;
        }
  	}
  }
  // 兼容性的获取某一个对象的某一个样式的方式
  //window.getComputedStyle(one,null).width
  //one.currentStyle.width
  //  one    "width"
  function getStyle(obj,attr){//对象，属性
    if(window.getComputedStyle){//ie9以上
    return window.getComputedStyle(obj,null)[attr] 	
    }else{
    return obj.currentStyle[attr] 	//ie6-8
    } 
  }
  //通过多种方式获取元素 
 function $(selector,context){
    context=context||document;
  if(typeof selector=="string"){ 
    if(selector.charAt(0)=="."){
        return getClass(selector.slice(1),context)
    }else if(selector.charAt(0)=="#"){
       return  document.getElementById(selector.slice(1))
    }else{
       return context.getElementsByTagName(selector)
    }
  }else if(typeof selector=="function"){
      // window.onload=selector;
      addEvent(window,"load",selector)  
  }   
 } 
 // 获得所有元素子节点的函数
   //获取子节点
function getChild(obj){
  var arr=[];
  var all=obj.childNodes;
  for (var i = 0; i < all.length; i++) {
    if(all[i].nodeType!=8&&!(all[i].nodeType==3&&trim(all[i].nodeValue)=="")){
      arr.push(all[i])
    }
  };
  return arr;
}
//把文本节点中的空字符串换为空
function trim(str){
  return str.replace(/^\s*|\s$/g,"")
}
 // 获取第一个元素子节点   
   function getFirst(obj){
       return getChild(obj)[0]  
   }
  // 获取最后一个元素子节点
   function getLast(obj){
       var arr=getChild(obj);
       return arr[arr.length-1];
   }
  // 获取下一个元素兄弟节点
  function getNext(obj){
     var next=obj.nextSibling;
     if(next==null){
      return null;
     }
     while(next.nodeType!=1){
        next=next.nextSibling;
        if(next==null){
          return null;
        }
     }
     return next;
  }
  //获取上一个元素兄弟节点
  function getPrevious(obj){
     var previous=obj.previousSibling;
     if(previous==null){
      return null;
     }
     while(previous.nodeType!=1){
       previous=previous.previousSibling;
       if(previous==null){
        return null;
       }
     }
     return previous;
  }
  //将一个元素插入到另一个元素的后面
   function insertAfter(oldobj,newobj){
      var next=getNext(oldobj);
      var parent=oldobj.parentNode;
      if(next){
       parent.insertBefore(newobj,next)
      }else{
       parent.appendChild(newobj) 
      }
   }

   //兼容性的绑定事件的函数
function addEvent(obj,event,callback){
        if(obj.addEventListener){
      obj.addEventListener(event,callback,false) 
        }else{
      obj.attachEvent("on"+event,callback)
        }
 }
   // 兼容性的移除绑定的事件
function removeEvent(obj,event,callback){
        if(obj.removeEventListener){
     obj.removeEventListener(event,callback,false)   
        }else{
     obj.detachEvent("on"+event,callback)     
        }
}  
//给某一个对象添加滚轮事件的函数
 function mousewheel(obj,upfun,downfun){
         if(obj.addEventListener){
          obj.addEventListener("mousewheel",scrollfun,false)
          obj.addEventListener("DOMMouseScroll",scrollfun,false)
         }else{
          obj.attachEvent("onmousewheel",scrollfun)
         }
         function scrollfun(e){
           var ev=e||window.event;
           var dir=ev.detail||ev.wheelDelta;
           if(ev.preventDefault){
             ev.preventDefault()
           }else{
             ev.returnValue=false;
           }
           if(dir==-3||dir==120){
               upfun.call(obj,ev)
           }else if(dir==3||dir==-120){
              downfun.call(obj,ev)
           }
         }
       } 


         //判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }
 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
  function getEvent(e){
    return e||window.event;
  }

  //求数中最大的值
 function getMax(arr){
 var max=arr[0];
 for (var i = 1; i < arr.length; i++) {
  if (max<arr[i]) {
    max=arr[i]
    };
   };
   return arr;
 }
//删除数组中重复的元素
 function delRep(arr){
  var newArr=[arr[0]];

  for (var i = 0; i < arr.length; i++) {
    var flag=true;
    for (var j = 0; j < newArr.length; j++) {
       if(newArr[j]==arr[i]){
        flag=false;
        break;
    }
}if(flag){
    newArr[newArr.length]=arr[i];

      };
   };
return newArr;
}


      
//对数组里面的元素进行排序
//(冒泡排序)
function sort(arr){
    for (var i = 0; i < arr.length; i++) {
       for (var j = i+1; j < arr.length; j++) {
           if(arr[i]>arr[j]){
            var temp;
            temp=arr[i];
            arr[i]=arr[j];
            arr[j]=temp;
           }
       };
    };
    return arr;

}
//删除某个指定的元素

function delVal(arr,Val){
    var newArr=[];
    for (var i = 0; i < arr.length; i++) {
        if(arr[i]!=Val)
             newArr[newArr.length]=arr[i];

    };
    return newArr;
}
//兼容性获取 滚动条
function getDoc(){
  var doc=0;
  document.documentElement.scrollTop=1;
  if (document.documentElement.scrollTop==1){
    doc=document.documentElement
  }else{
    doc=document.body
  }
return doc
}