(function(){
	var jdCarousel  = document.querySelector('.jd-carousel') ;
	var jdCarouselUl = jdCarousel.querySelector('ul');
	var jdCarouselLis = jdCarouselUl.querySelectorAll('li');
	var points = jdCarousel.querySelector('ol');
	var screenWidth = document.documentElement.offsetWidth;
	var timer = null;
	// 把Li的高度赋值给UL
	jdCarouselUl.style.height = jdCarouselLis[0].offsetHeight + 'px';
	// 动态循环小圆点
	for(var i = 0; i < jdCarouselLis.length; i++){
		var li = document.createElement('li');
		if( i == 0 ){
			li.classList.add('active');
		}
		points.appendChild(li);
	}
	// 让三张图片就位
	var left = jdCarouselLis.length - 1;
	var center = 0;
	var right = 1;
	// 归位函数
	setTranslate();
	// 设置小圆点
	var pointsLi = points.querySelectorAll('li');
	timer = setInterval(showNext, 1000);
	// 手滑的整体逻辑
	var startX = 0;  // 记录开始的手指落点的变量
	var startTime = null;
	jdCarouselUl.addEventListener('touchstart',touchstartHandler);
	jdCarouselUl.addEventListener('touchmove',touchmoveHandler);
	jdCarouselUl.addEventListener('touchend',touchendHandler);
	// 滑动开始的逻辑
	function touchstartHandler (e){
		// 记录开始的时间
		startTime = new Date();
		// 手指的落点
		startX = e.changedTouches[0].clientX;
		// 清除定时器
		clearInterval(timer);
	}
	// 滑动中的的逻辑
	function touchmoveHandler(e){
		// 获取滑动的距离
		var dx = e.changedTouches[0].clientX - startX;

		// 设置过渡
		setTransition(false,false,false);

		// 归位函数
		setTranslate(dx);
	}
	// 滑动结束的逻辑
	function touchendHandler(e){
		// 最终的距离
		var dx = e.changedTouches[0].clientX - startX;
		var dTime = new Date() - startTime;
		//　判断是否滑动成功
		if(Math.abs(dx) > screenWidth/3 || (dTime < 300 && Math.abs(dx) > 30)){
			// 滑动成功
			if(dx > 0){
				// 向右滑  看到上一张
				showPrev();
			}else{
				//向左滑 看到下一张
				showNext();
			}
		}else{
			// 滑动失败
			// 设置过渡
			setTransition(true,true,true);
			// 归位函数
			setTranslate();
		}
		// 重新开始
		timer = setInterval(showNext, 1000);
	}
	// 让整体轮播图动起来
	function showNext(){
		left = center;
		center = right;
		right++;

		// 极值判断
		if(right > jdCarouselLis.length - 1){
			right = 0;
		}

		// 设置过渡
		setTransition(true,true,false);

		// 归位函数
		setTranslate();

		// 设置小圆点
		setPoints();
	}
	// 设置小圆点
	function setPoints(){
		for(var i = 0; i < pointsLi.length; i++){
			pointsLi[i].classList.remove('active');
		}
		pointsLi[center].classList.add('active');
	}
	// 上一张的逻辑
	function showPrev(){
		right = center;
		center = left;
		left--;

		// 极值判断
		if(left < 0){
			left = jdCarouselLis.length - 1;
		}
		// 设置过渡
		setTransition(false,true,true);
		// 归位函数
		setTranslate();
		// 设置小圆点
		setPoints();
	}
	// 设置移动
	function setTranslate(dx){
		dx = dx || 0;
		jdCarouselLis[left].style.transform = 'translateX('+ (-screenWidth + dx) +'px)';
		jdCarouselLis[center].style.transform = 'translateX('+ dx +'px)';
		jdCarouselLis[right].style.transform = 'translateX('+ (screenWidth + dx) +'px)';
	}
	// 设置过渡
	function setTransition(a,b,c){
		if(a){
			jdCarouselLis[left].style.transition = 'transform .5s' ;
		}else{
			jdCarouselLis[left].style.transition = null ;
		}
		if(b){
			jdCarouselLis[center].style.transition = 'transform .5s' ;
		}else{
			jdCarouselLis[center].style.transition = null ;
		}
		if(c){
			jdCarouselLis[right].style.transition = 'transform .5s' ;
		}else{
			jdCarouselLis[right].style.transition = null ;
		}
	}
})()