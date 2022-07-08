<!DOCTYPE html>
<html lang="en">
    
    <head>

        <?php include 'includes/head3.php'; ?>

        <title>Photoman - Event</title>
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
                                <h1 class="breadcrumb-hrading">Event</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>Event</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Breadcrumb Area End -->
            <!-- Shop details Area start -->
            <section class="product-details-area mtb-60px">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-6 col-lg-6 col-md-12">
                            <div class="product-details-img product-details-tab">
                                <div class="zoompro-wrap zoompro-2 mb-30px">
                                    <div class="zoompro-border zoompro-span"></div>
                                </div>
                                <div id="gallery" class="product-dec-slider-2"></div>
                            </div>
                        </div>
                        <div class="col-xl-6 col-lg-6 col-md-12">
                            <div class="product-details-content">
                                <h2></h2>
                                <!-- <p class="reference">Reference:<span> demo_17</span></p> -->
                                <div class="pro-details-rating-wrap">
                                    <div class="rating-product"></div>
                                    <span class="read-review"><a class="reviews" href="javascript:void">Read reviews <span></span></a></span>
                                </div>
                                <div class="pricing-meta mtb-40px">
                                    <ul>
                                        <li class="old-price not-cut"></li>
                                    </ul>
                                </div>
                                <p class="event-details" style="text-align: justify"></p>
                                <div class="pro-details-quality mtb-60px">
                                    <div class="pro-details-cart btn-hover">
                                        <a href="javascript:void" class="btn-add-to-cart" data-resource="events"> + Add Album To Cart</a>
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
                                <div class="pro-details-policy">
                                    <ul>
                                        <li><img src="assets/images/icons/policy.png" alt="" /><span>Seamless Delivery to Your Email Address</span></li>
                                        <li><img src="assets/images/icons/policy-2.png" alt="" /><span>2 Days Money-Back Guarantee</span></li>
                                        <li><img src="assets/images/icons/policy-3.png" alt="" /><span>Fast & Secure Payment Options</span></li>
                                    </ul>
                                </div>
                                <div class="pro-details-quality mtb-60px">
                                    <div class="explore-btn btn-hover">
                                        <a href="javascript:void" class="">Explore Album <span></span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Shop details Area End -->
            <!-- product details description area start -->
            <div class="description-review-area mb-60px">
                <div class="container">
                    <div class="description-review-wrapper">
                        <div class="description-review-topbar nav">
                            <a data-toggle="tab" href="#des-details1">Event Description</a>
                            <a class="active" data-toggle="tab" href="#des-details2">Event Details</a>
                            <a data-toggle="tab" href="#des-details3" id="reviews-tab">Reviews <span></span></a>
                        </div>
                        <div class="tab-content description-review-bottom">
                            <div id="des-details2" class="tab-pane active">
                                <div class="product-anotherinfo-wrapper">
                                    <ul></ul>
                                </div>
                            </div>
                            <div id="des-details1" class="tab-pane">
                                <div class="product-description-wrapper"></div>
                            </div>
                            <div id="des-details3" class="tab-pane">
                                <div class="row">
                                    <div class="col-lg-7">
                                        <div class="review-wrapper"></div>
                                        <!--  Pagination Area Start -->
                                        <div class="pro-pagination-style text-center">
                                            <ul></ul>
                                        </div>
                                        <!--  Pagination Area End -->
                                    </div>
                                    <div class="col-lg-5">
                                        <div class="ratting-form-wrapper pl-50">
                                            <h3>Add a Review</h3>
                                            <div class="ratting-form">
                                                <form id="rating-form">
                                                    <div class="star-box">
                                                        <span>Current rating:</span>
                                                        <div class="rating-product"></div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <div class="rating-form-style mb-10">
                                                                <select class="required" name="rating" id="rating">
                                                                    <option value="">Select</option>
                                                                    <option value="1">1 Star</option>
                                                                    <option value="1.5">1.5 Star</option>
                                                                    <option value="2">2 Star</option>
                                                                    <option value="2.5">2.5 Star</option>
                                                                    <option value="3">3 Star</option>
                                                                    <option value="3.5">3.5 Star</option>
                                                                    <option value="4">4 Star</option>
                                                                    <option value="4.5">4.5 Star</option>
                                                                    <option value="5">5 Star</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <div class="rating-form-style form-submit">
                                                                <textarea name="review" id="review" class="required" placeholder="Message"></textarea>
                                                                <input type="hidden" name="media_event_id" id="media_event_id" class="required">
                                                                <input type="submit" value="Submit" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- product details description area end -->
            <!-- Recent Add Product Area Start -->
            <section class="recent-add-area mt-30 mb-30px">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Section Title -->
                            <div class="section-title">
                                <h2>You May Also Like</h2>
                                <p id="category-count"></p>
                            </div>
                            <!-- Section Title -->
                        </div>
                    </div>
                    <!-- Recent Product slider Start -->
                    <div id="recent-events" class="recent-product-slider owl-carousel owl-nav-style"></div>
                    <!-- Recent product slider end -->
                </div>
            </section>

            <!-- Modal -->
            <div class="modal fade" id="eventModal" tabindex="-1" role="dialog">
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
                                        <!-- <p class="reference">Reference:<span> demo_17</span></p> -->
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
                                                <a href="javascript:void" class="btn-add-to-cart" data-resource="events"> + Add Album To Cart</a>
                                            </div>
                                        </div>
                                        <div class="pro-details-social-info">
                                            <span>Share</span>
                                            <div class="social-info">
                                                <ul>
                                                    <li>
                                                        <a href="#"><i class="ion-social-facebook"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class="ion-social-twitter"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class="ion-social-google"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i class="ion-social-instagram"></i></a>
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
            <!-- Recent product area end -->
            <?php include 'includes/footer.php'; ?>
        </div>

        <!-- Scripts to be loaded  -->
        <!-- JS ============================================ -->

        <?php include 'includes/js.php'; ?>

        <script src="assets/js/pages/event.js"></script>
    </body>
</html>
