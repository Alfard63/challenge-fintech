<?php
include "../assets/php/function.php";
include "../assets/php/var.php";

 // insert which DB to connect to
 $db_to_use = "user"; 
 $dbtable="ope";

// create an array of all the POST variables you want to use
 $fields = array('ope_name','customer_name','vehicule_plate',
    'starting_transport_address','loading_transport_address','delivery_transport_address',
    'delivery_timeload_unit','load_value','daily_working_time','alt_km_cost','alt_hourly_rate_driver',
    'alt_daily_rate','alt_other_addit_cost','other_rent');

 if(isset($_POST['ope_name']))
 {
 
    $my_Db_Connection= db_connect($servername,$db_to_use,$db_username,$password);
        
    // prepare SQL statement and bind values    
    $stm_insert = $my_Db_Connection->prepare(query_insert($dbtable,$fields)) ;

    $count=1;
    foreach($fields as $field){
        if (!isset($_POST[$field])){
            $$field=0;
        }
        else{
            $$field=$_POST[$field];            
        }
        $stm_insert ->bindParam($count, $$field);
        $count++;
    }

     // verification of value not in DB to allow the writing
    try
    {
        $query_check= $my_Db_Connection->prepare("SELECT ope_name
            from ope
            where
            ope_name = :ope_name");
        $query_check ->bindParam(":ope_name", $_POST["ope_name"]);

        $query_check->execute();
        $answers = $query_check->fetch();

        if($answers) 
        {
            //this year already exist
            header('Location: ../pages/chiffrage/offer_creation.html?=erreur1');
        }

    }
    catch (PDOException $ex)
    {
        die("Failed to run query: " . $ex->getMessage());
    }

    $stm_insert->execute();
    
    header('Location: ../pages/chiffrage/offer_mgt.html?=success');

 }
 else
 {
    header('Location: ../pages/chiffrage/offer_creation.html?=erreur2');

 }