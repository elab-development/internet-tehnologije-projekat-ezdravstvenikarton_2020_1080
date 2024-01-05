<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Resources\AppointmentResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/records',[MedicalRecordController::class,'index']);
Route::get('/records/{id}',[MedicalRecordController::class,'show']);
Route::post('/records',[MedicalRecordController::class,'store']);

Route::put('/records/{id}',[MedicalRecordController::class,'update']);
Route::delete('/records/{id}',[MedicalRecordController::class,'destroy']);


Route::resource('/appointments',AppointmentController::class);
Route::resource('/prescriptions',PrescriptionController::class);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
