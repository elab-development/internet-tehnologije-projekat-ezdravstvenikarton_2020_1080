<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\MedicalRecord;
use App\Models\Prescription;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistikaController extends Controller
{
    public function getAllStatistics()
    {
        $appointmentsByDoctor = Appointment::select('doctor_id', DB::raw('count(*) as total'))
            ->groupBy('doctor_id')
            ->with('doctor')
            ->get();

        $appointmentsByMonth = Appointment::select(DB::raw('YEAR(appointment_date) as year, MONTH(appointment_date) as month, count(*) as total'))
            ->groupBy('year', 'month')
            ->get();

        $medicalRecordsByDoctor = MedicalRecord::select('doctor_id', DB::raw('count(*) as total'))
            ->groupBy('doctor_id')
            ->with('doctor')
            ->get();

        $prescriptionsByDoctor = Prescription::select('doctor_id', DB::raw('count(*) as total'))
            ->groupBy('doctor_id')
            ->with('doctor')
            ->get();

        $appointmentsByPatient = Appointment::select('patient_id', DB::raw('count(*) as total'))
            ->groupBy('patient_id')
            ->with('patient')
            ->get();

        $prescriptionsByPatient = Prescription::select('patient_id', DB::raw('count(*) as total'))
            ->groupBy('patient_id')
            ->with('patient')
            ->get();

        $medicalRecordsByPatient = MedicalRecord::select('patient_id', DB::raw('count(*) as total'))
            ->groupBy('patient_id')
            ->with('patient')
            ->get();

        $appointmentsByNurse = Appointment::select('nurse_id', DB::raw('count(*) as total'))
            ->groupBy('nurse_id')
            ->with('nurse')
            ->get();

        $appointmentsInLastDays = Appointment::where('appointment_date', '>=', Carbon::today()->subDays(30))->count();

        return response()->json([
            'appointmentsByDoctor' => $appointmentsByDoctor,
            'appointmentsByMonth' => $appointmentsByMonth,
            'medicalRecordsByDoctor' => $medicalRecordsByDoctor,
            'prescriptionsByDoctor' => $prescriptionsByDoctor,
            'appointmentsByPatient' => $appointmentsByPatient,
            'prescriptionsByPatient' => $prescriptionsByPatient,
            'medicalRecordsByPatient' => $medicalRecordsByPatient,
            'appointmentsByNurse' => $appointmentsByNurse,
            'appointmentsInLast30Days' => $appointmentsInLastDays,
        ]);
    }
}
