//return payload claim
function payloadClaim(token, param)
{
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var payload = JSON.parse(window.atob(base64));
    var claim = payload[param];

    return claim;
}

function loggedinCheck()
{        
	//Instantiate access token
    var token = sessionStorage.getItem('token');
    let hostname = window.location.hostname;
    let referrerObject = (new URL(document.referrer));
    let referrer = document.referrer;
    let referrerHostname = referrerObject.hostname;
    let referrerPath = referrer.split('?')[0];
    let referrerPathPage = referrerPath.substring(referrerPath.lastIndexOf('/') + 1);
    let excludedPages = ['email-verification', 'authentication'];

    //check if the access token is empty
    if(token)
    {
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
} 

//not logged in check
function notLoggedInCheck()
{
    //Instantiate access token
    var token = sessionStorage.getItem('token');

    //check if the access token is empty
    if(!token)
    {
        //redirect to the login page
        window.location = 'authentication';
    }
}

//remember me
function rememberMe()
{
    if (localStorage.getItem('chkbx') && localStorage.getItem('chkbx') !== '') 
    {
        $('#remember-me').attr('checked', 'checked');
        $('#email').val(localStorage.getItem('email'));
        $('#password').val(localStorage.getItem('password'));
    } 
    else 
    {
        $('#remember-me').removeAttr('checked');
        $('#email').val('');
        $('#password').val('');
    }
}

//set remember me cookie
function setRememberMe()
{
    if ($('#remember-me').is(':checked')) 
    {
        // save email and password in computer's hardrive
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('chkbx');
        localStorage.setItem('email', $('#email').val());
        localStorage.setItem('password', $('#password').val());
        localStorage.setItem('chkbx', $('#remember-me').val());
    } 
    else 
    {
        //remove login details from computer's hardrivve
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('chkbx');
    }
}

//make rightSideBar links active based on url
function activateLinks()
{
    //current page url
    var pgUrl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);

    $('#leftsidebar a').each(function(){
        var $this = $(this);
        //if current path is like link, make it active
        if($this.attr('href') == pgUrl)
        {
            $this.parents('li').addClass('active').closest('ul').parents('li').addClass('active');
        }
    });
}

//signOut current user
function signOut()
{
    var token = sessionStorage.getItem('token'); //access token

    blockUI();

    $.ajax({
        type: 'GET',
        url: API_URL_ROOT+'/logout',
        dataType: 'json',
        headers: {'x-access-token':token},
        success: function(response)
        {
            if(response.error == false)
            {
                //clear all stored sessions
                sessionStorage.clear();

                //remove my cart details
                $('#myStyle').remove();
                $(`<style id='myStyle' type='text/css'> .changed:after {position: absolute; top: 9px; left: -26px; right: auto; width: 30px; height: 18px; content: "0"; background: #4fb68d; color: #fff; line-height: 18px; text-align: center; border-radius: 50%; float: right;} </style>`).appendTo("head");
                $('.count-cart').addClass('changed');
                $('.count-cart span').text(`NGN 0`);

                const ps = new PerfectScrollbar('.mini-cart-scroll', {
                    wheelSpeed: 2,
                    wheelPropagation: true,
                    minScrollbarLength: 20
                });

                const pagesToReload = ['cart', 'account'];
                
                //reload user profile
                displayUserProfile();

                /*//reload cart in the cart page
                if(pagesToReload.indexOf(window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)) !== -1 )
                {
                    setTimeout(function(){
                        window.location.reload();
                    }, 3000);
                }*/
                setTimeout(function(){
                    window.location.reload();
                }, 3000);

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
}

//display user profile
function displayUserProfile()
{
    var token = sessionStorage.getItem('token'); //access token

    if(token)
    {
        var userID = payloadClaim(token, 'user_id');
        var userFirstName = payloadClaim(token, 'user_firstname');
        var userLastName = payloadClaim(token, 'user_lastname');
        var email = payloadClaim(token, 'user_email');
        var role = payloadClaim(token, 'user_role');
        var avatar = payloadClaim(token, 'user_image_url');

        $(".user-firstname").text(userFirstName);
        $(".user-role").text(role);

        $('.logged-in-links').css('display', 'inline-block');
        $('.logged-out-links').css('display', 'none');

        if(role !== "Applicant")
        {
            $('.applicant').remove();
        }
    }
    else
    {
        $('.logged-in-links').css('display', 'none');
        $('.logged-out-links').css('display', 'inline-block');
    }
}

function notifications()
{
    var token = sessionStorage.getItem('token'); //access token
    var table = $('body').find('#my_inbox').DataTable();

    if(token)
    {
        $.ajax({
            type: "GET",
            url: API_URL_ROOT+'/inbox?message_status=Unread',
            dataType: 'json',
            headers: {'x-access-token':token},
            success: function(response)
            {
                if(response.error == false)
                {
                    var messages = response.messages;
                    var html = '';

                    if(messages.length > 0)
                    {
                        $('#unread-messages-notification').addClass('red');
                        $('#unread-messages-notification').find('i').removeClass('ion-email');
                        $('#unread-messages-notification').find('i').addClass('ion-email-unread');
                    }
                    else
                    {
                        $('#unread-messages-notification').removeClass('red');
                        $('#unread-messages-notification').find('i').removeClass('ion-email-unread');
                        $('#unread-messages-notification').find('i').addClass('ion-email');
                    } 

                    table.ajax.reload(null, false);      
                }
                else
                {
                    $('#unread-messages-notification').removeClass('red');
                    $('#unread-messages-notification').find('i').removeClass('ion-email-unread');
                    $('#unread-messages-notification').find('i').addClass('ion-email');
                }
            },
            error: function(req, status, error)
            {
                $('#unread-messages-notification').removeClass('red');
                $('#unread-messages-notification').find('i').removeClass('ion-email-unread');
                $('#unread-messages-notification').find('i').addClass('ion-email');
            }
        });
    }     
}

//show sign out dialogue
function showSignOutMessage() {
    swal({
        title: "Sign Out?",
        text: "Are you sure you want to sign out this user?",
        type: "warning",
        showCancelButton: true,
        padding: '2em'
        //closeOnConfirm: false,
        //showLoaderOnConfirm: true,
    }).then(function(result) {
        if(result.value)
        {
            signOut();
        }
    });
}

//Show simple message
function showSimpleMessage(title, text, type) {
    swal({
        title: title,
        text: text,
        type: type,
        confirmButtonText: "Close",
        showLoaderOnConfirm: false,
    });
}

function showHtmlMessageWithCustomIcon(title, text, imageUrl) {
    swal({
        title: title,
        text: text,
        imageUrl: imageUrl,
        html: true
    });
}

function showHtmlMessage() {
    swal({
        title: "HTML <small>Title</small>!",
        text: "A custom <span style=\"color: #CC0000\">html<span> message.",
        html: true
    });
}

function showLoginFormAlert()
{
    swal({
        title:"Please Sign In",
        text:"You must be logged in to perform this action",
        type:"error",
        showCancelButton: true,
        confirmButtonText: "Sign In",
        showLoaderOnConfirm: true,
        html: `<input type="email" id="email" name="email" class="swal2-input form-control" placeholder="Valid Email"><input type="password" id="password" name="password" class="swal2-input form-control" placeholder="Password">`,
        preConfirm: () => {
            const email = Swal.getPopup().querySelector('#email').value
            const password = Swal.getPopup().querySelector('#password').value
            
            if (!email || !password) 
            {
                Swal.showValidationMessage(`Please enter email and password`)
            }

            if(!validateEmail(email))
            {
               Swal.showValidationMessage(`Please provide a valid email`)
            }
            
            return fetch(`${API_URL_ROOT}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email, password}),
                })
                .then(response => response.json())
                .then(data => {
            
                    if(data.error !== false)
                    {
                        throw new Error(data.message);
                    }
                    
                    return data;
                })
                .catch((error) => {
                    Swal.showValidationMessage("Request failed: " + error.message)
                })
        }

    }).then((result) => {

        sessionStorage.setItem('token', result.value.token); //set access token

        showSimpleMessage("Success", "Signed in successfully", "success");

        window.location.reload();
    })
}

function validateEmail(email)
{
    var filter = /^[\w-.+]+@[a-zA-Z0-9.-]+.[a-zA-Z0-9]{2,4}$/;

    if(filter.test(email))
    {
        return true;
    }
    else 
    {
        return false;
    }
}

function validateAvatar(avatarID, imgprevID, imgID, expectedSize)
{
    //validate user avatar on change
    $('#'+avatarID).on('change', function(){

        //Get uploaded file extension
        var extension = $(this).val().split('.').pop().toLowerCase();
        //Create array with the file extensions that we wish to upload
        var validFileExtensions = ['jpeg', 'jpg', 'png'];
        //Check file extension in the array. if -1, that means the file extension is not in the list
        if($.inArray(extension, validFileExtensions) == -1)
        {
            showSimpleMessage("Attention", "Invalid file selected", "error");
            $(this).parent('div').addClass('error');
            $('#'+imgprevID).slideUp(1000);
        }
        else if($(this).get(0).files[0].size > expectedSize)
        {
            showSimpleMessage("Attention", "Avatar must not be more than "+expectedSize+"KB in size", "error");
            $('#'+imgprevID).slideUp(1000);
        }
        else
        {
            $('#'+imgprevID).slideUp(1000);
            $('#'+imgprevID).slideDown(1000);
            imagepreview(this, imgID);
        }
    });
}

function imagepreview(input, tempImgID)
{
    if(input.files && input.files[0]){
        var filerd = new FileReader();
        filerd.onload = function(e){
            $('#'+tempImgID).attr('src', e.target.result).width(200).height(200);
        };
        filerd.readAsDataURL(input.files[0]);  
    }
}


function getUrlParameter(sParam)
{
    var sPageUrl = window.location.search.substring(1),
        sURLVariables = sPageUrl.split('&'),
        sParameterName,
        i;

    for(i=0; i<sURLVariables.length; i++)
    {
        sParameterName = sURLVariables[i].split('=');

        if(sParameterName[0] === sParam)
        {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}

function getQueryParam(param)
{
    var count = 0;

    window.location.search.substr(1).split("&").forEach(function(item){
        
        if(param == item.split("=")[0])
        {
            count++;
        }
    });

    if(count > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function getQueryParameter(param)
{
    var found

    window.location.search.substr(1).split("&").forEach(function(item){
        
        if(param == item.split("=")[0])
        {
            found = decodeURIComponent(item.split("=")[1]);
        }
    });

    return found;
}

function checkParamAvailability(params)
{
    //var found = false;

    for(i=0; i<params.length; i++)
    {
        if(getQueryParam(params[i]) === false)
        {
            window.location = '404';
        }
    }

    return true;
}

function dataTableAlertPrevent(tableClass)
{
    $.fn.DataTable.ext.errMode = 'none';

    $('.'+tableClass).on('error.dt', function(e, settings, techNote, message){
        console.log('An error has been reported by DataTables: ', message);
    });
        
}

function printDiv(divName)
{
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

String.prototype.toUpperCaseWords = function()
{
    return this.replace(/\w+/g, function(a){
        return a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
    });
}

//forceNumeric() plug-in implementation
jQuery.fn.forceNumeric = function(){

    return this.each(function(){
        $(this).keydown(function(e){
            var key = e.which || e.keyCode;

            if(!e.shiftKey && !e.altKey && !e.ctrlKey &&
            //numbers
                key >= 48 && key <= 57 ||
            //Numeric keypad
                key >= 96 && key <= 105 ||
            //Backspace and Tab and Enter
                key == 8 || key == 9 || key == 13 ||
            //left and right arrow keys
                key == 37 || key == 39 ||
            //Del and ins
                key == 46 || key == 45)
                return true;

            return false;
        });
    });
} 

function truncateString(str, num) {
  // If the length of str is less than or equal to num
  // just return str--don't truncate it.
  if (str.length <= num) {
    return str
  }
  // Return str truncated with '...' concatenated to the end of str.
  return str.slice(0, num) + '...'
}

function stripHtmlTags(str)
{
    str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

function toTimestamp(strDate){
 var datum = Date.parse(strDate);
 return datum/1000;
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function pad(n) {
    return n < 10 ? '0' + n : n;
}

//block ui
function blockUI()
{
    $.blockUI({
        message: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
        fadeIn: 800, 
        //timeout: 2000, //unblock after 2 seconds
        overlayCSS: {
            backgroundColor: '#191e3a',
            opacity: 0.8,
            zIndex: 50000,
            cursor: 'wait'
        },
        css: {
            animation: 'spin 2s linear infinite',
            border: 0,
            color: '#25d5e4',
            zIndex: 50001,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}

function unblockUI()
{
    $.unblockUI();
}

$.fn.serializeObject = function () {
  var formData = {};
  var formArray = this.serializeArray();

  for(var i = 0, n = formArray.length; i < n; ++i)
    formData[formArray[i].name] = formArray[i].value;

  return formData;
};

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/*function slugify(text)
{
    return text.toLowerCase().replace(/ /g,'_').replace(/[^\w-]+/g,'');
}*/
function slugify(text)
{
    return text
        .toString()                 //convert to string
        .toLowerCase()              //convert the string to lowercase letters
        .normalize('NFD')           //returns the unicode normalization form of a given string
        .trim()                     //removes white spaces from both sides of a string
        /* .replace(/ /g,'_')       //replaces white space with underscore */
        .replace(/[\- ]/g,'_')      //replaces white space and hiphens with underscore
        .replace(/[^\w-]+/g,'')     //removes all non-word characters
        .replace(/\_\_+/g, '_')     // Replace multiple _ with single _
}

function makePgReadable(slug)
{
    if(/^-?\d+$/.test(slug.charAt(0)))
    {
        return `_${slug}`;
    }
    else
    {
        return slug;
    }
}

function addToCart()
{
    const token = sessionStorage.getItem('token');

    $('body').on('click', '.btn-add-to-cart', function(e){
        e.preventDefault();

        var dataResource = $(this).attr('data-resource');
        var dataID = $(this).attr('data-id');

        $(this).parents('.modal').find('.close').click();

        blockUI();

        if(!token || token === undefined)
        {
            unblockUI();
            showLoginFormAlert();
            //showSimpleMessage("Attention", 'You must be logged in to add items to your shopping cart', "error");
        }
        else
        {
            $.ajax({
                type:'POST',
                url:`${API_URL_ROOT}/cart`,
                dataType:'json',
                contentType:'application/json',
                data:JSON.stringify({data_resource:dataResource, data_id:dataID}),
                headers:{'x-access-token':token},
                success:function(response)
                {
                    if(response.error == false)
                    {
                        localStorage.removeItem('cart');
                        localStorage.setItem('cart', response.cartToken);

                        loadMyCart();

                        unblockUI();
                        showSimpleMessage("Success", response.message, "success");
                    }
                    else
                    {
                        unblockUI();
                        showSimpleMessage("Attention", response.message, "error");
                    }
                },
                error:function(req, status, error)
                {
                    unblockUI();
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                }
            });
        }   
    });
}

function loadMyCart()
{
    const token = sessionStorage.getItem('token');
    let cartToken;
    
    if(token)
    {
        const userID = payloadClaim(token, 'user_id');

        if(localStorage.getItem('cart'))
        {
            cartToken = localStorage.getItem('cart');

            setupCart(cartToken);
        }
        else
        {
            $.ajax({
                type:'GET',
                url:`${API_URL_ROOT}/cart?user_id=${userID}`,
                dataType:'json',
                headers:{ 'x-access-token':token },
                success:function(response)
                {
                    if(response.error == false)
                    {
                        cartToken = response.cartToken;

                        localStorage.setItem('cart', cartToken);

                        setupCart(cartToken);
                    }
                    else
                    {
                        showSimpleMessage("Attention", response.message, "error");
                    }
                },
                error:function(res, status, error)
                {
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                }
            })
        }
    }
}

function setupCart(cartToken)
{
    let cartHtml = '';

    const items = payloadClaim(cartToken, 'items');
    let totalAmount = 0;

    for(var i = 0; i < items.length; i++)
    {
        cartHtml += `
            <li class="single-shopping-cart" data-id="${items[i].cart_item_uuid}">
                <div class="shopping-cart-img">
                    <a href="media?mediaid=${items[i].media_id}"><img alt="${items[i].media_event}" src="${items[i].media_thumbnail_url}" /></a>
                    <span class="product-quantity">1x</span>
                </div>
                <div class="shopping-cart-title">
                    <h4><a href="media?mediaid=${items[i].media_id}">${truncateString(items[i].media_event, 16)}</a></h4>
                    <span>NGN ${formatNumber(items[i].amount)}</span>
                    <div class="shopping-cart-delete">
                        <a href="#"><i class="ion-android-cancel"></i></a>
                    </div>
                </div>
            </li>
        `;

        totalAmount += items[i].amount
    }

    $('.mini-cart-content ul').html(cartHtml);
    $('.mini-cart-content .shop-total span').text(`NGN ${formatNumber(totalAmount)}`);

    $('#myStyle').remove();
    $(`<style id='myStyle' type='text/css'> .changed:after {position: absolute; top: 9px; left: -26px; right: auto; width: 30px; height: 18px; content: "${items.length}"; background: #4fb68d; color: #fff; line-height: 18px; text-align: center; border-radius: 50%; float: right;} </style>`).appendTo("head");
    $('.count-cart').addClass('changed');
    $('.count-cart span').text(`NGN ${formatNumber(totalAmount)}`);

    const ps = new PerfectScrollbar('.mini-cart-scroll', {
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20
    });

    //console.log(payloadClaim(cartToken, 'items'));
}

function removeFromCart()
{
    const token = sessionStorage.getItem('token');

    $('.mini-cart-content').on('click', '.ion-android-cancel', function(e){
        e.preventDefault();

        var itemID = $(this).parents('.single-shopping-cart').attr('data-id');

        blockUI();

        if(!token)
        {
            unblockUI();
            showSimpleMessage("Attention", 'You must be logged in to remove items from your shopping cart', "error");
        }
        else
        {
            $.ajax({
                type:'DELETE',
                url:`${API_URL_ROOT}/cart/${itemID}`,
                dataType:'json',
                headers:{ 'x-access-token':token},
                success:function(response)
                {
                    if(response.error == false)
                    {
                        cartToken = response.cartToken;

                        localStorage.removeItem('cart');
                        localStorage.setItem('cart', cartToken);

                        loadMyCart();

                        unblockUI();
                        showSimpleMessage("Success", response.message, "success");
                    }
                    else
                    {
                        unblockUI();
                        showSimpleMessage("Attention", response.message, "error");
                    }
                },
                error:function(req, status, error)
                {
                    unblockUI();
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                }
            })
        }
    })
}

function returnRating(rate)
{
    switch (rate) 
    {
        case 0:
            return `
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
            `;
            break;

        case 1:
            return `
                <i class="ion-android-star"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
            `;
            break;

        case 1.5:
            return `
                <i class="ion-android-star"></i>
                <i class="ion-android-star-half"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
            `;
            break;

        case 2:
            return `
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
            `;
            break;

        case 2.5:
            return `
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star-half"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
            `;
            break;

        case 3:
            return `
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star-outline"></i>
                <i class="ion-android-star-outline"></i>
            `;
            break;

        case 3.5:
            return `
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star-half"></i>
                <i class="ion-android-star-outline"></i>
            `;
            break;

        case 4:
            return `
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star-outline"></i>
            `;
            break;
    
        case 4.5:
            return `
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star-half"></i>
            `;
            break;

        case 5:
            return `
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
                <i class="ion-android-star"></i>
            `;
            break;

        default:
            return `
                    <i class="ion-android-star-outline"></i>
                    <i class="ion-android-star-outline"></i>
                    <i class="ion-android-star-outline"></i>
                    <i class="ion-android-star-outline"></i>
                    <i class="ion-android-star-outline"></i>
                `;
            break;
    }
}

function togglePasswords()
{
    $('.toggle-password').on('click', function(){
        var passwordField = $(this).parents('.pw-field').find('input');
        var passwordFieldType = passwordField.attr('type');
        passwordField.attr({type:passwordFieldType === 'password' ? 'text' : 'password'});

        //$(this).toggleClass('ion-eye');
        
        $(this).hasClass('ion-eye-disabled') ? $(this).removeClass('ion-eye-disabled').addClass('ion-eye') : $(this).removeClass('ion-eye').addClass('ion-eye-disabled')

        
    })
}

function p(current, last, width = 2) 
{    
    var left = current - width,
        right = current + width + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i += 1) {
        
        if (i === 1 || i === last || (i >= left && i <= right)) 
        {
            range.push(i);
        } 
        else if (i < left) 
        {
            i = left - 1;
        } 
        else if (i > right) 
        {
            range.push(last);
            break;
        }
    }

    range.forEach(i => {
        
        if (l) 
        {
            if (i - l === 2) 
            {
                rangeWithDots.push(l + 1);
            } 
            else if (i - l !== 1) 
            {
                rangeWithDots.push('...');
            }
        }
        
        rangeWithDots.push(i);
    
        l = i;
    });

    return rangeWithDots;
    

    /*for (let i = 1; i <= last; i++) 
    {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) 
    {
        if(l) 
        {
            if (i - l === 2) 
            {
                rangeWithDots.push(l + 1);
            } 
            else if (i - l !== 1) 
            {
                rangeWithDots.push('...');
            }
        }

        rangeWithDots.push(i);

        l = i;
    }

    return rangeWithDots;*/
}