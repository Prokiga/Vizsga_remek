-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3306
-- Létrehozás ideje: 2026. Aug 08. 06:20
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

--
-- A tábla adatainak kiíratása `pinebasetype`
--

INSERT INTO `pinebasetype` (`base_id`, `base_type`) VALUES
(1, 'Kicsi'),
(2, 'Nagy');

--
-- A tábla adatainak kiíratása `pinebatchstate`
--

INSERT INTO `pinebatchstate` (`batch_state_id`, `batch_state`) VALUES
(1, 'Érkezett'),
(2, 'Elvitt'),
(3, 'Eladva'),
(4, 'Lekötve'),
(5, 'Eltéve');

--
-- A tábla adatainak kiíratása `pinetypes`
--

INSERT INTO `pinetypes` (`pine_id`, `pine_type`) VALUES
(1, 'Luc'),
(2, 'Jegenye'),
(3, 'Normand'),
(4, 'Nobilis');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
