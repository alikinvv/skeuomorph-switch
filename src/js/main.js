let curDown = false;
let curXPos = 0;
let drag = anime();
let ease = 0;

$(window).on('mousemove', (e) => {
    let pos = curXPos - e.pageX;
    let translate = ((pos) * -1) / 2;
    if (curDown) {
        console.log(translate)
        if (translate > -108 && translate < 0 && $('.bar').hasClass('disable')) {
            $('.bar').css('transform', 'translateX(' + translate + 'px)');
        }

        if (pos < 215 && pos > -10 && $('.bar').hasClass('enable')) {
            $('.bar').css('transform', 'translateX(' + ((pos) * -1) / 2 + 'px)');
        }
    }
});

$('body').on('mousedown', '.bar', (e) => {
    curDown = true;
    drag.pause();
    curXPos = e.pageX + ease;
});

$('body').on('mouseup', '.bar', (e) => {
    curDown = false;
    drag.pause();

    if ($('.bar').hasClass('disable')) {
        if (((curXPos - e.pageX) * -1) / 2 >= -43) {        
            drag = anime({
                targets: '.bar',
                translateX: 0
            });
        } else {
            ease = 198;
            $('.bar').removeClass('disable').addClass('enable');

            drag = anime({
                targets: '.bar',
                translateX: '-108px'
            });
        }
    } else if ($('.bar').hasClass('enable')) {
        if (((curXPos - e.pageX) * -1) / 2 >= -61) {
            ease = 0;
            $('.bar').removeClass('enable').addClass('disable');

            drag = anime({
                targets: '.bar',
                translateX: 0
            });
        } else {
            drag = anime({
                targets: '.bar',
                translateX: '-108px'
            });
        }
    }

    
});
