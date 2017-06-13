/**
 * Created by HUCC on 2017/4/3.
 */
function getStyle(element, attr){
  if(window.getComputedStyle){
    return window.getComputedStyle(element, null)[attr];
  }else {
    return element.currentStyle[attr];
  }
}

function animate(element, obj) {
  clearInterval(element.timer);
  
  element.timer = setInterval(function () {
    var flag = true;
    
    for(var k in obj) {
      var attr = k;
      var target = obj[k];
      
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
    
    
    if(flag) {
      clearInterval(element.timer);
    }
  }, 20);
}