$(document).ready(function() {

    $('#top-callback-form').submit(function (event) {
        event.preventDefault();
        if ($('#top-callback-form')[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            $('#successModal').modal();
        }
        $('#top-callback-form').addClass('was-validated');
    });

    $('#order-form').submit(function (event) {
        event.preventDefault();
        if ($('#order-form')[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.Form-invalidAlert').show();
        } else {
            event.preventDefault();
            event.stopPropagation();
            $('.Form-invalidAlert').hide();
            $('#successModal').modal();

        }
        $('#order-form').addClass('was-validated');
    });

    $('#consult-form').submit(function (event) {
        event.preventDefault();
        if ($('#consult-form')[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            event.stopPropagation();
            $('#successModal').modal();

        }
        $('#consult-form').addClass('was-validated');
    });

    $('#subscribe-form').submit(function (event) {
        event.preventDefault();
        if ($('#subscribe-form')[0].checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            $('.Form-SubscribeWrap').addClass('errored');
        } else {
            event.preventDefault();
            event.stopPropagation();
            $('#successModal').modal();

        }
        $('#subscribe-form').addClass('was-validated');
    });



});