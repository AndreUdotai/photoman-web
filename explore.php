<!DOCTYPE html>
<html lang="en">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - Explore</title>
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
                                <h1 class="breadcrumb-hrading">Explore</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>Explore</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Breadcrumb Area End -->

            <!-- Shop Category Area End -->
            <div class="shop-category-area">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-md-12">
                            <!-- Shop Top Area Start -->
                            <div class="shop-top-bar">
                                <!-- Left Side start -->
                                <div class="shop-tab nav mb-res-sm-15">
                                    <a class="active" href="#shop-1" data-toggle="tab">
                                        <i class="fa fa-th show_grid"></i>
                                    </a>
                                    <a href="#shop-2" data-toggle="tab">
                                        <i class="fa fa-list-ul"></i>
                                    </a>
                                    <p id="count-notification"></p>
                                </div>
                                <!-- Left Side End -->
                                <!-- Right Side Start -->
                                <div class="select-shoing-wrap">
                                    <div class="shot-product">
                                        <p>Sort By:</p>
                                    </div>
                                    <div class="shop-select">
                                        <select id="sortBy">
                                            <option value="id_desc">Sort by newness</option>
                                            <option value="name_asc">A to Z</option>
                                            <option value="name_desc"> Z to A</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- Right Side End -->
                            </div>
                            <!-- Shop Top Area End -->

                            <!-- Shop Bottom Area Start -->
                            <div class="shop-bottom-area mt-35">
                                <!-- Shop Tab Content Start -->
                                <div class="tab-content jump">
                                    <!-- Tab One Start -->
                                    <div id="shop-1" class="tab-pane active">
                                        <div class="row"></div>
                                    </div>
                                    <!-- Tab One End -->
                                    <!-- Tab Two Start -->
                                    <div id="shop-2" class="tab-pane"></div>
                                    <!-- Tab Two End -->
                                </div>
                                <!-- Shop Tab Content End -->
                                <!--  Pagination Area Start -->
                                <div class="pro-pagination-style text-center">
                                    <ul></ul>
                                </div>
                                <!--  Pagination Area End -->
                            </div>
                            <!-- Shop Bottom Area End -->
                        </div>
                    </div>
                </div>
            </div>
            <!-- Shop Category Area End -->
            <!-- Modal -->
            <div class="modal fade" id="mediaModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-5 col-sm-12 col-xs-12">
                                    <div class="tab-content quickview-big-img"></div>
                                    <!-- Thumbnail Large Image End -->
                                    <!-- Thumbnail Image End -->
                                    <div class="quickview-wrap mt-20">
                                        <div class="quickview-slide-active owl-carousel nav owl-nav-style owl-nav-style-2" role="tablist"></div>
                                    </div>
                                </div>
                                <div class="col-md-7 col-sm-12 col-xs-12">
                                    <div class="product-details-content quickview-content">
                                        <h2 class="event-title"></h2>
                                        <p class="reference">Photoman: <span></span></p>
                                        <div class="pro-details-rating-wrap">
                                            <div class="rating-product"></div>
                                            <span class="read-review"><a class="reviews" href="javascript:void">Reviews <span></span></a></span>
                                        </div>
                                        <div class="pricing-meta">
                                            <ul>
                                                <li class="old-price not-cut"></li>
                                            </ul>
                                        </div>
                                        <p class="event-description" style="text-align: justify;"></p>
                                        <div class="pro-details-quality">
                                            <div class="pro-details-cart btn-hover">
                                                <a href="javascript:void" class="btn-add-to-cart" data-resource="media"> + Add Image To Cart</a>
                                            </div>
                                        </div>
                                        <div class="pro-details-social-info">
                                            <span>Share</span>
                                            <div class="social-info">
                                                <ul>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Modal end --> 

            <?php include 'includes/footer.php'; ?>

        </div>

        <!-- Scripts to be loaded  -->
        <!-- JS ============================================ -->

        <?php include 'includes/js.php'; ?>

        <script src="assets/js/pages/explore.js"></script>
    </body>
</html>
