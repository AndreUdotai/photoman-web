$(function () {
	'use strict';

	const token = sessionStorage.getItem('token');

    const Limit = 10;

	$(document).ready(async function(){

        checkParamAvailability(new Array('mediaid'));

        const mediaID = getUrlParameter('mediaid');

		/*$('body').on('contextmenu', function(e){
			e.preventDefault();
		})*/

		await loadImage(mediaID);

        await loadReviews(mediaID, Limit, 0);

        await listPages(mediaID, Limit, 0);

        await pagination(mediaID);

        await previewMedia();

        rateEvent();

        $('select').niceSelect();

        $('.reviews').on('click', function(){
            $('#reviews-tab').click();

            $([document.documentElement, document.body]).animate({
                scrollTop: $("#des-details3").offset().top
            }, 2000);
        })
	});

	async function loadImage(mediaID)
	{
		try
		{
			const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/media/${mediaID}`,
				dataType:'json'
			});

			const media = response.media;

            const response1 = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/media?exclude=${media.media_id}&event_id=${media.media_event_id}&sortBy=id_desc&limit=10&page=0`,
                dataType:'json'
            });

            const Media = response1.result.media;
            const totalRecords = response1.result.pagination ? response1.result.pagination.total_records : 0;

            let sliderHTML = '';
            let mediaHTML = '';
            let imgDetails = $('.product-details-tab');
            let gallery = $('.product-dec-slider-2');
            let owl = $('#recent-media');
            
            $('.product-details-tab .zoompro-span').html(`<img class="zoompro" src="${media.media_thumbnail_url}" data-zoom-image="${media.media_thumbnail_url}" alt="${media.media_uuid}" />`);

            $('.product-details-tab .product-dec-slider-2').html(`
                <a class="active" data-image="${media.media_thumbnail_url}" data-zoom-image="${media.media_thumbnail_url}">
                    <img src="${media.media_thumbnail_url}" alt="${media.media_uuid}" />
                </a>
            `);
            $('.product-details-content h2').text(media.media_event);
            $('.product-details-content  .old-price').text(`NGN ${formatNumber(media.media_price)}`);
            $('.product-details-content .event-details').text(`${truncateString(stripHtmlTags(media.media_event_description), 400)}`);
            $('.product-details-content .btn-add-to-cart').attr('data-id', media.media_id);
            $('.product-description-wrapper').html(media.media_event_description);
            $('.product-anotherinfo-wrapper ul').html(`
                <li><span>Event Catgory:</span> ${media.media_event_category}</li>
                <li><span>Event Location:</span>${media.media_event_location}</li>
                <li><span>Uploded At:</span> ${moment.unix(media.media_created_at).format('MMMM Do YYYY, h:mm:ss a')}</li>
                <li><span>Status Of Upload:</span> ${media.media_status}</li>
                <li><span>Photographer:</span> <a href="photoman?staffid=${media.user_id}">${media.uploader}</a></li>`
            );
            $('#media-count').text(`${totalRecords == 1 ? totalRecords + ' other media in the same event' : totalRecords == 0 ? 'No other media in the same event' : totalRecords + ' other media in the same event' }`);
            $('#rating-form #media_id').val(media.media_id);
            $('.product-details-area .rating-product, .description-review-area .rating-product').html(`${returnRating(parseFloat(media.rating))}`);
            $('.read-review span, #reviews-tab span').text(`(${media.reviews})`)

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

            for(var i = 0; i < Media.length; i++)
            {
                mediaHTML += `
                    <article class="list-product media-block" data-id="${Media[i].media_id}">
                        <div class="img-block">
                            <a href="media?mediaid=${Media[i].media_id}" class="thumbnail">
                                <img class="first-img" src="${Media[i].media_thumbnail_url}" alt="${Media[i].media_event}" />
                            </a>
                            <div class="quick-view">
                                <a class="quick_view" href="#" data-link-action="quickview" title="Quick view" data-toggle="modal" data-target="#mediaModal">
                                    <i class="ion-ios-search-strong"></i>
                                </a>
                            </div>
                        </div>
                        <ul class="product-flag">
                            <li class="new">New</li>
                        </ul>
                        <div class="product-decs">
                            <a class="inner-link" href="events?category=${Media[i].media_event_category_slug}"><span>${Media[i].media_event_category}</span></a>
                            <h2><a href="event?eventid=${Media[i].media_event_id}" class="product-link">${truncateString(Media[i].media_event, 31)}</a></h2>
                            <div class="rating-product">${returnRating(Media[i].rating)}</div>
                            <div class="pricing-meta">
                                <ul>
                                    <li class="old-price not-cut">NGN ${formatNumber(Media[i].media_price)}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="add-to-link">
                            <ul>
                                <li class="cart btn-add-to-cart" data-resource="media" data-id="${Media[i].media_id}">
                                    <a class="cart-btn" href="#">ADD TO CART </a>
                                </li>
                            </ul>
                        </div>
                    </article>
                `
            }

            owl.html(mediaHTML);
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

            configureSharing(media.media_id);
		}
		catch(e)
		{
			showSimpleMessage("Attention", e.message, "error");
		}
	}

	async function listPages(mediaID, limit, page)
    {
    	try
    	{
    		const response = await $.ajax({
				type:'GET',
				url:`${API_URL_ROOT}/media-ratings?status=Published&media_id=${mediaID}&page=${page}&limit=${limit}`,
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

	async function pagination(mediaID)
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
                
                loadReviews(mediaID, Limit, next_page);
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
                
                loadReviews(mediaID, Limit, previous_page);
            }
        });

        $('.pro-pagination-style ul').on('click', '.page-no', function(e){
            e.preventDefault();

            var page = $(this).attr('page');
        
            $('.pro-pagination-style ul').find('.page-no a').removeClass('active');
            $('.pro-pagination-style ul').find("[page='"+page+"']").find('a').addClass('active');
            
            loadReviews(mediaID, Limit, page);
        });
	}

	async function previewMedia()
	{
		$('.quick_view').on('click', async function(e){
			e.preventDefault();

			var mediaID = $(this).parents('.media-block').attr('data-id');

			var mediaModal = $('#mediaModal');

			try
			{
				const response = await $.ajax({
					type:'GET',
					url: `${API_URL_ROOT}/media/${mediaID}`,
					dataType:'json'
				});

				const media = response.media;

				let html = '';
				let html1 = '';

				const owl = mediaModal.find('.quickview-slide-active');

				mediaModal.find('.quickview-big-img').html(`
                    <div id="${media.media_uuid}" class="tab-pane fade show active">
                        <img src="${media.media_thumbnail_url}" alt="${media.media_uuid}" />
                    </div>
                `);

				mediaModal.find('.event-title').text(media.media_event);
                mediaModal.find('.rating-product').html(`${returnRating(media.rating)}`);
                mediaModal.find('.read-review span').text(`(${media.reviews})`)
				mediaModal.find('.old-price').text(`NGN ${formatNumber(media.media_price)}`);
				mediaModal.find('.event-description').html(`${truncateString(stripHtmlTags(media.media_event_description), 250)}`);
				mediaModal.find('.btn-add-to-cart').attr('data-id', media.media_id);
				
				owl.html(`
                    <a class="active" data-toggle="tab" href="#${media.media_uuid}">
                        <img src="${media.media_thumbnail_url}" alt="${media.media_uuid}" width="90" height="90"/>
                    </a>
                `);

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
			    });

                configureSharing(media.media_id);
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
            var mediaID = form.find('#media_id').val();
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
                url: `${API_URL_ROOT}/media-ratings`,
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

                        loadReviews(mediaID, Limit, 0);
                        listPages(mediaID, Limit, 0);
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

    function loadReviews(mediaID, limit, page)
    {
        $.ajax({
            type:'GET',
            url:`${API_URL_ROOT}/media-ratings?status=Published&media_id=${mediaID}&page=${page}&limit=${limit}`,
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
                                        </div>
                                        <div class="review-left">
                                            <a href="javascript:void()">${moment.unix(reviews[i].rating_created_at).format('MMMM Do YYYY, h:mm:ss a')}</a>
                                        </div>
                                    </div>
                                    <div class="review-bottom">
                                        <p style="text-align:justify;">
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

    function configureSharing(mediaID)
    {
        var keywords = 'Photoman Image';

        //social medial share
        $('.fb-share').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=https://photoman.ng/media?mediaid=' + mediaID);
        $('.tw-share').attr('href', 'https://twitter.com/share?url=https://photoman.ng/media?mediaid=' + mediaID+'&amp;text=photoman&amp;hashtags=' +keywords);

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
        {
            $('.wa-share').attr('href', 'whatsapp://send?text=https://photoman.ng/media?mediaid=' + mediaID);
        }
        else
        {
            $('.wa-share').attr('href', 'https://web.whatsapp.com/send?text=https://photoman.ng/media?mediaid=' + mediaID);
        }
    }
});