<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResponseChat;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/Authorization', function () {
    return response()->json([
        'messages' => "Anda tidak memiliki authorisasi"
    ], 401);
})->middleware('api')->name('login');


Route::group([
    'prefix' => 'response-chat',
    'middleware' => "api",
], function ($token) {
    Route::post('/answer', [ResponseChat::class, 'answer']);
    Route::post('/all', [ResponseChat::class, 'all']);
    Route::post('/show/{id}', [ResponseChat::class, 'show']);
    Route::post('/update/{id}', [ResponseChat::class, 'update']);
    Route::post('/create', [ResponseChat::class, 'create']);
    Route::post('/delete/{id}', [ResponseChat::class, 'delete']);
    Route::get('/image/{id}', [ResponseChat::class, 'image']);
    Route::get('/video/{id}', [ResponseChat::class, 'video']);
    Route::post("/histori", [ResponseChat::class, 'histori']);
    Route::post("/createRoom", [ResponseChat::class, 'createRoom']);
    Route::post("/allRoom", [ResponseChat::class, 'allRoom']);


});




Route::group([
    'prefix' => 'auth',
    'middleware' => 'api',
], function ($token) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/delete/{id}', [AuthController::class, 'delete']);
    Route::post('/all', [AuthController::class, 'all']);
    Route::post('/log-activity', [AuthController::class, 'logActivity']);
}); 

