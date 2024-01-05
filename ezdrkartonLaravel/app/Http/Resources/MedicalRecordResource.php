<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MedicalRecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'record_date' => $this->record_date,
            'diagnosis' => $this->diagnosis,
            'treatment' => $this->treatment,
            'doctor' => $this->doctor,
            'patient' => $this->patient,
        ];
    }
}
