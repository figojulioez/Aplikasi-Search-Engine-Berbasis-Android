@extends('layout.main')
<link href="{{ asset('css/sb-admin-2.min.css') }}" rel="stylesheet">

@section('content')

<div class="card">
  <div class="card-header">
  {{$title}}
  </div>
  <div class="card-body">
    <h5 class="card-title"><?= $post["judul"]; ?></h5>
    <p class="card-text"><?= $post["waktu"]; ?></p>
    <p class="card-text"><?= $post["body"]; ?></p>
    <a href="../comments" class="btn btn-primary">Back To Posts</a>
  </div>
</div>
<br>

@endSection
