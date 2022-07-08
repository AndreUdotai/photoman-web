<!DOCTYPE html>
<html lang="en">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - Password Reset</title>
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
                                <h1 class="breadcrumb-hrading">Password Reset</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>Password Reset</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Breadcrumb Area End -->
            <!-- login area start -->
            <div class="login-register-area mb-60px mt-53px">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-7 col-md-12 ml-auto mr-auto">
                            <div class="login-register-wrapper">
                                <div class="login-register-tab-list nav">
                                    <a class="active" data-toggle="tab" href="#lg1">
                                        <h4>Reset Password</h4>
                                    </a>
                                </div>
                                <div class="tab-content">
                                    <div id="lg1" class="tab-pane active">
                                        <div class="login-form-container">
                                            <div class="login-register-form">
                                                <form id="password-reset-form">
                                                    <label for="">Email <span class="red-asteriks">*</span></label>
                                                    <input class="required" type="email" name="email" id="email" placeholder="Email Address" readonly />

                                                    <label for="">New Password <span class="red-asteriks">*</span></label>
                                                    <div class="pw-field" style="position: relative;">
                                                        <input type="password" class="required" id="password" name="password" placeholder="New Password" autocomplete="current-password" />
                                                        <i class="ion-eye-disabled toggle-password"></i>
                                                    </div>

                                                    <label for="">Confirm Password <span class="red-asteriks">*</span></label>
                                                    <div class="pw-field" style="position: relative;">
                                                        <input type="password" class="required" id="re_password" name="re_password" placeholder="Confirm Password" autocomplete="current-password" />
                                                        <i class="ion-eye-disabled toggle-password"></i>
                                                    </div>

                                                    <div class="button-box">
                                                        <div class="login-toggle-btn">
                                                            <a href="authentication">Login / Sign Up</a>
                                                        </div>
                                                        <button type="submit"><span>Reset Password</span></button>
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

        <script src="assets/js/pages/password-reset.js"></script>
    </body>
</html>
