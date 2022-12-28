<!DOCTYPE html>
<html lang="en">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - My Account</title>
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
                                <h1 class="breadcrumb-hrading">My Account</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>My Account</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Breadcrumb Area End -->
            <!-- account area start -->
            <div class="checkout-area mtb-60px">
                <div class="container">
                    <div class="row">
                        <div class="ml-auto mr-auto col-lg-9">
                            <div class="checkout-wrapper">
                                <div id="faq" class="panel-group">
                                    <div class="panel panel-default single-my-account applicant">
                                        <div class="panel-heading my-account-title">
                                            <h3 class="panel-title"><span style="color: red">*</span> <a data-toggle="collapse" data-parent="#faq" href="#my-account-6">Image Upload (For Applicants Only) </a></h3>
                                        </div>
                                        <div id="my-account-6" class="panel-collapse collapse show">
                                            <div class="panel-body">
                                                <form id="image-upload" enctype="multipart/form-data">
                                                    <div class="myaccount-info-wrapper">
                                                        <div class="account-info-wrapper">
                                                            <h4>Image Upload</h4>
                                                            <h5>Upload Your Images For The Photoman Competition Here in the following order: Portraiture, Street Photography, Natural World and Landscape, Creative Photography, Night Photography, and Events.</h5>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-12">
                                                                <div class="billing-info">
                                                                    <label>Image Upload (Multiple Images Allowed) <span class="red-asteriks">*</span></label>
                                                                    <input type="file" id="media" name="media" class="required" accept="image/*" multiple />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="billing-back-btn">
                                                            <div class="billing-back">
                                                                <a data-toggle="collapse" data-parent="#faq" href="#my-account-6"><i class="fa fa-arrow-up"></i> back</a>
                                                            </div>
                                                            <div class="billing-btn">
                                                                <button type="submit">Submit</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                                <div class="myaccount-info-wrapper">
                                                    <div class="account-info-wrapper">
                                                        <h4>Media Management</h4>
                                                        <h5>Click the Delete Or the Expand buttons attached to an image to delete OR view images respectively when necessary</h5>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <table id="uploaded-media" class="table activate-select dt-responsive table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Preview</th>
                                                                        <th>Uploaded At</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody></tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class="billing-back-btn">
                                                        <div class="billing-back">
                                                            <a data-toggle="collapse" data-parent="#faq" href="#my-account-6"><i class="fa fa-arrow-up"></i> back</a>
                                                        </div>
                                                        <!-- <div class="billing-btn">
                                                            <button type="submit">Continue</button>
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-default single-my-account">
                                        <div class="panel-heading my-account-title">
                                            <h3 class="panel-title"><span>1 .</span> <a data-toggle="collapse" data-parent="#faq" href="#my-account-5">My Account </a></h3>
                                        </div>
                                        <div id="my-account-5" class="panel-collapse collapse show">
                                            <div class="panel-body">
                                                <div class="contact-area mtb-60px">
                                                    <div class="container">
                                                        <div class="custom-row-2">
                                                            <div class="col-12">
                                                                <div class="contact-info-wrap">
                                                                    <center>
                                                                        <img class="rounded-circle user-avatar" width="200" height="200" alt="no profile image">
                                                                    </center>
                                                                    <div class="single-contact-info">
                                                                        <div class="contact-icon">
                                                                            <i class="fa fa-user"></i>
                                                                        </div>
                                                                        <div class="contact-info-dec">
                                                                            <p class="user-full-name"></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="single-contact-info">
                                                                        <div class="contact-icon">
                                                                            <i class="fa fa-tags"></i>
                                                                        </div>
                                                                        <div class="contact-info-dec">
                                                                            <p class="user-gender"></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="single-contact-info">
                                                                        <div class="contact-icon">
                                                                            <i class="fa fa-envelope"></i>
                                                                        </div>
                                                                        <div class="contact-info-dec">
                                                                            <p class="user-email"></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="single-contact-info">
                                                                        <div class="contact-icon">
                                                                            <i class="fa fa-phone"></i>
                                                                        </div>
                                                                        <div class="contact-info-dec">
                                                                            <p class="user-phone"></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="single-contact-info">
                                                                        <div class="contact-icon">
                                                                            <i class="fa fa-home"></i>
                                                                        </div>
                                                                        <div class="contact-info-dec">
                                                                            <p class="user-contact-address"></p>
                                                                        </div>
                                                                    </div>
                                                                    <div class="single-contact-info">
                                                                        <div class="contact-icon">
                                                                            <i class="fa fa-map-marker-alt"></i>
                                                                        </div>
                                                                        <div class="contact-info-dec">
                                                                            <p class="user-state"></p>
                                                                            <p class="user-lg"></p>
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
                                    <div class="panel panel-default single-my-account">
                                        <div class="panel-heading my-account-title">
                                            <h3 class="panel-title"><span>2 .</span> <a data-toggle="collapse" data-parent="#faq" href="#my-account-1">Edit your account information </a></h3>
                                        </div>
                                        <div id="my-account-1" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                <form id="update-account" enctype="multipart/form-data">
                                                    <div class="myaccount-info-wrapper">
                                                        <div class="account-info-wrapper">
                                                            <h4>My Account Information</h4>
                                                            <h5>Your Personal Details</h5>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6 col-md-6">
                                                                <div class="billing-info">
                                                                    <label>First Name <span class="red-asteriks">*</span></label>
                                                                    <input type="text" id="user_firstname" name="user_firstname" class="required" />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6 col-md-6">
                                                                <div class="billing-info">
                                                                    <label>Last Name <span class="red-asteriks">*</span></label>
                                                                    <input type="text" id="user_lastname" name="user_lastname" class="required" />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-4 col-md-12 rating-form-style mb-15">
                                                                <label>Gender <span class="red-asteriks">*</span></label>
                                                                <select class="required" id="user_gender" name="user_gender">
                                                                    <option value="">Select Gender</option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-lg-4 col-md-12">
                                                                <div class="billing-info">
                                                                    <label>Email Address <span class="red-asteriks">*</span></label>
                                                                    <input type="email" id="user_email" name="user_email" class="required" />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-4 col-md-12">
                                                                <div class="billing-info">
                                                                    <label>Phone Number <span class="red-asteriks">*</span></label>
                                                                    <input type="text" id="user_phone" name="user_phone" class="required" />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12 col-md-12">
                                                                <div class="billing-info">
                                                                    <label>Contact Address <span class="red-asteriks">*</span></label>
                                                                    <input type="text" id="user_contact_address" name="user_contact_address" class="required" />
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="col-lg-6 col-md-16 rating-form-style mb-15">
                                                                <label>State <span class="red-asteriks">*</span></label>
                                                                <select class="required" id="state" name="state">
                                                                    <option value="">Select State</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-lg-6 col-md-16 rating-form-style mb-15">
                                                                <label>City <span class="red-asteriks">*</span></label>
                                                                <select class="required" id="lg" name="lg">
                                                                    <option value="">Select LGA</option>
                                                                </select>
                                                            </div>
                                                            <div class="col-lg-12 col-md-12">
                                                                <div class="billing-info">
                                                                    <label>Image Avatar </label>
                                                                    <input type="file" id="avatar" name="avatar" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="billing-back-btn">
                                                            <div class="billing-back">
                                                                <a data-toggle="collapse" data-parent="#faq" href="#my-account-1"><i class="fa fa-arrow-up"></i> back</a>
                                                            </div>
                                                            <div class="billing-btn">
                                                                <button type="submit">Update</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-default single-my-account">
                                        <div class="panel-heading my-account-title">
                                            <h3 class="panel-title"><span>3 .</span> <a data-toggle="collapse" data-parent="#faq" href="#my-account-2">Change your password </a></h3>
                                        </div>
                                        <div id="my-account-2" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                <form id="update-password">
                                                    <div class="myaccount-info-wrapper">
                                                        <div class="account-info-wrapper">
                                                            <h4>Change Password</h4>
                                                            <h5>Your Password</h5>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-12 col-md-12">
                                                                <div class="billing-info">
                                                                    <label>Current Password <span class="red-asteriks">*</span></label>
                                                                    <div class="pw-field" style="position: relative;">
                                                                        <input type="password" class="required" id="current_password" name="current_password" placeholder="Current Password" autocomplete="current-password" />
                                                                        <i class="ion-eye-disabled toggle-password"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12 col-md-12">
                                                                <div class="billing-info">
                                                                    <label>New Password <span class="red-asteriks">*</span></label>
                                                                    <div class="pw-field" style="position: relative;">
                                                                        <input type="password" class="required" id="new_password" name="new_password" placeholder="New Password" autocomplete="current-password" />
                                                                        <i class="ion-eye-disabled toggle-password"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12 col-md-12">
                                                                <div class="billing-info">
                                                                    <label>Confirm Password <span class="red-asteriks">*</span></label>
                                                                    <div class="pw-field" style="position: relative;">
                                                                        <input type="password" class="required" id="confirm_password" name="confirm_password" placeholder="Confirm Password" autocomplete="current-password" />
                                                                        <i class="ion-eye-disabled toggle-password"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="billing-back-btn">
                                                            <div class="billing-back">
                                                                <a data-toggle="collapse" data-parent="#faq" href="#my-account-2"><i class="fa fa-arrow-up"></i> back</a>
                                                            </div>
                                                            <div class="billing-btn">
                                                                <button type="submit">Continue</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-default single-my-account">
                                        <div class="panel-heading my-account-title">
                                            <h3 class="panel-title"><span>4 .</span> <a data-toggle="collapse" data-parent="#faq" href="#my-account-3">My Orders </a></h3>
                                        </div>
                                        <div id="my-account-3" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                <div class="myaccount-info-wrapper">
                                                    <div class="account-info-wrapper">
                                                        <h4>My Complete Orders</h4>
                                                        <h5>From The Recent</h5>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <table id="my_orders" class="table activate-select dt-responsive table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>SNO</th>
                                                                        <th>Transaction Reference No.</th>
                                                                        <th>Order Qty</th>
                                                                        <th>Total Amount</th>
                                                                        <th>Ordered At</th>
                                                                        <th>Billing Email Address</th>
                                                                        <th>Order Status</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody></tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class="billing-back-btn">
                                                        <div class="billing-back">
                                                            <a data-toggle="collapse" data-parent="#faq" href="#my-account-3"><i class="fa fa-arrow-up"></i> back</a>
                                                        </div>
                                                        <!-- <div class="billing-btn">
                                                            <button type="submit">Continue</button>
                                                        </div> -->
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel panel-default single-my-account">
                                        <div class="panel-heading my-account-title">
                                            <h3 class="panel-title"><span>5 .</span> <a data-toggle="collapse" data-parent="#faq" href="#my-account-4">My Inbox </a></h3>
                                        </div>
                                        <div id="my-account-4" class="panel-collapse collapse">
                                            <div class="panel-body">
                                                <div class="myaccount-info-wrapper">
                                                    <div class="account-info-wrapper">
                                                        <h4>My Inbox</h4>
                                                        <h5>Read & Unread Messages</h5>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <table id="my_inbox" class="table activate-select dt-responsive table-hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>#</th>
                                                                        <th>Subject</th>
                                                                        <th>Sender</th>
                                                                        <th>Sender Role</th>
                                                                        <th>Date / Time</th>
                                                                        <th>Message Status</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody></tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div class="billing-back-btn">
                                                        <div class="billing-back">
                                                            <a data-toggle="collapse" data-parent="#faq" href="#my-account-4"><i class="fa fa-arrow-up"></i> back</a>
                                                        </div>
                                                        <!-- <div class="billing-btn">
                                                            <button type="submit">Continue</button>
                                                        </div> -->
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
            </div>
            <!-- account area end -->
            <!-- Modal -->
            <div class="modal fade" id="orderModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title"></h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <table id="my_order_items" class="table activate-select dt-responsive table-hover">
                                            <thead>
                                                <tr>
                                                    <th>SNO</th>
                                                    <th>Image Thumbnail</th>
                                                    <th>Event</th>
                                                    <th>Category</th>
                                                    <th>Price</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>

                                            <tbody></tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
            <!-- Modal end -->

            <!-- Modal -->
            <div class="modal fade" id="messageModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title"></h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">x</span></button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 message-body">
                                        
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

        <!-- page script -->
        <script src="assets/js/pages/account.js?v=2"></script>
    </body>
</html>
