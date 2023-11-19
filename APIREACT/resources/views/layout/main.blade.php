<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Web Blog</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
    href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
    rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="...">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3">Web Blog</div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

            <!-- Nav Item - Dashboard -->
            <li class="nav-item">
                <a class="nav-link" href="/home">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/about">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>About</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/blog">
                            <i class="fas fa-fw fa-tachometer-alt"></i>
                            <span>Blog</span></a>
                        </li>

                        <li class="nav-item">
                        <a class="nav-link" href="/table">
                            <i class="fas fa-fw fa-tachometer-alt"></i>
                            <span>Table</span></a>
                        </li>

                    </ul>

                    <!-- Content Wrapper -->
                    <div id="content-wrapper" class="d-flex flex-column">
                        <div class=" container mt-4 bg-light">
                        @yield("content")
                        </div>
                      </div>
                  </div>
              </div>

              <!-- Bootstrap core JavaScript-->
              <script src="vendor/jquery/jquery.min.js"></script>
              <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

              <!-- Core plugin JavaScript-->
              <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

              <!-- Custom scripts for all pages-->
              <script src="js/sb-admin-2.min.js"></script>

          </body>

          </html>
