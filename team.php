<!DOCTYPE html>
<html lang="zxx">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - The Team</title>
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
                                <h1 class="breadcrumb-hrading">The Team</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>The Team</li>
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
                        <div class="col-lg-6">
                            <div class="single-blog-post blog-grid-post mb-30px">
                                <div class="blog-post-media">
                                    <div class="blog-post-video">
                                        <img src="assets/images/team/ekikere.jpeg" width="100%">
                                    </div>
                                </div>
                            </div>
                            <div class="about-title">
                                <h2>Ekikere Usoro</h2>
                            </div>
                            <p class="mb-30px">
                                Ekikere Usoro is a seasoned photographer and cinematographer. He has featured on mega projects that highlights the best in the legal space and also the entertainment industry in Nigeria. His favorite types of photography include; nature photography, landscape, portrait, and abstract photography…
                            </p>
                        </div>
                        <div class="col-lg-6">
                            <div class="single-blog-post blog-grid-post mb-30px">
                                <div class="blog-post-media">
                                    <div class="blog-post-video">
                                        <img src="assets/images/team/ubong.jpeg" width="100%">
                                    </div>
                                </div>
                            </div>
                            <div class="about-title">
                                <h2>Ubong Udotai Andre</h2>
                            </div>
                            <p class="mb-30px">
                                Ubong is a software development enthusiast and a MERN developer (MongoDB, Express, React and NodeJS). He currently manages software development lifecycle from building user stories to ensuring software applications meet companies’ business expectations. Born and raised in Akwa Ibom, Nigeria, he hopes to be in global software development conversations.
                            </p>
                        </div>
                        <!-- <div class="col-lg-4">
                            <div class="single-blog-post blog-grid-post mb-30px">
                                <div class="blog-post-media">
                                    <div class="blog-post-video">
                                        <img src="assets/images/team/x.jpeg" width="100%">
                                    </div>
                                </div>
                            </div>
                            <div class="about-title">
                                <h2>John Doe</h2>
                            </div>
                            <p class="mb-30px">
                                Ubong is a software development enthusiast and a MERN developer (MongoDB, Express, React and NodeJS). He currently manages software development lifecycle from building user stories to ensuring software applications meet companies’ business expectations. Born and raised in Akwa Ibom, Nigeria, he hopes to be in global software development conversations.
                            </p>
                        </div> -->
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
