<!DOCTYPE html>
<html lang="en">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - Contact Us</title>

        <!-- <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" /> -->
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
                                <h1 class="breadcrumb-hrading">Contact Us</h1>
                                <ul class="breadcrumb-links">
                                    <li><a href="/">Home</a></li>
                                    <li>Contact Us</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Breadcrumb Area End -->
            <!-- contact area start -->
            <div class="contact-area mtb-60px">
                <div class="container">
                    <div class="custom-row-2">
                        <div class="col-lg-4 col-md-5">
                            <div class="contact-info-wrap">
                                <div class="single-contact-info">
                                    <div class="contact-icon">
                                        <i class="fa fa-phone"></i>
                                    </div>
                                    <div class="contact-info-dec">
                                        <p>+234 (0) 816 005 1310</p>
                                    </div>
                                </div>
                                <div class="single-contact-info">
                                    <div class="contact-icon">
                                        <i class="fa fa-envelope"></i>
                                    </div>
                                    <div class="contact-info-dec">
                                        <p><a href="mailto:info@photoman.ng" style="color: blue">info@photoman.ng</a></p>
                                    </div>
                                </div>
                                <!-- <div class="single-contact-info">
                                    <div class="contact-icon">
                                        <i class="fa fa-map-marker"></i>
                                    </div>
                                    <div class="contact-info-dec">
                                        <p>Address goes here,</p>
                                        <p>street, Crossroad 123.</p>
                                    </div>
                                </div> -->
                                <div class="contact-social">
                                    <h3>Follow Us</h3>
                                    <div class="social-info">
                                        <ul>
                                            <li>
                                                <a href="https://web.facebook.com/Photomanng-103882958919122" target="_blank"><i class="ion-social-facebook"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://twitter.com/Photoman_ng" target="_blank"><i class="ion-social-twitter"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://www.youtube.com/channel/UCWNokb2HcQh9aZZAc5AEx7g" target="_blank"><i class="ion-social-youtube"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://www.linkedin.com/company/photoman-ng" target="_blank"><i class="ion-social-linkedin"></i></a>
                                            </li>
                                            <li>
                                                <a href="https://www.instagram.com/photoman.ng/" target="_blank"><i class="ion-social-instagram"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8 col-md-7">
                            <div class="contact-form">
                                <div class="contact-title mb-30">
                                    <h2>Get In Touch</h2>
                                </div>
                                <form class="contact-form-style" id="contact-form">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <input id="name" name="name" placeholder="Full Name*" type="text" class="required" />
                                        </div>
                                        <div class="col-lg-4">
                                            <input id="email" name="email" placeholder="Valid Email*" type="email" class="required" />
                                        </div>
                                        <div class="col-lg-4">
                                            <input id="phone" name="phone" placeholder="Valid phone number*" type="text" class="required" />
                                        </div>
                                        <div class="col-lg-12">
                                            <input id="subject" name="subject" placeholder="Subject*" type="text" class="required" />
                                        </div>
                                        <div class="col-lg-12">
                                            <textarea id="message" name="message" placeholder="Your Message*" class="required"></textarea>
                                            <button class="submit" type="submit">SEND</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- contact area end -->
            
            <?php include 'includes/footer.php'; ?>
        </div>

        <!-- Scripts to be loaded  -->
        <!-- JS============================================ -->

        <?php include 'includes/js.php'; ?>

        <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>

        <script>
            var mymap = L.map('mapid').setView([51.505, -0.09], 13);


            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken: 'pk.eyJ1IjoibmF6bXVsMTcyOTU3IiwiYSI6ImNrZ3g2emt2YzA5ZHkycnJzcDE1eTB2djgifQ.J38M8WqimEQarZfXKDWQXg'
            }).addTo(mymap);

            var marker = L.marker([51.5, -0.09]).addTo(mymap);

        </script>


        <!-- Main Activation JS -->
        <script src="assets/js/pages/contact.js"></script>
    </body>

</html>
