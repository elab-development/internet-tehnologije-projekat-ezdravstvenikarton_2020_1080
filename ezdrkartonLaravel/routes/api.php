<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\PrescriptionController;
use App\Http\Controllers\UserController;
use App\Http\Resources\AppointmentResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StatistikaController;
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

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::get('/patients',[UserController::class,'getAllPatients']);

Route::get('/doctors',[UserController::class,'getAllDoctors']);
Route::get('/nurses',[UserController::class,'getAllNurses']);


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout',[AuthController::class,'logout']);

    Route::get('/records/pretraga',[MedicalRecordController::class,'pretraga']);
    Route::get('/appointments/pretraga',[AppointmentController::class,'pretraga']);
    Route::get('/prescriptions/pretraga',[PrescriptionController::class,'pretraga']);


    Route::get('statistics/all', [StatistikaController::class, 'getAllStatistics']);
    
    
    Route::middleware('role:doctor')->group(function () {
        Route::get('/records',[MedicalRecordController::class,'index']);
        Route::get('/records/{id}',[MedicalRecordController::class,'show']);
        Route::post('/records',[MedicalRecordController::class,'store']);
        
        Route::put('/records/{id}',[MedicalRecordController::class,'update']);
        Route::delete('/records/{id}',[MedicalRecordController::class,'destroy']);


        Route::resource('/prescriptions',PrescriptionController::class);
    });


    Route::middleware('role:patient')->group(function () {

   
         
        Route::resource('/appointments',AppointmentController::class);
       
 
    });
    
   
   
});
 







 
