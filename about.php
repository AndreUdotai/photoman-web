<!DOCTYPE html>
<html lang="zxx">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - About Us</title>
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
                                <h1 class="breadcrumb-hrading">About Us</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>About Us</li>
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
                            <div class="single-blog-post blog-grid-post">
                                <div class="blog-post-media">
                                    <div class="blog-post-video">
                                        <iframe src="https://www.youtube.com/embed/-4swGz905uk" allow="autoplay; encrypted-media" allowfullscreen="" width="540" height="260"></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="about-content">
                                <div class="about-title">
                                    <h2>Welcome To Photoman</h2>
                                </div>
                                <p class="mb-30px">
                                    Photoman connects photographers with customers using unique technology solutions that create a community between both parties.
                                </p>
                                <p class="mb-30px">
                                    We make the business and experience of photography seamless and hassle-free. Clients and photographers no longer need to follow up on each other after an event to send or receive their beautifully captured moments. Photoman provides the platform where photographs are easily accessible to clients from the comfort of their devices.
                                </p>
                                <p>
                                    This is a revolution in the Photography industry.

                                    We also turn photo enthusiasts into professional photographers giving them a platform to become sole businesses.

                                    As part of the photography industry, Photoman has perfected the flow process making us your most trusted middleman in preserving your best memories.

                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Breadcrumb Area start -->
            <section class="breadcrumb-area">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="breadcrumb-content">
                                <h1 class="breadcrumb-hrading">The Team</h1>
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
                        <div class="col-lg-4">
                            <div class="single-blog-post blog-grid-post mb-30px">
                                <div class="blog-post-media">
                                    <div class="blog-post-video">
                                        <img src="assets/images/team/ekikere.jpeg" width="400" height="400" class="rounded-circle img-responsive">
                                    </div>
                                </div>
                            </div>
                            <div class="about-title" style="margin-bottom:20px">
                                <h2>Ekikere Usoro</h2>
                                <p style="margin-top: 10px"><b>Team Lead – Photography Projects</b></p>
                            </div>
                            <p style="margin-bottom:30px; text-align: justify;">
                                Ekikere Usoro is a seasoned photographer and cinematographer. He has been featured on mega projects that highlight the best in the legal space and also the entertainment industry in Nigeria. His favorite types of photography includenature photography, landscape, portrait, and abstract photography…
                            </p>
                        </div>
                        <div class="col-lg-4">
                            <div class="single-blog-post blog-grid-post mb-30px">
                                <div class="blog-post-media">
                                    <div class="blog-post-video">
                                        <img src="assets/images/team/andre.JPG" width="400" height="400" class="rounded-circle img-responsive">
                                    </div>
                                </div>
                            </div>
                            <div class="about-title" style="margin-bottom:20px">
                                <h2>Ubong Udotai Andre</h2>
                                <p style="margin-top: 10px"><b>Software Project Manager</b></p>
                            </div>
                            <p style="margin-bottom:30px; text-align: justify">
                                Ubong Udotai is a Software Project Manager at Digital Community and a Full stack Developer with previous experiences as a GIS Specialist and Emergency Communication Centre Supervisor. He enjoys designing epics that best capture business ideas, building software solutions, writing, and researching. When Ubong is not working, he swims, plays table tennis, or pool.
                            </p>
                        </div>
                        <div class="col-lg-4">
                            <div class="single-blog-post blog-grid-post mb-30px">
                                <div class="blog-post-media">
                                    <div class="blog-post-video">
                                        <img src="assets/images/team/judith.jpeg" width="400" height="400" class="rounded-circle img-responsive">
                                    </div>
                                </div>
                            </div>
                            <div class="about-title" style="margin-bottom:20px">
                                <h2>Judith Obiekwe</h2>
                                <p style="margin-top: 10px"><b>Legal Adviser</b></p>
                            </div>
                            <p class="mb-30px" style="text-align: justify">
                                Judith is a lawyer with a specialization in Information Communications and Technology (ICT) Law. She is an Associate of Technology Advisors LLP. She is an associate member of the Nigerian Chartered Institute of Arbitrators. She obtained her LL. B degree from Afe Babalola University and attended the Nigerian Law School (Lagos Campus). She is also a member of the Nigerian Bar Association.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- About Area End -->

            <?php include 'includes/footer.php'; ?>
        </div>

        <!-- Scripts to be loaded  -->
        <!-- JS ============================================ -->

        <?php include 'includes/js.php'; ?>
    </body>
</html>
