// Ширина окна для ресайза
WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// Отзывы
	const whySliders = [],
		why = document.querySelectorAll('.why .swiper')

	why.forEach(function (el, i) {
		el.classList.add('why_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			breakpoints: {
				0: {
					spaceBetween: 4,
					slidesPerView: 'auto'
				},
				1024: {
					spaceBetween: 10,
					slidesPerView: 5
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.item')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.item')

					items.forEach(el => el.style.height = 'auto')

					setHeight(reviews)
				}
			}
		}

		whySliders.push(new Swiper('.why_s' + i, options))
	})


	// Отзывы
	const reviewsSliders = [],
		reviews = document.querySelectorAll('.reviews .swiper')

	reviews.forEach(function (el, i) {
		el.classList.add('reviews_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			preloadImages: false,
			lazy: {
				enabled: true,
				checkInView: true,
				loadOnTransitionStart: true,
				loadPrevNext: true
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			breakpoints: {
				0: {
					spaceBetween: 4,
					slidesPerView: 'auto'
				},
				1024: {
					spaceBetween: 10,
					slidesPerView: 4
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.review')),
				resize: swiper => {
					let reviews = swiper.el.querySelectorAll('.review')

					reviews.forEach(el => el.style.height = 'auto')

					setHeight(reviews)
				}
			}
		}

		reviewsSliders.push(new Swiper('.reviews_s' + i, options))
	})


	// Маска ввода
	const phoneInputs = document.querySelectorAll('input[type=tel]')	

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			let maskPatterns = IMask(el, {
				mask: '+{7} (900) 000-00-00',
				lazy: true
			})

			let lazy = false;
			el.addEventListener("focus", (e) => {
			    maskPatterns.updateOptions({
			        lazy: lazy
			    });
			  	lazy = !lazy;
			});

			el.addEventListener("blur", (e) => {	
				maskPatterns.updateOptions({
			        lazy: lazy
			    });
			  	lazy = !lazy;
				if(el.value=="")
				{	
					el.classList.remove("active");
				}			    
			});
		})		
	}

	const dateInputs = document.querySelectorAll('input.date')	

	if (dateInputs) {
		dateInputs.forEach(el => {
			let maskPatterns = IMask(el, {
				mask: Date,
				pattern: 'd.m.0000',
				lazy: true
			})

			let lazy = false;
			el.addEventListener("focus", (e) => {
			    maskPatterns.updateOptions({
			        lazy: lazy
			    });
			  	lazy = !lazy;
			});
			el.addEventListener("blur", (e) => {	
				maskPatterns.updateOptions({
			        lazy: lazy
			    });
			  	lazy = !lazy;
				if(el.value=="")
				{	
					el.classList.remove("active");
				}			    
			});
		})		
	}

	const passportInputs = document.querySelectorAll('input.passport')	

	if (passportInputs) {
		passportInputs.forEach(el => {
			let maskPatterns = IMask(el, {
				mask: '0000 000000',
				lazy: true
			})

			let lazy = false;
			el.addEventListener("focus", (e) => {
			    maskPatterns.updateOptions({
			        lazy: lazy
			    });
			  	lazy = !lazy;
			});
			el.addEventListener("blur", (e) => {	
				maskPatterns.updateOptions({
			        lazy: lazy
			    });
			  	lazy = !lazy;
				if(el.value=="")
				{	
					el.classList.remove("active");
				}			    
			});
		})		
	}

	const podrazdelInputs = document.querySelectorAll('input.podrazdel')	

	if (podrazdelInputs) {
		podrazdelInputs.forEach(el => {
			let maskPatterns = IMask(el, {
				mask: '000-000',
				lazy: true
			})

			let lazy = false;
			el.addEventListener("focus", (e) => {
			    maskPatterns.updateOptions({
			        lazy: lazy
			    });
			  	lazy = !lazy;
			});
			el.addEventListener("blur", (e) => {	
				maskPatterns.updateOptions({
			        lazy: lazy
			    });
			  	lazy = !lazy;
				if(el.value=="")
				{	
					el.classList.remove("active");
				}			    
			});
		})		
	}


	// Выбор файла
	const fileInputs = document.querySelectorAll('form input[type=file]')

	if (fileInputs) {
		fileInputs.forEach(el => {
			el.addEventListener('change', () => el.closest('.file').querySelector('label span').innerText = el.value)
		})
	}


	// Custom selects
	const selects = document.querySelectorAll('select:not(.skip)')

	if (selects) {
		selects.forEach(el => NiceSelect.bind(el, {
			placeholder: el.getAttribute('data-placeholder')
		}))

		$('select:not(.skip)').change(function () {
			$(this).next('.nice-select').addClass('selected')
		})
	}


	// Кнопка 'Вверх'
	$('.buttonUp .btn').click((e) => {
		e.preventDefault()

		$('body, html').stop(false, false).animate({ scrollTop: 0 }, 1000)
	})


	// Ввод в поля
	$('.form .input, .form textarea').keyup(function() {
		let _self = $(this)

		setTimeout(() => {
			_self.val().length
				? _self.addClass('active')
				: _self.removeClass('active')
		})
	})


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function(e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(300)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(300)

			$item.addClass('active').find('.data').slideDown(300)
		}
	})


	// Калькулятор
	const calcSelects = document.querySelectorAll('.calc select'),
		calcNiceSelects = []

	if (calcSelects) {
		calcSelects.forEach(el => calcNiceSelects.push(NiceSelect.bind(el)))
	}


	// Set default price
	setPrice()


	// Set default date
	setDate()


	$priceRange = $('.calc #price_range').ionRangeSlider({
		min: 1000,
		max: 15000,
		from: 15000,
		step: 1000,
		postfix: ' ₽',
		onChange: data => {
			$('.calc select.price_select option').attr('selected', false)
			$('.calc select.price_select option[value='+ data.from +']').attr('selected', true)

			calcNiceSelects[0].destroy()
			calcNiceSelects[0] = NiceSelect.bind(document.querySelector('.calc select.price_select'))

			// Set price
			setPrice()

			// Set date
			setDate()
		}
	}).data('ionRangeSlider')

	$('.calc select.price_select').change(() => {
		$priceRange.update({
			from: parseInt($('.calc select.price_select').val()),
		})

		// Set price
		setPrice()

		// Set date
		setDate()
	})


	$dateRange = $('.calc #date_range').ionRangeSlider({
		min: 1,
		max: 30,
		from: 15,
		step: 1,
		postfix: ' дн.',
		onChange: data => {
			$('.calc select.date_select option').attr('selected', false)
			$('.calc select.date_select option[value='+ data.from +']').attr('selected', true)

			calcNiceSelects[1].destroy()
			calcNiceSelects[1] = NiceSelect.bind(document.querySelector('.calc select.date_select'))

			// Set price
			setPrice()

			// Set date
			setDate()
		}
	}).data('ionRangeSlider')

	$('.calc select.date_select').change(() => {
		$dateRange.update({
			from: parseInt($('.calc select.date_select').val()),
		})

		// Set price
		setPrice()

		// Set date
		setDate()
	})


	// Табы
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			const $parent           = $(this).closest('.tabs_container'),
				  activeTab         = $(this).data('content'),
				  $activeTabContent = $(activeTab),
				  level             = $(this).data('level')

			$parent.find('.tabs:first .btn').removeClass('active')
			$parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		const $activeTab        = $(`.tabs .btn[data-content="${locationHash}"]`),
			  $activeTabContent = $(locationHash),
			  $parent           = $activeTab.closest('.tabs_container'),
			  level             = $activeTab.data('level')

		$parent.find('.tabs:first .btn').removeClass('active')
		$parent.find('.tab_content.' + level).removeClass('active')

		$activeTab.addClass('active')
		$activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Заявка
	currentStep = 1

	setStep()


	$('.order .next_btn').click(function(e) {
		e.preventDefault()

		currentStep++

		setStep()
	})


	// Регистрация
	currentRegisterStep = 1

	$('.register .next_btn').click(function(e) {
		e.preventDefault()

		currentRegisterStep++

		setRegisterStep()
	})

  // Показывает/скрывает меню
  const menu = () => {
    const attr = {
      menu: 'data-menu',
      button: 'data-menu-toggle',
    };

    const cls = {
      active: 'active',
    };

    const body = document.body;
    const elem = document.querySelector(`[${attr.menu}]`);
    const button = document.querySelector(`[${attr.button}]`);
    
    if (!elem || !button) return;

    const handleClickBody = ({ target }) => {
      const hasElem = target.closest(`[${attr.menu}]`);
      const hasButton = target.closest(`[${attr.button}]`);

      if (hasElem === elem || hasButton === button) return;

      body.style.removeProperty('overflow');
      elem.classList.remove(cls.active);
      button.classList.remove(cls.active);
    };

    const handleToggleMenu = () => {
      elem.classList.toggle(cls.active);
      button.classList.toggle(cls.active);

      if (elem.classList.contains(cls.active)) {
        if (body.offsetWidth < 768) body.style.overflow = 'hidden';

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        body.style.removeProperty('overflow');
      }
    };

    body.addEventListener('click', handleClickBody);
    button.addEventListener('click', handleToggleMenu);
  };
  menu();

	// Fancybox
	Fancybox.defaults.autoFocus = false
	Fancybox.defaults.trapFocus = false
	Fancybox.defaults.dragToClose = false
	Fancybox.defaults.placeFocusBack = false
	Fancybox.defaults.l10n = {
		CLOSE: 'Закрыть',
		NEXT: 'Следующий',
		PREV: 'Предыдущий',
		MODAL: 'Вы можете закрыть это модальное окно нажав клавишу ESC'
	}


	// Modals
	$('.modal_btn').click(function(e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: document.getElementById(e.target.getAttribute('data-modal')),
			type: 'inline'
		}])
	})


	// Register
	$('.register .calc .spoler_btn').click(function(e) {
		e.preventDefault()

		$(this).toggleClass('active')

		$('.register .calc .info').slideToggle(300)
		$('.register .calc .hide').slideToggle(300)
	})


	$('.register .calc .next_auth_btn').click(function(e) {
		e.preventDefault()

		Fancybox.show([{
			src: "#load_modal",
			type: 'inline'
		}])

		setTimeout(() => {
			Fancybox.close()
			$('.register .step1_1').hide()
			$('.register .step1_2').fadeIn(300)
		}, 2000);
	})


	$('.register .passport_data_btn').click(function(e) {
		e.preventDefault()

		$(this).hide()
		$('.register .step2_3').fadeIn(300)
	})


	$('.register .no_middle_name').click(function(e) {
		if (e.target.nodeName == 'LABEL') {
			$('#middle_name').prop('disabled')
				? $('#middle_name').prop('disabled', false)
				: $('#middle_name').prop('disabled', true)
		}
	})


	$('.register .address_matches').click(function(e) {
		if (e.target.nodeName == 'LABEL') {
			setTimeout(() => {
				$(this).find('input').prop('checked')
				? $('.register .address_matches_fields').fadeOut(200)
				: $('.register .address_matches_fields').fadeIn(300)
			})
		}
	})


	$('.register .photo input').change(function(e) {
		let step = $(this).closest('.step')

		step.find('.step2_1').hide()
		step.find('.step2_2').fadeIn(300)

		// Checking
		setTimeout(() => {
			$('.register .step2_2 .checking').hide()
			$('.register .step2_2 .checked').css('display', 'flex')
			$('.register .step2_2 .submit_btn').prop('disabled', false)
		}, 1000)
	})


	// SMS code
	$('.form .request_again_btn').click(function(e) {
		e.preventDefault()

		let requestAgain = $(this).hide().next()

		$(this).hide()
		requestAgain.fadeIn(300)

		requestAgain.find('.timer').countdown(new Date().getTime() + 59000, function (event) {
			requestAgain.find('.timer').find('.minutes').text(event.strftime('%M'))
			requestAgain.find('.timer').find('.seconds').text(event.strftime('%S'))
		}).on('finish.countdown', () => {
			// Конец отсчёта
			$('.form .request_again').hide()
			$('.form .request_again_btn').fadeIn(300)
		})
	})


	$('.form .sms_code .input').keyup(function() {
		$(this).val().length
			? setTimeout(() => $(this).parent().next().find('.input').focus())
			: setTimeout(() => $(this).parent().prev().find('.input').focus())
	})


	// Соглашения в форме
	$('.form .checkbox .spoler_btn').click(function(e) {
		e.preventDefault()

		let parent = $(this).closest('.agree')

		$(this).toggleClass('active')
		parent.find('.sub').slideToggle(300)
	})


	$('.form .agree .sub .checkbox').click(function(e) {
		let parent = $(this).closest('.agree')

		setTimeout(() => {
			if (e.target.nodeName == 'LABEL') {
				parent.find('.sub .checkbox input:checked').length > 1
					? parent.find('.checkbox.agree_all input').prop('checked', true)
					: parent.find('.checkbox.agree_all input').prop('checked', false)
			}
		})
	})


	$('.form .checkbox.agree_all').click(function(e) {
		let parent = $(this).closest('.agree')

		if (e.target.nodeName == 'LABEL') {
			!$(this).find('input').prop('checked')
				? parent.find('.sub .checkbox input').prop('checked', true)
				: parent.find('.sub .checkbox input').prop('checked', false)
		}
	})


	// Мои заявки
	$('.lk .requests .waiting .timer').each(function () {
		$(this).countdown(new Date().getTime() + 60000, function (event) {
			$(this).find('.minutes').text(event.strftime('%M'))
			$(this).find('.seconds').text(event.strftime('%S'))
		})
	})

	$('.lk .requests .negative_decision .timer').each(function () {
		$(this).countdown(new Date().getTime() + 59000, function (event) {
			$(this).find('.minutes span:first-child').text(event.strftime('%M').charAt(0))
			$(this).find('.minutes span:last-child').text(event.strftime('%M').charAt(1))

			$(this).find('.seconds span:first-child').text(event.strftime('%S').charAt(0))
			$(this).find('.seconds span:last-child').text(event.strftime('%S').charAt(1))
		})
	})
})



function setRegisterStep() {
	if(currentRegisterStep==4)
	{
		// переход на страницу после последнео шага
		window.location.reload(true)
	}
	$('.register .steps .bullets > *').removeClass('active')
	$('.register .steps .names > *').removeClass('show')
	$('.register .step').hide()

	$('.register .steps .bullets > *').eq(currentRegisterStep - 1).addClass('active')
	$('.register .steps .names > *').eq(currentRegisterStep - 1).addClass('show')
	$('.register .step' + currentRegisterStep).fadeIn(300)
}


function setStep() {
	$('.order .steps .bullets > *').removeClass('active')
	$('.order .steps .names > *').removeClass('show')
	$('.order .step').hide()

	$('.order .steps .bullets > *').eq(currentStep).addClass('active')
	$('.order .steps .names > *').eq(currentStep).addClass('show')
	$('.order .step' + currentStep).fadeIn(300)

	if(currentStep == 5) {
		$('.order .steps .bullets > *').eq(4).addClass('active')
	}

	if(currentStep == 3) {
		$('.order .waiting .timer').each(function () {
			$(this).countdown(new Date().getTime() + 5000, function (event) {
				$(this).find('.minutes').text(event.strftime('%M'))
				$(this).find('.seconds').text(event.strftime('%S'))
			}).on('finish.countdown', () => {
				// Конец отсчёта
				// currentStep = 4
				currentStep = 5

				setStep()
			})
		})
	}
}



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Перезапись ширины окна
		WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth


		// Моб. версия
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



function setPrice() {
	let price = parseInt($('.calc .price_select').val()) * Math.pow(1.008, parseInt($('.calc .date_select').val()))

	$('.calc .totals .price .val .old span').text(Number((price * 1.2).toFixed(0)).toLocaleString('ru-RU'))
	$('.calc .totals .price .val .new span').text(Number(price.toFixed(0)).toLocaleString('ru-RU'))

	$('.calc .calculation .info .price span').text(parseInt($('.calc .price_select').val()))
}



function setDate() {
	const currentDate = new Date()

	currentDate.setDate(currentDate.getDate() + parseInt($('.calc .date_select').val()))

	let day = currentDate.getDate(),
		month = currentDate.getMonth() + 1,
		year = currentDate.getFullYear()

	day = (day < 10) ? '0' + day : day
	month = (month < 10) ? '0' + month : month

	let formattedDate = day + '.' + month + '.' + year

	$('.calc .totals .date .val').text(formattedDate)
	$('.calc .calculation .info .date span').text(parseInt($('.calc .date_select').val()))
}