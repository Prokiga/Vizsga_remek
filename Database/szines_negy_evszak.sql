-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2026. Sze 05. 18:16
-- Kiszolgáló verziója: 8.4.7
-- PHP verzió: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `szines_negy_evszak`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `costumers`
--

DROP TABLE IF EXISTS `costumers`;
CREATE TABLE IF NOT EXISTS `costumers` (
  `costumer_id` int NOT NULL AUTO_INCREMENT,
  `costumer_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costumer_taxnumber` varchar(13) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costumer_postal_code` int DEFAULT NULL,
  `costumer_city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costumer_address` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `costumer_phonenumber` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`costumer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pinebasetype`
--

DROP TABLE IF EXISTS `pinebasetype`;
CREATE TABLE IF NOT EXISTS `pinebasetype` (
  `base_id` int NOT NULL AUTO_INCREMENT,
  `base_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`base_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `pinebasetype`
--

INSERT INTO `pinebasetype` (`base_id`, `base_type`) VALUES
(1, 'Kicsi'),
(2, 'Nagy');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pinebase_order`
--

DROP TABLE IF EXISTS `pinebase_order`;
CREATE TABLE IF NOT EXISTS `pinebase_order` (
  `base_id` int NOT NULL AUTO_INCREMENT,
  `costumer_id` int DEFAULT NULL,
  `pine_type_id` int DEFAULT NULL,
  `pinebasetype` int DEFAULT NULL,
  `base_quantity` int DEFAULT NULL,
  `base_state` tinyint(1) DEFAULT NULL,
  `base_ordered_date` date DEFAULT NULL,
  `base_updated_at` date DEFAULT NULL,
  PRIMARY KEY (`base_id`),
  KEY `fk_costumer_id` (`costumer_id`),
  KEY `fk_pinebase_pinetype` (`pine_type_id`),
  KEY `fk_pinebasetype` (`pinebasetype`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pinebatchstate`
--

DROP TABLE IF EXISTS `pinebatchstate`;
CREATE TABLE IF NOT EXISTS `pinebatchstate` (
  `batch_state_id` int NOT NULL AUTO_INCREMENT,
  `batch_state` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`batch_state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `pinebatchstate`
--

INSERT INTO `pinebatchstate` (`batch_state_id`, `batch_state`) VALUES
(1, 'Érkezett'),
(2, 'Kiszállítva'),
(3, 'Eladva'),
(4, 'Lekötve'),
(5, 'Eltéve');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pinebatch_order`
--

DROP TABLE IF EXISTS `pinebatch_order`;
CREATE TABLE IF NOT EXISTS `pinebatch_order` (
  `batch_id` int NOT NULL AUTO_INCREMENT,
  `pine_type_id` int DEFAULT NULL,
  `pinebatch_state_id` int DEFAULT NULL,
  `batch_quantity` int DEFAULT NULL,
  `batch_arrived_date` date DEFAULT NULL,
  `batch_updated_at` date DEFAULT NULL,
  PRIMARY KEY (`batch_id`),
  KEY `fk_pinebatch_pinetype` (`pine_type_id`),
  KEY `fk_pinebatch_state_id` (`pinebatch_state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `pinetypes`
--

DROP TABLE IF EXISTS `pinetypes`;
CREATE TABLE IF NOT EXISTS `pinetypes` (
  `pine_id` int NOT NULL AUTO_INCREMENT,
  `pine_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`pine_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `pinetypes`
--

INSERT INTO `pinetypes` (`pine_id`, `pine_type`) VALUES
(1, 'Luc'),
(2, 'Jegenye'),
(3, 'Normand'),
(4, 'Nobilis');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass_word` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `pinebase_order`
--
ALTER TABLE `pinebase_order`
  ADD CONSTRAINT `fk_costumer_id` FOREIGN KEY (`costumer_id`) REFERENCES `costumers` (`costumer_id`),
  ADD CONSTRAINT `fk_pinebase_pinetype` FOREIGN KEY (`pine_type_id`) REFERENCES `pinetypes` (`pine_id`),
  ADD CONSTRAINT `fk_pinebasetype` FOREIGN KEY (`pinebasetype`) REFERENCES `pinebasetype` (`base_id`);

--
-- Megkötések a táblához `pinebatch_order`
--
ALTER TABLE `pinebatch_order`
  ADD CONSTRAINT `fk_pinebatch_pinetype` FOREIGN KEY (`pine_type_id`) REFERENCES `pinetypes` (`pine_id`),
  ADD CONSTRAINT `fk_pinebatch_state_id` FOREIGN KEY (`pinebatch_state_id`) REFERENCES `pinebatchstate` (`batch_state_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
