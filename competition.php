<!DOCTYPE html>
<html lang="zxx">
    
    <head>

        <?php include 'includes/head.php'; ?>

        <title>Photoman - Photoman Competition</title>

        <style type="text/css">
            .video-container {
              position: relative;
              padding-bottom: 56.25%; /* 16:9 */
              height: 0;
            }
            .video-container iframe {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
            }

            .about-content ul {
                list-style-type: disc; margin-bottom:30px; padding-left: 18px
            }

            .about-content ol {
                margin-bottom:30px; padding-left: 18px
            }
        </style>
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

            <!-- Static Banner Area Start -->
            <section class="static-banner-area">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12">
                            <div class="banner-wrapper banner-box" style="padding: 50px">
                                <a href="shop-4-column.html"><img class="rounded-circle img-responsive" src="assets/images/feature-bg/competition1.jpg" alt="" width="400" height="400" /></a>
                            </div>
                        </div>
                        <div class="col col-lg-6 col-md-6 col-sm-12 d-flex align-self-center col-xs-12">
                            <div class="static-banner-content">
                                <h2>Photoman</h2>
                                <h3>Competition</h3>
                                <p>Rewarding amazing photographers in Nigeria with amazing images!</p>
                                <a href="#" id="apply-btn">Apply Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Static Banner Area end -->

            <!-- Breadcrumb Area start -->
            <section class="breadcrumb-area" style="padding-bottom: 0">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="breadcrumb-content">
                                <h1 class="breadcrumb-hrading">Summary</h1>
                                <p>Please read carefully before applying</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Breadcrumb Area End -->

            <!-- About Area Start -->
            <section class="about-area" style="margin-top: 0px">
                <div class="container container-2">
                    <div class="row">
                        <div class="col-lg-12 mb-res-sm-50px">
                            <div class="single-blog-post blog-grid-post">
                                <div class="blog-post-media">
                                    <div class="blog-post-video video-container">
                                        <iframe src="https://www.youtube.com/embed/-4swGz905uk" allow="autoplay; encrypted-media" allowfullscreen=""></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- About Area End -->

            <!-- About Area Start -->
            <section class="about-area">
                <div class="container container-2">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="about-content">
                                <!-- <div class="about-title">
                                    <h2>SUMMARY</h2>
                                </div>
                                <p class="mb-30px">
                                    Rewarding amazing photographers in Nigeria with amazing images! Enter for free and you could win up to $2,000.
                                </p> -->
                                <div class="about-title">
                                    <h5 style="font-weight:900">Cash Prizes</h5>
                                </div>
                                <p>
                                    <ul>
                                        <li>The overall best - $1000</li>
                                        <li>1st runner - $500</li>
                                        <li>2nd runner-up - $250</li>
                                        <li>24 other runners-up - $100</li>
                                        <li>Best overall picture - $200</li>
                                    </ul>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Note</h5>
                                </div>
                                <p>
                                    <ul>
                                        <li>All winners will be admitted into the Photoman Academy and on-boarded on the Photoman platform as a creative photographer.</li>
                                        <li>Entry is free and open to all photographers in Nigeria</li>
                                        <li>Six (6) photo entries to be submitted (one for each category)</li>
                                        <li>ONLY photos taken in 2023 should be entered into the competition</li>
                                        <li>Deadline</li>
                                    </ul>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Entry Categories (with at least one monochrome)</h5>
                                </div>
                                <p>
                                    <ol>
                                        <li><b>Portraiture</b> – portrait photography</li>
                                        <li><b>Street Photography</b> – urban and lifestyle</li>
                                        <li><b>Natural world and Landscape</b> – photos of landscapes and the natural world. (Animals, wildlife, insect, hills, mountains, etc.)</li>
                                        <li>Creative in Monochrome </li>
                                        <li><b>Night Photography</b> – abstract or any creative depiction or composition, may or may not show city streets, light, buildings, skylines and environs, etc</li>
                                        <li><b>Events</b> – any hosted events (formal or informal) including but not limited to weddings, naming ceremonies, birthdays, cocktails, wine tasting, receptions, swearing in ceremonies, chieftaincy and traditional/cultural installations, religious programs, etc</li>
                                    </ol>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">General Rules</h5>
                                </div>
                                <p>
                                    <ol type="i">
                                        <li>By entering the competition, you hereby accept to abide by the policy and rules of the Photoman Ccompetition 2023(“the Competition”) and submit to the terms and conditions adopted thereof;</li>
                                        <li>Entry is free of chargefrom the Photoman platformand the competition is open to all photographers in Nigeria;</li>
                                        <li>Entries must be submitted between (…);</li>
                                        <li>By entering the Competition, you agree and permit Photoman to receive, retain and utilize your personal and personal information as registration data on its platform. All registration data and related personal information shall will be used by Photoman for the purpose of the Competition and in accordance with its Privacy Policy;</li>
                                        <li>To enter the Competition, you must register and upload your images and entries via the Photoman website: www.photoman.ng,</li>
                                        <li>The Panel of Judges constituted to assess and score entries in the Competition shall develop and publish criteria of assessment, but review shall include will look out for good composition, creativity and style</li>
                                    </ol>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Image Specification</h5>
                                </div>
                                <p>
                                    <ol type="i">
                                        <li>Images submitted must be taken specifically for the Competition or adopted for it. Only photographs taken in 2023 will be accepted in the Competition. Each entries should reflect the category against which the photograph is submitted, and must be based on the six (6) categories outlined. Additional information can be found on the Website;</li>
                                        <li>Images should be no smaller than 1MB and no larger than 3MB. Images should be JPEG files. All images must be saved in the sRGB colour model,</li>
                                        <li>Images must be of high-resolution and suitable for printing in media and capable of being printed for exhibition, if needed. </li>
                                    </ol>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Procedure</h5>
                                </div>
                                <p>
                                    <ol type="i">
                                        <li>Entries will be accessed by the judges between ()</li>
                                        <li>The photographs will be voted for by the Judges and notified by email. [ ]</li>
                                        <li>The decision of the Judges shall be final and no negotiation will be entered into with respect to any such decision;</li>
                                        <li>All winning entries will be announced on ()</li>
                                        <li>Each entrant will only be able to upload one picture in each category;but assessment and scoring of the images shall be cumulative, incorporating all the images of each particular entrant;</li>
                                        <li>
                                            The judging criteria will be based on the following;
                                            <ul>
                                                <li>Composition 30%</li>
                                                <li>Story telling 30%</li>
                                                <li>Connection with the category 40%, </li>
                                            </ul>
                                        </li>
                                        <li>Winners will be announced on the Photoman website and across social media.</li>
                                    </ol>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Privacy Policy</h5>
                                </div>
                                <p>
                                    <ol type="i">
                                        <li>
                                            Photoman reserves the right and sole discretion, to qualify or disqualify and remove any entry that does not comply with the Photoman Privacy Policy and Rules stipulated for this competition, even after the entry has been successfully is submitted on the Website. By submitting your entry for this competition, you hereby You certify and warrant, in respect of each entry you have submitted, that:
                                            <ul>
                                                <li>You are the sole owner and author of each photograph;</li>
                                                <li>You have the right to enter the photograph in competition;</li>
                                                <li>Each photograph does not carry, contain or represent personally identifiable information of anyone for which consent has not been sought and obtained;</li>
                                                <li>The entry does not contain any infringing, threatening, false, misleading, abusive, harassing, libelous, defamatory, vulgar, obscene, scandalous, inflammatory, pornographic or profane content;</li>
                                                <li>The entry does not contain any material that could constitute or encourage conduct which would be considered a criminal offence, give rise to civil liability, or otherwise violate any law</li>
                                                <li>The Entry does not infringe upon the copyrights, trademarks, contract rights, or any other intellectual property rights of any third person or entity, or violate any person’s rights of privacy or publicity, including trademarks owned by third parties</li>
                                            </ul>
                                        </li>
                                        <li>You agree to and hereby fully indemnify Photoman in respect of all liability, fees and any and all monies owing to any person by reason of your breaching any of the foregoing,</li>
                                        <li>You confirm that each person depicted in the entry has granted permission to be portrayed in the photograph. Any costumes, props or other materials used must be rented or borrowed with the permission of the owner, and all other relevant permissions must have been sought and obtained.</li>
                                    </ol>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Voting Process</h5>
                                </div>
                                <p style="margin-bottom:30px">
                                    In addition to the rules governing decision by the judges’ panel for the competition, Photoman may run an online rating process whereby members of the public may vote for a favorite photograph. If there is sufficient evidence to suggest malpractice and manipulation of the rating process, Photoman reserves the right to remove relevant entry or entries in question and, make appropriate decision to remedy the situation, including awarding the relevant prize to the next qualified entrant. Photoman’s decisions are final.
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Rights</h5>
                                </div>
                                <p>
                                    All entrants understand that any image submitted to the competition may be used by the Photoman, and its event partners, for marketing and promotional purposes in relation to the competition or any other event or program of Photoman. You hereby grant Photoman a non-exclusive, irrevocable license in each submitted photoghraph throughout the world in all media for any use connected to the promotion of you the author and the Photoman competition, including, but not limited to:
                                    <ol type="i">
                                        <li>judging the competition;</li>
                                        <li>displaying the winning entries and runners up on the website;</li>
                                        <li>inclusion within the website, or any publication,</li>
                                        <li>inclusion within any materials used in the promotion of Photoman.</li>
                                    </ol>
                                </p>
                                <div class="about-title">
                                    <h5 style="font-weight:900">Liability</h5>
                                </div>
                                <p>
                                    <ol type="i">
                                        <li>
                                            Photoman assumes no responsibility for any incorrect, inaccurate or incomplete information, whether caused by website users or by any of the equipment or programming associated with or utilized in the competition;
                                        </li>
                                        <li>Photoman assumes no responsibility for technical, hardware or software failures of any kind, for lost network connections, garbled computer transmissions, other problems or technical malfunctions with regard to the competition;</li>
                                        <li>Photoman assumes no responsibility for any error, omission, corruption, interruption, deletion, defect, delay in operation or transmission, communications line failure, theft or destruction or unauthorized access to or alteration of entries;</li>
                                        <li>Photoman  is not responsible for any problem or technical malfunction of any telephone network or lines, computer on-line systems, servers, computer equipment, software, failure of any e-mail addressed to photoman on account of technical problems, human error or traffic congestion on the internet or any website, or any combination thereof, including any injury or damage to you or any other person's computer related to or resulting from participation or downloading any materials in the competition,</li>
                                        <li>If for any reason a contestant’s entry cannot be viewed or is not capable of running as planned, including infection by computer viruses, bugs, tampering, unauthorized intervention, fraud or technical failures, Photoman assumes no responsibility. </li>
                                    </ol>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- About Area End -->

            <!-- login area start -->
            <div class="login-register-area mb-60px mt-53px" id="apply-now">
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

                                                    <label for="user_next_of_kin">Next Of Kin <span class="red-asteriks">*</span></label>
                                                    <input type="text" class="required" id="user_next_of_kin" name="user_next_of_kin" placeholder="Next Of Kin" />

                                                    <label for="user_next_of_kin_phone">Next Of Kin Phone Number <span class="red-asteriks">*</span></label>
                                                    <input type="text" class="required" id="user_next_of_kin_phone" name="user_next_of_kin_phone" placeholder="Next Of Kin Phone Number" />

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
        <script src="assets/js/pages/competition.js?v=1"></script>
    </body>
</html>
