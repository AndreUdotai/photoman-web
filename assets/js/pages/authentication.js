$(function () {

    'use strict';

	$(document).ready(function($) {

        //check if user is already logged in
        loggedinCheck();
        //remember me
        rememberMe();
        //load states
        loadStates();
        //onchage states
        onchangeState();
        //login
        login();
        //register
        register();
        //toggle passwords
        togglePasswords();
    });

    function login()
    {
        $('#login-form').on('submit', function(e){
            e.preventDefault();
            var form = $(this);
            var email = $("#email").val();
            var password = $("#password").val();
            var fields = form.find('input.required, select.required');
            
            blockUI();

            for(var i=0;i<fields.length;i++)
            {
                if(fields[i].value == "")
                {
                    /*alert(fields[i].id)*/
                    unblockUI();
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    $('#'+fields[i].id).focus();
                    return false;
                }
            }
            
            if(!validateEmail(email))
            {
                //alert("All fields are required");
               showSimpleMessage("Attention", "Please provide a valid email address", "error");
               unblockUI();
               return false;
            }
            else
            {
                $.ajax({
                    type: 'POST',
                    url: API_URL_ROOT+'/login',
                    data: JSON.stringify(form.serializeObject()),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            var token = response.token; //generated access token from request
                            let hostname = window.location.hostname;
                            let referrerObject = (new URL(document.referrer));
                            let referrer = document.referrer;
                            let referrerHostname = referrerObject.hostname;
                            let referrerPath = referrer.split('?')[0];
                            let referrerPathPage = referrerPath.substring(referrerPath.lastIndexOf('/') + 1);
                            let excludedPages = ['email-verification', 'authentication'];

                            setRememberMe(); //store login details to hardrive if any
                            sessionStorage.setItem('token', token); //set access token

                            if(referrerHostname == hostname)
                            {
                                if(excludedPages.indexOf(referrerPathPage) == -1)
                                {
                                    if(document.referrer)
                                    {
                                        //redirect to the user's referring page
                                        window.location = document.referrer;

                                        return false;
                                    }

                                    //redirect to the previous page
                                    window.history.back();
                                }
                                else
                                {
                                    window.location = '/';
                                }
                            }
                            else
                            {
                                window.location = '/';
                            }     
                        }
                        else
                        {
                            showSimpleMessage("Attention", response.message, "error");
                            unblockUI();
                        }
                    },
                    error: function(req, status, err)
                    {
                        showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                        unblockUI();
                    }
                });
            }
        });
    }

    function register()
    {
        $('#register-form, #application-form').on('submit', function(e){
            e.preventDefault();
            var form = $(this);
            var email = form.find("#user_email").val();
            var password = form.find("#user_password").val();
            var repassword = form.find("#re_password").val();
            var avatar = form.find('#avatar').val();
            var fields = form.find('input.required, select.required, textarea.required');
            
            blockUI();

            for(var i=0; i < fields.length; i++)
            {
                if(fields[i].value == "")
                {
                    /*alert(fields[i].id)*/
                    unblockUI();
                    form.find('#'+fields[i].id).focus();
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    return false;
                }
            }
            
            if(!validateEmail(email))
            {
                //alert("All fields are required");
                unblockUI();
                showSimpleMessage("Attention", "Please provide a valid email address", "error");
                return false;
            }
            else if(password !== repassword)
            {
                unblockUI();
                showSimpleMessage("Attention", "Passwords don't match", "error");
                return false;
            } 
            else
            {
                if(avatar)
                {
                    var extension = avatar.split('.').pop().toLowerCase();
                    //Create array with the file extensions that we wish to upload
                    var validFileExtensions = ['jpeg', 'jpg', 'png'];
                    var file_length = $("#avatar").get(0).files.length;

                    if($.inArray(extension, validFileExtensions) == -1)
                    {
                        //invalid avatar format
                        unblockUI();
                        $("#avatar").focus();
                        showSimpleMessage("Attention", "Avatar must be a jpeg, jpg, png file formats", "error");
                        return false;
                    } 
                    
                    if(form.find("#avatar").get(0).files[0].size > (1024 * 1000)) 
                    {
                        //user image is more than 1MB
                        unblockUI();
                        form.find("#avatar").focus();
                        showSimpleMessage("Attention", "Avatar must not be more than 1MB in size", "error");
                        return false;
                    }
                }

                $.ajax({
                    type: 'POST',
                    url: `${API_URL_ROOT}/sign-up`,
                    data: new FormData(form[0]),
                    dataType: 'json',
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function(response)
                    {
                        if(response.error == false)
                        {
                            unblockUI();
                            showSimpleMessage("Success", response.message, "success");
                            form.get(0).reset();
                            $('select').niceSelect('update');
                        }
                        else
                        {
                            unblockUI();
                            showSimpleMessage("Attention", response.message, "error");
                        }
                    },
                    error: function(req, status, err)
                    {
                        showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                        unblockUI();
                    }
                });
            }
        });
    }

    function loadStates()
    {
        $.getJSON( "assets/js/nigeria-state-and-lgas.json", function( data ) {
            var html = `<option value="">Please select</option>`;
            
            $.each( data, function( key, val ) {
                html += `<option value="${data[key].state}">${data[key].state}</option>`;
            });

            $('.state').html(html);
            $('.state').niceSelect('update');
        });
    }

    function onchangeState()
    {
        $('.state').on('change', function(){
            var parentForm = $(this).parents('form');
            var value = $(this).val();
            
            if(value !== '')
            {
                $.getJSON( "assets/js/nigeria-state-and-lgas.json", function( data ) {
                    var html = `<option value="">Please select</option>`;
                    var stateKey;

                    for (let i = 0; i < data.length; i++)
                    {
                        if(data[i].state === value)
                        {
                            stateKey = i;
                            break;
                        }
                    }
                    
                    $.each( data[stateKey].lgas, function( key, val ) {

                        html += `<option value="${val}">${val}</option>`;
                    });

                    parentForm.find('.lg').html(html);
                    parentForm.find('.lg').niceSelect('update');
                });
            }
            else
            {
                parentForm.find('.lg').html(`<option value="">Local Government</option>`);
                parentForm.find('.lg').niceSelect('update');
            }
        });
    }

    /*function onUserRoleChange()
    {
        $('#user_role').on('change', function(){
            var userRole = $(this).val();
            
            if(userRole == "Customer")
            {
                $('.applicant-div').slideUp(1000);
                $('.applicant-div').find('.required').removeClass('required');
            }
            else
            {
                $('.applicant-div').slideDown(1000);
                $('.applicant-div').find('#next_of_kin, #next_of_kin_phone').addClass('required');
            }
        });
    }*/
}); 