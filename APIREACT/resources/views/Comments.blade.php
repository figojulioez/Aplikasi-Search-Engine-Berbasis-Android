@extends('layout.main')
<link href="css/sb-admin-2.min.css" rel="stylesheet">

@section('content')


@foreach($posts as $post)

<div class="card">
  <div class="card-header">
  {{$title}}
  </div>
  <div class="card-body">
    <h5 class="card-title"><?= $post["judul"]; ?></h5>
    <p class="card-text">{{ $post["waktu"] }}</p>
    <p class="card-text"><?= $post["body"]; ?></p>
    <a href="/comments/{{$post['slug']}}" class="btn btn-primary">Read More</a>
  </div>
</div>
<br>
@endforeach


@endSection