<?php

$input = json_decode(file_get_contents('php://input'), true);


$servername = "mysql.hostinger.com";
$db_username = "u933389189_transroad";
$db_password = "Findeveleven_11";
$primary_key_value = $input['primaryKeyValue'];
$primary_key_name = $input['primaryKeyName'];
$db_name = "u933389189_transroad_user";
$db_table = $input['table'];

try {
  $conn = new PDO("mysql:host=$servername;dbname=$db_name", $db_username, $db_password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // sql to delete a record
  $sql = "DELETE FROM $db_table WHERE $primary_key_name = $primary_key_value";

  // use exec() because no results are returned
  $conn->exec($sql);
  echo json_encode($message = "success");
} catch(PDOException $e) {
  echo json_encode($message = $sql . "<br>" . $e->getMessage());
}

$conn = null;