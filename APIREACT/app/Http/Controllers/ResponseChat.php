<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuestionChat;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Histori;
use App\Models\Room;
use Illuminate\Support\Str;
class ResponseChat extends Controller
{
    public function __construct () {
        $this->middleware("auth:sanctum", ['except' => ['image', 'video']]);
    }

    public function answer () {

        date_default_timezone_set('Asia/Jakarta');

        $question = request("key");
        if (Str::length($question) >= 18) {
            $question = Str::substr(request("key"), 0, 18) . "...";
        }

        Histori::create([
            'user_id' => auth()->user()->id,
            'histori_text' => $question,
            'date' => date("d-M-Y"),
            'time' => date("H:i"),
        ]);


        // Data dari database
        $keys = QuestionChat::all();
        $answer = [];

        // Pertanyaan User 
        $question = explode(" ", request("key"));

        foreach($keys as $key) {
            // Jumlah berapa banyak ada kecocokan
            $amountKey = 0;
            // pecah keynya
            $brokenKeys = explode(" ", $key['key']);
            $amountBrokenKeys = count($brokenKeys);

            // Sesuaikan atau menghitung jumlahnya
            foreach($brokenKeys as $brokenKey) {
                if ( strpos(strtolower(request("key")), strtolower($brokenKey)) !== false ) {

                    $amountKey += 1;
                } 
            }

            // jika jumlahnya kecocokan setengahnya benar maka jadikan dia sebagai jawaban
            if ( $amountKey >= $amountBrokenKeys / 2 ) {
                $answer[] = $key;
            }
        }

        if (count($answer) == 0) {
            return response()->json(['data' => "kosong"]);
        }

        return response()->json(["data" => $answer]);
    }
    public function create() {
        $rules = [
            'key' => ['required'],
            'chat' => ['required', 'string'],
            'img' => ['file', 'image','max:2000'],
            'video' => ['file'],
        ];

        $messages = [
            'key.required' => "Key wajib di isi",
            'chat.required' => "Chat wajib di isi"
        ];


        $validate = Validator::make(request(['key', 'chat', 'img', 'video']), $rules, $messages  );

        if ( $validate->fails() ) {
            return response()->json(['messages' => $validate->messages()], 421);
        }

        
        $image = request()->file('img')->store("image");
        $video = request()->file("video")->store("video");

        QuestionChat::create([
            'key' => request("key"),
            'chat' => request("chat"),
            'image' => $image,
            'video' => $video,
        ]);

        return response()->json(['messages' => "Data berhasil di buat"]);
    }

    public function delete($id) {

        Storage::delete(QuestionChat::where("id", $id)->first()->image);
        Storage::delete(QuestionChat::where("id", $id)->first()->video);
        QuestionChat::where("id", $id)->delete();

        return response()->json(['messages' => "Data berhasil di hapus"]);
    }

    public function image($id) {
        if ( !QuestionChat::where("image", 'like', "%" . $id)->exists() ) {
            return response()->json(['message', 'Error image!!!'], 401);
        }

        return response()->file(storage_path('app/public/image/' . $id));


    }

    public function video($id) {
        if ( !QuestionChat::where("video", 'like', "%" . $id)->exists() ) {
            return response()->json(['message', 'Error video!!!'], 401);
        }

        return response()->file(storage_path('app/public/video/' . $id));
    }

    public function all () {
        return response()->json(['data' => QuestionChat::all()]);
    }

    public function update ($id) {
        $image = QuestionChat::where("id", $id)->first()->image;
        $video = QuestionChat::where("id", $id)->first()->video;

        if ( request()->file('img') ) {
            Storage::delete(QuestionChat::where("id", $id)->first()->image);
            $image = request()->file('img')->store('image');
        }

        if ( request()->file('video') ) {
            Storage::delete(QuestionChat::where("id", $id)->first()->video);
            $video = request()->file('video')->store('video');
        }

        QuestionChat::where('id', $id)->update([
            'key' => request("key"),
            'chat' => request("chat"),
            'image' => $image,
            'video' => $video,
        ]);

        return response()->json(['messages' => 'Berhasil ditambahkan']);
    }

    public function histori() {
        $dateAll = Histori::select('date')->where("user_id", auth()->user()->id)->latest()->distinct()->get();
        $contain = [];

        foreach($dateAll as $date) {
            $results = Histori::where("date", $date->date)->latest()->get(); // hasil pencarian
            $data = [];
            foreach($results as $result) {
                $data[] = $result;
            }
            $contain[] = [
                'time' => $date,
                'data' => $data,
            ];
        }

        return response()->json($contain);
    }

    public function show ($id) {
        return response()->json(['data' => QuestionChat::where('id', $id)->first()]);
    }

    public function createRoom () {

        if ( room::where('user_id', auth()->user()->id)->count() > 0 ) {
            room::where("user_id", auth()->user()->id)->delete();
        }

        room::create([
            'room' => request("roomId"),
            'user_id' => auth()->user()->id
        ]);

        return response()->json(['message' => 'Berhasil di buat']);
    }

    public function allRoom () {
        return response()->json(['data' => room::latest()->with('User')->get()]);
    }

}
