$(function () {

    'use strict';

	$(document).ready(function($) {
        //contact
        contact();
    });

    function contact()
    {
        $('#contact-form').on('submit', function(e){
            e.preventDefault();

            var form = $(this);
            var email = form.find('#email').val();
            var fields = form.find('select.required, input.required, textarea.required');

            blockUI();

            for(var i = 0; i < fields.length; i++)
            {
                if(fields[i].value == "")
                {
                    $('#'+fields[i].id).focus();
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    unblockUI();
                }
            }

            if(!validateEmail(email))
            {
                $('#email').focus();
                unblockUI();
                showSimpleMessage("Attention", "Please provide a valid email address", "error");

                return false;
            }

            $.ajax({
                type: 'POST',
                url: `${API_URL_ROOT}/contact`,
                dataType: 'json',
                contentType:'application/json',
                data: JSON.stringify(form.serializeObject()),
                success: function(response)
                {
                    if(response.error == false)
                    {
                        form.get(0).reset();

                        unblockUI();

                        showSimpleMessage("Success", response.message, "success");
                    }
                    else
                    {
                        unblockUI();
                        showSimpleMessage("Attention", response.message, "error");
                    }
                },
                error: function(req, status, error)
                {
                    unblockUI();
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                }
            });
        });
    }
}); 