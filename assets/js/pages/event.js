$(function () {
	'use strict';

	const token = sessionStorage.getItem('token');

    const Limit = 10;

	$(document).ready(async function(){

        checkParamAvailability(new Array('eventid'));

        const eventID = getUrlParameter('eventid');

		await loadEvent(eventID);

        await loadReviews(eventID, Limit, 0);

        await listPages(eventID, Limit, 0);

        await pagination(eventID);

        await previewEvent();

        rateEvent();

        configureSharing(eventID);

		/*await listPages(Limit, 0);

		await pagination();

		await sort();

		await previewEvent();*/

        $('select').niceSelect();

        $('.reviews').on('click', function(){
            $('#reviews-tab').click();

            $([document.documentElement, document.body]).animate({
                scrollTop: $("#des-details3").offset().top
            }, 2000);
        })
	});

	async function loadEvent(eventID)
	{
		try
		{
			const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/media-events/${eventID}`,
				dataType:'json'
			});

			const event = response.event;
            const media = event.media;

            const response1 = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/media-events?exclude=${event.media_event_id}&category_id=${event.media_event_category_id}&sortBy=id_desc&limit=10&page=0`,
                dataType:'json'
            });

            const events = response1.result.mediaEvents;
            const totalRecords = response1.result.pagination ? response1.result.pagination.total_records : 0;

            let sliderHTML = '';
            let eventsHTML = '';
            let imgDetails = $('.product-details-tab');
            let gallery = $('.product-dec-slider-2');
            let owl = $('#recent-events');
            let totalAmount = 0;

            for(var i = 0; i < media.length; i++)
            {
                let active = '';

                if(i == 0)
                {
                    active = 'active';
                    $('.product-details-tab .zoompro-span').html(`<img class="zoompro" src="${media[i].media_thumbnail_url}" data-zoom-image="${media[i].media_thumbnail_url}" alt="${media[i].media_uuid}" />`);
                }

                sliderHTML += `
                    <a class="${active}" data-image="${media[i].media_thumbnail_url}" data-zoom-image="${media[i].media_thumbnail_url}">
                        <img src="${media[i].media_thumbnail_url}" alt="${media[i].media_uuid}" />
                    </a>
                `;

                totalAmount += media[i].media_price;
            }

            
            $('.product-details-tab .product-dec-slider-2').html(sliderHTML);
            $('.product-details-content h2').text(event.media_event);
            $('.product-details-content  .old-price').text(`NGN ${formatNumber(totalAmount)}`);
            $('.product-details-content .event-details').text(`${truncateString(stripHtmlTags(event.media_event_description), 400)}`);
            $('.product-details-content .btn-add-to-cart').attr('data-id', event.media_event_id);
            $('.product-description-wrapper').html(event.media_event_description);
            $('.product-anotherinfo-wrapper ul').html(`
                <li><span>Event Catgory:</span> ${event.media_event_category}</li>
                <li><span>Event Location:</span>${event.media_event_location}</li>
                <li><span>Uploded At:</span> ${moment.unix(event.media_event_created_at).format('MMMM Do YYYY, h:mm:ss a')}</li>
                <li><span>Status Of Upload</span> ${event.media_event_status}</li>`
            );
            $('#category-count').text(`${totalRecords == 1 ? totalRecords + ' other event in the same category' : totalRecords == 0 ? 'No other event in the same category' : totalRecords + ' other records in the same category' }`);
            $('#rating-form #media_event_id').val(event.media_event_id);
            $('.product-details-area .rating-product, .description-review-area .rating-product').html(`${returnRating(parseFloat(event.rating))}`);
            $('.read-review span, #reviews-tab span').text(`(${event.reviews})`);
            $('.explore-btn a').attr('href', `explore?event=${event.media_event_slug}`);
            $('.explore-btn a span').text(`(${media.length == 0 ? 'No Images' : media.length == 1 ? '1 Image' : media.length + ' Images'})`);

            $(".zoompro").elevateZoom({
                gallery: "gallery",
                galleryActiveClass: "active",
                zoomWindowWidth: 300,
                zoomWindowHeight: 100,
                scrollZoom: false,
                zoomType: "outer",
                cursor: "crosshair"
            });

            gallery.slick('unslick');

            gallery.slick({
                infinite: true,
                slidesToShow: 4,
                arrows:false,
                slidesToScroll: 1,
                responsive: [{
                        breakpoint: 992,
                        Settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 767,
                        Settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 479,
                        Settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            for(var i = 0; i < events.length; i++)
            {
                eventsHTML += `
                    <article class="list-product event-block" data-id="${events[i].media_event_id}">
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
                            <h2><a href="media?event=${events[i].media_event_slug}" class="product-link">${truncateString(events[i].media_event, 31)}</a></h2>
                            <div class="rating-product">${returnRating(events[i].rating)}</div>
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
                `
            }

            owl.html(eventsHTML);
            owl.owlCarousel('destroy');
            owl.owlCarousel({
                autoplay :  true,
                smartSpeed : 1000,
                nav :  true ,
                loop: false,
                dots :  false ,
                items:4,
                margin:30,
                responsive:{
                    0:{
                        items:1,
                        autoplay: true,
                        loop: true,
                    },
                    360:{
                        items:1,
                        autoplay: true,
                        loop: true,
                    },
                    500:{
                        items:2,
                        autoplay: true,
                        loop: true,
        
                    },
                    768:{
                        items:2,
                    },
                    992:{
                        items:4,
                    },
                    1200:{
                        items:5,
                    },
                    1300:{
                        items:6,
                    }
                }
            });
		}
		catch(e)
		{
            console.log(e.stack)
			showSimpleMessage("Attention", e.message, "error");
		}
	}

	async function listPages(eventID, limit, page)
    {
    	try
    	{
    		const response = await $.ajax({
				type:'GET',
				url:`${API_URL_ROOT}/event-ratings?status=Published&event_id=${eventID}&page=${page}&limit=${limit}`,
				dataType:'json'
			});

			const pagination = response.result.pagination;

			$('.pro-pagination-style ul').empty();

			if(pagination)
            {
                window.numpages = pagination.numPages;

                var page = parseInt(page) + 1;

                var pages = p(page, pagination.numPages, 2);

                $('.pro-pagination-style ul').append(`<li><a class="prev" href="javascript:void(0)"><i class="ion-ios-arrow-left"></i></a></li>`);

                for(var i = 0; i < pages.length; i++)
                {
                    var active = pages[i] == page ? `class="active"` : ``;

                    if(pages[i] == "...")
                    {
                        $('.pro-pagination-style ul').append(`<li>...</li>`);
                    }
                    else
                    {
                        $('.pro-pagination-style ul').append(`<li class="page-no" page="${pages[i] - 1}"><a href="javascript:void(0)" ${active}>${pages[i]}</a></li>`);
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

	async function pagination(eventID)
	{
		$('.pro-pagination-style ul').on('click', '.next', function(e){
            e.preventDefault();

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
                
                loadReviews(eventID, Limit, next_page);
                pagenator(next_page);
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
                
                loadReviews(eventID, Limit, previous_page);
                pagenator(previous_page);
            }
        });

        $('.pro-pagination-style ul').on('click', '.page-no', function(e){
            e.preventDefault();

            var page = $(this).attr('page');
        
            $('.pro-pagination-style ul').find('.page-no a').removeClass('active');
            $('.pro-pagination-style ul').find("[page='"+page+"']").find('a').addClass('active');
            
            loadReviews(eventID, Limit, page);
            pagenator(parseInt(page));
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
		$('.quick_view').on('click', async function(e){
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
				
				owl.html(html1);

				owl.owlCarousel('destroy');

				owl.owlCarousel({
			        loop: false,
			        margin: 15,
			        smartSpeed: 1000,
			        nav: true,
			        dots: false,
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

    function rateEvent()
    {
        $('#rating-form').on('submit', function(e){
            e.preventDefault();

            var form = $(this);
            var eventID = form.find('#media_event_id').val();
            var fields = form.find('input.required, select.required');

            blockUI();       

            for(var i=0;i<fields.length;i++)
            {
                if(fields[i].value == "")
                {
                    unblockUI();
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    $('#'+fields[i].id).focus();
                    return false;
                }
            } 

            if(!token)
            {
                unblockUI();
                showSimpleMessage("Attention", `You must be logged in to rate this event`, "error");
                return false;
            }

            $.ajax({
                type: 'POST',
                url: `${API_URL_ROOT}/event-ratings`,
                data: JSON.stringify(form.serializeObject()),
                dataType: 'json',
                contentType: 'application/json',
                headers:{'x-access-token':token},
                success: function(response)
                {
                    if(response.error == false)
                    {
                        unblockUI();
                        showSimpleMessage("Success", response.message, "success");
                        form.get(0).reset();
                        $('select').niceSelect('update');

                        loadReviews(eventID, Limit, 0);
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
        })
    }

    function loadReviews(eventID, limit, page)
    {
        $.ajax({
            type:'GET',
            url:`${API_URL_ROOT}/event-ratings?status=Published&event_id=${eventID}&page=${page}&limit=${limit}`,
            dataType:'json',
            success:function(response)
            {
                if(response.error == false)
                {
                    var reviews = response.result.ratings
                    var reviewsCount = response.result.pagination ? response.result.pagination.total_records : 0;
                    var totalRating = 0;
                    var reviewsHTML = '';

                    for(var i = 0; i < reviews.length; i++)
                    {
                        reviewsHTML += `
                            <div class="single-review">
                                <div class="review-img">
                                    <img src="${reviews[i].user_image_url}" width="120" height="120" class="img-circle" alt="${reviews[i].rater}" />
                                </div>
                                <div class="review-content">
                                    <div class="review-top-wrap">
                                        <div class="review-left">
                                            <div class="review-name">
                                                <h4>${reviews[i].rater}</h4>
                                            </div>
                                            <div class="rating-product">${returnRating(reviews[i].rating)}</div>
                                        </div>&nbsp;&nbsp;&nbsp;
                                        <div class="review-left">
                                            <a href="javascript:void()">${moment.unix(reviews[i].rating_created_at).format('MMMM Do YYYY, h:mm:ss a')}</a>
                                        </div>
                                    </div>
                                    <div class="review-bottom">
                                        <p style="text-align:justify">
                                            ${reviews[i].review}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }

                    $('.review-wrapper').html(reviewsHTML);
                    $('.read-review span, #reviews-tab span').text(`(${reviewsCount})`);
                }
                else
                {
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
                }
            },
            error: function(req, status, error)
            {
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.statusText, "error");
            }
        })
    }

    function configureSharing(eventID)
    {
        var keywords = 'Photoman Events';

        //social medial share
        $('.fb-share').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=https://photoman.ng/event?eventid=' + eventID);
        $('.tw-share').attr('href', 'https://twitter.com/share?url=https://photoman.ng/event?eventid=' + eventID+'&amp;text=photoman&amp;hashtags=' +keywords);

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
        {
            $('.wa-share').attr('href', 'whatsapp://send?text=https://photoman.ng/event?eventid=' + eventID);
        }
        else
        {
            $('.wa-share').attr('href', 'https://web.whatsapp.com/send?text=https://photoman.ng/event?eventid=' + eventID);
        }
    }

    function pagenator(page)
    {
        var numpages = window.numpages;

        var page = parseInt(page) + 1;
                
        var pages = p(page, numpages, 2);

        $('.pro-pagination-style ul').empty();

        $('.pro-pagination-style ul').append(`<li><a class="prev" href="javascript:void(0)"><i class="ion-ios-arrow-left"></i></a></li>`);

        for(var i = 0; i < pages.length; i++)
        {
            var active = pages[i] == page ? `class="active"` : ``;

            if(pages[i] == "...")
            {
                $('.pro-pagination-style ul').append(`<li>...</li>`);
            }
            else
            {
                $('.pro-pagination-style ul').append(`<li class="page-no" page="${pages[i] - 1}"><a href="javascript:void(0)" ${active}>${pages[i]}</a></li>`);
            }
        }

        $('.pro-pagination-style ul').append(`<li><a class="next" href="javascript:void(0)"><i class="ion-ios-arrow-right"></i></a></li>`);
    }
});