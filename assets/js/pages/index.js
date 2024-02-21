$(function () {
	'use strict';

	let token = sessionStorage.getItem('token');
	/*const ps = new PerfectScrollbar(document.querySelector('.mt-container'));
	const secondUpload = new FileUploadWithPreview('mySecondImage')*/

	$(document).ready(async function(){

		await loadRecentCategories();

		await loadRecentEvents();

		await loadRecentNews();

		await previewEvent();

		openNews();
	});

	async function loadRecentCategories()
	{
		try
		{
			const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/media-event-categories?status=Active&limit=10&page=0`,
				dataType:'json'
			});

			let html = '';
			const categories = response.result.mediaEventCategories;

			const owl = $('.best-sell-slider');

			for(var i = 0; i < categories.length; i++)
			{
				html += `
					<!-- Single Item -->
					<article class="list-product">
						<div class="img-block">
							<a href="events?category=${categories[i].media_event_category_slug}" class="thumbnail">
								<img class="first-img" src="${categories[i].media_event_category_cover_image_url}" alt="${categories[i].media_event_category}"/>
							</a>
						</div>
						<ul class="product-flag">
							<li class="new">New</li>
						</ul>
						<div class="product-decs">
							<a class="inner-link" href="events?category=${categories[i].media_event_category_slug}"><span>${categories[i].media_event_category}</span></a>
							<h2>
								<a href="events?category=${categories[i].media_event_category_slug}" class="product-link">${truncateString(stripHtmlTags(categories[i].media_event_category_description), 26)}</a>
							</h2>
						</div>
					</article>
					<!-- Single Item -->
				`
			}

			$('.best-sell-slider').html(html);

			$('.best-sell-slider').owlCarousel('destroy');

			$('.best-sell-slider').owlCarousel({
		        autoplay : true,
		        loop: true,
		        smartSpeed : 1000,
		        nav :  true ,
		        dots :  false ,
		        touchDrag: true,
		        mouseDrag: true,
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
		                items:3,
		            },
		            992:{
		                items:4,
		            },
		            1200:{
		                items:5,
		            }
		        }
		    })

		}
		catch(e)
		{
			//showSimpleMessage("Attention", e.message, "error");
			console.log(e.message)
		}
	}

	async function loadRecentEvents()
	{
		try
		{
			const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/media-events?status=Active&limit=10&page=0`,
				dataType:'json'
			});

			let html = '';
			const events = response.result.mediaEvents;

			const owl = $('.recent-product-slider');

			for(var i = 0; i < events.length; i++)
			{
				html += `
					<!-- Single Item -->
					<article class="list-product event-block" data-id="${events[i].media_event_id}">
						<div class="img-block">
							<a href="event?eventid=${events[i].media_event_id}" class="thumbnail">
								<img class="first-img" src="${events[i].media_event_cover_image_url}" alt="${events[i].media_event}"/>
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
							<a class="inner-link" href="event?eventid=${events[i].media_event_id}"><span>${events[i].media_event}</span></a>
							<h2>
								<a href="event?eventid=${events[i].media_event_id}" class="product-link">${truncateString(stripHtmlTags(events[i].media_event_description), 26)}</a>
							</h2>
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
					<!-- Single Item -->
				`
			}

			owl.html(html);

			owl.owlCarousel('destroy');

			owl.owlCarousel({
		        autoplay : true,
		        loop: true,
		        smartSpeed : 1000,
		        nav :  true ,
		        dots :  false ,
		        touchDrag: true,
		        mouseDrag: true,
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
		                items:3,
		            },
		            992:{
		                items:4,
		            },
		            1200:{
		                items:5,
		            }
		        }
		    })

		}
		catch(e)
		{
			//showSimpleMessage("Attention", e.message, "error");
			console.log(e.message)
		}
	}

	async function loadRecentNews()
	{
		try
		{
			const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/news?status=Published&limit=4&page=0`,
				dataType:'json'
			});

			let html = '';
			const news = response.result.news;

			const owl = $('.blog-slider-active');

			for(var i = 0; i < news.length; i++)
			{
				html += `
					<!-- single item -->
                    <article class="blog-post" news-id="${news[i].news_id}">
                        <div class="blog-post-top">
                            <div class="blog-img">
                                <img src="${news[i].news_cover_image_url}" alt="${news[i].news_title}" />
                            </div>
                        </div>
                        <div class="blog-post-content d-flex">
                            <div class="blog-post-content-cell">
                                <a href="news?categoryid=${news[i].news_category_id}" class="blog-meta">${news[i].news_category}</a>
                                <h4 class="blog-post-heading"><a href="news-article?newsid=${news[i].news_id}">${truncateString(news[i].news_title, 29)}</a></h4>
                                <p class="blog-text">
                                    ${truncateString(stripHtmlTags(news[i].news_body), 114)}
                                </p>
                                <a class="read-more-btn" href="news-article?newsid=${news[i].news_id}"> Read More <i class="ion-android-arrow-dropright-circle"></i></a>
                            </div>
                        </div>
                    </article>
                    <!-- single item -->
				`
			}

			owl.html(html);

			owl.owlCarousel('destroy');

			owl.owlCarousel({
	            autoplay :   false,
	            nav :  true ,
	            smartSpeed : 1000,
	            dots :  false ,
	            items:3,
	            margin:30,
	            responsive:{
	                0:{
	                    items:1,
	                    autoplay :true,
	                },
	                360:{
	                    items:1,
	                    autoplay :true,
	                },
	                576:{
	                    items:1,
	                    autoplay :true,
	                },
	                768:{
	                    items:2,
	                },
	                992:{
	                    items:2,
	                },
	                1200:{
	                    items:3,
	                }
	            }
	    	})

		}
		catch(e)
		{
			//showSimpleMessage("Attention", e.message, "error");
			console.log(e.message);
		}
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
				//showSimpleMessage("Attention", e.message, "error");	
				console.log(e.message)
			}
		})
	}

	function openNews()
	{
		$('.blog-area').on('click', 'article', function(){
			var newsID = $(this).attr('news-id');

			window.location = `news-article?newsid=${newsID}`;
		})
	}
});