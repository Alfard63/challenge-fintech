<?php
include "../assets/php/function.php";
include "../assets/php/var.php";

 // insert which DB to connect to

 $dbtable="structure";

// create an array of all the POST variables you want to use
 
$fields = array(
	'year_structure_cost','annual_km','annual_hours','vehicule_nb','energy_cost','cold_group_cost',
	'pneumatic_cost','maintenance_purch','parts_purch','maintenance_cost','salary_cost','travel_cost','social_charges','formation_cost',
	'prof_formation_cost','learning_tax','mobile_credit','location_cost',
	'interest_cost','file_cost','insurance_cost','axle_tax','dotation_immo','equipment_location','refactured_prestation','key_man_insurance',
	'road_documentation','external_work','maintenance_furniture','equipmnent_purchase',
	'admin_furniture','purchase_consumed','maintenance_shop','maintenance_building','public_relation','communication_exp','other_cost','taxes_exp','function_car',
);

 if(isset($_POST['year_structure_cost']))
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