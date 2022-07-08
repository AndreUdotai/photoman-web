<!DOCTYPE html>
<html lang="zxx">
    
    <head>

        <?php include 'includes/head2.php'; ?>

        <title>Photoman - News Article</title>
    </head>

    <body onload="displayUserProfile(); addToCart(); loadMyCart(); removeFromCart(); notifications();">
        <!-- main layout start from here -->

        <?php include 'includes/preloader.php'; ?>

        <!--====== PRELOADER PART ENDS ======-->
        <div id="main">

            <?php include 'includes/header.php'; ?>

            <!-- Breadcrumb Area start -->
            <section class="breadcrumb-area">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="breadcrumb-content">
                                <h1 class="breadcrumb-hrading">News Article</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>News Article</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Breadcrumb Area End -->
            <!-- Shop Category Area End -->
            <div class="shop-category-area single-blog">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9 order-lg-last col-md-12 order-md-first">
                            <div class="blog-posts">
                                <div class="single-blog-post blog-grid-post">
                                    <div class="blog-post-media">
                                        <div class="blog-image single-blog">
                                            <a href="#"><img /></a>
                                        </div>
                                    </div>
                                    <div class="blog-post-content-inner">
                                        <h4 class="blog-title"><a href="#">This is Third Post For XipBlog</a></h4>
                                        <ul class="blog-page-meta"></ul>
                                    </div>
                                    <div class="single-post-content"></div>
                                </div>
                                <!-- single blog post -->
                            </div>
                            <div class="blog-single-tags-share d-sm-flex justify-content-between">
                                <div class="blog-single-tags d-flex">
                                    <span class="title">Tags: </span>
                                    <ul class="tag-list"></ul>
                                </div>
                                <div class="blog-single-share d-flex">
                                    <span class="title">Share:</span>
                                    <ul class="social">
                                        <li>
                                            <a href="#" class="fb-share" target="_blank"><i class="ion-social-facebook"></i></a>
                                        </li>
                                        <li>
                                            <a href="#" class="tw-share" target="_blank"><i class="ion-social-twitter"></i></a>
                                        </li>
                                        <li>
                                            <a href="#" class="wa-share" target="_blank"><i class="ion-social-whatsapp"></i></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="blog-related-post">
                                <div class="row">
                                    <div class="col-md-12 text-center">
                                        <!-- Section Title -->
                                        <div class="section-title underline-shape">
                                            <h2>Related Post</h2>
                                        </div>
                                        <!-- Section Title -->
                                    </div>
                                </div>
                                <div class="row" id="related-posts"></div>
                            </div>
                            <div class="comment-area">
                                <h2 class="comment-heading" id="comment-count"></h2>
                                <div class="review-wrapper"></div>
                                <!--  Pagination Area Start -->
                                <div class="pro-pagination-style text-center">
                                    <ul></ul>
                                </div>
                                <!--  Pagination Area End -->
                            </div>
                            <div class="blog-comment-form">
                                <h2 class="comment-heading">Leave a Reply</h2>
                                <p>You must be logged in to post a comment</p>
                                <form id="post-comment">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="single-form">
                                                <label>Your Review:</label>
                                                <textarea id="news_comment" name="news_comment" class="required" placeholder="Write a review"></textarea>
                                                <input type="hidden" id="news_id" name="news_id" class="required">
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-12">
                                            <div class="single-form">
                                                <input type="submit" value="Submit" />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <!-- Sidebar Area Start -->
                        <div class="col-lg-3 order-lg-first col-md-12 order-md-last mb-res-md-60px mb-res-sm-60px">
                            <div class="left-sidebar">
                                <!-- Sidebar single item -->
                                <div class="sidebar-widget">
                                    <div class="main-heading">
                                        <h2>Search</h2>
                                    </div>
                                    <div class="search-widget">
                                        <form id="search-news">
                                            <input placeholder="Search for articles by title ..." type="text" id="search_term" name="search_term" class="required" />
                                            <button type="submit"><i class="ion-ios-search-strong"></i></button>
                                        </form>
                                    </div>
                                </div>
                                <!-- Sidebar single item -->
                                <!-- Sidebar single item -->
                                <div class="sidebar-widget mt-40">
                                    <div class="main-heading">
                                        <h2>Categories</h2>
                                    </div>
                                    <div class="category-post">
                                        <ul></ul>
                                    </div>
                                </div>
                                <!-- Sidebar single item -->
                                <div class="sidebar-widget mt-40">
                                    <div class="main-heading">
                                        <h2>Recent Post</h2>
                                    </div>
                                    <div class="recent-post-widget"></div>
                                </div>
                                <!-- Sidebar single item -->
                                <div class="sidebar-widget mt-40">
                                    <div class="main-heading">
                                        <h2>Tag</h2>
                                    </div>
                                    <div class="sidebar-widget-tag">
                                        <ul></ul>
                                    </div>
                                </div>
                                <!-- Sidebar single item -->
                            </div>
                        </div>
                        <!-- Sidebar Area End -->
                    </div>
                </div>
            </div>
            <!-- Shop Category Area End -->

            <?php include 'includes/footer.php'; ?>
        </div>

        <!-- Scripts to be loaded  -->
        <!-- JS============================================ -->

        <?php include 'includes/js.php'; ?>

        <script src="assets/js/pages/news-article.js"></script>
    </body>
</html>
