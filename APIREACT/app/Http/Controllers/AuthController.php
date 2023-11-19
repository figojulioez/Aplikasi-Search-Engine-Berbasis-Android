<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Room;
use App\Models\LogActivity;
use App\Models\Histori;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{
    public function __construct() {
        $this->middleware(['auth:sanctum'], ['except' => ['register', 'login']]);
        $this->middleware(['auth:sanctum', 'admin'], ['only' => ['all', 'delete']]);

    }

    public function register () {
        $rules = [
            'username' => ['required', 'unique:App\Models\User,username', 'min:7'],
            'password' => ['required', 'min:7'],
        ];

        $messages = [
            'username.required' => 'Username wajib di isi',
            'username.unique' => 'Username sudah pernah di gunakan',
            'password.required' => 'Password wajib di isi',
        ];

        $validator = Validator::make(request(['username', 'password']), $rules, $messages);

        if ( $validator->fails() ) {
            return response()->json(['messages' => $validator->messages()], 421);   
        }
        
        

        User::create([
            'username' => request('username'),
            'password' => Hash::make(request('password')),
        ]);

        return response()->json(['messages' => 'Data berhasil di buat']);
    }


    public function login () {
        $rules = [
            'username' => ['required',],
            'password' => ['required'],
        ];

        $messages = [
            'username.required' => 'Username wajib di isi',
            'password.required' => 'Password wajib di isi',
        ];

        $validator = Validator::make(request(['username', 'password']), $rules, $messages );


        if ( $validator->fails() ) {
            return response()->json(['messages' => $validator->messages()], 421);   
        }


        if (! Auth::attempt(['username' => request('username'), 'password' => request('password')]) ) {
            return response()->json(['messages' => 'Username atau password salah'], 421);
        }


        return $this->respondWithToken(auth()->user()->id, request('username'));

    }

    public function respondWithToken ($id, $username) {
        $user = User::where('id', $id)->first();
        
        return response()->json([
            'token' => $user->createToken($username)->plainTextToken,
            'token_type' => 'Bearer',
        ]); 
    }

    public function logout () {
        $user = User::where('id', auth()->user()->id)->first();
        
        if (LogActivity::where("user_id", auth()->user()->id)->count() > 0) {
            $log = LogActivity::where("user_id", auth()->user()->id)->first();

            LogActivity::where('user_id', auth()->user()->id)->update([
                'count' => $log->count + 1
            ]);
        } else {
            LogActivity::create([
                'user_id' => auth()->user()->id,
                'count' => 1,
                'name' => auth()->user()->username
            ]);
        }



        Room::where("user_id", auth()->user()->id)->delete();
        $user->tokens()->delete();
        return response()->json(['messages' => 'Berhasil melakukan logout']);        
    }

    public function logActivity () {
        return response()->json(['data' => LogActivity::selectRaw("name, count")->where('name', '!=', 'admin')->get()]);
    } 

    public function delete($id) {
        User::where('id', $id)->delete();
        Histori::where("user_id", $id)->delete();
        Room::where("user_id", $id)->delete();
        LogActivity::where("user_id", $id)->delete();
        return response()->json(['messages' => 'Data berhasil di hapus']);
    }

    public function all () {
        return response()->json(['data' => User::selectRaw('username, id')->where('username', '!=' ,'admin')->latest()->get()]);
    }

    public function me () {
        return response()->json(['data' => User::where('id', auth()->user()->id)->get()]);
    }


}
