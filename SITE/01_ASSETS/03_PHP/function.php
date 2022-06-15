<?php

// function for connection to Database
function db_connect($database1,$username,$password)
{
    $sql = "mysql:host=$servername;dbname=$database1;";
    $dsn_Options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
    try { 
        $my_Db_Connection = new PDO($sql, $username, $password, $dsn_Options);
        echo "Connected successfully <br>";
    } catch (PDOException $error) {
        echo 'Connection error: ' . $error->getMessage();
        die('could not connect to database');
    }

    return $my_Db_Connection;
}