let curDown = false;
let curXPos = 0;
let drag = anime();
let ease = 0;

$(window).on('mousemove touchmove', (e) => {
    let pos = e.pageX === undefined ? curXPos - e.originalEvent.touches[0].pageX : curXPos - e.pageX;
    let translate = ((pos) * -1) / 2;
    
    if (curDown) {

        if (translate > -108 && translate < 0 && $('.switch').hasClass('enable')) {
            console.log(Math.abs(translate))
            $('.bar').css('transform', 'translateX(' + translate + 'px)');
            $('.text-glow-on').css('opacity', 1 - (Math.abs(translate) / 108));
            $('.text-glow-on-bar').css('opacity', 1 - (Math.abs(translate) / 108));

            $('.text-glow-off').css('opacity', Math.abs(translate) / 108);
            $('.text-glow-off-bar').css('opacity', Math.abs(translate) / 108);
        }

        if (pos < 215 && pos > -10 && $('.switch').hasClass('disable')) {
            console.log(Math.abs(translate))
            $('.bar').css('transform', 'translateX(' + ((pos) * -1) / 2 + 'px)');

            $('.text-glow-on').css('opacity', 1 - (Math.abs(translate) / 108));
            $('.text-glow-on-bar').css('opacity', 1 - (Math.abs(translate) / 108));

            $('.text-glow-off').css('opacity', Math.abs(translate) / 108);
            $('.text-glow-off-bar').css('opacity', Math.abs(translate) / 108);
        }
    }
});

$('body').on('mousedown touchstart', '.bar', (e) => {
    let pos = e.pageX === undefined ? e.originalEvent.touches[0].pageX : e.pageX;
    curDown = true;
    drag.pause();
    curXPos = pos + ease;
});

$('body').on('mouseup touchend', (e) => {
    let pos = e.pageX === undefined ? e.originalEvent.changedTouches[0].pageX : e.pageX;
    drag.pause();

    if ($('.switch').hasClass('enable') && curDown) {
        if (((curXPos - pos) * -1) / 2 >= -43) {        
            drag = anime({
                targets: '.bar',
                translateX: 0
            });
            $('.text-glow-on').animate({ opacity: 1 }, 100);
            $('.text-glow-on-bar').animate({ opacity: 1 }, 100);
            $('.text-glow-off').animate({ opacity: 0 }, 100);
            $('.text-glow-off-bar').animate({ opacity: 0 }, 100);
        } else {
            ease = 198;
            $('.switch').removeClass('enable').addClass('disable');

            drag = anime({
                targets: '.bar',
                translateX: '-108px'
            });

            $('.text-glow-on').animate({ opacity: 0 }, 100);
            $('.text-glow-on-bar').animate({ opacity: 0 }, 100);
            $('.text-glow-off').animate({ opacity: 1 }, 100);
            $('.text-glow-off-bar').animate({ opacity: 1 }, 100);
        }
    } else if ($('.switch').hasClass('disable') && curDown) {
        if (((curXPos - pos) * -1) / 2 >= -61) {
            ease = 0;
            $('.switch').removeClass('disable').addClass('enable');

            drag = anime({
                targets: '.bar',
                translateX: 0
            });

            $('.text-glow-on').animate({ opacity: 1 }, 100);
            $('.text-glow-on-bar').animate({ opacity: 1 }, 100);
            $('.text-glow-off').animate({ opacity: 0 }, 100);
            $('.text-glow-off-bar').animate({ opacity: 0 }, 100);
        } else {
            drag = anime({
                targets: '.bar',
                translateX: '-108px'
            });

            $('.text-glow-on').animate({ opacity: 0 }, 100);
            $('.text-glow-on-bar').animate({ opacity: 0 }, 100);
            $('.text-glow-off').animate({ opacity: 1 }, 100);
            $('.text-glow-off-bar').animate({ opacity: 1 }, 100);
        }
    }

    curDown = false;
});
