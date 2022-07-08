$(function () {
	'use strict';

	let token = sessionStorage.getItem('token');

	const Limit = 16;
	/*const ps = new PerfectScrollbar(document.querySelector('.mt-container'));
	const secondUpload = new FileUploadWithPreview('mySecondImage')*/

	$(document).ready(async function(){

		/*$('body').on('contextmenu', function(e){
			e.preventDefault();
		})*/

		await loadEvents(Limit, 0);

		await listPages(Limit, 0);

		await pagination();

		await sort();

		await previewEvent();

		loadStates();

		filterByState(Limit, 0)
	});

	async function loadEvents(limit, page)
	{
		var states = getUrlParameter('state') ? [getUrlParameter('state')] : [];

        $.each($(".state-filter:checked"), function(){
            states.push($(this).attr('data-id'));
        });

        var statesImploded = states.join(',');

		const categorySlug = getUrlParameter('category') ? getUrlParameter('category') : '';
		const searchTerm = getUrlParameter('search') ? getUrlParameter('search') : '';
		const state = statesImploded ? statesImploded : getUrlParameter('state') ? getUrlParameter('state') : '';
		const sortBy = $('#sortBy').find('option:selected').val();

		try
		{
			const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/media-events?status=Active&categorySlug=${categorySlug}&search=${searchTerm}&limit=${limit}&page=${page}&sortBy=${sortBy}&state=${state}`,
				dataType:'json'
			});

			let html = '';
			let html1 = '';
			const events = response.result.mediaEvents;
			const eventCount = events.length;
			let eventCountNotification = eventCount  == 1 ? `${eventCount} record returned` : `${eventCount} records returned`;

			let eventsGrid = $('#shop-1 .row');

			let eventsList = $('#shop-2');

			let countNotification = $('#count-notification');

			for(var i = 0; i < events.length; i++)
			{
				html += `
					<div class="col-xl-3 col-md-4 col-sm-6 event-block" data-id="${events[i].media_event_id}">
                        <article class="list-product">
                            <div class="img-block">
                                <a href="event?eventid=${events[i].media_event_id}" class="thumbnail">
                                    <img class="first-img" src="${events[i].media_event_cover_image_url}" alt="${events[i].media_event}" />
                                </a>
                                <div class="quick-view">
                                    <a class="quick_view" href="#" data-link-action="quickview" title="Quick view" data-toggle="modal" data-target="#eventModal">
                                        <i class="ion-ios-search-strong"></i>
                                    </a>
                                </div>
                            </div>
                            <ul class="product-flag">
                                <li class="new">New</li>
                            </ul>
                            <div class="product-decs">
                                <a class="inner-link" href="events?category=${events[i].media_event_category_slug}"><span>${events[i].media_event_category}</span></a>
                                <h2><a href="event?eventid=${events[i].media_event_id}" class="product-link">${truncateString(events[i].media_event, 31)}</a></h2>
                                <div class="rating-product">
                                    ${returnRating(events[i].rating)}
                                </div>
                                <div class="pricing-meta">
                                    <ul>
                                        <li class="old-price not-cut">NGN ${formatNumber(events[i].total_price)}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="add-to-link">
                                <ul>
                                    <li class="cart btn-add-to-cart" data-resource="events" data-id="${events[i].media_event_id}">
                                        <a class="cart-btn" href="#">ADD TO CART </a>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
				`

				html1 += `
					<div class="shop-list-wrap mb-30px scroll-zoom event-block" data-id="${events[i].media_event_id}>
                        <div class="row list-product m-0px">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                        <div class="left-img">
                                            <div class="img-block">
                                                <a href="event?eventid=${events[i].media_event_id}" class="thumbnail">
                                                    <img class="first-img" src="${events[i].media_event_cover_image_url}" alt="${events[i].media_event}" />
           
                                                </a>
                                                <div class="quick-view">
                                                    <a class="quick_view" href="#" data-link-action="quickview" title="Quick view" data-toggle="modal" data-target="#eventModal">
                                                        <i class="ion-ios-search-strong"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            <ul class="product-flag">
                                                <li class="new">New</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                        <div class="product-desc-wrap">
                                            <div class="product-decs">
                                                <a class="inner-link" href="events?category=${events[i].media_event_category_slug}"><span>${events[i].media_event_category}</span></a>
                                                <h2><a href="event?eventid=${events[i].media_event_id}" class="product-link">${truncateString(events[i].media_event, 42)}</a></h2>
                                                <div class="rating-product">
                                                    ${returnRating(events[i].rating)}
                                                </div>
                                                <div class="pricing-meta">
                                                    <ul>
                                                        <li class="old-price not-cut">NGN ${formatNumber(events[i].total_price)}</li>
                                                    </ul>
                                                </div>
                                                <div class="product-intro-info">
                                                    ${truncateString(stripHtmlTags(events[i].media_event_description), 400)}
                                                </div>
                                            </div>
                                            <div class="add-to-link">
                                                <ul>
                                                    <li class="cart">
                                                        <a class="cart-btn" href="#">ADD TO CART </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				`
			}

			eventsGrid.html(html);
			eventsList.html(html1);
			countNotification.text(eventCountNotification);
		}
		catch(e)
		{
			showSimpleMessage("Attention", e.message, "error");
		}
	}

	async function listPages(limit, page)
    {
    	var states = getUrlParameter('state') ? [getUrlParameter('state')] : [];

        $.each($(".state-filter:checked"), function(){
            states.push($(this).attr('data-id'));
        });

        var statesImploded = states.join(',');

		const categorySlug = getUrlParameter('category') ? getUrlParameter('category') : '';
		const searchTerm = getUrlParameter('search') ? getUrlParameter('search') : '';
		const state = statesImploded ? statesImploded : getUrlParameter('state') ? getUrlParameter('state') : '';
		const sortBy = $('#sortBy').find('option:selected').val();


    	try
    	{
    		const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/media-events?status=Active&categorySlug=${categorySlug}&search=${searchTerm}&limit=${limit}&page=${page}&sortBy=${sortBy}&state=${state}`,
				dataType:'json'
			});

			const pagination = response.result.pagination;

			$('.pro-pagination-style ul').empty();

			if(pagination)
			{
				$('.pro-pagination-style ul').append(`<li><a class="prev" href="javascript:void(0)"><i class="ion-ios-arrow-left"></i></a></li>`);

				for(var i = 1; i <= pagination.numPages; i++)
				{
					if(i == 1)
                    {
                        $('.pro-pagination-style ul').append(`<li class="page-no" page="${i - 1}"><a href="javascript:void(0)" class="active">`+i+`</a></li>`);    
                    }
                    else if(i == Math.ceil(pagination.numPages / 2) || i == pagination.numPages)
                    {
                        $('.pro-pagination-style ul').append(`<li class="page-no" page="${i - 1}"><a href="javascript:void(0)">`+i+`</a></li>`);
                    }
                    else
                    {
                        $('.pro-pagination-style ul').append(`<li class="page-no" page="${i - 1}" style="display:none"><a href="javascript:void(0)">`+i+`</a></li>`);
                    }
				}

				$('.pro-pagination-style ul').append(`<li><a class="next" href="javascript:void(0)"><i class="ion-ios-arrow-right"></i></a></li>`);
			}
    	}
    	catch(e)
    	{
    		showSimpleMessage("Attention", e.message, "error");
    	}
    }

	async function pagination()
	{
		$('.pro-pagination-style ul').on('click', '.next', function(e){
            e.preventDefault();

            const sortBy = $('#sortBy').find('option:selected').val();

            var current_page = $(this).parents('ul').find('.active').parents('.page-no').attr('page');
            var last_page = $(this).parents('ul').find('.page-no:last').attr('page');
            var next_page = (current_page * 1) + 1;
            
            if(next_page > last_page)
            {
                return false;
            }
            else
            {
            	$('.pro-pagination-style ul').find('.page-no a').removeClass('active');
                $('.pro-pagination-style ul').find("[page='"+next_page+"']").find('a').addClass('active');
                
                loadEvents(Limit, next_page);
            }
        });

        $('.pro-pagination-style ul').on('click', '.prev', function(e){
            e.preventDefault();

            var current_page = $(this).parents('ul').find('.active').parents('.page-no').attr('page');
            var first_page = $(this).parents('ul').find('.page-no:first').attr('page');
            var previous_page = (current_page * 1) - 1;
            
            if(previous_page < first_page)
            {
                return false;
            }
            else
            {
                $('.pro-pagination-style ul').find('.page-no a').removeClass('active');
                $('.pro-pagination-style ul').find("[page='"+previous_page+"']").find('a').addClass('active');
                
                loadEvents(Limit, previous_page);
            }
        });

        $('.pro-pagination-style ul').on('click', '.page-no', function(e){
            e.preventDefault();

            var page = $(this).attr('page');
        
            $('.pro-pagination-style ul').find('.page-no a').removeClass('active');
            $('.pro-pagination-style ul').find("[page='"+page+"']").find('a').addClass('active');
            
            loadEvents(Limit, page);
        });
	}

	async function sort()
	{
		$('#sortBy').on('change', function(){
			var sortBy = $(this).find('option:selected').val();

			loadEvents(Limit, 0);

			listPages(Limit, 0);
		})
	}

	async function previewEvent()
	{
		$('body').on('click', '.quick_view', async function(e){
			e.preventDefault();

			var eventID = $(this).parents('.event-block').attr('data-id');

			var eventModal = $('#eventModal');

			try
			{
				const response = await $.ajax({
					type:'GET',
					url: `${API_URL_ROOT}/media-events/${eventID}`,
					dataType:'json'
				});

				const event = response.event;
				const media = event.media;

				let html = '';
				let html1 = '';
				let albumPrice = 0;

				const owl = eventModal.find('.quickview-slide-active');

				for(var i = 0; i < media.length; i++)
				{
					var active = i == 0 ? 'active' : '';
					var show = i == 0 ? 'show' : '';

					albumPrice += media[i].media_price;

					html += `
						<div id="${media[i].media_uuid}" class="tab-pane fade ${show} ${active}">
                            <img src="${media[i].media_thumbnail_url}" alt="${media[i].media_uuid}" />
                        </div>
					`;

					html1 += `
						<a class="${active}" data-toggle="tab" href="#${media[i].media_uuid}">
							<img src="${media[i].media_thumbnail_url}" alt="${media[i].media_uuid}" width="90" height="90"/>
						</a>
					`;
				}

				eventModal.find('.quickview-big-img').html(html);
				eventModal.find('.event-title').text(event.media_event);
                eventModal.find('.rating-product').html(`${returnRating(event.rating)}`);
                eventModal.find('.read-review span').text(`(${event.reviews})`)
				eventModal.find('.old-price').text(`NGN ${formatNumber(albumPrice)}`);
				eventModal.find('.event-description').html(`${truncateString(stripHtmlTags(event.media_event_description), 250)}`);
				eventModal.find('.btn-add-to-cart').attr('data-id', event.media_event_id);
				eventModal.find('.explore-btn a').attr('href', `explore?event=${event.media_event_slug}`);
            	eventModal.find('.explore-btn a span').text(`(${media.length == 0 ? 'No Images' : media.length == 1 ? '1 Image' : media.length + ' Images'})`);

            	//social medial share
		        eventModal.find('.fb-share').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=https://photoman.ng/event?eventid=' + eventID);
		        eventModal.find('.tw-share').attr('href', 'https://twitter.com/share?url=https://photoman.ng/event?eventid=' + eventID+'&amp;text=photoman&amp;hashtags=Photoman');

		        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
		        {
		            eventModal.find('.wa-share').attr('href', 'whatsapp://send?text=https://photoman.ng/event?eventid=' + eventID);
		        }
		        else
		        {
		            eventModal.find('.wa-share').attr('href', 'https://web.whatsapp.com/send?text=https://photoman.ng/event?eventid=' + eventID);
		        }
				
				owl.html(html1);

				owl.owlCarousel('destroy');

				setTimeout(function(){

					owl.owlCarousel({
				        loop: false,
				        margin: 15,
				        smartSpeed: 1000,
				        nav: true,
				        dots: false,
				        lazyLoad:true,
				        responsive: {
				            0: {
				                items: 3,
				                autoplay: true,
				                smartSpeed: 300
				            },
				            576: {
				                items: 3
				            },
				            768: {
				                items: 3
				            },
				            1000: {
				                items: 3
				            }
				        }
				    })

				}, 2000)

			    $('.quickview-slide-active').find('a').on('click', function() {

			    	var href = $(this).attr('href');

			        $('.quickview-slide-active').find('a').removeClass('active');
			        $('.quickview-big-img').find('.tab-pane').removeClass('show active');
			        $('.quickview-big-img').find(`${href}`).addClass('show active');
			    })
			}
			catch(e)
			{
				showSimpleMessage("Attention", e.message, "error");	
			}
		})
	}

	function loadStates()
    {
        $.getJSON( "assets/js/nigeria-state-and-lgas.json", function( data ) {
            var html = ``;
            
            $.each( data, function( key, val ) {
                html += `
                	<li>
                        <div class="sidebar-widget-list-left">
                            <input type="checkbox" class="state-filter" data-id="${encodeURI(data[key].state)}" /> <a href="events?state=${encodeURI(data[key].state)}">${data[key].state} </a>
                            <span class="checkmark"></span>
                        </div>
                    </li>
                `;
            });

            $('.state-list ul').html(html);
        });
    }

    function filterByState(limit, page)
    {
    	var checkedArray = [];

    	$('.state-list').on('change', '.state-filter', function(){

    		/*var checkBox = $(this);

    		const state = checkBox.attr('data-id');

    		if(checkBox.is(':checked'))
    		{
    			if(checkedArray.indexOf(state) == -1)
    			{
    				checkedArray.push(state);
    			}
    		}

    		if(!checkBox.is(':checked'))
    		{
    			const index = checkedArray.indexOf(state);

    			if (index > -1) 
    			{
					checkedArray.splice(index, 1); // 2nd parameter means remove one item only
				}
    		}*/

    		loadEvents(limit, page);

    		listPages(limit, page)
    	});
    }
});