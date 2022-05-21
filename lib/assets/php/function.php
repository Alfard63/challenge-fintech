<?php

// function for connection to Database
function db_connect($servername,$database1,$username,$password,)
{
    $sql = "mysql:host=$servername;dbname=$database1;";
    
    $dsn_Options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
    try { 
        $my_Db_Connection = new PDO($sql, $username, $password, $dsn_Options);
       // echo "Connected successfully <br>";
    } catch (PDOException $error) {
       // echo 'Connection error: ' . $error->getMessage();
        die('could not connect to database');
    }

    return $my_Db_Connection;
}

// function for placeholders creation for query prepare
function placeholders($text, $count=0, $separator=",")
{
    $result = array();
    if($count > 0){
        for($x=0; $x<$count; $x++){
            $result[] = $text ;
        }
    }

    return implode($separator, $result);
}


function query_insert(string $table, array $datafields)
{

    $question_marks[] = '('  . placeholders('?', sizeof($datafields)) . ')';

    $query = "INSERT INTO $table (" . implode(",", $datafields ) . ") VALUES " .
    implode(',', $question_marks);

    return $query;
}

function query_select_where(string $table, array $datafields)
{

    $question_marks[] = placeholders('?', sizeof($datafields));

    $query = "SELECT " . implode(",", $datafields ) . " FROM $table WHERE " .
    implode(',', $question_marks);

    return $query;
}

