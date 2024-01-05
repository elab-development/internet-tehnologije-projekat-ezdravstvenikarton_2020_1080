<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    

    public function getAllDoctors()
    {
        $doctors = User::where('role', 'doctor')->get();
        return response()->json($doctors);
    }
    public function getAllNurses()
    {
        $nurses = User::where('role', 'nurse')->get();
        return response()->json($nurses);
    }
}
