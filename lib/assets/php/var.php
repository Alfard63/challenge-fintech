<?php
(session_status() === PHP_SESSION_NONE)?session_start():""; //check if session active otherwise activate it

// set up for DB connection

$servername = "localhost";
$db_username = "root";
$password = "";

// get $_session variables
if(isset($_SESSION["username"]))
{
    $username = $_SESSION["username"];
    $surname = $_SESSION["surname"];
    $service = $_SESSION["service"];
    
    $is_connected=True;
    ($service==="it")?$is_admin=True:$is_admin=False;
}


