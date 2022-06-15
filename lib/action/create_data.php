<?php

$input = json_decode(file_get_contents('php://input'), true);


$servername = "mysql.hostinger.com";
$db_username = "u933389189_transroad";
$db_password = "Findeveleven_11";
$db_name = "u933389189_transroad_user";
$db_table = $input['dbTable'];
$data = $input['dbData'];

function db_connect($servername, $database1, $username, $password)
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

//insert data to a new row in the DB
function query_insert($dbtable, $fields)
{
  $query = "INSERT INTO $dbtable (";
  $count = 1;
  foreach ($fields as $field) {
    $query .= $field;
    if ($count < count($fields)) {
      $query .= ", ";
    }
    $count++;
  }
  $query .= ") VALUES (";
  $count = 1;
  foreach ($fields as $field) {
    $query .= ":" . $field;
    if ($count < count($fields)) {
      $query .= ", ";
    }
    $count++;
  }
  $query .= ")";
  return $query;
}

try {
  $conn = db_connect($servername, $db_name, $db_username, $db_password);
  // set the PDO error mode to exception
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $query = query_insert($db_table, array_keys($data));
  $stmt = $conn->prepare($query);
  $stmt->execute($data);
  echo json_encode($message = 'success');
} catch (PDOException $e) {
  echo json_encode($message = $sql . "<br>" . $e->getMessage());
}
