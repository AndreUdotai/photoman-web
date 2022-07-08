$(function () {
	'use strict';

	const token = sessionStorage.getItem('token');

    const Limit = 10;

	$(document).ready(async function(){

        checkParamAvailability(new Array('staffid'));

        const staffID = getUrlParameter('staffid');

		/*$('body').on('contextmenu', function(e){
			e.preventDefault();
		})*/

		await loadStaff(staffID);

        await loadReviews(staffID, Limit, 0);

        await listPages(staffID, Limit, 0);

        await pagination(staffID);

        rateStaff();

        $('select').niceSelect();

        $('.reviews').on('click', function(){
            $('#reviews-tab').click();

            $([document.documentElement, document.body]).animate({
                scrollTop: $("#des-details3").offset().top
            }, 2000);
        })
	});

	async function loadStaff(staffID)
	{
		try
		{
			const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/users/${staffID}`,
				dataType:'json'
			});

			const staff = response.user;

            const response1 = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/users?exclude=${staff.user_id}&status=Verified&account_status=Active&user_role=Photoman&lg=${staff.lg}&limit=10&page=0&sortBy=id_desc`,
                dataType:'json'
            });

            const Users = response1.result.users;
            const totalRecords = response1.result.pagination ? response1.result.pagination.total_records : 0;

            let sliderHTML = '';
            let staffHTML = '';
            let imgDetails = $('.product-details-tab');
            let gallery = $('.product-dec-slider-2');
            let owl = $('#recent-media');
            
            $('.product-details-tab .zoompro-span').html(`<img class="zoompro" src="${staff.user_image_url}" data-zoom-image="${staff.user_image_url}" alt="${staff.user_firstname}" />`);

            $('.product-details-tab .product-dec-slider-2').html(`
                <a class="active" data-image="${staff.user_image_url}" data-zoom-image="${staff.user_image_url}">
                    <img src="${staff.user_image_url}" alt="${staff.user_firstname}" />
                </a>
            `);
            $('.product-details-content h2').text(`${staff.user_firstname} ${staff.user_lastname}`);
            $('.product-details-content .event-details').text(`${staff.user_brief_profile ? truncateString(stripHtmlTags(staff.user_brief_profile), 1000) : ''}`);
            $('.product-description-wrapper').html(staff.user_brief_profile);
            $('.fb').attr('href', staff.user_facebook_url);
            $('.tw').attr('href', staff.user_twitter_url);
            $('.li').attr('href', staff.user_linkedin_url);
            $('.in').attr('href', staff.user_instagram_url);
            $('.product-anotherinfo-wrapper ul').html(`
                <li><span>Email Address:</span> ${staff.user_email}</li>
                <li><span>Phone Number:</span>${staff.user_phone}</li>
                <li><span>State of Location:</span>${staff.state}</li>
                <li><span>City:</span>${staff.lg}</li>
                <li><span>Joined At:</span> ${moment.unix(staff.user_created_at).format('MMMM Do YYYY, h:mm:ss a')}</li>
                <li><span>Staff Status</span> ${staff.user_account_status}</li>`
            );
            $('#media-count').text(`${totalRecords == 1 ? totalRecords + ' other photoman in the same location' : totalRecords == 0 ? 'No other photomen in the same location' : totalRecords + ' other photomen in the same location' }`);
            $('#rating-form #staff_id').val(staff.user_id);
            $('.product-details-area .rating-product, .description-review-area .rating-product').html(`${returnRating(parseFloat(staff.rating))}`);
            $('.read-review span, #reviews-tab span').text(`(${staff.reviews})`);
            $('.explore-btn a').attr('href', `explore?photomanid=${staff.user_id}`);

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

            for(var i = 0; i < Users.length; i++)
            {
                staffHTML += `
                    <article class="list-product staff-block" data-id="${Users[i].user_id}">
                        <div class="img-block">
                            <a href="photoman?staffid=${Users[i].user_id}" class="thumbnail">
                                <img class="first-img" src="${Users[i].user_image_url}" alt="${Users[i].user_firstname}" />
                            </a>
                        </div>
                        <div class="product-decs">
                            <a class="inner-link" href="javascript:void(0)"><span>${Users[i].user_role}</span></a>
                            <h2><a href="photoman?staffid=${Users[i].user_id}" class="product-link">${truncateString(`${Users[i].user_firstname} ${Users[i].user_lastname}`, 100)}</a></h2>
                            <div class="rating-product">${returnRating(Users[i].rating)}</div>
                            <div class="pricing-meta">
                                <ul>
                                    <li class="old-price not-cut">${Users[i].user_phone}</li>
                                </ul>
                            </div>
                        </div>
                    </article>
                `
            }

            owl.html(staffHTML);
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

	async function listPages(staffID, limit, page)
    {
    	try
    	{
    		const response = await $.ajax({
				type:'GET',
				url:`${API_URL_ROOT}/staff-ratings?status=Published&staff_id=${staffID}&page=${page}&limit=${limit}`,
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

	async function pagination(staffID)
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
                
                loadReviews(staffID, Limit, next_page);
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
                
                loadReviews(staffID, Limit, previous_page);
            }
        });

        $('.pro-pagination-style ul').on('click', '.page-no', function(e){
            e.preventDefault();

            var page = $(this).attr('page');
        
            $('.pro-pagination-style ul').find('.page-no a').removeClass('active');
            $('.pro-pagination-style ul').find("[page='"+page+"']").find('a').addClass('active');
            
            loadReviews(staffID, Limit, page);
        });
	}

    function rateStaff()
    {
        $('#rating-form').on('submit', function(e){
            e.preventDefault();

            var form = $(this);
            var staffID = form.find('#staff_id').val();
            var fields = form.find('input.required, select.required');

            blockUI();       

            for(var i=0;i<fields.length;i++)
            {
                if(fields[i].value == "")
                {
                    unblockUI();
                    $('#'+fields[i].id).focus();
                    showSimpleMessage("Attention", `${fields[i].name} is required`, "error");
                    return false;
                }
            } 

            if(!token)
            {
                unblockUI();
                showSimpleMessage("Attention", `You must be logged in to rate this staff`, "error");
                return false;
            }

            $.ajax({
                type: 'POST',
                url: `${API_URL_ROOT}/staff-ratings`,
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

                        loadReviews(staffID, Limit, 0);
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

    function loadReviews(staffID, limit, page)
    {
        $.ajax({
            type:'GET',
            url:`${API_URL_ROOT}/staff-ratings?status=Published&staff_id=${staffID}&page=${page}&limit=${limit}`,
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
});