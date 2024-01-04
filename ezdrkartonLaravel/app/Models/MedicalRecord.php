<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    use HasFactory;
    protected $fillable = [
        'patient_id', 'doctor_id', 'record_date', 'diagnosis', 'treatment',
    ];
    public function doctor(){
        return $this->belongsTo(User::class);
    }
    public function patient(){
        return $this->belongsTo(User::class);
    } 


}
