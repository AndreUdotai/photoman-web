$(function () {

    'use strict';

	$(document).ready(function($) {

        //check availability of url query parameters
        checkParamAvailability(new Array('email', 'salt'));

        const email = getUrlParameter('email');
        const salt = getUrlParameter('salt');
        
        //validate reset link
        validateResetLink(email, salt);
        //reset password
        resetPassword(salt);
    });

    function validateResetLink(email, salt)
    {
        blockUI();

        $.ajax({
            type:'GET',
            url:`${API_URL_ROOT}/validate-reset-link?email=${email}&salt=${salt}`,
            dataType:'json',
            success:function(response)
            {
                if(response.error == false)
                {
                    $('#email').val(email);

                    unblockUI();
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", response.message, "error");

                    setTimeout(function(){
                        window.location = 'forgot-password';
                    }, 3000)
                }
            },
            error:function(req, status, err)
            {
                unblockUI();
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");

                setTimeout(function(){
                    window.location = 'forgot-password';
                }, 3000)
            }
        })
    }

    function resetPassword(salt)
    {
        $('#password-reset-form').on('submit', function(e){
            e.preventDefault();
            var form = $(this);
            var email = form.find("#email").val();
            var password = form.find('#password').val();
            var rePassword = form.find('#re_password').val();
            var fields = form.find('input.required, select.required');
            
            blockUI();

            for(var i=0;i<fields.length;i++)
            {
                if(fields[i].value == "")
                {
                    /*alert(fields[i].id)*/
                    unblockUI();
                    $('#'+fields[i].id).focus();
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    return false;
                }
            }
            
            if(!validateEmail(email))
            {
               form.find("#email").focus();
               showSimpleMessage("Attention", "Please provide a valid email address", "error");
               unblockUI();
               return false;
            }
            
            if(password !== rePassword)
            {
                form.find('#password').focus();
                showSimpleMessage("Attention", "Passwords dont match", "error");
                unblockUI();
                return false;
            }

            $('<input>').attr({type: 'hidden', name: 'salt', value: salt, class:'required'}).appendTo(form);

            $.ajax({
                type: 'POST',
                url: API_URL_ROOT+'/reset-password',
                data: JSON.stringify(form.serializeObject()),
                dataType: 'json',
                contentType: 'application/json',
                success: function(response)
                {
                    if(response.error == false)
                    {
                        unblockUI();
                        showSimpleMessage("Success", response.message, "success");

                        form.get(0).reset();

                        setTimeout(function(){
                            window.location = 'authentication';
                        }, 3000)
                    }
                    else
                    {
                        unblockUI();
                        showSimpleMessage("Attention", response.message, "error");
                    }
                },
                error: function(req, status, err)
                {
                    unblockUI();
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");

                    setTimeout(function(){
                        window.location = 'forgot-password';
                    }, 3000);
                }
            });
        });
    }
}); 