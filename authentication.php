<!DOCTYPE html>
<html lang="en">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - Login / Register</title>
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
                                <h1 class="breadcrumb-hrading">User Authentication</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>Login / Register</li>
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
                                        <h4>login</h4>
                                    </a>
                                    <a data-toggle="tab" href="#lg2">
                                        <h4>register</h4>
                                    </a>
                                    <!-- <a data-toggle="tab" href="#lg3">
                                        <h4>apply</h4>
                                    </a> -->
                                </div>
                                <div class="tab-content">
                                    <div id="lg1" class="tab-pane active">
                                        <div class="login-form-container">
                                            <div class="login-register-form">
                                                <form id="login-form">
                                                    <label for="email">Email <span class="red-asteriks">*</span></label>
                                                    <input type="email" name="email" id="email" placeholder="Email Address" />

                                                    <label for="password">Password <span class="red-asteriks">*</span></label>
                                                    <div class="pw-field" style="position: relative;">
                                                        <input type="password" class="required" id="password" name="password" placeholder="Password" autocomplete="current-password" />
                                                        <i class="ion-eye-disabled toggle-password"></i>
                                                    </div>
                                                    <div class="button-box">
                                                        <div class="login-toggle-btn">
                                                            <input type="checkbox" id="remember-me" />
                                                            <a class="flote-none" href="javascript:void(0)">Remember me</a>
                                                            <a href="forgot-password">Forgot Password?</a>
                                                        </div>
                                                        <button type="submit"><span>Login</span></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="lg2" class="tab-pane">
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
                                                    
                                                    <div class="button-box mtb-40px">
                                                        <button type="submit"><span>Register</span></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div id="lg3" class="tab-pane">
                                        <div class="login-form-container">
                                            <div class="login-register-form">
                                                <form id="application-form">
                                                    <label for="user_firstname">First name <span class="red-asteriks">*</span></label>
                                                    <input type="text" class="required" id="user_firstname" name="user_firstname" placeholder="First name" />

                                                    <label for="user_lastname">Last name <span class="red-asteriks">*</span></label>
                                                    <input type="text" class="required" id="user_lastname" name="user_lastname" placeholder="Last name" />

                                                    <label for="user_gender">Gender <span class="red-asteriks">*</span></label>
                                                    <div class="rating-form-style mb-10">
                                                        <select class="required" id="user_gender" name="user_gender">
                                                            <option value="">Select Your Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                        </select>
                                                    </div>

                                                    <label for="user_email">Valid email address <span class="red-asteriks">*</span></label>
                                                    <input type="email" class="required" id="user_email" name="user_email" placeholder="Email" />

                                                    <label for="user_phone">Valid phone number <span class="red-asteriks">*</span></label>
                                                    <input type="text" class="required" id="user_phone" name="user_phone" placeholder="Phone" />

                                                    <label for="state">State of location <span class="red-asteriks">*</span></label>
                                                    <div class="rating-form-style mb-10">
                                                        <select class="required state" id="state" name="state">
                                                            <option value="">State</option>
                                                        </select>
                                                    </div>

                                                    <label for="lg">Local Government / City of location <span class="red-asteriks">*</span></label>
                                                    <div class="rating-form-style mb-15">
                                                        <select class="required lg" id="lg" name="lg">
                                                            <option value="">Local Government</option>
                                                        </select>
                                                    </div>

                                                    <label for="user_contact_address">Contact Address <span class="red-asteriks">*</span></label>
                                                    <input type="text" class="required" id="user_contact_address" name="user_contact_address" placeholder="Contact Address" />

                                                    <label for="user_role">What are you applying as? <span class="red-asteriks">*</span></label>
                                                    <div class="rating-form-style mb-15">
                                                        <select class="required" id="user_role" name="user_role">
                                                            <option value="">User type</option>
                                                            <option value="Applicant">Photoman Applicant</option>
                                                        </select>
                                                    </div>

                                                    <label for="avatar">Lets see your pretty face <span class="red-asteriks">*</span></label>
                                                    <input type="file" class="required" id="avatar" name="avatar" placeholder="Lets see your pretty face" accept="image/*" />

                                                    <label for="next_of_kin">Next Of Kin <span class="red-asteriks">*</span></label>
                                                    <input type="text" id="user_next_of_kin" name="user_next_of_kin" placeholder="Next of Kin" />

                                                    <label for="next_of_kin_phone">Next Of Kin Phone Number <span class="red-asteriks">*</span></label>
                                                    <input type="text" id="user_next_of_kin_phone" name="user_next_of_kin_phone" placeholder="Next of Kin Phone number" />

                                                    <label for="user_facebook_url">Facebook URL</label>
                                                    <input type="text" id="user_facebook_url" name="user_facebook_url" placeholder="Facebook URL" />

                                                    <label for="user_instagram_url">Instagram URL</label>
                                                    <input type="text" id="user_instagram_url" name="user_instagram_url" placeholder="Instagram URL" />

                                                    <label for="user_linkedin_url">LinkedIn URL</label>
                                                    <input type="text" id="user_linkedin_url" name="user_linkedin_url" placeholder="Linked in Url" />

                                                    <div class="mb-60px">
                                                        <label for="user_brief_profile">Brief Profile</label>
                                                        <textarea class="form-control" id="user_brief_profile" name="user_brief_profile" rows="10" placeholder="Write something about yourself..."></textarea>
                                                    </div>

                                                    <label for="password">Password <span class="red-asteriks">*</span></label>
                                                    <input type="password" class="required" id="user_password" name="password" placeholder="Password" />

                                                    <label for="re_password">Confirm Password <span class="red-asteriks">*</span></label>
                                                    <input type="password" class="required" id="re_password" placeholder="Password" />
                                                    
                                                    <div class="button-box mtb-40px">
                                                        <button type="submit"><span>Apply Now</span></button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div> -->
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

        <script src="assets/js/pages/authentication.js"></script>
    </body>
</html>
