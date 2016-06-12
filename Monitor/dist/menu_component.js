
$(function() {
    var angleStart = -360;

    // jquery rotate animation
    function rotate(li, d) {
        $({ d: angleStart }).animate({ d: d }, {
            step: function (now) {
                $(li)
                   .css({ transform: 'rotate(' + now + 'deg)' })
                   .find('label')
                      .css({ transform: 'rotate(' + (-now) + 'deg)' });
            }, duration: 0
        });
    }

    // show / hide the options
    function toggleOptions(s) {
        $(s).toggleClass('open');
        var li = $(s).find('li');
        var deg = $(s).hasClass('half') ? 180 / (li.length - 1) : 360 / li.length;
        for (var i = 0; i < li.length; i++) {
            var d = $(s).hasClass('half') ? (i * deg) - 90 : i * deg;
            $(s).hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart);
        }
    }

    var $divMove = $(this);//鼠标可拖拽区域
    var isDrag = false;
    var startPoint = { x: 0, y: 0 }, stopPoint = { x: 0, y: 0 };


    $('.selector #7').click(function (e) {
        //alert("dsfadfasdfasdf");
        toggleOptions('.selector');
    });


    $('.selector').draggable({
        distance: 5,
        snap: "body",
        scroll: true,
        cancel: false,//whether button can be dragged
        containment: "body"//draggable scale
    },
    {
        start: function (event, ui) {
            //isDrag = true;
            startPoint.x = event.clientX;
            startPoint.y = event.clientY;
            console.log("You clicked start pos:  x:" + event.clientX + " y:" + event.clientY);
        },
        drag: function () {

        },
        stop: function (event, ui) {
            $(event.toElement).one('click', function (e) { e.stopImmediatePropagation(); });
            //isDrag = false;
            stopPoint.x = event.clientX;
            stopPoint.y = event.clientY;
            console.log("You clicked stop pos:  x:" + event.clientX + " y:" + event.clientY);
            // event.toElement is the element that was responsible
            // for triggering this event. The handle, in case of a draggable.

        }
    });//drag scale

    $('.selector').click(function (e) {
        //if (startPoint.x === stopPoint.x && startPoint.y === stopPoint.y)
        toggleOptions($(this));
    });
});

