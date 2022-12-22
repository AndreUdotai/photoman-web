<!DOCTYPE html>
<html lang="zxx">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - Photoman Competition</title>
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
                                <h1 class="breadcrumb-hrading">Photoman Competition</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>Photoman Competition</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Breadcrumb Area End -->

            <!-- About Area Start -->
            <section class="about-area">
                <div class="container container-2">
                    <div class="row">
                        <div class="col-lg-4 mb-res-sm-50px">
                            <div class="single-blog-post blog-grid-post">
                                <div class="blog-post-media">
                                    <div class="blog-post-video">
                                        <img src="assets/images/feature-bg/competition1.jpg" width="400" height="400" class="rounded-circle img-responsive">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="about-content">
                                <div class="about-title">
                                    <h2>SUMMARY</h2>
                                </div>
                                <p class="mb-30px">
                                    Rewarding amazing photographers in Nigeria with amazing images! Enter for free and you could win up to $2,000.
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Cash Prizes</h5>
                                </div>
                                <p>
                                    <ul style="list-style-type: disc; margin-bottom:30px">
                                        <li>The overall best - $2000</li>
                                        <li>1st runner - $1000</li>
                                        <li>2nd runner-up - $500</li>
                                        <li>24 other runners-up - $250</li>
                                        <li>Best overall picture - $500</li>
                                    </ul>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Note</h5>
                                </div>
                                <p>
                                    <ul style="list-style-type: disc; margin-bottom:30px">
                                        <li>All winners will be on-boarded on the creative Photoman platform.</li>
                                        <li>Entry is free and open to all photographers</li>
                                        <li>6 photos submissions (one for each category)</li>
                                        <li>Deadline</li>
                                    </ul>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Categories</h5>
                                </div>
                                <p>
                                    <ul style="list-style-type: disc; margin-bottom:30px">
                                        <li><b>Portraiture</b> - <i>Portrait Photography</i></li>
                                        <li><b>Street Photography</b> - <i>Urban and lifestyle</i></li>
                                        <li><b>Natural world and landscape</b> - <i>Photos of landscapes and the natural world (animals, wildlife, insect, hills, mountains, etc.)</i></li>
                                        <li><b>Creative Photography</b> - <i>Abstracts in Monochrome</i></li>
                                        <li><b>Night Photography</b> - <i>Night photography showing a city street and its environs</i></li>
                                        <li><b>Events</b> - <i>any kind of event like weddings, concerts, birthday parties, dinner events, etc.</i></li>
                                    </ul>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- About Area End -->

            <!-- login area start -->
            <div class="login-register-area mb-60px mt-53px">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-7 col-md-12 ml-auto mr-auto">
                            <div class="login-register-wrapper">
                                <div class="login-register-tab-list nav">
                                    <a class="active" data-toggle="tab" href="#lg1">
                                        <h4>APPLY BELOW</h4>
                                    </a>
                                </div>
                                <div class="tab-content">
                                    <div id="lg1" class="tab-pane active">
                                        <div class="login-form-container">
                                            <div class="login-register-form">
                                                <form id="register-form">
                                                    <label for="user_firstname">First name <span class="red-asteriks">*</span></label>
                                                    <input type="text" class="required" id="user_firstname" name="user_firstname" placeholder="First name" />

                                                    <label for="user_lastname">Last name <span class="red-asteriks">*</span></label>
                                                    <input type="text" class="required" id="user_lastname" name="user_lastname" placeholder="Last name" />

                                                    <label for="user_email">Valid email address <span class="red-asteriks">*</span></label>
                                                    <input type="email" class="required" id="user_email" name="user_email" placeholder="Email" />

                                                    <label for="user_phone">Valid phone number <span class="red-asteriks">*</span></label>
                                                    <input type="text" class="required" id="user_phone" name="user_phone" placeholder="Phone" />

                                                    <label for="state">State <span class="red-asteriks">*</span></label>
                                                    <div class="rating-form-style mb-10">
                                                        <select class="required state" id="state" name="state">
                                                            <option value="">State</option>
                                                        </select>
                                                    </div>

                                                    <label for="lg">Town / City <span class="red-asteriks">*</span></label>
                                                    <div class="rating-form-style mb-15">
                                                        <select class="required lg" id="lg" name="lg">
                                                            <option value="">Please select</option>
                                                        </select>
                                                    </div>

                                                    <label for="password">Password <span class="red-asteriks">*</span></label>
                                                    <div class="pw-field" style="position: relative;">
                                                        <input type="password" class="required" id="user_password" name="password" placeholder="Password" autocomplete="current-password" />
                                                        <i class="ion-eye-disabled toggle-password"></i>
                                                    </div>

                                                    <label for="re_password">Confirm Password <span class="red-asteriks">*</span></label>
                                                    <div class="pw-field" style="position: relative;">
                                                        <input type="password" class="required" id="re_password" placeholder="Confirm Password" autocomplete="current-password" />
                                                        <i class="ion-eye-disabled toggle-password"></i>
                                                    </div>
                                                    <input type="hidden" name="user_role" value="Applicant" class="required">
                                                    
                                                    <div class="button-box mtb-40px">
                                                        <button type="submit"><span>Register</span></button>
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
            <!-- login area end -->

            <?php include 'includes/footer.php'; ?>
        </div>

        <!-- Scripts to be loaded  -->
        <!-- JS ============================================ -->

        <?php include 'includes/js.php'; ?>
        <script src="assets/js/pages/competition.js"></script>
    </body>
</html>
