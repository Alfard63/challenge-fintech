<?php
include "../assets/php/function.php";
include "../assets/php/var.php";

 // insert which DB to connect to
 $db_to_use = "vehicule"; 
 $dbtable6="tires";
 $dbtable7="energy";

// create an array of all the POST variables you want to use
 

$fields_db6 = array(
    'tires_brand','supplier','brand','lifetime','unit_cost',
);

$fields_db7 = array(
    'energy_type','cost_road','cost_cistern','cost_other_type',
);

 if(isset($_POST['year_structure_cost']))
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
        $query_check= $my_Db_Connection->prepare("SELECT year_structure_cost
            from structure
            where
            year_structure_cost = :year_structure_cost");
        $query_check ->bindParam(":year_structure_cost", $_POST["year_structure_cost"]);

        $query_check->execute();
        $answers = $query_check->fetch();

        if($answers) 
        {
            //this year already exist
            header('Location: ../pages/database/structure_creation.html?=erreur1');
        }

    }
    catch (PDOException $ex)
    {
        die("Failed to run query: " . $ex->getMessage());
    }

    $stm_insert->execute();
    
    header('Location: ../pages/database/structure_mgt.html?=success');

 }
 else
 {
    header('Location: ../pages/database/user_creation.html?=erreur2');

 }