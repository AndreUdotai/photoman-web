<!DOCTYPE html>
<html lang="en">

	<head>

		<?php include 'includes/head.php'; ?>

		<title>Photoman - Home</title>
	</head>

	<body class="home-100" onload="displayUserProfile(); addToCart(); loadMyCart(); removeFromCart(); notifications();">

		<!-- main layout start from here -->

		<?php include 'includes/preloader.php'; ?>

		<div id="main">
			
			<?php include 'includes/header.php'; ?>

			<!-- Slider Area Start -->
			<div class="slider-area home-4">
				<div class="slider-active-3 owl-carousel slider-hm8 owl-dot-style">
					<!-- Slider Single Item Start -->
					<div class="slider-height-6 d-flex align-items-start justify-content-start bg-img" style="background-image: url(assets/images/slider-image/slider1.jpg);">
						<div class="container">
							<div class="slider-content-1 slider-animated-1 text-left">
								<span class="animated">WHAT MATTERS MOST TO US?</span>
								<h1 class="animated">
									Capturing Your Best Moments <br>In High Definition
								</h1>
								<p class="animated">Please take a few minutes to get to know us.</p>
								<a href="about" class="shop-btn animated">MORE</a>
							</div>
						</div>
					</div>
					<!-- Slider Single Item End -->
					<!-- Slider Single Item Start -->
					<div class="slider-height-6 d-flex align-items-start justify-content-start bg-img" style="background-image: url(assets/images/slider-image/slider2.jpg);">
						<div class="container">
							<div class="slider-content-1 slider-animated-1 text-left">
								<span class="animated">LIFE IS ABOUT MAKING MEMORIES</span>
								<h1 class="animated">
									Attend events while we save your memories
								</h1>
								<p class="animated">Search for events here</p>
								<a href="events" class="shop-btn animated">EVENTS</a>
							</div>
						</div>
					</div>
					<!-- Slider Single Item End -->
					<!-- Slider Single Item Start -->
					<div class="slider-height-6 d-flex align-items-start justify-content-start bg-img" style="background-image: url(assets/images/slider-image/slider3.jpg);">
						<div class="container">
							<div class="slider-content-1 slider-animated-1 text-left">
								<span class="animated">FORMIDABLE NETWORK</span>
								<h1 class="animated">
									Our Photographers Are In Every<br> State in Nigeria
								</h1>
								<p class="animated">Get Familiar With Them</p>
								<a href="photomen" class="shop-btn animated">PHOTOGRAPHERS</a>
							</div>
						</div>
					</div>
					<!-- Slider Single Item End -->
					<!-- Slider Single Item Start -->
					<div class="slider-height-6 d-flex align-items-start justify-content-start bg-img" style="background-image: url(assets/images/slider-image/slider4.jpg);">
						<div class="container">
							<div class="slider-content-1 slider-animated-1 text-left" style="color: white !important">
								<span class="animated">WOULD YOU LIKE TO JOIN PHOTOMAN?</span>
								<h1 class="animated">
									Watch Out For Our Upcoming<br> Photoman Competition 
								</h1>
								<p class="animated">Do not only dream, become. </p>
								<a href="apply" class="shop-btn animated">Apply</a>
							</div>
						</div>
					</div>
					<!-- Slider Single Item End -->
				</div>
			</div>
			<!-- Slider Area End -->

			<!-- Static Area Start -->
			<section class="static-area mtb-60px">
				<div class="container">
					<div class="static-area-wrap">
						<div class="row">
							<!-- Static Single Item Start -->
							<div class="col-lg-3 col-xs-12 col-md-6 col-sm-6">
								<div class="single-static pb-res-md-0 pb-res-sm-0 pb-res-xs-0">
									<img src="assets/images/icons/static-icons-1.png" alt="" class="img-responsive" />
									<div class="single-static-meta">
										<h4>Download High-Quality Images</h4>
										<p>Directly to your devices</p>
									</div>
								</div>
							</div>
							<!-- Static Single Item End -->
							<!-- Static Single Item Start -->
							<div class="col-lg-3 col-xs-12 col-md-6 col-sm-6">
								<div class="single-static pb-res-md-0 pb-res-sm-0 pb-res-xs-0 pt-res-xs-20">
									<img src="assets/images/icons/static-icons-2.png" alt="" class="img-responsive" />
									<div class="single-static-meta">
										<h4>We are available in the 36 states</h4>
										<p>You can view event photographs by locations</p>
									</div>
								</div>
							</div>
							<!-- Static Single Item End -->
							<!-- Static Single Item Start -->
							<div class="col-lg-3 col-xs-12 col-md-6 col-sm-6">
								<div class="single-static pt-res-md-30 pb-res-sm-30 pb-res-xs-0 pt-res-xs-20">
									<img src="assets/images/icons/static-icons-3.png" alt="" class="img-responsive" />
									<div class="single-static-meta">
										<h4>Secure Payments</h4>
										<p>Your security is our priority</p>
									</div>
								</div>
							</div>
							<!-- Static Single Item End -->
							<!-- Static Single Item Start -->
							<div class="col-lg-3 col-xs-12 col-md-6 col-sm-6">
								<div class="single-static pt-res-md-30 pb-res-sm-30 pt-res-xs-20">
									<img src="assets/images/icons/static-icons-4.png" alt="" class="img-responsive" />
									<div class="single-static-meta">
										<h4>Contact us for more</h4>
										<p>Event Coverage and other photography services</p>
									</div>
								</div>
							</div>
							<!-- Static Single Item End -->
						</div>
					</div>
				</div>
			</section>
			<!-- Static Area End -->

			<!-- Best Sells Area Start -->
			<section class="best-sells-area mb-30px">
				<div class="container">
					<!-- Section Title Start -->
					<div class="row">
						<div class="col-md-12">
							<div class="section-title">
								<h2>Media Categories</h2>
								<p>Each category is a collection of events</p>
							</div>
						</div>
					</div>
					<!-- Section Title End -->
					<!-- Best Sell Slider Carousel Start -->
					<div class="best-sell-slider owl-carousel owl-nav-style"></div>
					<!-- Best Sells Carousel End -->
				</div>
			</section>
			<!-- Best Sells Slider End -->

			<!-- Recent Add Product Area Start -->
			<section class="recent-add-area mb-30px">
				<div class="container">
					<div class="row">
						<div class="col-md-12">
							<!-- Section Title -->
							<div class="section-title">
								<h2>Recent Events</h2>
								<p>Each event is a collection of media</p>
							</div>
							<!-- Section Title -->
						</div>
					</div>
					<!-- Recent Product slider Start -->
					<div class="recent-product-slider owl-carousel owl-nav-style"></div>
					<!-- Recent product slider end -->
				</div>
			</section>
			<!-- Recent product area end -->

			<!-- Blog area Start -->
            <section class="blog-area mb-30px">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Section title -->
                            <div class="section-title">
                                <h2>Latest News</h2>
                                <p>We will always keep you abbreast with today's activities</p>
                            </div>
                            <!-- Section title -->
                        </div>
                    </div>
                    <!-- Blog Slider Start -->
                    <div class="blog-slider-active owl-carousel owl-nav-style"></div>
                    <!-- Blog Slider Start -->
                </div>
            </section>
            <!-- Blog Area End -->

            <!-- Brand area start -->
			<div class="brand-area">
				<div class="container">
					<div class="brand-slider owl-carousel owl-nav-style owl-nav-style-2">
						<div class="brand-slider-item">
							<a href="#"><img src="assets/images/brand-logo/1.png" alt="" /></a>
						</div>
						<div class="brand-slider-item">
							<a href="#"><img src="assets/images/brand-logo/2.png" alt="" /></a>
						</div>
						<div class="brand-slider-item">
							<a href="#"><img src="assets/images/brand-logo/3.png" alt="" /></a>
						</div>
						<div class="brand-slider-item">
							<a href="#"><img src="assets/images/brand-logo/4.png" alt="" /></a>
						</div>
						<div class="brand-slider-item">
							<a href="#"><img src="assets/images/brand-logo/5.png" alt="" /></a>
						</div>
						<div class="brand-slider-item">
							<a href="#"><img src="assets/images/brand-logo/6.png" alt="" /></a>
						</div>
						<div class="brand-slider-item">
							<a href="#"><img src="assets/images/brand-logo/7.png" alt="" /></a>
						</div>
						<div class="brand-slider-item">
							<a href="#"><img src="assets/images/brand-logo/8.png" alt="" /></a>
						</div>
						<div class="brand-slider-item">
							<a href="#"><img src="assets/images/brand-logo/9.png" alt="" /></a>
						</div>
					</div>
				</div>
			</div>
			<!-- Brand area end -->

			<?php include 'includes/footer.php'; ?>
		</div>

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
									<div class="pro-details-rating-wrap">
										<div class="rating-product"></div>
										<span class="read-review"><a class="reviews" href="javascript:void">Read reviews <span></span></a></span>
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
									<div class="pro-details-policy">
	                                    <ul>
	                                        <li><img src="assets/images/icons/policy.png" alt="" /><span>Seamless Delivery to Your Email Address</span></li>
	                                        <li><img src="assets/images/icons/policy-2.png" alt="" /><span>2 Days Money-Back Guarantee</span></li>
	                                        <li><img src="assets/images/icons/policy-3.png" alt="" /><span>Fast & Secure Payment Options</span></li>
	                                    </ul>
	                                </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- Modal end -->

		<!-- Scripts to be loaded  -->
		<!-- JS ============================================ -->
		
		<?php include 'includes/js.php'; ?>

		<script src="assets/js/pages/index.js"></script>
	</body>
</html>
