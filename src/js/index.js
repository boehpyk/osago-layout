import $ from 'jquery';
import popper from 'popper.js';
import bootstrap from 'bootstrap';
import inputmask from 'jquery.inputmask';
import validation from './validation';

import './gijgo/js/gijgo';

$(document).ready(function () {
    $('img.svg').each(function(){
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = $(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });

    $('.Form-form input[type=text], .Form-form input[type=tel]').on('focus', function() {
            $(this).parents('.input-group').addClass('filled');
    });
    $('.Form-form input[type=text], .Form-form input[type=tel]').on('blur', function() {
        if ($(this).val().length > 0) {
            $(this).parents('.input-group').addClass('filled');
        }
        else {
            $(this).parents('.input-group').removeClass('filled');
        }
    });


    $('#phonenumber').inputmask(
        {
            mask: "+7 999 999-9999",
            showMaskOnHover: false
        }
    );
    $('#callback-phone').inputmask({"mask": "+7 999 999-9999", showMaskOnHover: false});
    $('.Insurance-phone').inputmask({"mask": "+7 999 999-9999", showMaskOnHover: false});

    $('.goTo').click( function(e) {
        e.preventDefault();
        const scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
        }
        return false;
    });

    $('.Footer-subscribeInput').on('focus', function () {
        $(this).parent('.form-group').addClass('focused');
    });
    $('.Footer-subscribeInput').on('blur', function () {
        $(this).parent('.form-group').removeClass('focused');
    });

    $('#datepicker').datepicker({
        uiLibrary: 'bootstrap4',
        locale: 'ru-ru',
        format: 'dd.mm.yyyy',
        select: function (e, type) {
            $(e.target).parents('.input-group').addClass('filled');
        }
    });

    $('.agreement').click(function() {
        $('#agreementModal').modal();
    });

    $('.Delivery-iconImage').on('mouseover', function () {
        $(this).parents('.Delivery-iconItem').toggleClass('hovered');
    });
    $('.Delivery-iconImage').on('mouseout', function () {
        $(this).parents('.Delivery-iconItem').toggleClass('hovered');
    });

});