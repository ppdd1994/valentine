$(document).ready(function(){
	var swip =new Swip();
	var boy = BoyWalk();
	$('.btn').click(function(){
		$('#sun').addClass('rotation');
			Hmlt5Audio('music/happy.wav');
			Hmlt5Audio('music/happy.wav').end(function(){Hmlt5Audio('music/circulation.wav',true)});
 			boy.walkTo(2500,450).then(function(){
 			return swip.scrollTo(1441, 6000);
 			}).then(function(){return boy.walkTo(6000,730);
 			}).then(function(){return boy.stopWalk();
 			}).then(function(){return boy.doorOpened();
 			}).then(function() {return boy.toShop(2000);
            }).then(function(){return boy.talkFlower();
            }).then(function() {return boy.outShop(2000);
            }).then(function(){return swip.scrollTo(2882, 4000);
            }).then(function(){return boy.walkTo(4000,230);
            }).then(function(){return boy.walkTo(4000,460,97);
            }).then(function(){return boy.walkTo(2000,611);
            }).then(function(){return boy.resetOriginal();
            }).then(function() {setTimeout(function() {
                    $("#girl").addClass('girl-rotate');
                    boy.rotate(function(){
                    	$('.doge').addClass('dogeSpeedIn')});
                    }, 1000);
            }).then(function(){return snowflake();

            })
 	});
 
});


//背景移动
function Swip(){
	var $wrapper = $(".wrapper");
	this.scrollTo = function(x, speed) {
        //执行动画移动
        $wrapper.css({
            'transition-timing-function': 'linear',
            'transition-duration': speed + 'ms',
            'transform': 'translate3d(-' + x + 'px,0px,0px)'
        });
    };
};

function BoyWalk() {
    // 暂停走路
    function pauseWalk() {
        $('#boy').addClass('pauseWalk').removeClass('legmove');
    };

    // 恢复走路
    function restoreWalk() {
        $('#boy').removeClass('pauseWalk');
    };

    // css3的动作变化
    function Legmove() {
        $('#boy').addClass('legmove');
    };

    // 用transition做运动
    function stratRun(options, runTime) {
        var dfdPlay = $.Deferred();
        restoreWalk();
        $('#boy').transition(
            options,
            runTime,
            'linear',
            function() {
                dfdPlay.resolve(); // 动画完成
            });
        return dfdPlay;
    };

    // 开始走路
    function walkRun(time, distX, distY) {
        time = time || 3000;
        Legmove();
        var d1 = stratRun({
            'left': distX + 'px',
            'top': distY ? distY : undefined
        }, time);
        return d1;
    };
    function doorAction(left, right, time) {
        var doorLeft = $('#dleft');
        var doorRight = $('#dright');
        var defer = $.Deferred();
        var count = 2;
        // 等待开门完成
        var complete = function() {
            if (count == 1) {
                defer.resolve();
                return;
            }
            count--;
        }
        doorLeft.transition({
            'left': left+'px'
        }, time, complete);
        doorRight.transition({
            'left': right+'px'
        }, time, complete);
        return defer;
    }

    // 走进商店
    function walkToShop(runTime) {
        var defer = $.Deferred();
        $('#boy').addClass('legmove');
        var walkPlay = stratRun({
            'transform': 'scale(0.5,0.5)',
            'opacity': 0.1
        }, 2000);
        // 走路完毕
        walkPlay.done(function() {
            $('#boy').css({
                opacity: 0
            })
            defer.resolve();
        })
        return defer;
    };

        // 走出店
        function walkOutShop(runTime) {
            var defer = $.Deferred();
            restoreWalk();
            // 开始走路
            var walkPlay = stratRun({
                    'transform': 'scale(1,1)',
                    'opacity': 1
                }, runTime)
                // 走路完毕
            walkPlay.done(function() {
                defer.resolve();
            })
            return defer;
        };

 
        // 取花
        function talkFlower() {
            // 增加延时等待效果
            var defer = $.Deferred();
            setTimeout(function() {
                // 取花
                $('#boy').addClass('slowFlolerWalk');
                defer.resolve();
            }, 1000);
            return defer;
        };
        function doge(){
	$('#logo').addClass("dogeSpeedIn");
}

    return {
        // 开始走路
        walkTo: function(time, X, Y) {
            var distX = X
            var distY = Y
            return walkRun(time, distX, distY);
        },
        // 停止走路
        stopWalk: function() {
            pauseWalk();
        },
        doorOpened:function(){
            return doorAction(700,892,2000);
        },
        toShop: function() {
            return walkToShop.apply(null, arguments);
            },
            // 走出商店
        outShop: function() {
            return walkOutShop.apply(null, arguments);
    	},
    	talkFlower: function() {
                return talkFlower();
        },
        resetOriginal: function() {
            	this.stopWalk();
            	$('#boy').removeClass('legMove slowFlolerWalk').addClass('boyOriginal');
        },
        rotate: function(callback) {
	           restoreWalk();
	           $('#boy').addClass('boy-rotate');
	           if (callback) {
	               $('#boy').on('animationend', function() {
	                   callback();
	                   $(this).off();
	               })
           }
        },


    }

};

function snowflake(){
	var snowflakeURl = [
        'images/snowflake/snowflake1.png',
        'images/snowflake/snowflake2.png',
        'images/snowflake/snowflake3.png',
        'images/snowflake/snowflake4.png',
        'images/snowflake/snowflake5.png',
        'images/snowflake/snowflake6.png'
    ]
	var $flakebox = $('#snowflake');
	function creatSnow(){
		var url=snowflakeURl[(Math.floor(Math.random()*6))];
	 	return $('<div class="snowbox" />').css({
	 		'width': '41px',
            'height': '41px',
            'position': 'absolute',
            'background-size': 'cover',
            'z-index': 100,
            'top': '-41px',
            'backgroundImage': 'url(' + url + ')'
	 	}).addClass('snowRoll');
	}
	setInterval(function(){
		var $creatEle=creatSnow();
		var startPositionLeft = Math.random() * 1400 - 100,
                startOpacity    = 1,
                endPositionTop  = 500,
                endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                duration        = 5000 + Math.random() * 5000,
                randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;
        $creatEle.css({
                left: startPositionLeft,
                opacity : randomStart
            });

            // 加入到容器
            $flakebox.append($creatEle);

            // 开始执行动画
            $creatEle.transition({
                top: endPositionTop,
                left: endPositionLeft,
                opacity: 0.7
            }, duration, 'ease-out', function() {
                $(this).remove() //结束后删除
            });

	},200)

};

function Hmlt5Audio(url, isloop) {
        var audio = new Audio(url);
        audio.autoPlay = true;
        audio.loop = isloop || false;
        audio.play();
        return {
            end: function(callback) {
                audio.addEventListener('ended', function() {
                    callback();
                }, false);
            }
        };
}





