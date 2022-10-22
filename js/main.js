// id 1601

$(document).ready(function () {
  $('#js-hamburger').on('click', function (event) {
    event.preventDefault();
    $('#header__lists-mob > li:eq(0)').fadeTo('1500', 1, function () {
      $(this).next().fadeTo('1500', 1, arguments.callee);
    });

    $(this).toggleClass('is-active');
    $('.header nav').toggleClass('active-menu');
  });

  $('.header__list').on('click', function () {
    $('.header nav').removeClass('active-menu');
    $('#js-hamburger').removeClass('is-active');
  });

  $('[data-scroll]').on('click', function (event) {
    event.preventDefault();

    let $this = $(this),
      blockId = $this.data('scroll'),
      blockOffset = $(blockId).offset().top;

    $('html, body').animate(
      {
        scrollTop: blockOffset,
      },
      500
    );
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('.footer__img').fadeIn();
    } else {
      $('.footer__img').fadeOut();
    }
  });

  $('.footer__img, .footer__img-mob').on('click', function () {
    $('body, html').animate({
      scrollTop: 0,
    });
    return false;
  });

  $('#year').text(new Date().getFullYear());

  // const dataItemFront = document.querySelectorAll('.data__item-front');
  // const dataItemBackClose = document.querySelectorAll('.data__back-close');

  // dataItemFront.forEach((item) => {
  //   item.addEventListener('click', (e) => {
  //     item.style.display = 'none';
  //     item.nextElementSibling.nextElementSibling.style.display = 'flex';
  //   });
  // });

  // dataItemBackClose.forEach((item) => {
  //   item.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     item.parentElement.style.display = 'none';
  //     item.parentElement.previousElementSibling.previousElementSibling.style.display =
  //       'flex';
  //   });
  // });

  let $loaderWrapper = $('.loader-wrapper');

  //form validator
  $.validator.addMethod(
    'emailCheck',
    function (value) {
      return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      );
    },
    'Enter your email'
  );

  $.validator.addMethod(
    'nameCheck',
    function (value) {
      return /^[a-zA-Z][a-zA-Z-' ]+[a-zA-Z']?$/u.test(value);
    },
    'Enter your name'
  );

  $('.contact__form').validate({
    rules: {
      name: {
        required: true,
        maxlength: 30,
        nameCheck: true,
      },
      surname: {
        required: true,
        maxlength: 30,
        nameCheck: true,
      },
      company: {
        required: true,
        maxlength: 30,
      },
      email: {
        required: true,
        email: true,
        maxlength: 40,
        emailCheck: true,
      },
    },
    messages: {
      name: {
        required: '<span>Enter your name</span>',
        nameCheck: '<span>Enter correct name</span>',
      },
      surname: {
        required: '<span>Enter your surname</span>',
        nameCheck: '<span>Enter correct surname</span>',
      },
      company: {
        required: '<span>Enter your company</span>',
        nameCheck: '<span>Enter correct company</span>',
      },
      email: {
        required: '<span>Enter your email</span>',
        email: '<span>Enter correct email</span>',
      },
    },
    highlight: function (element, errorClass, validClass) {
      $(element).parent('.form-field').addClass('error').removeClass('valid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).parent('.form-field').addClass('valid').removeClass('error');
    },
    submitHandler: function (form) {
      let dataStr = $(form).serialize(),
        $btn = $('.submit-btn', $(form));
      $btn.prop('disabled', 'disabled');
      $.ajax({
        type: 'POST',
        url: 'send.php',
        dataType: 'text',
        data: dataStr,
        beforeSend: function () {
          $loaderWrapper.fadeIn('slow');
        },
        error: function () {
          alert('Error occured.please try again');
          $loaderWrapper.fadeOut('slow');
          $btn.prop('disabled', '');
        },
      }).done(function () {
        $loaderWrapper.fadeOut('slow');
        $('.contact__form', $(form)).addClass('hide-form');
        $('.response', $(form)).addClass('show-response ');
      });
      return false; // required to block normal submit since you used ajax
    },
  });
  $('.success__btn').click(function () {
    $('.contact__form').addClass('hide-form');
    $('.response').addClass('show-response');
  });

  AOS.init({
    offset: 80,
    once: true,
  });
});
