<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'patient_id', 'doctor_id', 'nurse_id', 'appointment_date', 'notes',  
    ];
    public function doctor(){
        return $this->belongsTo(User::class);
    }
    public function patient(){
        return $this->belongsTo(User::class);
    }
    public function nurse(){
        return $this->belongsTo(User::class);
    }
}
