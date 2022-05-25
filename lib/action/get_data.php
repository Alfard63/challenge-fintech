<?php
include "../assets/php/function.php";
include "../assets/php/var.php";

 // insert which DB to connect to
  $db_to_use = "user"; 
  $dbTable= $_GET['dbTable'];

  // create an array of all the POST variables you want to use
  $db = db_connect($servername, $db_to_use, $db_username, $password);
  $sql = "SELECT * FROM $dbTable";
  $result = $db->query($sql);
  $data = array();
  while ($row = $result->fetch()) {
    $data[] = $row;
  }
  /* if dbTable is egal to "users" so delete each key 5 and key password */
  if ($dbTable == "users") {
    foreach ($data as $key => $value) {
      unset($data[$key]['password']);
    }
  }

  // create a JSON object from the array
  echo json_encode($data);


?>