<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PrescriptionResource extends JsonResource
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
            'patient' => $this->patient,
            'doctor' => $this->doctor,
            'medication' => $this->medication,
            'dosage' => $this->dosage,
            'instructions' => $this->instructions,
            'issue_date' => $this->issue_date,
        ];
    }
}
