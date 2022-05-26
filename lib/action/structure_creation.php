<?php
include "../assets/php/function.php";
include "../assets/php/var.php";

 // insert which DB to connect to
 $db_to_use = "user"; 
 $dbtable="structure";

// create an array of all the POST variables you want to use
 $fields = array('year_structure_cost','percentage_activity','percentage_maintenance','actualisation_coefficient','consum_mainten_purch','consum_furniture_purch','consu_admin_furniture_purch',
    'not_stockable_purch','other_consum_purch','other_supplier_not_transport','credit_loan','financial_rent','building_rent','other_rent','building_mainten',
    'transport_mat_mainten','tool_shop_mainten','other_mainten','building_insurance','tooling_insurance','other_insurance','res_and_dev','interim_staff',
    'commission_revenue','public_relation','merch_transport','mission_exp_note','communication_exp','shipping_exp','bank_exp','other_toll_exp','misc_exp',
    'cet_exp','taxes_exp','mecanic_paycheck_exp','other_prod_paycheck_exp','dir_paycheck_exp','admin_paycheck_exp','other_paycheck_exp','loan_loss','finance_exp',
    'excep_charges','roi_building','roi_tool_shop','roi_office_furniture','roi_dir_vehicule','roi_other',
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