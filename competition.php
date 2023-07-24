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

            .competition-body {
                margin-top: 50px
            }

            .competition-body .video-box {
                margin-top: 30px
            }

            .underline {
                display: block; /* or display: block; */
                border-bottom: 3px solid #f19596; /* Replace 'blue' with your desired color */
                padding-bottom: 15px;
            }

            .full-width {
                width: 100%;
                margin: 0;
            }

            .sticky-box {
                position: sticky;
                top: 0;
                /*background-color: #f5f5f5;
                padding: 10px;*/
            }

            .circle {
                width: 15px;
                height: 15px;
                border-radius: 50%;
                display: inline-block;
                background-color: red; /* Replace with your desired color */
            }

            .table-striped-custom tbody tr:nth-child(odd) {
                background-color: #ebcfcf; /* Odd row color */
            }

            .table-striped-custom tbody tr:nth-child(even) {
                background-color: #ffffff; /* Even row color */
            }

            .accordion {
                width: 100%;
            }

            .accordion-item {
                border: 1px solid #e8f0fe;
                margin-bottom: 10px;
            }

            .accordion-header {
                background-color: #e8f0fe;
                padding: 10px;
                cursor: pointer;
            }

            .accordion-content {
                padding: 10px;
                display: none;
            }

            /* Optional: Styling the active accordion */
            .accordion-item.active .accordion-content {
                display: block;
            }

            .font-bold {
                font-weight: 800
            }

            @media (max-width: 767px) {
                .hidden-xs {
                    display: none !important;
                }

                .align-center {
                    text-align: center;
                }

                .mb-70 {
                    margin-bottom: 70px;
                }
            }
        
            @media (min-width: 768px) {
                .hidden-sm {
                    display: none !important;
                }
            }
        </style>
    </head>

    <body onload="displayUserProfile(); addToCart(); loadMyCart(); removeFromCart(); notifications();">
        <!-- main layout start from here -->
        <?php include 'includes/preloader.php'; ?>

        <!--====== PRELOADER PART ENDS ======-->
        <div id="main">

            <?php include 'includes/header.php'; ?>

            <!-- Static Banner Area Start -->
            <section class="static-banner-area">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12 hidden-xs">
                            <div class="banner-wrapper banner-box" style="padding: 50px">
                                <a href="shop-4-column.html">
                                    <img class="rounded-circle img-responsive" src="assets/images/feature-bg/competition1.jpg" alt="" width="400" height="400" />
                                </a>
                            </div>
                        </div>
                        <div class="col col-lg-6 col-md-6 col-sm-12 d-flex align-self-center col-xs-12 align-center">
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

            <!-- Competition body -->
            <section class="competition-body" style="margin-bottom: 70px">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 about-content mb-70">
                            <h1 class="underline breadcrumb-hrading">Summary</h1>
                            <p>Please read carefully before applying</p>
                            <div class="col-lg-12 col-md-12 mb-res-sm-50px video-box full-width" style="display: block">
                                <div class="single-blog-post blog-grid-post full-width">
                                    <div class="blog-post-media full-width">
                                        <div class="blog-post-video video-container full-width">
                                            <!-- <iframe src="https://youtu.be/ACQdq4NHZMg" allow="autoplay; encrypted-media" allowfullscreen="" class="full-width"></iframe> -->
                                            <iframe src="https://www.youtube.com/embed/ACQdq4NHZMg" title="Photoman Competition Reel" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="full-width"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="note mt-53px">
                                <div class="about-title mb-20px">
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
                            </div>
                            <div class="prizes mt-53px">
                                <div class="about-title mb-20px">
                                    <h5 style="font-weight:900">Cash Prizes</h5>
                                </div>
                                <table class="table table-striped table-striped-custom text-center table-responsive">
                                    <thead>
                                        <tr>
                                            <th style="width: 25%"></th>
                                            <th>Overall Best</th>
                                            <th>1st Runner</th>
                                            <th>2nd Runner-Up</th>
                                            <th>24 Other Runners-Up</th>
                                            <th>Best Overall Picture</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td class="text-left">Win $1000 (USD)</td>
                                        <td><div class="circle"></div></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td class="text-left">Win $500 (USD)</td>
                                        <td></td>
                                        <td><div class="circle"></div></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td class="text-left">Win $250 (USD)</td>
                                        <td></td>
                                        <td></td>
                                        <td><div class="circle"></div></td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td class="text-left">Win $100 (USD)</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><div class="circle"></div></td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td class="text-left">Win $200 (USD)</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td><div class="circle"></div></td>
                                      </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="rules mt-53px">
                                <div class="about-title mb-20px">
                                    <h5 style="font-weight:900">General Information</h5>
                                    <span style="font-size: 10px; font-style: italic;">
                                        Click any of the boxes to show details
                                    </span>
                                </div>
                                <div class="accordion">
                                    <div class="accordion-item">
                                        <div class="accordion-header font-bold">General Rules</div>
                                        <div class="accordion-content">
                                            <p>
                                                <ol type="1">
                                                    <li>By entering the competition, you hereby accept to abide by the policy and rules of the Photoman Ccompetition 2023(“the Competition”) and submit to the terms and conditions adopted thereof;</li>
                                                    <li>Entry is free of chargefrom the Photoman platformand the competition is open to all photographers in Nigeria;</li>
                                                    <li>Entries must be submitted between (…);</li>
                                                    <li>By entering the Competition, you agree and permit Photoman to receive, retain and utilize your personal and personal information as registration data on its platform. All registration data and related personal information shall will be used by Photoman for the purpose of the Competition and in accordance with its Privacy Policy;</li>
                                                    <li>To enter the Competition, you must register and upload your images and entries via the Photoman website: www.photoman.ng,</li>
                                                    <li>The Panel of Judges constituted to assess and score entries in the Competition shall develop and publish criteria of assessment, but review shall include will look out for good composition, creativity and style</li>
                                                </ol>
                                            </p>
                                        </div>
                                    </div>
                                  
                                    <div class="accordion-item">
                                        <div class="accordion-header font-bold">Image Specification</div>
                                        <div class="accordion-content">
                                            <p style="text-align: justify;">
                                                <ol type="1">
                                                    <li>Images submitted must be taken specifically for the Competition or adopted for it. Only photographs taken in 2023 will be accepted in the Competition. Each entries should reflect the category against which the photograph is submitted, and must be based on the six (6) categories outlined. Additional information can be found on the Website;</li>
                                                    <li>Images should be no smaller than 1MB and no larger than 3MB. Images should be JPEG files. All images must be saved in the sRGB colour model,</li>
                                                    <li>Images must be of high-resolution and suitable for printing in media and capable of being printed for exhibition, if needed. </li>
                                                </ol>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <div class="accordion-header font-bold">Procedure</div>
                                        <div class="accordion-content">
                                            <p style="text-align: justify;">
                                                <ol type="1">
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
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <div class="accordion-header font-bold">Privacy Policy</div>
                                        <div class="accordion-content">
                                            <p style="text-align: justify">
                                                <ol type="1">
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
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <div class="accordion-header font-bold">Voting Process</div>
                                        <div class="accordion-content">
                                            <p style="text-align: justify;">
                                                In addition to the rules governing decision by the judges’ panel for the competition, Photoman may run an online rating process whereby members of the public may vote for a favorite photograph. If there is sufficient evidence to suggest malpractice and manipulation of the rating process, Photoman reserves the right to remove relevant entry or entries in question and, make appropriate decision to remedy the situation, including awarding the relevant prize to the next qualified entrant. Photoman’s decisions are final.
                                            </p>
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <div class="accordion-header font-bold">Rights</div>
                                        <div class="accordion-content">
                                            <p style="text-align: justify;">
                                                All entrants understand that any image submitted to the competition may be used by the Photoman, and its event partners, for marketing and promotional purposes in relation to the competition or any other event or program of Photoman. You hereby grant Photoman a non-exclusive, irrevocable license in each submitted photoghraph throughout the world in all media for any use connected to the promotion of you the author and the Photoman competition, including, but not limited to:
                                                <ol type="1">
                                                    <li>judging the competition;</li>
                                                    <li>displaying the winning entries and runners up on the website;</li>
                                                    <li>inclusion within the website, or any publication,</li>
                                                    <li>inclusion within any materials used in the promotion of Photoman.</li>
                                                </ol>
                                            </p>
                                        </div>
                                    </div>

                                    <div class="accordion-item">
                                        <div class="accordion-header font-bold">Liability</div>
                                        <div class="accordion-content">
                                            <p style="text-align: justify;">
                                                <ol type="1">
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
                                  
                                    <!-- Add more accordion items as needed -->
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                            <!-- login area start -->
                            <div class="sticky-box" id="apply-now">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-12 col-md-12">
                                            <div class="login-register-wrapper">
                                                <div class="login-register-tab-list nav" style="margin-bottom: 15px">
                                                    <a class="active" data-toggle="tab" href="#lg1">
                                                        <h4>APPLY BELOW</h4>
                                                    </a>
                                                </div>
                                                <div class="tab-content">
                                                    <div id="lg1" class="tab-pane active">
                                                        <div class="login-form-container" style="padding: 40px 20px">
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
                        </div>
                    </div>
                </div>
            </section>

            <?php include 'includes/footer.php'; ?>
        </div>

        <!-- Scripts to be loaded  -->
        <!-- JS ============================================ -->

        <?php include 'includes/js.php'; ?>
        <script src="assets/js/pages/competition.js?v=3"></script>
    </body>
</html>
