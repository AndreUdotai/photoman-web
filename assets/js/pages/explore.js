$(function () {
	'use strict';

	let token = sessionStorage.getItem('token');

	const Limit = 16;

	/*const ps = new PerfectScrollbar(document.querySelector('.mt-container'));
	const secondUpload = new FileUploadWithPreview('mySecondImage')*/

	$(document).ready(async function(){

		await loadMedia(Limit, 0);

		await listPages(Limit, 0);

		await pagination();

		await sort();

		await previewMedia();
	});

	async function loadMedia(limit, page)
	{
		const categorySlug = getUrlParameter('category') ? getUrlParameter('category') : '';
		const eventSlug = getUrlParameter('event') ? getUrlParameter('event') : '';
		const photomanID = getUrlParameter('photomanid') ? getUrlParameter('photomanid') : '';
		const sortBy = $('#sortBy').find('option:selected').val();

		try
		{
			const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/media?status=Published&category_slug=${categorySlug}&event_slug=${eventSlug}&user_id=${photomanID}&limit=${limit}&page=${page}&sortBy=${sortBy}`,
				dataType:'json'
			});

			let html = '';
			let html1 = '';
			const media = response.result.media;
            const totalRecords = response.result.total_records;

			const mediaCount = totalRecords;

			let mediaCountNotification = mediaCount  == 1 ? `${mediaCount} record returned` : `${mediaCount} records returned`;

			let mediaGrid = $('#shop-1 .row');

			let mediaList = $('#shop-2');

			let countNotification = $('#count-notification');

			for(var i = 0; i < media.length; i++)
			{
				html += `
					<div class="col-xl-3 col-md-4 col-sm-6 media-block" data-id="${media[i].media_id}">
                        <article class="list-product">
                            <div class="img-block">
                                <a href="media?mediaid=${media[i].media_id}" class="thumbnail">
                                    <img class="first-img" src="${media[i].media_thumbnail_url}" alt="${media[i].media_event}" />
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
                                <a class="inner-link" href="events?category=${media[i].media_event_category_slug}"><span>${media[i].media_event_category}</span></a>
                                <h2><a href="event?eventid=${media[i].media_event_id}" class="product-link">${truncateString(media[i].media_event, 31)}</a></h2>
                                <div class="rating-product">
                                    ${returnRating(media[i].rating)}
                                </div>
                                <div class="pricing-meta">
                                    <ul>
                                        <li class="old-price not-cut">NGN ${formatNumber(media[i].media_price)}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="add-to-link">
                                <ul>
                                    <li class="cart btn-add-to-cart" data-resource="media" data-id="${media[i].media_id}">
                                        <a class="cart-btn" href="#">ADD TO CART </a>
                                    </li>
                                </ul>
                            </div>
                        </article>
                    </div>
				`

				html1 += `
					<div class="shop-list-wrap mb-30px scroll-zoom media-block" data-id="${media[i].media_id}>
                        <div class="row list-product m-0px">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                        <div class="left-img">
                                            <div class="img-block">
                                                <a href="media?mediaid=${media[i].media_id}" class="thumbnail">
                                                    <img class="first-img" src="${media[i].media_thumbnail_url}" alt="${media[i].media_event}" />
           
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
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                        <div class="product-desc-wrap">
                                            <div class="product-decs">
                                                <a class="inner-link" href="events?category=${media[i].media_event_category_slug}"><span>${media[i].media_event_category}</span></a>
                                                <h2><a href="event?eventid=${media[i].media_event_id}" class="product-link">${truncateString(media[i].media_event, 42)}</a></h2>
                                                <div class="rating-product">
                                                    ${returnRating(media[i].rating)}
                                                </div>
                                                <div class="pricing-meta">
                                                    <ul>
                                                        <li class="old-price not-cut">NGN ${formatNumber(media[i].media_price)}</li>
                                                    </ul>
                                                </div>
                                                <div class="product-intro-info">
                                                    ${truncateString(stripHtmlTags(media[i].media_event_description), 400)}
                                                </div>
                                                <div class="in-stock">Availability: <span>In Stock</span></div>
                                            </div>
                                            <div class="add-to-link">
                                                <ul>
                                                    <li class="cart btn-add-to-cart" data-resource="media" data-id="${media[i].media_id}">
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

			mediaGrid.html(html);
			mediaList.html(html1);
			countNotification.text(mediaCountNotification);
		}
		catch(e)
		{
            console.log(e.stack)
			showSimpleMessage("Attention", e.message, "error");
		}
	}

	async function listPages(limit, page)
    {
    	const categorySlug = getUrlParameter('category') ? getUrlParameter('category') : '';
		const eventSlug = getUrlParameter('event') ? getUrlParameter('event') : '';
		const photomanID = getUrlParameter('photomanid') ? getUrlParameter('photomanid') : '';
		const sortBy = $('#sortBy').find('option:selected').val();

    	try
    	{
    		const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/media?status=Published&category_slug=${categorySlug}&event_slug=${eventSlug}&user_id=${photomanID}&limit=${limit}&page=${page}&sortBy=${sortBy}`,
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
                
                loadMedia(Limit, next_page);
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
                
                loadMedia(Limit, previous_page);
                pagenator(previous_page)
            }
        });

        $('.pro-pagination-style ul').on('click', '.page-no', function(e){
            e.preventDefault();

            var page = $(this).attr('page');
        
            $('.pro-pagination-style ul').find('.page-no a').removeClass('active');
            $('.pro-pagination-style ul').find("[page='"+page+"']").find('a').addClass('active');
            
            loadMedia(Limit, page);
            pagenator(parseInt(page))
        });
	}

	async function sort()
	{
		$('#sortBy').on('change', function(){
			var sortBy = $(this).find('option:selected').val();

			loadMedia(Limit, 0);

			listPages(Limit, 0);
		})
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

				var mediaModal = $('#mediaModal');

				let html = '';
				let html1 = '';

				const owl = mediaModal.find('.quickview-slide-active');

				mediaModal.find('.quickview-big-img').html(`
					<div id="${media.media_uuid}" class="tab-pane fade show active">
                        <img src="${media.media_thumbnail_url}" alt="${media.media_uuid}" />
                    </div>
				`);
				mediaModal.find('.event-title').text(media.media_event);
				mediaModal.find('.reference span').text(media.uploader);
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