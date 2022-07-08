<!DOCTYPE html>
<html lang="zxx">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - Apply</title>
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
                                <h1 class="breadcrumb-hrading">Photoman Application</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>Photoman Application</li>
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
                        <div class="col-lg-6 mb-res-sm-50px">
                            <div class="about-left-image">
                                <img src="assets/images/feature-bg/canon.png" alt="" class="img-responsive" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="about-content">
                                <div class="about-title">
                                    <h2>Welcome To Photoman</h2>
                                </div>
                                <p class="mb-30px" style="text-align: justify">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore aperiam fugit consequuntur voluptatibus ex sint iure in, distinctio sed dolorem aspernatur veritatis repellendus dolorum voluptate, animi
                                    libero officiis eveniet accusamus recusandae. Temporibus amet ducimus sapiente voluptatibus autem dolorem magnam quas, porro suscipit. Quibusdam culpa asperiores exercitationem architecto quo, temporibus
                                    vel! porro suscipit. Quibusdam culpa asperiores exercitationem architecto quo, temporibus vel!
                                </p>
                                <p>
                                    Sint voluptatum beatae necessitatibus quos mollitia vero, optio asperiores aut tempora iusto eum rerum, possimus, minus quidem ut saepe laboriosam. Praesentium aperiam accusantium minus repellendus
                                    accusamus neque iusto pariatur laudantium provident quod recusandae exercitationem natus dignissimos, molestias quibusdam doloremque eaque fugit molestiae modi quam unde. Error est dolor facere.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="about-content">
                                <div class="about-title">
                                    <h2>Welcome To Photoman</h2>
                                </div>
                                <p class="mb-30px" style="text-align: justify">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore aperiam fugit consequuntur voluptatibus ex sint iure in, distinctio sed dolorem aspernatur veritatis repellendus dolorum voluptate, animi
                                    libero officiis eveniet accusamus recusandae. Temporibus amet ducimus sapiente voluptatibus autem dolorem magnam quas, porro suscipit. Quibusdam culpa asperiores exercitationem architecto quo, temporibus
                                    vel! porro suscipit. Quibusdam culpa asperiores exercitationem architecto quo, temporibus vel!
                                </p>
                                <p>
                                    Sint voluptatum beatae necessitatibus quos mollitia vero, optio asperiores aut tempora iusto eum rerum, possimus, minus quidem ut saepe laboriosam. Praesentium aperiam accusantium minus repellendus
                                    accusamus neque iusto pariatur laudantium provident quod recusandae exercitationem natus dignissimos, molestias quibusdam doloremque eaque fugit molestiae modi quam unde. Error est dolor facere.
                                </p>
                            </div>
                        </div>
                        <div class="col-lg-6 mb-res-sm-50px">
                            <div class="about-left-image">
                                <img src="assets/images/feature-bg/canon2.png" alt="" class="img-responsive" />
                            </div>
                        </div>
                        <div class="login-register-area mb-60px mt-53px">
                            <div class="container">
                                <div class="row">
                                    <div class="col-lg-7 col-md-12 ml-auto mr-auto">
                                        <div class="login-register-wrapper">
                                            <div class="login-register-tab-list nav">
                                                <a class="active" data-toggle="tab" href="#lg">
                                                    <h4>Application Form</h4>
                                                </a>
                                            </div>
                                            <div class="tab-content">
                                                <div id="lg" class="tab-pane active">
                                                    <div class="login-form-container">
                                                        <div class="login-register-form">
                                                            <form id="application-form">
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

                                                                <label for="user_role">What are you applying as? <span class="red-asteriks">*</span></label>
                                                                <div class="rating-form-style mb-15">
                                                                    <select class="required" id="user_role" name="user_role">
                                                                        <option value="">User type</option>
                                                                        <option value="Applicant">Photoman</option>
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
                                                                
                                                                <div class="button-box mtb-40px">
                                                                    <button type="submit"><span>Apply Now</span></button>
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
                    </div>
                    <!-- <div class="row mt-60px">
                        <div class="col-md-4 mb-res-sm-30px">
                            <div class="single-about">
                                <h4>Our Company</h4>
                                <p>
                                    Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing
                                    elit.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4 mb-res-sm-30px">
                            <div class="single-about">
                                <h4>Our Team</h4>
                                <p>
                                    Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing
                                    elit.
                                </p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="single-about">
                                <h4>Testimonial</h4>
                                <p>
                                    Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam. Lorem ipsum dolor sit amet conse ctetur adipisicing
                                    elit.
                                </p>
                            </div>
                        </div>
                    </div> -->
                </div>
            </section>

            <!-- About Area End -->

            <?php include 'includes/footer.php'; ?>
        </div>

        <!-- Scripts to be loaded  -->
        <!-- JS============================================ -->

        <?php include 'includes/js.php'; ?>

        <script src="assets/js/pages/apply.js"></script>
    </body>
</html>
