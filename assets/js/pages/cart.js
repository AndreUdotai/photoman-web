$(function () {

    'use strict';

    const token = sessionStorage.getItem('token');

    const cartToken = localStorage.getItem('cart');

	$(document).ready(function($) {

        //load my cart
        loadCart(cartToken);
        //remove an item from my cart
        removeCartItem();
        //remove all cart items
        removeAllCartItems();
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
                    <tr data-id="${items[i].cart_item_uuid}">
                        <td class="product-thumbnail">
                            <a href="image?imageid=${items[i].media_id}"><img src="${items[i].media_thumbnail_url}" alt="${items[i].media_uuid}" width="98" height="98" /></a>
                        </td>
                        <td class="product-name"><a href="event?eventid=${items[i].media_event_id}">${items[i].media_event}</a></td>
                        <td class="product-price-cart"><span class="amount">NGN ${items[i].amount}</span></td>
                        <td class="product-quantity">1</td>
                        <td class="product-subtotal">NGN ${items[i].amount}</td>
                        <td class="product-remove">
                            <a href="javascript:void(0)" class="btn-remove-cart-item" title="Remove item"><i class="fa fa-times"></i></a>
                        </td>
                    </tr>
                `;

                totalAmount += items[i].amount
            }

            $('.cart-table-content table tbody').html(cartRecords);
            $('.grand-totall-title span').text(`NGN ${totalAmount}`);
            $('.total-items span').text(`${items.length}`);
        }
        else
        {
            cartRecords += `<tr><td style="color:red">Ooops!!! Empty cart</td><td></td><td></td><td></td><td></td><td></td></tr>`;

            $('.cart-table-content table tbody').html(cartRecords);
            $('.grand-totall-title span').text(`NGN 0`);
            $('.total-items span').text(`0`);
        }
    }

    function removeCartItem()
    {
        $('.cart-table-content').on('click', '.btn-remove-cart-item', function(e){
            var itemID = $(this).parents('tr').attr('data-id');

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
                            let ct = response.cartToken;

                            localStorage.removeItem('cart');
                            localStorage.setItem('cart', ct);

                            //load items in table cart
                            loadCart(ct);

                            //reload items in mini-cart
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

    function removeAllCartItems()
    {
        $('.btn-clear-cart').on('click', function(e){
            e.preventDefault();

            blockUI();

            $.ajax({
                type:'DELETE',
                url:`${API_URL_ROOT}/cart`,
                dataType:'json',
                headers:{ 'x-access-token':token},
                success:function(response)
                {
                    if(response.error == false)
                    {
                        let ct = response.cartToken;

                        localStorage.removeItem('cart');
                        localStorage.setItem('cart', ct);

                        //load items in table cart
                        loadCart(ct);

                        //reload items in mini-cart
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
        })
    }
}); 