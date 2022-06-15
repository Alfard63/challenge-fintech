-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 22 mai 2022 à 19:10
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
-- Base de données : `vehicule`
--

-- --------------------------------------------------------

--
-- Structure de la table `energy`
--

CREATE TABLE `energy` (
  `energy_id` int(11) NOT NULL,
  `energy_type` text NOT NULL,
  `cost_road` int(11) NOT NULL,
  `cost_cistern` int(11) NOT NULL,
  `cost_other_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `other_cost`
--

CREATE TABLE `other_cost` (
  `other_cost_id` int(11) NOT NULL,
  `vehicule_plate` int(11) NOT NULL,
  `other_cost_name` int(11) NOT NULL,
  `other_cost_unit` int(11) NOT NULL,
  `annual_unit_value` int(11) NOT NULL,
  `annual_other_cost_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `tires`
--

CREATE TABLE `tires` (
  `tires_id` int(11) NOT NULL,
  `tire_brand` text NOT NULL,
  `supplier` text NOT NULL,
  `brand` text NOT NULL,
  `lifetime` int(11) NOT NULL,
  `unit_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `towed_vehicule`
--

CREATE TABLE `towed_vehicule` (
  `towed_vehicule_id` int(11) NOT NULL,
  `towed_vehicule_plate` text NOT NULL,
  `tires_brand` int(11) NOT NULL,
  `towed_nb_tires` tinyint(4) NOT NULL,
  `towed_days_used_year` smallint(6) NOT NULL,
  `towed_vehicule_cost` int(11) NOT NULL,
  `towed_loan_value` int(11) NOT NULL,
  `towed_loan_rate` int(11) NOT NULL,
  `towed_payment_term` int(11) NOT NULL,
  `towed_monthly_cost` int(11) NOT NULL,
  `towed_resell_cost` int(11) NOT NULL,
  `towed_optional_buying_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `vehicule`
--

CREATE TABLE `vehicule` (
  `vehicule_id` tinyint(4) NOT NULL,
  `vehicule_plate` tinytext NOT NULL,
  `vehicule_model` text NOT NULL,
  `vehicule_brand` text NOT NULL,
  `average_km` int(11) NOT NULL,
  `average_km_loaded` int(11) NOT NULL,
  `nb_towed_vehicule` tinyint(4) NOT NULL,
  `towed_vehicule_plate` int(11) NOT NULL,
  `days_used_year` int(11) NOT NULL,
  `load_unit` text NOT NULL,
  `load_capacity` int(11) NOT NULL,
  `capacity_use_percentage` tinyint(4) NOT NULL,
  `consumption` int(11) NOT NULL,
  `cistern_percentage_use` tinyint(4) NOT NULL,
  `energy_type` tinytext NOT NULL,
  `tires_brand` int(11) NOT NULL,
  `nb_tires` tinyint(4) NOT NULL,
  `nb_drivers` tinyint(4) NOT NULL,
  `driver_id_1` int(11) NOT NULL,
  `driver_id_2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `vehicule_ind_cost`
--

CREATE TABLE `vehicule_ind_cost` (
  `vehicule_id` int(11) NOT NULL,
  `vehicule_plate` text NOT NULL,
  `annual_maintenance_cost` int(11) NOT NULL,
  `annual_toll_cost` int(11) NOT NULL,
  `tire_total_cost` int(11) NOT NULL,
  `axles_tax_cost` int(11) NOT NULL,
  `annual_vehic_insurance_cost` int(11) NOT NULL,
  `annual_load_insurance_cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `vehicule_payment`
--

CREATE TABLE `vehicule_payment` (
  `payment_id` int(11) NOT NULL,
  `vehicule_plate` tinytext NOT NULL,
  `payment_type` text NOT NULL,
  `towed_payment_type` int(11) NOT NULL,
  `vehicule_cost` int(11) NOT NULL,
  `loan_value` text NOT NULL,
  `loan_rate` tinyint(4) NOT NULL,
  `payment_term` tinyint(4) NOT NULL,
  `monthly_cost` int(11) NOT NULL,
  `resell_cost` int(11) NOT NULL,
  `optional_buying_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `energy`
--
ALTER TABLE `energy`
  ADD PRIMARY KEY (`energy_id`),
  ADD UNIQUE KEY `energy_type` (`energy_type`) USING HASH;

--
-- Index pour la table `other_cost`
--
ALTER TABLE `other_cost`
  ADD PRIMARY KEY (`other_cost_id`),
  ADD UNIQUE KEY `vehicule_plate` (`vehicule_plate`);

--
-- Index pour la table `tires`
--
ALTER TABLE `tires`
  ADD PRIMARY KEY (`tires_id`);

--
-- Index pour la table `towed_vehicule`
--
ALTER TABLE `towed_vehicule`
  ADD PRIMARY KEY (`towed_vehicule_id`),
  ADD UNIQUE KEY `towed_vehicule_plate` (`towed_vehicule_plate`) USING HASH;

--
-- Index pour la table `vehicule`
--
ALTER TABLE `vehicule`
  ADD PRIMARY KEY (`vehicule_id`),
  ADD UNIQUE KEY `vehicule_plate` (`vehicule_plate`,`towed_vehicule_plate`) USING HASH;

--
-- Index pour la table `vehicule_ind_cost`
--
ALTER TABLE `vehicule_ind_cost`
  ADD PRIMARY KEY (`vehicule_id`),
  ADD UNIQUE KEY `vehicule_plate` (`vehicule_plate`) USING HASH;

--
-- Index pour la table `vehicule_payment`
--
ALTER TABLE `vehicule_payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD UNIQUE KEY `vehicule_plate` (`vehicule_plate`) USING HASH;

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `energy`
--
ALTER TABLE `energy`
  MODIFY `energy_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `other_cost`
--
ALTER TABLE `other_cost`
  MODIFY `other_cost_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `tires`
--
ALTER TABLE `tires`
  MODIFY `tires_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `towed_vehicule`
--
ALTER TABLE `towed_vehicule`
  MODIFY `towed_vehicule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `vehicule`
--
ALTER TABLE `vehicule`
  MODIFY `vehicule_id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `vehicule_ind_cost`
--
ALTER TABLE `vehicule_ind_cost`
  MODIFY `vehicule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `vehicule_payment`
--
ALTER TABLE `vehicule_payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
