<?php
/*
// creation of table CC6- structure in MySQL
CREATE TABLE test.users ( 
    id INT UNSIGNED NOT NULL AUTO_INCREMENT , 
    forename VARCHAR(50) NOT NULL , 
    surname VARCHAR(50) NOT NULL , 
    email VARCHAR(50) NOT NULL , 
    password VARCHAR(50) NOT NULL , 
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
    updated_at TIMESTAMP NULL DEFAULT NULL , 
    PRIMARY KEY (id), 
    UNIQUE (email)) 
    ENGINE = InnoDB;

// modify table
ALTER TABLE structure
ADD COLUMN percentage_activity TINYINT NOT NULL;

ADD percentage_maintenance TINYINT NOT NULL;
ADD actualisation_coefficient TINYINT NOT NULL;
ADD consum_mainten_purch INT NOT NULL;
ADD consum_furniture_purch INT NOT NULL;

ADD consu_admin_furniture_purch INT NOT NULL;
ADD not_stockable_purch INT NOT NULL;
ADD other_consum_purch INT NOT NULL;
ADD other_supplier_not_transport INT NOT NULL;
ADD credit_loan INT NOT NULL;
ADD financial_rent INT NOT NULL;
ADD building_rent INT NOT NULL;
ADD other_rent INT NOT NULL;
ADD building_mainten INT NOT NULL;
ADD transport_mat_mainten INT NOT NULL;
ADD tool_shop_mainten INT NOT NULL;
ADD other_mainten INT NOT NULL;
ADD building_insurance INT NOT NULL;
ADD tooling_insurance INT NOT NULL;
ADD other_insurance INT NOT NULL;
ADD res_and_dev INT NOT NULL;
ADD interim_staff INT NOT NULL;
ADD commissions_revenue INT NOT NULL;
ADD public_relation INT NOT NULL;
ADD merch_transport INT NOT NULL;
ADD mission_exp_note INT NOT NULL;
ADD communication_exp INT NOT NULL;
ADD sending_exp INT NOT NULL;
ADD bank_exp INT NOT NULL;
ADD other_toll_exp INT NOT NULL;
ADD misc_exp INT NOT NULL;
ADD cet_exp INT NOT NULL;
ADD taxes_exp INT NOT NULL;
ADD mecanic_paycheck_exp INT NOT NULL;
ADD other_prod_paycheck_exp INT NOT NULL;
ADD dir_paycheck_exp INT NOT NULL;
ADD admin_paycheck_exp INT NOT NULL;
ADD other_paycheck_exp INT NOT NULL;
ADD loan_loss INT NOT NULL;
ADD finance_exp INT NOT NULL;
ADD excep_charges INT NOT NULL;
ADD roi_building INT NOT NULL;
ADD roi_tool_shop INT NOT NULL;
ADD roi_office_furniture INT NOT NULL;
ADD roi_dir_vehicules INT NOT NULL;
ADD roi_other INT NOT NULL;
*/

// OPE
/*
ALTER TABLE ope
ADD ope_id INT NOT NULL;
ADD ope_name TEXT NOT NULL;
ADD date_of_creation DATE NOT NULL;
ADD customer_name TEXT NOT NULL;
ADD vehicule_plate TEXT NOT NULL;
ADD starting_transport_address TEXT NOT NULL;
ADD loading_transport_address TEXT NOT NULL;
ADD delivery_transport_address TEXT NOT NULL;
ADD delivery_timeload_unit TEXT NOT NULL;
ADD load_value INT NOT NULL;
ADD daily_working_time INT NOT NULL;
ADD alt_km_cost INT NOT NULL;
ADD alt_hourly_rate_driver INT NOT NULL;
ADD alt_daily_rate INT NOT NULL;
ADD alt_other_addit_cost INT NOT NULL;
ADD other_rent INT NOT NULL;
*/

// Driver
/*
ALTER TABLE driver
ADD driver_id INT NOT NULL;
ADD driver_name TEXT NOT NULL;
ADD driver_surname TEXT NOT NULL;
ADD days_activity INT NOT NULL;
ADD monthly_service_time INT NOT NULL;
ADD monthly_driving_time INT NOT NULL;
ADD monthly_worked_days TINYINT NOT NULL;
ADD monthly_paycheck INT NOT NULL;
ADD annual_primes INT NOT NULL;
ADD tax_rate TINYINT NOT NULL;
ADD annual_indemnities INT NOT NULL;
ADD nb_months_paid TINYINT NOT NULL;

*/