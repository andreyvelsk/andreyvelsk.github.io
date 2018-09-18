
$(function() {

	    setTimeout(function() {
	      $('#preloader').fadeOut('slow', function() {});
	    }, 2000);

	    		var $menulink = $(".menu-link"); //гамбургер
	    		var $menu = $(".menu_nav"); //меню на мобильном
	    		var $win = $(window),
  					$fixed = $(".menu_nav-menu"), //меню десктоп
  					limit = 200; //когда появлятся фону меню десктоп

  				checkTgl();

	    		function changeMenuStatus(){
                	$menulink.toggleClass('menu-link__active'); 
                	if($menu.is(":visible"))
                	$menu.fadeOut(100);
                	else
                	$menu.fadeIn(100);     
                	$menu.toggleClass('menu_nav_mobile__active');                	
                }

	    		$menulink.click(function(event) {
                    changeMenuStatus();
                });                


                $fixed.on("click","a", function (event) {
					//отменяем стандартную обработку нажатия по ссылке
					event.preventDefault();

					//забираем идентификатор блока с атрибута href
					var id  = $(this).attr('href'),

					//узнаем высоту от начала страницы до блока на который ссылается якорь
					top = $(id).offset().top;
					
					if ($menu.hasClass('menu_nav_mobile__active'))
						changeMenuStatus(); 

					//анимируем переход на расстояние - top
					$('body,html').animate({scrollTop: top}, 700);

				});

                //переключение фона меню
				function tgl(state) {
					$fixed.toggleClass("menu_nav__active", state);
				}  

				function checkTgl(){
					var top = $win.scrollTop();

					if (top < limit) {
					   tgl(false);
					} 
					else {
					   tgl(true);
					}
				}
				

				$win.on("scroll", function() {

					checkTgl();
					
				});


				$("#form").submit(function(e) { //устанавливаем событие отправки для формы с id=form
						e.preventDefault();
			            var form_data = $(this).serialize(); //собераем все данные из формы
			            $.ajax({
				            type: "POST", //Метод отправки
				            url: "sendform.php", //путь до php фаила отправителя
				            data: form_data,
				            success: function() {
				                   //код в этом блоке выполняется при успешной отправке сообщения
								$("#send-popup").modal('show');
							    $("#send-popup_header").text('Ваше сообщение отправлено!');
							    $("#send-popup_text").text('Я свяжусь с вами в ближайшее время!');
							    $('textarea[name="your-message"]').val("");
						     },
						    error: function(){
						    	$("#send-popup").modal('show');
						        $("#send-popup_header").text('Ошибка отправки сообщения');
						        $("#send-popup_text").text('Пожалуйста, попробуйте позже, или свяжитесь со мной по указаным контактам.');
						    }
					    });
			    });


                
});