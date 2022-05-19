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
    
        // mettre en place les variables de connection et/ou admin
    $is_connected=True;
    ($service==="it")?$is_admin=True:$is_admin=False;

        //définir à quelles roles a droit l'utilisateur
    $access_authorised =array(
        "dashboard" => $_SESSION["dashboard"],
        "cost_estimation" => $_SESSION["cost_estimation"],
        "cost_database" => $_SESSION["service"],
    );      
}


