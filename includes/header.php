<!--Header Start -->
<header class="main-header">
	<!-- Header Top Start -->
	<div class="header-top-nav">
		<div class="container-fluid">
			<div class="row">
				<!--Left Start-->
				<div class="col-lg-4 col-md-4">
					<div class="left-text">
						<p>Welcome to Photoman!</p>
					</div>
				</div>
				<!--Left End-->
				<!--Right Start-->
				<div class="col-lg-8 col-md-8 text-right">
					<div class="header-right-nav">
						<ul class="res-xs-flex logged-in-links" style="display: none">
							<li class="after-n">
								<a href="account"><i class="ion-ios-person"></i><span class="user-firstname"></span></a>
							</li>
							<li>
								<a href="javascript:void"><i class="ion-pricetag"></i><span class="user-role"></span></a>
							</li>
							<li>
								<a href="account" id="unread-messages-notification"><i class="ion-email-unread"></i>Messages <span class="unread-count"></span></a>
							</li>
							<li>
								<a href="javascript:void" onclick="showSignOutMessage();"><i class="ion-power"></i>Logout</a>
							</li>
						</ul>
						<ul class="res-xs-flex logged-out-links">
							<li class="after-n">
								<a href="authentication"><i class="ion-power"></i>Login / Sign Up</span></a>
							</li>
						</ul>
					</div>
				</div>
				<!--Right End-->
			</div>
		</div>
	</div>
	<!-- Header Top End -->
	<!-- Header Buttom Start -->
	<div class="header-navigation sticky-nav">
		<div class="container-fluid">
			<div class="row">
				<!-- Logo Start -->
				<div class="col-md-2 col-sm-2">
					<div class="logo">
						<a href="/"><img src="assets/images/logo/photomanlogo1.png" alt="photomanlogo" width="124" height="33" /></a>
					</div>
				</div>
				<!-- Logo End -->
				<!-- Navigation Start -->
				<div class="col-md-10 col-sm-10">
					<!--Main Navigation Start -->
					<div class="main-navigation d-none d-lg-block">
						<ul>
							<li><a href="/">Home</a></li>
							<li><a href="explore">Explore</a></li>
							<li><a href="events">Events</a></li>
							<li class="menu-dropdown">
								<a href="#">Extras <i class="ion-ios-arrow-down"></i></a>
								<ul class="sub-menu">
									<li><a href="cart">My Cart</a></li>
									<li><a href="checkout">Check Out</a></li>
									<li><a href="news">Blog</a></li>
									<li><a href="#">Photoman Application</a></li>
								</ul>
							</li>
							<li class="menu-dropdown">
								<a href="#">Who We Are <i class="ion-ios-arrow-down"></i></a>
								<ul class="sub-menu">
									<li><a href="about">About Us</a></li>
									<li><a href="photomen">Our Photographers</a></li>
									<li><a href="team">The Team</a></li>
								</ul>
							</li>
							<li><a href="contact">Contact Us</a></li>
						</ul>
					</div>
					<!--Main Navigation End -->
					<!--Header Bottom Account Start -->
					<div class="header_account_area">
						<!--Seach Area Start -->
						<div class="header_account_list search_list">
							<a href="javascript:void(0)"><i class="ion-ios-search-strong"></i></a>
							<div class="dropdown_search">
								<form id="media-header-search">
									<input placeholder="Search events here ..." type="text" class="required" autocomplete="on" />
									<div class="search-category">
										<select class="bootstrap-select required" name="poscats"></select>
									</div>
									<button type="submit"><i class="ion-ios-search-strong"></i></button>
								</form>
							</div>
						</div>
						<!--Seach Area End -->
						<!--Contact info Start -->
						<div class="contact-link">
							<div class="phone">
								<p>Whatsapp:</p>
								<a href="https://wa.me/2348160051310" target="_blank">(+234)08160051310</a>
							</div>
						</div>
						<!--Contact info End -->
						<!--Cart info Start -->
						<div class="cart-info d-flex">
							<div class="mini-cart-warp">
								<a href="javascript:void" class="count-cart"><span>NGN 0</span></a>
								<div class="mini-cart-content">
									<div class="mini-cart-scroll" style="height: 400px; position: relative">
										<ul style="width: 230px !important"></ul>
									</div>
									<div class="shopping-cart-total">
										<h4 class="shop-total">Total : <span>NGN 0</span></h4>
									</div>
									<div class="shopping-cart-btn text-center">
										<a class="default-btn" href="checkout">checkout</a>
									</div>
								</div>
							</div>
						</div>
						<!--Cart info End -->
					</div>
				</div>
			</div>
			<!-- mobile menu -->
			<div class="mobile-menu-area">
				<div class="mobile-menu">
					<nav id="mobile-menu-active">
						<ul class="menu-overflow">
							<li><a href="/">Home</a></li>
							<li><a href="explore">Explore</a></li>
							<li><a href="events">Events</a></li>
							<li>
								<a href="#">Extras </a>
								<ul>
									<li><a href="cart">My Cart</a></li>
									<li><a href="checkout">Check Out</a></li>
									<li><a href="news">Blog</a></li>
									<li><a href="#">Photoman Application</a></li>
								</ul>
							</li>
							<li>
								<a href="#">Who We Are </a>
								<ul>
									<li><a href="about">About Us</a></li>
									<li><a href="photomen">Our Photographers</a></li>
									<li><a href="team">The Team</a></li>
								</ul>
							</li>
							<li><a href="contact">Contact Us</a></li>
						</ul>
					</nav>
				</div>
			</div>
			<!-- mobile menu end-->
		</div>
	</div>
	<!--Header Bottom Account End -->
</header>
<!-- Header End