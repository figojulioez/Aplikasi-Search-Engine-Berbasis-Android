<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionChat extends Model
{
    use HasFactory;

    protected $table = 'question_chats';

    protected $guarded = [];
}
