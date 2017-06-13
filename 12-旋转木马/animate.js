function getStyle(element, attr){
  if(window.getComputedStyle){
    return window.getComputedStyle(element, null)[attr];
  }else {
    return element.currentStyle[attr];
  }
}

function animate(element, obj ,fn) {
  clearInterval(element.timer);
  
  element.timer = setInterval(function () {
    var flag = true;
    
    
    for(var k in obj) {
      
      var attr = k;
      var target = obj[k];
      
      if(k == "zIndex"){
        //如果是zIndex，不做动画，直接设置
        element.style.zIndex = target;
      }else if(k == "opacity"){
        //获取的字符串，需要转换成数值
        var leader = getStyle(element, attr);
        //2. 因为不透明度是个小数，所以不能把小数给丢了
        leader = parseFloat(leader) || 0;//0.9
        
        //3. 吧leader和target都扩大1000倍
        leader = leader * 1000;
        target = target * 1000;
        
        
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        
        //1. 需要把单位删除
        element.style[attr] = leader/1000;
        if(leader != target){
          //没到
          flag = false;
        }
      }else {
        
        //获取的字符串，需要转换成数值
        var leader = getStyle(element, attr);
        leader = parseInt(leader) || 0;
        
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step;
        element.style[attr] = leader + "px";
        if(leader != target){
          //没到
          flag = false;
        }
      }
    }
    
    
    if(flag) {
      clearInterval(element.timer);
      //动画结束的时候，调用一下fn
      //奇淫技巧
      fn && fn();
      
    }
  }, 20);
}