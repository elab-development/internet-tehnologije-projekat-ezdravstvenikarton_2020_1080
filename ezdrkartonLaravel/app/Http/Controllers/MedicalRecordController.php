<?php

namespace App\Http\Controllers;

use App\Http\Resources\MedicalRecordResource;
use App\Models\MedicalRecord;
use Illuminate\Http\Request;

class MedicalRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MedicalRecordResource::collection(MedicalRecord::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'record_date' => 'required|date',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
        ]);
        $medicalRecord = MedicalRecord::create($data);
        return response()->json(new MedicalRecordResource($medicalRecord), 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MedicalRecord  $medicalRecord
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new MedicalRecordResource( MedicalRecord::find($id));
     }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\MedicalRecord  $medicalRecord
     * @return \Illuminate\Http\Response
     */
    public function edit(MedicalRecord $medicalRecord)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\MedicalRecord  $medicalRecord
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $medicalRecord=MedicalRecord::findOrFail($id);

        $data = $request->validate([
            'patient_id' => 'required|exists:users,id',
            'doctor_id' => 'required|exists:users,id',
            'record_date' => 'required|date',
            'diagnosis' => 'required|string',
            'treatment' => 'required|string',
        ]);
        $medicalRecord->update($data);
        return response()->json(new MedicalRecordResource($medicalRecord), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MedicalRecord  $medicalRecord
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $medicalRecord=MedicalRecord::findOrFail($id);

        $medicalRecord->delete();
        return response()->json(['message'=>'OBRISANO', 'mr'=>new MedicalRecordResource($medicalRecord)], 200);
    }
}