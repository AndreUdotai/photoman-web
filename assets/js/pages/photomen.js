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

		await loadStaff(Limit, 0);

		await listPages(Limit, 0);

		await pagination();

		await sort();
	});

	async function loadStaff(limit, page)
	{
		const sortBy = $('#sortBy').find('option:selected').val();

		try
		{
			const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/users?status=Verified&account_status=Active&user_role=Photoman&limit=${limit}&page=${page}&sortBy=${sortBy}`,
				dataType:'json'
			});

			let html = '';
			let html1 = '';
			const users = response.result.users;
			const userCount = response.result.total_records;
			let userCountNotification = userCount  == 1 ? `${userCount} record returned` : `${userCount} records returned`;

			let userGrid = $('#shop-1 .row');

			let userList = $('#shop-2');

			let countNotification = $('#count-notification');

			for(var i = 0; i < users.length; i++)
			{
				html += `
					<div class="col-xl-3 col-md-4 col-sm-6 staff-block" data-id="${users[i].user_id}">
                        <article class="list-product">
                            <div class="img-block">
                                <a href="photoman?staffid=${users[i].user_id}" class="thumbnail">
                                    <img class="first-img" src="${users[i].user_image_url}" alt="${users[i].user_firstname}" width="360" />
                                </a>
                            </div>
                            <div class="product-decs">
                                <a class="inner-link" href="javascript:void()"><span>${users[i].user_role}</span></a>
                                <h2><a href="photoman?staffid=${users[i].user_id}" class="product-link">${truncateString(`${users[i].user_firstname} ${users[i].user_lastname}`, 100)}</a></h2>
                                <div class="rating-product">
                                    ${returnRating(users[i].rating)}
                                </div>
                                <div class="pricing-meta">
                                    <ul>
                                        <li class="old-price not-cut">${users[i].user_phone}</li>
                                    </ul>
                                </div>
                            </div>
                        </article>
                    </div>
				`

				html1 += `
					<div class="shop-list-wrap mb-30px scroll-zoom staff-block" data-id="${users[i].user_id}>
                        <div class="row list-product m-0px">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                        <div class="left-img">
                                            <div class="img-block">
                                                <a href="photoman?staffid=${users[i].user_id}" class="thumbnail">
                                                    <img class="first-img" src="${users[i].user_image_url}" alt="${users[i].user_firstname}" />
           
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                                        <div class="product-desc-wrap">
                                            <div class="product-decs">
                                                <a class="inner-link" href="javascript:void(0)"><span>${users[i].user_role}</span></a>
                                                <h2><a href="photoman?staffid=${users[i].user_id}" class="product-link">${truncateString(`${users[i].user_firstname} ${users[i].user_lastname}, 42`)}</a></h2>
                                                <div class="rating-product">
                                                    ${returnRating(users[i].rating)}
                                                </div>
                                                <div class="pricing-meta">
                                                    <ul>
                                                        <li class="old-price not-cut">${users[i].user_phone}</li>
                                                    </ul>
                                                </div>
                                                <div class="product-intro-info">
                                                    ${users[i].user_brief_profile ? truncateString(stripHtmlTags(users[i].user_brief_profile), 400) : ''}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
				`
			}

			userGrid.html(html);
			userList.html(html1);
			countNotification.text(userCountNotification);
		}
		catch(e)
		{
			showSimpleMessage("Attention", e.message, "error");
		}
	}

	async function listPages(limit, page)
    {
		const sortBy = $('#sortBy').find('option:selected').val();

    	try
    	{
    		const response = await $.ajax({
				type:'GET',
				url: `${API_URL_ROOT}/users?status=Verified&account_status=Active&user_role=Photoman&limit=${limit}&page=${page}&sortBy=${sortBy}`,
				dataType:'json'
			});

			const pagination = response.result.pagination;

			$('.pro-pagination-style ul').empty();

			if(pagination)
            {
                window.numpages = pagination.numPages;

                var pages = p(page, pagination.numPages, 2);

                var page = parseInt(page) + 1;

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
                
                loadStaff(Limit, next_page);
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
                
                loadStaff(Limit, previous_page);
                pagenator(previous_page);
            }
        });

        $('.pro-pagination-style ul').on('click', '.page-no', function(e){
            e.preventDefault();

            var page = $(this).attr('page');
        
            $('.pro-pagination-style ul').find('.page-no a').removeClass('active');
            $('.pro-pagination-style ul').find("[page='"+page+"']").find('a').addClass('active');
            
            loadStaff(Limit, page);
            pagenator(parseInt(page));
        });
	}

	async function sort()
	{
		$('#sortBy').on('change', function(){
			var sortBy = $(this).find('option:selected').val();

			loadStaff(Limit, 0);

			listPages(Limit, 0);
		})
	}

    function pagenator(page)
    {
        var numpages = window.numpages;
                
        var pages = p(page, numpages, 2);

        var page = parseInt(page) + 1;

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