$(function () {

    'use strict';

	$(document).ready(function($) {

        //check availability of url query parameters
        checkParamAvailability(new Array('email', 'salt', 'verification_type'));

        const email = getUrlParameter('email');
        const salt = getUrlParameter('salt');
        const verificationType = getUrlParameter('verification_type');

        //verify email
        verifyEmail(email, salt, verificationType);
    });

    function verifyEmail(email, salt, verificationType)
    {
        blockUI();

        $.ajax({
            type: 'GET',
            url: `${API_URL_ROOT}/verify-email?email=${email}&salt=${salt}&verification_type=${verificationType}`,
            dataType: 'json',
            success: function(response)
            {
                if(response.error == false)
                {
                    unblockUI();
                    showSimpleMessage("Success", response.message, "success");

                    if(verificationType == "signup")
                    {
                        setTimeout(function(){
                            window.location = 'authentication';
                        }, 3000);
                    }
                    else
                    {
                        setTimeout(function(){
                            window.location = '/';
                        }, 3000);
                    }
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", response.message, "error");

                    if(verificationType == "signup")
                    {
                        setTimeout(function(){
                            window.location = 'authentication';
                        }, 3000);
                    }
                    else
                    {
                        setTimeout(function(){
                            window.location = '/';
                        }, 3000);
                    }
                }
            },
            error: function(req, status, err)
            {
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                unblockUI();

                if(verificationType == "signup")
                {
                    setTimeout(function(){
                        window.location = 'authentication';
                    }, 3000);
                }
                else
                {
                    setTimeout(function(){
                        window.location = '/';
                    }, 3000);
                }
            }
        });
    }
}); 