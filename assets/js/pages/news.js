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

        await loadNews(Limit, 0);

        await listPages(Limit, 0);

        await pagination();

        await listCategories();

        await listRecentNews();

        await listRecentTags();
        
        searchNews();
    });

    async function loadNews(limit, page)
    {
        const authorID = getUrlParameter('authorid') ? getUrlParameter('authorid') : '';
        const newsCategoryID = getUrlParameter('categoryid') ? getUrlParameter('categoryid') : '';
        const tag = getUrlParameter('tag') ? getUrlParameter('tag') : '';
        const searchTerm = getUrlParameter('search') ? getUrlParameter('search') : '';

        try
        {
            const response = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/news?status=Published&limit=${limit}&page=${page}&author_id=${authorID}&news_category_id=${newsCategoryID}&tag=${tag}&search_term=${searchTerm}`,
                dataType:'json'
            });

            let newsHTML = '';

            const news = response.result.news;

            let newsGrid = $('.blog-posts .row');

            for(var i = 0; i < news.length; i++)
            {
                newsHTML += `
                    <div class="col-md-6 mb-res-sm-30px">
                        <div class="single-blog-post blog-grid-post">
                            <div class="blog-post-media">
                                <div class="blog-image">
                                    <a href="news-article?newsid=${news[i].news_id}"><img src="${news[i].news_cover_image_url}" alt="${news[i].news_slug}" /></a>
                                </div>
                            </div>
                            <div class="blog-post-content-inner mt-30">
                                <h4 class="blog-title"><a href="news-article?newsid=${news[i].news_id}">${truncateString(news[i].news_title, 30)}</a></h4>
                                <ul class="blog-page-meta">
                                    <li>
                                        <a href="news?authorid=${news[i].author_id}"><i class="ion-person"></i> ${news[i].author}</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)"><i class="ion-calendar"></i> ${moment.unix(news[i].news_timestamp).format('MMMM Do YYYY')}</a>
                                    </li>
                                </ul>
                                <p>
                                    ${truncateString(stripHtmlTags(news[i].news_body), 220)}
                                </p>
                                <a class="read-more-btn" href="news-article?newsid=${news[i].news_id}"> Read More <i class="ion-android-arrow-dropright-circle"></i></a>
                            </div>
                        </div>
                        <!-- single blog post -->
                    </div>
                `
            }

            newsGrid.html(newsHTML);
        }
        catch(e)
        {
            showSimpleMessage("Attention", e.message, "error");
        }
    }

    async function listPages(limit, page)
    {
        const authorID = getUrlParameter('authorid') ? getUrlParameter('authorid') : '';
        const newsCategoryID = getUrlParameter('categoryid') ? getUrlParameter('categoryid') : '';
        const tag = getUrlParameter('tag') ? getUrlParameter('tag') : '';
        const searchTerm = getUrlParameter('search') ? getUrlParameter('search') : '';

        try
        {
            const response = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/news?status=Published&limit=${limit}&page=${page}&author_id=${authorID}&news_category_id=${newsCategoryID}&tag=${tag}&search_term=${searchTerm}`,
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
                
                loadNews(Limit, next_page);
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
                
                loadNews(Limit, previous_page);
                pagenator(previous_page);
            }
        });

        $('.pro-pagination-style ul').on('click', '.page-no', function(e){
            e.preventDefault();

            var page = $(this).attr('page');
        
            $('.pro-pagination-style ul').find('.page-no a').removeClass('active');
            $('.pro-pagination-style ul').find("[page='"+page+"']").find('a').addClass('active');
            
            loadNews(Limit, page);
            pagenator(parseInt(page));
        });
    }

    async function listCategories()
    {
        try
        {
            const response = await $.ajax({
                type:'GET',
                url:`${API_URL_ROOT}/news-categories?status=Active`,
                dataType:'json'
            });

            const categories = response.result.newsCategories;

            const categoryList = $('.category-post ul');

            let categoryHTML = '';

            for(var i = 0; i < categories.length; i++)
            {
                categoryHTML += `
                    <li><a href="news?categoryid=${categories[i].news_category_id}">${categories[i].news_category} (${categories[i].news_count})</a></li>
                `;
            } 

            categoryList.html(categoryHTML);
        }
        catch(e)
        {
            showSimpleMessage("Attention", e.message, "error");
        }
    }

    async function listRecentNews()
    {
        try
        {
            const response = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/news?status=Published&limit=4&page=0`,
                dataType:'json'
            });

            const news = response.result.news;

            const recentNewsList = $('.recent-post-widget');

            let recentNewsHTML = '';

            for(var i = 0; i < news.length; i++)
            {
                recentNewsHTML += `
                    <div class="recent-single-post d-flex">
                        <div class="thumb-side">
                            <a href="news-article?newsid=${news[i].news_id}"><img src="${news[i].news_cover_image_url}" alt="${news[i].news_slug}" /></a>
                        </div>
                        <div class="media-side">
                            <h5>
                                <a href="news-article?newsid=${news[i].news_id}">${truncateString(news[i].news_title, 30)} </a>
                            </h5>
                            <span class="date">${moment.unix(news[i].news_timestamp).format('MMMM Do YYYY')}</span>
                        </div>
                    </div>
                `;
            } 

            recentNewsList.html(recentNewsHTML);
        }
        catch(e)
        {
            showSimpleMessage("Attention", e.message, "error");
        }
    }

    async function listRecentTags()
    {
        try
        {
            const response = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/news?status=Published&limit=20&page=0`,
                dataType:'json'
            });

            const news = response.result.news;

            const tagCloud = $('.sidebar-widget-tag ul');

            let tagCloudHTML = '';

            let tagsArray = [];

            for(var i = 0; i < news.length; i++)
            {
                let newsTagArray = news[i].news_tags.split(',');

                for(var x = 0; x < newsTagArray.length; x++)
                {
                    if(tagsArray.indexOf(newsTagArray[x]) == -1)
                    {
                        tagsArray.push(newsTagArray[x]);
                    }
                }
            } 

            for(var i = 0; i < tagsArray.length; i++)
            {
                tagCloudHTML += `
                    <li><a href="news?tag=${encodeURI(tagsArray[i])}">${tagsArray[i]}</a></li>
                `;
            }

            tagCloud.html(tagCloudHTML);
        }
        catch(e)
        {
            showSimpleMessage("Attention", e.message, "error");
        }
    }

    function searchNews()
    {
        $('#search-news').on('submit', function(e){
            e.preventDefault();

            var form = $(this);
            var searchTerm = form.find('#search_term').val();
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

            unblockUI();
            window.location = `news?search=${encodeURI(searchTerm)}`;
        })
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