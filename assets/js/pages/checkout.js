$(function () {

    'use strict';

    const token = sessionStorage.getItem('token');

    const cartToken = localStorage.getItem('cart');

	$(document).ready(function($) {

        //load my cart
        loadCart(cartToken);
        //populate email address
        loadEmailAddress();
        //generate invoice and pay with paystack
        generateInvoice();
    });

    function loadCart(cartToken)
    {
        let cartRecords = '';

        if(token && cartToken)
        {
            const items = payloadClaim(cartToken, 'items');

            let totalAmount = 0;

            for(var i = 0; i < items.length; i++)
            {
                cartRecords += `

                    <li>
                        <span class="order-middle-left">${items[i].media_event}</span> <span class="order-price">NGN ${items[i].amount} </span>
                    </li>
                `;

                totalAmount += items[i].amount
            }

            $('.your-order-middle ul').html(cartRecords);
            $('.your-order-total ul li:last-child').text(`NGN ${totalAmount}`);
        }
        else
        {
            $('.your-order-middle ul').empty();
            $('.your-order-total ul li:last-child').text(`NGN 0`);
        }
    }

    function loadEmailAddress()
    {
        if(token)
        {
            const emailAddress = payloadClaim(token, 'user_email');

            $('#billing_email_address').val(emailAddress);
        }       
    }

    function generateInvoice()
    {
        $('.btn-place-order').on('click', function(e){
            e.preventDefault();

            var billing_email_address = $("#billing_email_address").val();
            var order_note = $("#order_note").val();

            blockUI();

            if(!token)
            {
                unblockUI();
                showSimpleMessage("Attention", 'You must be logged in to place an order', "error");
                return false;
            }

            if(!cartToken)
            {
                unblockUI();
                showSimpleMessage("Attention", 'No items found in your cart', "error");
                return false;
            }

            if(!validateEmail(billing_email_address))
            {
                unblockUI();
                showSimpleMessage("Attention", 'Please provide a valid billing email address', "error");
                return false;   
            }

            $.ajax({
                type:'POST',
                url:`${API_URL_ROOT}/generate-invoice`,
                dataType:'json',
                data:JSON.stringify({ cartToken, billing_email_address, order_note }),
                contentType:'application/json',
                headers:{ 'x-access-token':token},
                success:function(response)
                {
                    if(response.error == false)
                    {
                        let invoiceToken = response.invoiceToken;

                        unblockUI();
                        
                        payWithPayStack(invoiceToken)
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
        })
    }

    function verifyPayment(invoiceToken, reference)
    {
        blockUI();

        $.ajax({
            type:'GET',
            url:`${API_URL_ROOT}/verify-payment?invoiceToken=${invoiceToken}&reference=${reference}`,
            dataType:'json',
            headers:{ 'x-access-token':token },
            success:function(response)
            {
                if(response.error == false)
                {
                    localStorage.removeItem('cart');

                    unblockUI();
                    showSimpleMessage("Success", response.message, "success");

                    setTimeout(function(){
                        window.location.reload();
                    }, 3000)
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

    function payWithPayStack(invoiceToken)
    {
        const billingEmailAddress = payloadClaim(invoiceToken, 'billing_email_address');
        const totalAmount = payloadClaim(invoiceToken, 'totalAmount');

        let handler = PaystackPop.setup({
            key: 'pk_test_62c0e79a2fe8bceaaf7e9e637bbc0b7acdbe1e20', // Replace with your public key
            email: billingEmailAddress,
            amount: totalAmount * 100,
            //ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            // label: "Optional string that replaces customer email"
            onClose: function(){
              showSimpleMessage("Attention", 'Hope you will complete this order as soon as possible.', "error");;
            },
            callback: function(response){
              /*let message = 'Payment complete! Reference: ' + response.reference;
              alert(message);*/
              verifyPayment(invoiceToken, response.reference)
            }
        });
        
        handler.openIframe();
    }
}); 