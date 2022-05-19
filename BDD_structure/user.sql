-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 19 mai 2022 à 23:26
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
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id_employee` int(11) NOT NULL,
  `username` text NOT NULL,
  `surname` text NOT NULL,
  `service` text NOT NULL,
  `position` text NOT NULL,
  `password` text NOT NULL,
  `email` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id_employee`, `username`, `surname`, `service`, `position`, `password`, `email`) VALUES
(1, 'john', 'doe', 'it', 'admin', 'qwertz', 'john.doe@entreprise.com'),
(2, 'jane', 'doe', 'finance', 'controleur de gestion', 'qwertz', 'jane.doe@entreprise.com'),
(3, 'gioia', 'bisconti', 'controllo', 'CEO', 'asdfg', 'gioia.bisconti@entreprise.com');

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
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id_employee` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
