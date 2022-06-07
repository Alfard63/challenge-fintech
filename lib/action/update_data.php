<?php

$input = json_decode(file_get_contents('php://input'), true);


$servername = "mysql.hostinger.com";
$db_username = "u933389189_transroad";
$db_password = "Findeveleven_11";
$primary_key = $input['dbPrimaryKeyValue'];
$primary_key_name = $input['dbPrimaryKeyName'];
$db_name = "u933389189_transroad_user";
$db_table = $input['dbTable'];
$data = $input['dbData'];

//execute the quety to update the data in the database
try {
  $conn = new PDO("mysql:host=$servername;dbname=$db_name", $db_username, $db_password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//for each data in the array, execute the query to update the data in the database
  foreach ($data as $key => $value) {
    $sql = "UPDATE $db_table SET $key = '$value' WHERE $primary_key_name = $primary_key";
    // use exec() because no results are returned
    $conn->exec($sql);
  }

  echo json_encode($message = 'success');
} catch(PDOException $e) {
  echo json_encode($message = $sql . "<br>" . $e->getMessage());
}

$conn = null;