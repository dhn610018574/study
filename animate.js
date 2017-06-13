function animate(element, target) {
  //判断是否有定时器，有的话先清除，去除bug（越点越快）
  if (element.timer) {
    clearInterval(element.timer);
  }
  element.timer = setInterval(function () {
    var leader = element.offsetLeft;
    var step = 20;
    //判断target与leader位置，确定element往哪个方向走
    step = target > leader ? step : -step;
    //判断距离是否够一步，够一步element才跑
    if (Math.abs(target-leader)>Math.abs(step)) {
      leader = leader + step;
      element.style.left = leader + "px";
    } else {
      //不够一步的话，清除定时器，如果剩余步数不够的话，强制定位到target位置。
      clearInterval(element.timer);
      element.style.left = target + "px";
    }
  }, 16);
}