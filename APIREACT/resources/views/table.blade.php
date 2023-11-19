@extends("layout.main")

@section("content")
  <h2 class="mt-5 mx-5">Isi dari table</h2>

<table class="table mx-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
    </tr>
  </thead>
  <tbody>
    <?php $i = 1; ?>
    @foreach($data as $dt )

    <tr>
      <th scope="row">{{ $i++ }}</th>
      <td>{{ $dt['nama'] }}</td>
      <td>{{ $dt['email'] }}</td>
    </tr>
    @endForeach

  </tbody>
</table>
@endSection