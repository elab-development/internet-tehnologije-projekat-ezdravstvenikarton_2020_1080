<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
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
            'nurse' => $this->nurse,
            'appointment_date' => $this->appointment_date,
            'notes' => $this->notes,
            
        ];
    }
}
