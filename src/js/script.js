$(document).ready(function(){
    $('.carousel__inner').slick({          
        speed: 1000,  
        autoplay: true,
        autoplaySpeed: 3000,          
        prevArrow: '<button type="button" class="slick-prev"><img src="img/chevron-left-solid.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/chevron-right-solid.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {                
                    infinite: true,
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]      
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content')
          .removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });
    

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
    
        })

    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    // Modal 

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut("slow")

    });    

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })

    });   

    function validateForms(form) {
        $(form).validate( {
            rules: {
                name: {
                    required: true,
                    minlength: 2
                  },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
    
            },
            messages: {
                name: {
                    required: "Please enter your name",
                    minlength: jQuery.validator.format("At least {0} characters required!")
            },
                email: {
                  required: "We need your email address to contact you",
                  email: "Your email address must be in the format of name@domain.com"
                },
                phone : "Please enter your phone number"
            }

        });

    };

    
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+48 999 999 999");
    
    $('form').submit(function(event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {        
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    /*$('form').submit(function(e) {
        e.preventDefault();                // выкоючает перезагрузку страницы
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",       // куда отправлять запрос
            data: $(this).serialize()                  //$(this) работаем с текущими данными 
        }).done(function() {              // когда заполнение формы произошло успешно
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();  // эти формы пропадают
            $('.overlay, #thanks').fadeIn('slow'); // появляется окошко "спасибо"

            $('form').trigger('reset');   // очистка формы
        });
        return false;

    });*/
    

    // smooth scroll and pageup

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1400){
            $('.pageup').fadeIn();
        } 
        else {
            $('.pageup').fadeOut();

        }      
            

    });

    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
}); 



