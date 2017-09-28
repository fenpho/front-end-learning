var startBtn = document.getElementById('start');
var endBtn = document.getElementById('end');
var lis = document.getElementsByTagName('li');
var timer;

startBtn.addEventListener('click', function (event) {
	// 定时
	clearInterval(timer);
	timer = setInterval(function() {
		for(var i = 0; i < 9; i++){
			lis[i].style.backgroundColor = '#ffa600';
		}
		setTimeout(function(){}, 50);
	  	var num1,num2, num3;
	  	do{
	  		num1 = getRandomInt(0, 8);
	  		num2 = getRandomInt(0, 8);
	  		num3 = getRandomInt(0, 8);
	  	}while(num1 == num2 || num1 == num3 || num2 == num3);
	  	lis[num1].style.backgroundColor = '#' + random_str(6);
	  	lis[num2].style.backgroundColor = '#' + random_str(6);
	  	lis[num3].style.backgroundColor = '#' + random_str(6);
	}, 1000);
	this.style.color = '#fff';
	this.style.backgroundColor = '#ffa600';
	endBtn.style.color = '#ffa600';
	endBtn.style.backgroundColor = '#fff';
}, false);

endBtn.addEventListener('click', function (event) {
	clearInterval(timer);
	for(var i = 0; i < 9; i++){
		lis[i].style.backgroundColor = '#ffa600';
	}
	this.style.color = '#fff';
	this.style.backgroundColor = '#ffa600';
	startBtn.style.color = '#ffa600';
	startBtn.style.backgroundColor = '#fff';
}, false);

//随机数0~8
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//随机颜色000000~ffffff
function random_str(length) {
  var ALPHABET = 'abcdef';
  ALPHABET += '0123456789';
  var str = '';
  for (var i=0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}


 

