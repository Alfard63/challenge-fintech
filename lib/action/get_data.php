<?php

 // insert which DB to connect to
  $db_name="u933389189_transroad_user";
  $servername = "mysql.hostinger.com";
  $db_username = "u933389189_transroad";
  $db_password = "Findeveleven_11";
  $db_to_use = "u933389189_transroad_user"; 
  $dbTable= $_GET['dbTable'];

  function db_connect($servername,$database1,$username,$password)
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

  if ($dbTable == "offers") {
    //get data from json file
    $json = file_get_contents('../json/offers.json');
    $data = json_decode($json, true);
  } else {
    // create an array of all the POST variables you want to use
    $db = db_connect($servername, $db_to_use, $db_username, $db_password);
    $sql = "SELECT * FROM $dbTable";
    $result = $db->query($sql);
    $data = array();
    while ($row = $result->fetch()) {
      $data[] = $row;
    }
    /* if dbTable is egal to "users" so delete each key 5 and key password */
    if ($dbTable == "users") {
      foreach ($data as $key => $value) {
        unset($data[$key]['db_password']);
      }
    }
  }
  // create a JSON object from the array
  echo json_encode($data);
?>