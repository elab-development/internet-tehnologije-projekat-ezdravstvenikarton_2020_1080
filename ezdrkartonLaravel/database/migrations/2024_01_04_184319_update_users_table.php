<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTable extends Migration
{
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->nullable();  
            $table->string('jmbg')->nullable();  
            $table->date('date_of_birth')->nullable();  
            $table->text('other')->nullable(); 
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
            $table->dropColumn('jmbg');
            $table->dropColumn('date_of_birth');
            $table->dropColumn('other');
        });
    }
}
