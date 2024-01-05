<?php
namespace App\Http\Controllers;
use App\Http\Resources\PrescriptionResource;
use App\Models\Prescription;
use Illuminate\Http\Request;

class PrescriptionController extends Controller
{
    public function index()
    {
        return PrescriptionResource::collection(Prescription::all());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'medication' => 'required|string',
            'dosage' => 'required|string',
            'instructions' => 'nullable|string',
            'issue_date' => 'required|date',
        ]);

        $prescription = Prescription::create($data);

        return response()->json(new PrescriptionResource($prescription), 201);
    }

    public function show($id)
    {
        return new PrescriptionResource(Prescription::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $prescription = Prescription::findOrFail($id);

        $data = $request->validate([
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'medication' => 'required|string',
            'dosage' => 'required|string',
            'instructions' => 'nullable|string',
            'issue_date' => 'required|date',
        ]);

        $prescription->update($data);

        return response()->json(new PrescriptionResource($prescription), 200);
    }

    public function destroy($id)
    {
        $prescription = Prescription::findOrFail($id);
        $prescription->delete();

        return response()->json(['message' => 'Recept je obrisan', 'prescription' => new PrescriptionResource($prescription)], 200);
    }








    public function pretraga(Request $request)
    {
        $query = Prescription::query();      
        if ($request->has('medication')) {
           
            $query->where('medication', 'like', '%' . $request->has('medication') . '%');
        }
    
        if ($request->has('patient_id')) {
            $query->where('patient_id', $request->input('patient_id'));
        }

        if ($request->has('doctor_id')) {
            $query->where('doctor_id', $request->input('doctor_id'));
        }
        $prescriptions = $query->get();
    
        return PrescriptionResource::collection($prescriptions);
    }
    
 





}
