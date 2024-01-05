<?php

namespace App\Http\Controllers;

use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function index()
    {
        return AppointmentResource::collection(Appointment::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'nurse_id' => 'required|exists:users,id',
            'appointment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $appointment = Appointment::create($data);

        return response()->json(new AppointmentResource($appointment), 201);
    }

    public function show($id)
    {
        return new AppointmentResource(Appointment::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $appointment = Appointment::findOrFail($id);

        $data = $request->validate([
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'nurse_id' => 'required|exists:users,id',
            'appointment_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $appointment->update($data);

        return response()->json(new AppointmentResource($appointment), 200);
    }

    public function destroy($id)
    {
        $appointment = Appointment::findOrFail($id);
        $appointment->delete();

        return response()->json(['message' => 'Termin je obrisan', 'appointment' => new AppointmentResource($appointment)], 200);
    }




    public function pretraga(Request $request)
    {
        $query = Appointment::query();

         
        if ($request->has('appointment_date')) {
            $query->whereDate('appointment_date', $request->input('appointment_date'));
        }
 
        if ($request->has('notes')) {
            $query->where('notes', 'like', '%' . $request->input('notes') . '%');
        }
        if ($request->has('patient_id')) {
            $query->where('patient_id', $request->input('patient_id'));
        }

        if ($request->has('doctor_id')) {
            $query->where('doctor_id', $request->input('doctor_id'));
        }

        if ($request->has('nurse_id')) {
            $query->where('nurse_id', $request->input('nurse_id'));
        }
        $records = $query->get();

        return AppointmentResource::collection($records);
    }

}
