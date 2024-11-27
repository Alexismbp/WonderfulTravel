-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: proxysql-01.dd.scip.local
-- Tiempo de generación: 27-11-2024 a las 18:21:47
-- Versión del servidor: 10.10.2-MariaDB-1:10.10.2+maria~deb11
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ddb238704`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `continents`
--

CREATE TABLE `continents` (
  `id` int(11) NOT NULL,
  `nom_continent` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `continents`
--

INSERT INTO `continents` (`id`, `nom_continent`) VALUES
(1, 'África'),
(2, 'América del Norte'),
(3, 'América del Sur'),
(4, 'Antártida'),
(5, 'Asia'),
(6, 'Europa'),
(7, 'Oceanía');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paisos`
--

CREATE TABLE `paisos` (
  `id` int(11) NOT NULL,
  `nom_pais` varchar(100) DEFAULT NULL,
  `preu` int(6) NOT NULL,
  `continent_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paisos`
--

INSERT INTO `paisos` (`id`, `nom_pais`, `preu`, `continent_id`) VALUES
(1, 'Nigeria', 1000, 1),
(2, 'Sudáfrica', 1100, 1),
(3, 'Egipto', 1200, 1),
(4, 'Estados Unidos', 2000, 2),
(5, 'Canadá', 2100, 2),
(6, 'México', 2200, 2),
(7, 'Brasil', 1500, 3),
(8, 'Argentina', 1600, 3),
(9, 'Chile', 1700, 3),
(10, 'Australia', 1800, 7),
(11, 'Nueva Zelanda', 1900, 7),
(12, 'Fiyi', 2000, 7),
(13, 'China', 1700, 5),
(14, 'Japón', 1800, 5),
(15, 'India', 1900, 5),
(16, 'Francia', 1600, 6),
(17, 'Alemania', 1700, 6),
(18, 'Italia', 1800, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `viatges`
--

CREATE TABLE `viatges` (
  `id` int(11) NOT NULL,
  `nom` varchar(60) NOT NULL,
  `telefon` varchar(15) NOT NULL,
  `num_persones` int(2) NOT NULL,
  `data` date NOT NULL,
  `preu` int(11) NOT NULL,
  `pais_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `viatges`
--

INSERT INTO `viatges` (`id`, `nom`, `telefon`, `num_persones`, `data`, `preu`, `pais_id`) VALUES
(17, 'Alexis', '711111111', 6, '2024-11-25', 6000, 1),
(18, 'Marcos', '677654531', 6, '2024-11-29', 5280, 2),
(19, 'Alexis', '711111111', 5, '2024-11-25', 10000, 4),
(21, 'Maria', '711111111', 2, '2024-11-28', 2400, 7),
(22, 'Jonathan', '611111111', 5, '2024-11-27', 6800, 9);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `continents`
--
ALTER TABLE `continents`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `paisos`
--
ALTER TABLE `paisos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_IdContinent` (`continent_id`);

--
-- Indices de la tabla `viatges`
--
ALTER TABLE `viatges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_PaisID` (`pais_id`) USING BTREE;

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `continents`
--
ALTER TABLE `continents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `viatges`
--
ALTER TABLE `viatges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `paisos`
--
ALTER TABLE `paisos`
  ADD CONSTRAINT `FK_IdContinent` FOREIGN KEY (`continent_id`) REFERENCES `continents` (`id`);

--
-- Filtros para la tabla `viatges`
--
ALTER TABLE `viatges`
  ADD CONSTRAINT `FK_PaisID` FOREIGN KEY (`pais_id`) REFERENCES `paisos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
