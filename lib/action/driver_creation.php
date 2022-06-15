<?php
include "../assets/php/function.php";
include "../assets/php/var.php";

 // insert which DB to connect to

 $dbtable="driver";

// create an array of all the POST variables you want to use
 $fields = array('driver_name','driver_surname','days_activity','monthly_service_time',
    'monthly_driving_time','monthly_worked_days','monthly_paycheck',
    'annual_primes','tax_rate','annual_indemnities','nb_months_paid');

 if(isset($_POST['driver_name']) && isset($_POST['driver_surname']))
 {
 
    $my_Db_Connection= db_connect($servername,$db_to_use,$db_username,$db_password);
        
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
        $query_check= $my_Db_Connection->prepare("SELECT driver_name
            from driver
            where
            driver_name = :driver_name AND driver_surname= :driver_surname ");
        $query_check ->bindParam(":driver_name", $_POST["driver_name"]);
        $query_check ->bindParam(":driver_surname", $_POST["driver_surname"]);

        $query_check->execute();
        $answers = $query_check->fetchall();
        $count_value="0";

        if(!(empty($answers)))
        {
            $count_value="aa 19";
            //this year already exist
            header('Location: ../pages/database/driver_creation.html?=erreur1');
            die;
        }

    }
    catch (PDOException $ex)
    {
        die("Failed to run query: " . $ex->getMessage());
    }

    $stm_insert->execute();

    header('Location: ../pages/database/driver_mgt.html?=success');

 }
 else
 {
    header('Location: ../pages/database/driver_creation.html?=erreur2');

 }