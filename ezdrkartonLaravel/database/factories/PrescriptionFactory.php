<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prescription>
 */
class PrescriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $doctorUsers = User::where('role', 'doctor')->get()->pluck('id')->toArray();
        $patientUsers = User::where('role', 'patient')->get()->pluck('id')->toArray();
    
        return [
            'patient_id' => $this->faker->randomElement($patientUsers),
            'doctor_id' => $this->faker->randomElement($doctorUsers),
            'medication' => $this->faker->word,
            'dosage' => $this->faker->word,
            'instructions' => $this->faker->text,
            'issue_date' => $this->faker->date,
        ];
    }
}
