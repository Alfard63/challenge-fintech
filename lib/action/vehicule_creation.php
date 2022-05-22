<?php
include "../assets/php/function.php";
include "../assets/php/var.php";


 // insert which DB to connect to
 $db_to_use = "vehicule"; 
 
 $dbtable1="vehicule";
 $dbtable2="towed_vehicule";
 $dbtable3="vehicule_payment"; 
 $dbtable4="vehicule_ind_cost";
 $dbtable5="other_cost";


// create an array of all the POST variables you want to use
 $fields_db1 = array(
    'vehicule_plate','vehicule_brand','vehicule_model','average_km','average_km_loaded','nb_towed_vehicule',
    'towed_vehicule_plate','days_used_year','load_unit','load_capacity','capacity_use_percentage','consumption','cistern_percentage_use',
    'energy_type','tires_brand','nb_tires','nb_drivers','driver_id_1','driver_id_2'
);

$fields_db2 = array(
    'towed_vehicule_plate','tires_brand','towed_nb_tires','towed_days_used_year',
    'towed_vehicule_cost','towed_loan_value','towed_loan_rate','towed_payment_term','towed_monthly_cost',
    'towed_resell_cost','towed_optional_buying_value',
);

$fields_db3 = array(
    'vehicule_plate','payment_type','towed_payment_type','vehicule_cost','loan_value','loan_rate','payment_term','monthly_cost',
    'resell_cost','optional_buying_value'
);

$fields_db4 = array(
    'vehicule_plate','annual_maintenance_cost','annual_toll_cost','tire_total_cost',
    'axles_tax_cost','annual_vehic_insurance_cost','annual_load_insurance_cost'
);

$fields_db5 = array(
    'vehicule_plate','other_cost_name','other_cost_unit','annual_unit_value','annual_other_cost_value'
);

 if(isset($_POST['vehicule_plate']))
 {
 
    $my_Db_Connection= db_connect($servername,$db_to_use,$db_username,$password);
        
    // prepare SQL statement and bind values    
    $stm_insert_db1 = $my_Db_Connection->prepare(query_insert($dbtable1,$fields_db1)) ;
    $stm_insert_db2 = $my_Db_Connection->prepare(query_insert($dbtable2,$fields_db2)) ;
    $stm_insert_db3 = $my_Db_Connection->prepare(query_insert($dbtable3,$fields_db3)) ;
    $stm_insert_db4 = $my_Db_Connection->prepare(query_insert($dbtable4,$fields_db4)) ;
    $stm_insert_db5 = $my_Db_Connection->prepare(query_insert($dbtable5,$fields_db5)) ;

    $count=1;
    foreach($fields_db1 as $field){
        if (!isset($_POST[$field])){
            $$field=0;
        }
        else{
            $$field=$_POST[$field];            
        }
        $stm_insert_db1 ->bindParam($count, $$field);
        $count++;
    }

    $count=1;
    foreach($fields_db2 as $field){
        if (!isset($_POST[$field])){
            $$field=0;
        }
        else{
            $$field=$_POST[$field];            
        }
        $stm_insert_db2 ->bindParam($count, $$field);
        $count++;
    }

    $count=1;
    foreach($fields_db3 as $field){
        if (!isset($_POST[$field])){
            $$field=0;
        }
        else{
            $$field=$_POST[$field];            
        }
        $stm_insert_db3 ->bindParam($count, $$field);
        $count++;
    }

    $count=1;
    foreach($fields_db4 as $field){
        if (!isset($_POST[$field])){
            $$field=0;
        }
        else{
            $$field=$_POST[$field];            
        }
        $stm_insert_db4 ->bindParam($count, $$field);
        $count++;
    }

    $count=1;
    foreach($fields_db5 as $field){
        if (!isset($_POST[$field])){
            $$field=0;
        }
        else{
            $$field=$_POST[$field];            
        }
        $stm_insert_db5 ->bindParam($count, $$field);
        $count++;
    }


     // verification of value not in DB to allow the writing
    try
    {
            // verification for Vehicule table
        $query_check_vehicule= $my_Db_Connection->prepare("SELECT vehicule_plate
            from vehicule
            where
            vehicule_plate = :vehicule_plate");
        $query_check_vehicule ->bindParam(":vehicule_plate", $_POST["vehicule_plate"]);

        $query_check_vehicule->execute();
        $answers = $query_check_vehicule->fetch();

            // verification for towed_vehicule table
        $query_check_towed_vehicule= $my_Db_Connection->prepare("SELECT towed_vehicule_plate
        from vehicule
        where
        towed_vehicule_plate = :towed_vehicule_plate");
        $query_check_towed_vehicule ->bindParam(":towed_vehicule_plate", $_POST["towed_vehicule_plate"]);

        $query_check_towed_vehicule->execute();
        $answers2 = $query_check_towed_vehicule->fetch();


        if($answers) 
        {
            //this year already exist
            header('Location: ../pages/database/vehicule_creation.html?=erreur2');
            die;
        }

        if($answer2) 
        {
            //this year already exist
            header('Location: ../pages/database/vehicule_creation.html?=erreur3');
            die;
        }
    }
    catch (PDOException $ex)
    {
        die("Failed to run query: " . $ex->getMessage());
    }



    try
    {

        // $stm_insert_db1->execute();
         $stm_insert_db2->execute();
        // $stm_insert_db3->execute();
        // $stm_insert_db4->execute();
        // $stm_insert_db5->execute();
    }
    catch (PDOException $ex2)
    {
        die("Failed to run query: " . $ex2->getMessage());
    }

    header('Location: ../pages/database/vehicule_mgt.html?=success');

 }
 else
 {
    header('Location: ../pages/database/vehicule_creation.html?=erreur1');

 }