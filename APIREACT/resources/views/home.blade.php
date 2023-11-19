@extends("layout.main")

@section("content")
            <!-- Main Content -->
            <div id="content">

              <!-- Topbar -->
              <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                Dashboard Web Blog
              </nav>
              <div class="container mt-4">
                <form class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                  <div class="card" style="width: 18rem;">
                    <img src="img/{{$gambar}}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">{{$nama}}</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <a href="#" class="btn btn-primary">{{$email}}</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
@endSection