$(function () {

    'use strict';

    const token = sessionStorage.getItem('token');

	$(document).ready(function($) {

        //check if user is not logged in
        notLoggedInCheck();
        //prevent datatable alerts
        dataTableAlertPrevent('table');
        //load states
        loadStates();
        //onchage states
        onchangeState();;
        //load my profie
        loadMyProfile()
        //update account
        updateAccount();
        //update password
        updatePassword();
        //load my orders
        loadMyOrders();
        //load my order items
        loadOrderItems();
        //download a specific item
        downloadItem();
        //download order items
        downloadItems();
        //load my inbox
        loadInbox();
        //inbox actions
        inboxActions();
        //toggle passwords
        togglePasswords();
    });

    function loadStates()
    {
        $.getJSON( "assets/js/nigeria-state-and-lgas.json", function( data ) {
            var html = `<option value="">State Of Location</option>`;
            
            $.each( data, function( key, val ) {
                html += `<option value="${data[key].state}">${data[key].state}</option>`;
            });

            $('#state').html(html);
            $('#state').niceSelect('update');
        });
    }

    function onchangeState()
    {
        $('#state').on('change', function(){
            var value = $(this).val();
            
            if(value !== '')
            {
                $.getJSON( "assets/js/nigeria-state-and-lgas.json", function( data ) {
                    var html = `<option value="">Select LGA</option>`;
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

                    $('#lg').html(html);
                    $('#lg').niceSelect('update');
                });
            }
            else
            {
                $('#lg').html(`<option value="">Local Government</option>`);
            }
        });
    }

    function loadMyProfile()
    {
        $('#user_firstname').val(payloadClaim(token, 'user_firstname'));
        $('#user_lastname').val(payloadClaim(token, 'user_lastname'));
        $('#user_gender').val(payloadClaim(token, 'user_gender'));
        $('#user_email').val(payloadClaim(token, 'user_email'));
        $('#user_phone').val(payloadClaim(token, 'user_phone'));
        $('#user_contact_address').val(payloadClaim(token, 'user_contact_address'));

        $('.user-avatar').attr({src:payloadClaim(token, 'user_image_url'), alt:payloadClaim(token, 'user_firstname')});
        $('.user-full-name').text(`${payloadClaim(token, 'user_firstname')} ${payloadClaim(token, 'user_lastname')}`);
        $('.user-gender').text(payloadClaim(token, 'user_gender'));
        $('.user-email').html(`<a href="mailto:${payloadClaim(token, 'user_email')}"> ${payloadClaim(token, 'user_email')}</a>`);
        $('.user-phone').html(`<a href="tel:${payloadClaim(token, 'user_phone')}"> ${payloadClaim(token, 'user_phone')}</a>`);
        $('.user-contact-address').text(payloadClaim(token, 'user_contact_address'));
        $('.user-state').text(payloadClaim(token, 'user_state'));
        $('.user-lg').text(payloadClaim(token, 'user_lg'));

        setTimeout(function(){
            $('#state').val(payloadClaim(token, 'user_state'));
            $('#lg').append(`<option value="${payloadClaim(token, 'user_lg')}" selected>${payloadClaim(token, 'user_lg')}</option>`);
            $('select').niceSelect('update');
        }, 2000)
        
        $('select').niceSelect('update');
    }

    function updateAccount() 
    {
        $('#update-account').on('submit', function(e){
            e.preventDefault();

            swal({
                title: "Attention",
                text: "Are you sure you want to update your profile?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes!",
                cancelButtonText: "No!"
                /*closeOnConfirm: false,
                closeOnCancel: false*/
            }).then(function(result){
                if (result.value) 
                {
                    //name vairables
                    var form = $('#update-account'); //form
                    var email = form.find("#user_email").val(); //User email from form
                    var avatar = form.find("#avatar").val();
                    var fields = form.find('input.required, select.required');         

                    blockUI();

                    for(var i=0;i<fields.length;i++)
                    {
                        if(fields[i].value == "")
                        {
                            /*alert(fields[i].id);*/
                            unblockUI();
                            $('#'+fields[i].id).focus();
                            showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                            return false;
                        }
                    }
                
                    if(!validateEmail(email))
                    {
                        //email format is invalid
                        unblockUI();
                        $("#user_email").focus();
                        showSimpleMessage("Attention", "Please provide a valid user email address", "error");
                        return false;   
                    }

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
                        
                        if($("#avatar").get(0).files[0].size > (1024 * 200)) 
                        {
                            //user image is more than 1MB
                            unblockUI();
                            $("#avatar").focus();
                            showSimpleMessage("Attention", "Avatar must not be more than 200KB in size", "error");
                            return false;
                        } 
                    }

                    $.ajax({
                        type: 'PUT',
                        url: API_URL_ROOT+'/account-update',
                        data: new FormData(form[0]),
                        dataType: 'json',
                        contentType: false,
                        processData: false,
                        cache: false,
                        headers:{'x-access-token':token},
                        success: function(response)
                        {
                            if(response.error == false)
                            {
                                var newToken = response.token;

                                sessionStorage.removeItem('token');
                                sessionStorage.setItem('token', newToken);

                                displayUserProfile();

                                unblockUI();
                                showSimpleMessage("Success", response.message, "success");

                                window.location.reload();
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
                            showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                        }
                    });  
                } 
                else
                {
                    showSimpleMessage('Canceled', 'Process Abborted', 'error');
                }
            });
        }); 
    }

    function updatePassword() 
    {
        $('#update-password').on('submit', function(e){
            e.preventDefault();

            swal({
                title: "Attention",
                text: "Are you sure you want to update your password?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes!",
                cancelButtonText: "No!"
                /*closeOnConfirm: false,
                closeOnCancel: false*/
            }).then(function(result){

                if (result.value) 
                {
                    //name vairables
                    var form = $('#update-password'); //form
                    var currentPassword = form.find('#current_password').val();
                    var newPassword = form.find('#new_password').val();
                    var rePassword = form.find('#confirm_password').val();
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
                
                    if(newPassword !== rePassword)
                    {
                        //passwords dont match
                        unblockUI();
                        $("#new_password").focus();
                        showSimpleMessage("Attention", "Passwords don't match", "error");
                        return false;
                    }
                    else
                    {
                        $.ajax({
                            type: 'POST',
                            url: API_URL_ROOT+'/change-password',
                            data: JSON.stringify(form.serializeObject()),
                            dataType:'json',
                            contentType:'application/json',
                            headers:{'x-access-token':token},
                            success: function(response)
                            {
                                if(response.error == false)
                                {
                                    unblockUI();
                                    showSimpleMessage("Success", response.message, "success");
                                    form.get(0).reset();
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
                }
                else
                {
                    showSimpleMessage('Canceled', 'Process Abborted', 'error');
                }
            }); 
        })    
    }

    //load my orders
    function loadMyOrders()
    {
        var table = $('#my_orders');
        var userID = payloadClaim(token, 'user_id');

        table.DataTable({
            oLanguage: {
                oPaginate: { 
                    sPrevious: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' 
                },
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sSearch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                sSearchPlaceholder: "Search...",
               sLengthMenu: "Results :  _MENU_",
            },
            lengthMenu: [7, 10, 20, 50, 100],
            stripeClasses: [],
            drawCallback: function () { $('.dataTables_paginate > .pagination').addClass(' pagination-style-13 pagination-bordered mb-5'); },
            /* 'createdRow': function( row, data, dataIndex, cells ) {
                $(row).attr({'data-toggle':'modal', 'data-target':'#orderModal', 'data-animation':'fall', 'data-plugin':'custommodal', 'data-overlayColor':'#012'});
            }, */
            language: {
                infoEmpty: "<span style='color:red'><b>No records found</b></span>"
            },
            processing: true,
            serverSide: true,
            destroy: true,
            autoWidth: false,
            pageLength: 100,
            ajax: {
                type: 'GET',
                url:`${API_URL_ROOT}/orders/data-table/fetch?user_id=${userID}`,
                dataType: 'json',
                headers:{'x-access-token':token},
                complete: function()
                {
                    //$("#loadingScreen").hide();
                    //$('.panel-refresh').click();
                },
                async: true,
                error: function(xhr, error, code)
                {
                    console.log(xhr);
                    console.log(code);
                }
            },
            columnDefs: [
                { orderable: false, targets: [1,2, 3, 4, 5, 6, 7] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'order_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { data: 'transaction_reference_no' },
                { data: 'order_item_qty' },
                {
                    data: 'order_total_price',
                    render: function(data, type, row, meta)
                    {
                        return `NGN ${formatNumber(data)}`;
                    }
                },
                {
                    data: 'order_timestamp',
                    render: function(data, type, row, meta)
                    {
                        return moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                    }
                },
                { data: 'billing_email_address' },
                { data: 'order_status' },
                {
                    data: 'order_id',
                    render: function(data, type, row, meta)
                    {
                        var actions = `
                            <a href="javascript:void(0);" 
                                class="btn btn-link font-18 text-muted btn-sm btn-view" title="View Order Items" 
                                data-id="`+data+`" 
                                data-toggle="modal" 
                                data-target="#orderModal" 
                                data-animation="fall" 
                                data-plugin="custommodal" 
                                data-overlayColor="#012">
                                <i class="ion-search"></i>
                            </a>
                            <a href="javascript:void(0);" 
                                data-id="${data}"
                                class="btn btn-link font-18 text-muted btn-sm btn-download" 
                                title="Download Media"> 
                                <i class="ion-android-download"></i>
                            </a>
                        `;

                        return actions;
                    },
                    searchable: false,
                    sortable: false
                }
            ]  
        });
    }

    function loadOrderItems()
    {
        $('#my_orders').on('click', '.btn-view', function(){

            var orderID = $(this).attr('data-id');

            blockUI();

            $.ajax({
                type:'GET',
                url:`${API_URL_ROOT}/orders/${orderID}`,
                dataType:'json',
                headers:{'x-access-token':token},
                success:function(response)
                {
                    if(response.error == false)
                    {
                        var order = response.order;
                        var items = order.items;
                        var itemsHTML = '';

                        for(var i = 0; i < items.length; i++)
                        {
                            itemsHTML += `
                                <tr data-id="${items[i].media_id}" style="cursor:pointer" title="Click to download">
                                    <td>${i + 1}</td>
                                    <td><img src="${items[i].media_thumbnail_url}" width="90" height="90" alt="${items[i].media_uuid}"/></td>
                                    <td>${items[i].media_event}</td>
                                    <td>${items[i].media_event_category}</td>
                                    <td>${items[i].order_item_price}</td>
                                    <td>
                                        <a href="javascript:void(0);" 
                                            class="btn btn-link font-18 text-muted btn-sm btn-download" 
                                            title="Download Media"> 
                                            <i class="ion-android-download"></i>
                                        </a>
                                    </td>
                                </tr>
                            `;
                        }

                        $('#my_order_items tbody').html(itemsHTML);
                        $('#orderModal .modal-title').text(`${order.transaction_reference_no} (${moment.unix(order.order_timestamp).format('MMMM Do YYYY, h:mm:ss a')}`);
                        unblockUI();
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

    function downloadItem()
    {
        $('#my_order_items').on('click', '.btn-download, tr', function(e){
            e.preventDefault();

            var mediaID = $(this).get(0).nodeName == "A" ? $(this).parents('tr').attr('data-id') : $(this).attr('data-id');

            blockUI();

            $.ajax({
                type:'GET',
                url:`${API_URL_ROOT}/media/download/${mediaID}`,
                headers:{ 'x-access-token':token}
            });

            unblockUI();
        })
    }

    function downloadItems()
    {
        $('#my_orders').on('click', '.btn-download', function(e){
            e.preventDefault();

            var orderID = $(this).attr('data-id');

            //blockUI();

            $.ajax({
                type:'GET',
                url:`${API_URL_ROOT}/orders/download/${orderID}`,
            })
        })
    }

    //load Inbox
    function loadInbox()
    {
        var table = $('#my_inbox');

        table.DataTable({
            oLanguage: {
                oPaginate: { 
                    sPrevious: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>', "sNext": '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' 
                },
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sSearch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
                sSearchPlaceholder: "Search...",
               sLengthMenu: "Results :  _MENU_",
            },
            lengthMenu: [7, 10, 20, 50, 100, 500, 1000],
            stripeClasses: [],
            drawCallback: function () { $('.dataTables_paginate > .pagination').addClass(' pagination-style-13 pagination-bordered mb-5');
            },
            language: {
                infoEmpty: "<span style='color:red'><b>No records found</b></span>"
            },
            processing: true,
            serverSide: true,
            destroy: true,
            autoWidth: false,
            pageLength: 100,
            ajax: {
                type: 'GET',
                url: API_URL_ROOT+'/inbox/data-table/fetch',
                dataType: 'json',
                headers:{'x-access-token':token},
                complete: function()
                {
                    //$("#loadingScreen").hide();
                    //$('.panel-refresh').click();
                },
                async: true,
                error: function(xhr, error, code)
                {
                    console.log(xhr);
                    console.log(code);
                }
            },
            columnDefs: [
                { orderable: false, targets: [1,2, 3, 4, 5, 6] }
            ],
            order: [[0, "desc"]],
            columns: [
                {
                    data: 'memo_delivery_id',
                    render: function (data, type, row, meta) 
                    {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                {
                    data: 'memo_subject',
                    render: function(data, type, row, meta)
                    {
                        var subject = row['message_status'] === "Unread" ? '<b>'+data+'</b>' : data;

                        return subject;
                    }
                },
                {data: 'sender'},
                {data: 'memo_sender_role'},
                {
                    data: 'memo_timestamp',
                    render: function(data, type, row, meta)
                    {
                        var createdAt = moment.unix(data).format('MMMM Do YYYY, h:mm:ss a');
                        return createdAt;
                    }
                },
                {
                    data: 'message_status',
                    render: function(data)
                    {
                        var status = data === "Unread" ? `<span class="badge outline-badge-danger">Unread</span>` : `<span class="badge outline-badge-success">Read</span>`;

                        return status;
                    }
                },
                {
                    data: 'memo_delivery_id',
                    render: function(data)
                    {
                        return `
                            <a href="javascript:void(0);" class="btn btn-link font-18 text-muted btn-sm btn-read" title="Read Message" message-id="`+data+`" data-toggle="modal" data-target="#messageModal" data-animation="fall" data-plugin="custommodal" data-overlayColor="#012"><i class="ion-search"></i>
                            </a>
                        `;
                    },
                    searchable: false,
                    sortable: false
                }
            ]  
        });
    }

    function inboxActions()
    {
        $('#my_inbox').on('click', '.btn-read', function(){
            var messageID = $(this).attr('message-id');

            $.ajax({
                type: 'GET',
                url: API_URL_ROOT+'/inbox/'+messageID,
                dataType: 'json',
                headers: {'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        var msg = response.message;

                        notifications();

                        $('#messageModal').find('.modal-title').text(msg.memo_subject)
                        $('#messageModal').find('.message-body').html(msg.memo)
                    }
                    else
                    {
                        showSimpleMessage("Attention", response.message, "error");
                    }
                },
                error: function(req, status, error)
                {
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                }
            });
        });
    }
}); 