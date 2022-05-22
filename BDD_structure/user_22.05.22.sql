-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 22 mai 2022 à 19:11
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `user`
--

-- --------------------------------------------------------

--
-- Structure de la table `access`
--

CREATE TABLE `access` (
  `access_id` int(11) NOT NULL,
  `service` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dashboard` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost_estimation` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cost_database` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `access`
--

INSERT INTO `access` (`access_id`, `service`, `dashboard`, `cost_estimation`, `cost_database`) VALUES
(1, 'it', 'read', 'read', 'read'),
(2, 'direction', 'read', 'read', 'read'),
(3, 'hr', 'read', 'read', 'read'),
(4, 'commercial', 'read', 'read', 'write'),
(5, 'finance', 'write', 'write', 'read'),
(6, 'purchasing', 'read', 'write', 'read');

-- --------------------------------------------------------

--
-- Structure de la table `customer`
--

CREATE TABLE `customer` (
  `cust_id` int(11) NOT NULL,
  `customer_name` tinytext NOT NULL,
  `customer_address` text NOT NULL,
  `customer_phone_num` tinytext NOT NULL,
  `customer_email` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `driver`
--

CREATE TABLE `driver` (
  `driver_id` int(11) NOT NULL,
  `driver_name` text NOT NULL,
  `driver_surname` text NOT NULL,
  `licence_type` text NOT NULL,
  `licence_date` text NOT NULL,
  `vehicule` text NOT NULL,
  `days_activity` int(11) NOT NULL,
  `monthly_service_time` int(11) NOT NULL,
  `monthly_driving_time` int(11) NOT NULL,
  `monthly_worked_days` tinyint(4) NOT NULL,
  `monthly_paycheck` int(11) NOT NULL,
  `annual_primes` int(11) NOT NULL,
  `tax_rate` tinyint(4) NOT NULL,
  `annual_indemnities` int(11) NOT NULL,
  `nb_months_paid` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `driver`
--

INSERT INTO `driver` (`driver_id`, `driver_name`, `driver_surname`, `licence_type`, `licence_date`, `vehicule`, `days_activity`, `monthly_service_time`, `monthly_driving_time`, `monthly_worked_days`, `monthly_paycheck`, `annual_primes`, `tax_rate`, `annual_indemnities`, `nb_months_paid`) VALUES
(51, 'Thomas', 'Moore', 'C', '2022-05-11', 'BB-230-CZ', 10, 10, 20, 0, 1500, 2000, 60, 700, 10),
(52, 'ss', 'Moored', 'C1-E', '2022-05-02', 'JL-908-MD', 0, 1, 2, 0, 4, 5, 6, 7, 10);

-- --------------------------------------------------------

--
-- Structure de la table `ope`
--

CREATE TABLE `ope` (
  `ope_id` int(11) NOT NULL,
  `ope_name` text NOT NULL,
  `date_of_creation` date NOT NULL DEFAULT current_timestamp(),
  `customer_name` text NOT NULL,
  `vehicule_plate` text NOT NULL,
  `starting_transport_address` text NOT NULL,
  `loading_transport_address` text NOT NULL,
  `delivery_transport_address` text NOT NULL,
  `delivery_timeload_unit` text NOT NULL,
  `load_value` int(11) NOT NULL,
  `daily_working_time` int(11) NOT NULL,
  `alt_km_cost` int(11) NOT NULL,
  `alt_hourly_rate_driver` int(11) NOT NULL,
  `alt_daily_rate` int(11) NOT NULL,
  `alt_other_addit_cost` int(11) NOT NULL,
  `other_rent` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `structure`
--

CREATE TABLE `structure` (
  `year_structure_cost` year(4) NOT NULL,
  `date_of_creation` date NOT NULL DEFAULT current_timestamp(),
  `date_of_modification` date DEFAULT NULL,
  `percentage_activity` tinyint(4) NOT NULL,
  `percentage_maintenance` tinyint(4) NOT NULL,
  `actualisation_coefficient` tinyint(4) NOT NULL,
  `consum_mainten_purch` tinyint(4) NOT NULL,
  `consum_furniture_purch` int(11) NOT NULL,
  `consum_admin_furniture_purch` int(11) NOT NULL,
  `not_stockable_purch` int(11) NOT NULL,
  `other_consum_purch` int(11) NOT NULL,
  `other_supplier_not_transport` int(11) NOT NULL,
  `credit_loan` int(11) NOT NULL,
  `financial_rent` int(11) NOT NULL,
  `building_rent` int(11) NOT NULL,
  `other_rent` int(11) NOT NULL,
  `building_mainten` int(11) NOT NULL,
  `transport_mat_mainten` int(11) NOT NULL,
  `tool_shop_mainten` int(11) NOT NULL,
  `other_mainten` int(11) NOT NULL,
  `building_insurance` int(11) NOT NULL,
  `tooling_insurance` int(11) NOT NULL,
  `other_insurance` int(11) NOT NULL,
  `res_and_dev` int(11) NOT NULL,
  `interim_staff` int(11) NOT NULL,
  `commission_revenue` int(11) NOT NULL,
  `public_relation` int(11) NOT NULL,
  `merch_transport` int(11) NOT NULL,
  `mission_exp_note` int(11) NOT NULL,
  `communication_exp` int(11) NOT NULL,
  `shipping_exp` int(11) NOT NULL,
  `bank_exp` int(11) NOT NULL,
  `other_toll_exp` int(11) NOT NULL,
  `misc_exp` int(11) NOT NULL,
  `cet_exp` int(11) NOT NULL,
  `taxes_exp` int(11) NOT NULL,
  `mecanic_paycheck_exp` int(11) NOT NULL,
  `other_prod_paycheck_exp` int(11) NOT NULL,
  `dir_paycheck_exp` int(11) NOT NULL,
  `admin_paycheck_exp` int(11) NOT NULL,
  `other_paycheck_exp` int(11) NOT NULL,
  `loan_loss` int(11) NOT NULL,
  `finance_exp` int(11) NOT NULL,
  `excep_charges` int(11) NOT NULL,
  `roi_building` int(11) NOT NULL,
  `roi_tool_shop` int(11) NOT NULL,
  `roi_office_furniture` int(11) NOT NULL,
  `roi_dir_vehicule` int(11) NOT NULL,
  `roi_other` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE `test` (
  `user_id` int(11) NOT NULL,
  `username` text NOT NULL,
  `surname` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_employee` int(11) NOT NULL,
  `username` text NOT NULL,
  `surname` text NOT NULL,
  `service` text NOT NULL,
  `position` text NOT NULL,
  `password` text NOT NULL,
  `password_confirm` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_employee`, `username`, `surname`, `service`, `position`, `password`, `password_confirm`, `email`) VALUES
(1, 'john', 'doe', 'it', 'admin', 'qwertz', '', 'john.doe@entreprise.com'),
(2, 'jane', 'doe', 'finance', 'controleur de gestion', 'qwertz', '', 'jane.doe@entreprise.com');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `access`
--
ALTER TABLE `access`
  ADD PRIMARY KEY (`access_id`),
  ADD UNIQUE KEY `service` (`service`) USING HASH;

--
-- Index pour la table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cust_id`),
  ADD UNIQUE KEY `customer_name` (`customer_name`) USING HASH;

--
-- Index pour la table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`driver_id`);

--
-- Index pour la table `ope`
--
ALTER TABLE `ope`
  ADD PRIMARY KEY (`ope_id`);

--
-- Index pour la table `structure`
--
ALTER TABLE `structure`
  ADD PRIMARY KEY (`year_structure_cost`);

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_employee`),
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `access`
--
ALTER TABLE `access`
  MODIFY `access_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `customer`
--
ALTER TABLE `customer`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `driver`
--
ALTER TABLE `driver`
  MODIFY `driver_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `ope`
--
ALTER TABLE `ope`
  MODIFY `ope_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_employee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
