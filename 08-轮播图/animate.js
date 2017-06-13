function getStyle(element,attr){
    if(window.getComputedStyle){
        return window.getComputedStyle(element,null)[attr];
    }else{
        return element.currentStyle[attr];
    }
}

function animate(element,obj,fn){
clearInterval(element.timer);

element.timer = setInterval(function(){
var flag = true;
for(var k in obj){
    var attr = k;
    var target = obj[k];
    if(k === "zIndex"){
        element.style.zIndex = target;
    }else if(k === "opacity"){
        var leader = getStyle(element,attr);
        leader = parseFloat(leader) || 0;
        leader = leader * 1000;
        target = leader * 1000;
        var step = (target - leader) / 10;
        step = step > 0 ? Math.ceil(step):Math.floor(step);

        leader = leader + step;
        element.style[attr] = leader / 1000; 
        if(leader != target){
            flag = false;
        }
    }else{
        var attr = k;
        var target = obj[k];
        var leader = getStyle(element,attr);
         leader = parseInt(leader) || 0;
         var step = (target - leader) / 10;
         step = step > 0 ? Math.ceil(step) : Math.floor(step);
         leader = leader + step;
         element.style[attr] = leader + 'px';
         if(leader != target){
             flag = false;
         }
    }

}
if(flag){
    clearInterval(element.timer);
    fn && fn();
}

},20);

}