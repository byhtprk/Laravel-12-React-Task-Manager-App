<?php

namespace App\Http\Controllers;

use App\Models\Liste;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $lists  = Liste::where('user_id', $user->id)->get();
        $tasks = Task::whereHas('list', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })->get();

        $stats = [
            'totalLists' => $lists->count(),
            'totalTasks' => $tasks->count(),
            'completedTasks' => $tasks->where('is_completed', true)->count(),
            'pendingTasks' => $tasks->where('is_completed', false)->count(),

        ];

        return Inertia::render('dashboard',[
            'tasks' => $tasks,
            'list' => $lists,
            'stats' => $stats,
            'flash' =>[
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
