<?php
session_start();
include "../assets/php/function.php";
include "../assets/php/var.php";
/*
$datafields = array('fielda', 'fieldb');

// var_dump(sizeof($datafields));
// $pdo->beginTransaction(); // also helps speed up your inserts.


*/
// create an array of all the GET/POST variables you want to use
$fields = array('username','surname');

// convert each REQUEST variable (GET, POST or COOKIE) to a local variable
foreach($fields as $field){

    if (!isset($_POST[$field])){
        $$field=0;
    }
    else{
        $$field=$_POST[$field];            
    }
   // $$field = $_POST[$field];
    echo $field .": ".$$field ."<br>";
}




/*
// insert which DB to connect to
 $db_to_use = "user";
 $dbtable="test";

 if(isset($_POST['username']) && isset($_POST['surname']))
 {
    try
    {
        $my_Db_Connection= db_connect($servername,$db_to_use,$db_username,$password);
            
        // create an array of all the POST variables you want to use
        $fields = array('username','surname');

        // prepare SQL statement     
        $stm_insert = $my_Db_Connection->prepare(query_insert($dbtable,$fields)) ;

        // bind parameters for each REQUEST variable (POST)
        $count=1;
        foreach($fields as $field){
            $stm_insert ->bindParam($count, $_POST[$field]);
            $count++;
        }

        $stm_insert->execute();

        echo "New records created successfully";
    } 
    catch(PDOException $e) 
    {
        echo "Error: " . $e->getMessage();
    }
 }
 else
 {
    // header('Location: ../page/administration/user_creation.html');
    echo "erreur";
 }
 

 /*
$datafields = array('email');
$table="users";
$values=array("email");

echo query_select_where($table, $datafields,$values)."<br>";
*/