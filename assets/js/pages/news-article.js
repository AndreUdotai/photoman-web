$(function () {
    'use strict';

    let token = sessionStorage.getItem('token');

    const Limit = 10;

    /*const ps = new PerfectScrollbar(document.querySelector('.mt-container'));
    const secondUpload = new FileUploadWithPreview('mySecondImage')*/

    $(document).ready(async function(){

        checkParamAvailability(new Array('newsid'));

        const newsID = getUrlParameter('newsid');

        /*$('body').on('contextmenu', function(e){
            e.preventDefault();
        })*/

        await recordView(newsID);

        await loadNewsArticle(newsID);

        await listCategories();

        await listRecentNews();

        await listRecentTags();

        loadComments(newsID, Limit, 0);

        await listPages(newsID, Limit, 0);

        await pagination(newsID)
        
        searchNews();

        postComment(newsID);
    });

    async function loadNewsArticle(newsID)
    {
        try
        {
            const response = await $.ajax({
                type:'GET',
                url: `${API_URL_ROOT}/news/${newsID}`,
                dataType:'json'
            });

            const response1 = await $.ajax({
                type:'GET',
                url:`${API_URL_ROOT}/news?status=Published&exclude=${newsID}&limit=3&page=0`,
                dataType:'json'
            })

            const news = response.news;
            const related = response1.result.news;
            const newsTagArray = news.news_tags.split(',');
            let newsTagHTML = ''; 
            let relatedHTML = '';

            $('.blog-image a img').attr({src:news.news_cover_image_url, alt:news.news_title});
            $('.blog-title a').text(news.news_title);
            $('.blog-page-meta').html(`
                <li>
                    <a href="news?authorid=${news.author_id}"><i class="ion-person"></i> ${news.author}</a>
                </li>
                <li>
                    <a href="#"><i class="ion-calendar"></i> ${moment.unix(news.news_timestamp).format('MMMM Do YYYY')}</a>
                </li>
            `);
            $('.single-post-content').html(news.news_body);
            $('#news_id').val(news.news_id);


            for(var i = 0; i < newsTagArray.length; i++)
            {
                if(i == newsTagArray.length - 1)
                {
                    newsTagHTML += `<li><a href="news?tag=${encodeURI(newsTagArray[i])}">${newsTagArray[i]}</a></li>`
                }
                else
                {
                    newsTagHTML += `<li><a href="news?tag=${encodeURI(newsTagArray[i])}">${newsTagArray[i]}, </a></li>`   
                }
            }

            $('.tag-list').html(newsTagHTML);

            for(var i = 0; i < related.length; i++)
            {
                relatedHTML += `
                    <div class="col-md-4 mb-res-md-30px mb-res-sm-30px">
                        <div class="blog-post-media">
                            <div class="blog-image single-blog">
                                <a href="news-article?newsid=${related[i].news_id}">
                                    <img src="${related[i].news_cover_image_url}" alt="${related[i].news_slug}" />
                                </a>
                            </div>
                        </div>
                        <div class="blog-post-content-inner">
                            <h4 class="blog-title">
                                <a href="news-article?newsid=${related[i].news_id}">
                                    ${truncateString(related[i].news_title, 30)}
                                </a>
                            </h4>
                            <ul class="blog-page-meta">
                                <li>
                                    <a href="news?authorid=${related[i].author_id}">
                                        <i class="ion-person"></i> ${related[i].author}
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0)"><i class="ion-calendar"></i> ${moment.unix(related[i].news_timestamp).format('MMMM Do YYYY')}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                `;
            }

            $('#related-posts').html(relatedHTML)

            configureSharing(newsID)
        }
        catch(e)
        {
            showSimpleMessage("Attention", e.message, "error");
        }
    }

    async function listPages(newsID, limit, page)
    {
        try
        {
            const response = await $.ajax({
                type:'GET',
                url:`${API_URL_ROOT}/news-comments?status=Published&news_id=${newsID}&limit=${limit}&page=${page}`,
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

    async function pagination(newsID)
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
                
                loadComments(newsID, Limit, next_page)
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
                
                loadComments(newsID, Limit, previous_page)
            }
        });

        $('.pro-pagination-style ul').on('click', '.page-no', function(e){
            e.preventDefault();

            var page = $(this).attr('page');
        
            $('.pro-pagination-style ul').find('.page-no a').removeClass('active');
            $('.pro-pagination-style ul').find("[page='"+page+"']").find('a').addClass('active');
            
            loadComments(newsID, Limit, page)
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
                            <a href="news-article?title=${news[i].news_slug}"><img src="${news[i].news_cover_image_url}" alt="${news[i].news_slug}" /></a>
                        </div>
                        <div class="media-side">
                            <h5>
                                <a href="news-article?title=${news[i].news_slug}">${truncateString(news[i].news_title, 30)} </a>
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
            window.location = `news?search=${searchTerm}`;
        })
    }

    function postComment(newsID)
    {
        $('#post-comment').on('submit', function(e){
            e.preventDefault();

            var form = $(this);
            var fields = form.find('input.required, select.required, textarea.required');

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

            if(!token)
            {
                unblockUI();
                showLoginFormAlert();
                //showSimpleMessage("Attention", "You must be logged in to post a comment", "error");
                return false;
            } 

            $.ajax({
                type:'POST',
                url:`${API_URL_ROOT}/news-comments`,
                dataType:'json',
                data:JSON.stringify(form.serializeObject()),
                contentType:'application/json',
                headers:{ 'x-access-token':token},
                success:function(response)
                {
                    if(response.error == false)
                    {
                        form.get(0).reset();

                        loadComments(newsID, Limit, 0);

                        unblockUI();
                        showSimpleMessage("Success", response.message, "success");
                    }
                    else
                    {
                        unblockUI();
                        showSimpleMessage("Attention", response.message, "error");
                    }
                },
                error: function(req, status, err)
                {
                    showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                    unblockUI();
                }
            })
        })          
    }

    function loadComments(newsID, limit, page)
    {
        $.ajax({
            type:'GET',
            url:`${API_URL_ROOT}/news-comments?status=Published&news_id=${newsID}&limit=${limit}&page=${page}`,
            dataType:'json',
            success:function(response)
            {
                if(response.error == false)
                {
                    const comments = response.result.comments;
                    const totalComments = response.result.pagination ? response.result.pagination.total_records : 0;

                    let commentsHTML = '';

                    for(var i = 0; i < comments.length; i++)
                    {
                        commentsHTML += `
                            <div class="single-review">
                                <div class="review-img">
                                    <img src="${comments[i].user_image_url}" alt="${comments[i].commenter}" width="90" />
                                </div>
                                <div class="review-content">
                                    <div class="review-top-wrap">
                                        <div class="review-left">
                                            <div class="review-name">
                                                <h4>${comments[i].commenter}</h4>
                                                <span class="date">${moment.unix(comments[i].news_comment_timestamp).format('MMMM Do YYYY, h:mm:ss a')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="review-bottom">
                                        <p style="text-align:justify">
                                            ${comments[i].news_comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        `
                    }

                    $('.review-wrapper').html(commentsHTML);
                    $('#comment-count').text(`${totalComments == 0 ? 'No Comments' : totalComments == 1 ? '1 Comment' : totalComments + ' Comments'}`)
                }
                else
                {
                    unblockUI();
                    showSimpleMessage("Attention", response.message, "error");
                }
            },
            error: function(req, status, err)
            {
                showSimpleMessage("Attention", "ERROR - "+req.status+" : "+req.responseText, "error");
                unblockUI();
            }
        });
    }

    async function recordView(newsID)
    {
        try
        {
            const response = await $.ajax({
                type:'POST',
                url:`${API_URL_ROOT}/views`,
                dataType:'json',
                data:JSON.stringify({ news_id:newsID }),
                contentType:'application/json'
            });

            console.log(response.message);
        }
        catch(e)
        {
            console.log(e.message)
        }
    }

    function configureSharing(newsID)
    {
        var keywords = 'Photoman Blog Article';

        //social medial share
        $('.fb-share').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=https://photoman.ng/news-article?newsid=' + newsID);
        $('.tw-share').attr('href', 'https://twitter.com/share?url=https://photoman.ng/news-article?newsid=' + newsID+'&amp;text=photoman&amp;hashtags=' +keywords);

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
        {
            $('.wa-share').attr('href', 'whatsapp://send?text=https://photoman.ng/news-article?newsid=' + newsID);
        }
        else
        {
            $('.wa-share').attr('href', 'https://web.whatsapp.com/send?text=https://photoman.ng/news-article?newsid=' + newsID);
        }
    }
});