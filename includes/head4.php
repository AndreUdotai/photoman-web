<?php
	$mediaID = $_GET['mediaid'];
	$api_root = 'https://api.photoman.ng/api/v1/';
	$page_url = 'https://photoman.ng/news-article';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $api_root.'media/'.$mediaID);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	$media = curl_exec($ch);
	curl_close($ch);

	$mediaArrayResponse = json_decode($media, true);
	$responseErrorState = $mediaArrayResponse['error'];
	$mediaArrayRoot = $mediaArrayResponse['event'];
?>


<!--- General Head tags
========================================================================================================== -->
<meta charset="utf-8" />
<!-- =================== -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- ====================================================================================================== -->
<meta name="description" content="<?php echo substr(strip_tags($mediaArrayRoot['media_event_description']), 0, 154);?>" />
<!-- ====================================================================================================== -->
<meta name="keywords" content="<?php echo $mediaArrayRoot['media_event_location'];?>">
<!-- ====================================================================================================== -->
<meta content="Photoman" name="author" />
<!-- ====================================================================================================== -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- ====================================================================================================== -->
<!--- General Head tags
=========================================================================================================== -->

<!--- Open Graph needs
================================================== -->
<meta property="og:site_name" content="Photoman">
<!--======================================================================================================= --> 
<meta property="og:title" content="<?php echo substr(strip_tags($mediaArrayRoot['media_event']), 0, 60);?>" />
<!--======================================================================================================= --> 
<meta property="og:description" content="<?php echo substr(strip_tags($mediaArrayRoot['media_event_description']), 0, 154);?>" />
<!--======================================================================================================= --> 
<meta property="og:image" itemprop="image" content="<?php echo $mediaArrayRoot['media_thumbnail_url'];?>">
<!--======================================================================================================= --> 
<meta property="og:type" content="website" />
<!--======================================================================================================= --> 
<meta property="og:url" content="<?php echo $page_url."?mediaid=".$mediaID; ?>" />
<!--======================================================================================================= --> 
<!--- Open Graph needs
=========================================================================================================== -->

<!--- Twitter needs
=========================================================================================================== -->
<meta name="twitter:card" content="summary_large_image" />
<!-- ====================================================================================================== -->
<meta property="twitter:site" content="@igweudouche">
<!--======================================================================================================= -->
<meta property="twitter:creator" content="@igweudouche">
<!--======================================================================================================= --> 
<meta property="twitter:title" content="<?php echo substr(strip_tags($mediaArrayRoot['media_event']), 0, 60);?>" />
<!--======================================================================================================= --> 
<meta property="twitter:description" content="<?php echo substr(strip_tags($mediaArrayRoot['media_event_description']), 0, 154);?>" />
<!--======================================================================================================= --> 
<meta property="og:image" itemprop="image" content="<?php echo $mediaArrayRoot['media_thumbnail_url'];?>">
<!--======================================================================================================= --> 
<!-- Twitter needs
=========================================================================================================== -->

<!-- Favicon
=========================================================================================================== -->
<link rel="shortcut icon" type="image/x-icon" href="assets/images/favicon/photomanfavicon1.png" />

<!-- Google Fonts 
=========================================================================================================== -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800&amp;display=swap" rel="stylesheet" />

<!-- Stylesheets
=========================================================================================================== -->

<!-- All CSS Flies   -->
<link rel="stylesheet" href="assets/css/vendor/plugins.min.css">
<link rel="stylesheet" href="assets/css/style.min.css">
<link rel="stylesheet" href="assets/css/responsive.min.css">

<!-- Sweet Alert-->
<link href="assets/js/sweetalert2/sweetalert2.min.css" rel="stylesheet" type="text/css" />

<!-- Perfect Scrollbar -->
<link href="assets/js/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" />

<!-- Datatable -->
<link href="assets/js/datatables/dataTables.bootstrap4.css" rel="stylesheet" type="text/css" />
<link href="assets/js/datatables/responsive.bootstrap4.css" rel="stylesheet" type="text/css" />
<link href="assets/js/datatables/buttons.bootstrap4.css" rel="stylesheet" type="text/css" />
<link href="assets/js/datatables/select.bootstrap4.css" rel="stylesheet" type="text/css" />