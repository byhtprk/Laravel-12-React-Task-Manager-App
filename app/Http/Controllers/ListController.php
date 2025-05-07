<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\List\ListStoreRequest;
use App\Http\Requests\Admin\List\ListUpdateRequest;
use App\Models\Liste;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lists = Liste::where('user_id', Auth::user()->id)->with('tasks')->get();

        return Inertia::render('lists/index',[
            'lists' => $lists,
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
    public function store(ListStoreRequest $request)
    {
        $data = $request->all();
        Liste::create([
            ...$data,
            'user_id' => Auth::user()->id
        ]);

        return redirect()->route('lists.index')->with('success', 'List created successfully');
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
    public function update(ListUpdateRequest $request, Liste $list)
    {
        $data = $request->all();

        $list->update($data);

        return redirect()->route('lists.index')->with('success', 'List updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Liste $list)
    {
        $list->delete();
        return redirect()->route('lists.index')->with('success', 'List deleted successfully');
    }
}
