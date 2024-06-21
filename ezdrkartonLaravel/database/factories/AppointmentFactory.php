<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $doctorUsers = User::where('role', 'doctor')->get()->pluck('id')->toArray();
        $nurseUsers = User::where('role', 'nurse')->get()->pluck('id')->toArray();
        $patientUsers = User::where('role', 'patient')->get()->pluck('id')->toArray();
    
        return [
            'patient_id' => $this->faker->randomElement($patientUsers),
            'doctor_id' => $this->faker->randomElement($doctorUsers),
            'nurse_id' => $this->faker->randomElement($nurseUsers),
            'appointment_date' => $this->faker->dateTimeBetween('now', '+3 days'),
            'notes' => $this->faker->text,
        ];
    }
}
