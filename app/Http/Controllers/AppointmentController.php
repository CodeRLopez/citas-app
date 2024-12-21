<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    public function index()
    {

        $user = Auth::user();
        $appointments = Appointment::where('user_id', $user->id)
        ->where('status', 'true')
        ->get();
        return response()->json($appointments);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'start' => 'required|date|after:now',
            'end' => 'required|date|after:start',
            'title' => 'required|string',
        ]);

        $exists = Appointment::where('start', '<', $validated['end'])
            ->where('end', '>', $validated['start'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'This time is already used']);
        }

        $appointment = Appointment::create([
            'user_id' => auth()->id,
            'date' => $validated['date'],
            'time' => $validated['time'],
        ]);

        return response()->json($appointment, 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:true,false',
        ]);

        $appointment = Appointment::find($id);

        if (!$appointment) {
            return redirect('/dashboard');
        };

        $appointment->update(['status' => $validated['status']]);
    }
}
