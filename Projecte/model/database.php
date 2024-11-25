<?php
// https://adminbbdd.dondominio.com/index.php?route=/&route=%2F&db=ddb238704
// user: ddb238704
// pass: )Tsnuolu8d#fsY

// Classe per gestionar la connexió a la base de dades utilitzant el patró Singleton
class Database {
    private static $instance = null; // Instància única de la classe
    private $conn; // Objecte de connexió PDO
    private $config; // Configuració de la base de dades

    // Constructor privat per evitar la creació directa d'objectes
    private function __construct() {
        // Carrega la configuració des del fitxer env.php
        $this->config = require_once __DIR__ . '/../config/env.php';
        $this->connect(); // Estableix la connexió amb la base de dades
    }

    // Mètode per obtenir la única instància de la classe (Singleton)
    public static function getInstance() {
        if (self::$instance === null) { // Si no hi ha instància, crea una nova
            self::$instance = new self();
        }
        return self::$instance; // Retorna la instància única
    }

    // Estableix la connexió amb la base de dades utilitzant PDO
    private function connect() {
        try {
            // Construcció de la cadena de connexió
            $dsn = "mysql:host={$this->config['DB_HOST']};dbname={$this->config['DB_NAME']};charset={$this->config['DB_CHARSET']}";
            
            // Creació de la connexió PDO
            $this->conn = new PDO(
                $dsn, 
                $this->config['DB_USERNAME'], 
                $this->config['DB_PASSWORD']
            );
            
            // Configuració dels atributs de PDO per a una millor gestió d'errors i rendiment
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // Llança excepcions en cas d'error
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); // Desactiva l'emulació de sentències preparades
            $this->conn->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true); // Habilita l'ús de consultes emmagatzemades en memòria intermèdia
        } catch (PDOException $e) {
            throw new Exception("Error de conexión: " . $e->getMessage()); // Llança una excepció en cas d'error de connexió
        }
    }

    // Retorna l'objecte de connexió PDO
    public function getConnection() {
        return $this->conn; // Retorna la connexió PDO
    }
}

// Creació d'una instància global per mantenir compatibilitat amb codi existent
try {
    $conn = Database::getInstance()->getConnection(); // Obté la connexió a la base de dades
} catch (Exception $e) {
    echo $e->getMessage(); // Mostra el missatge d'error
    die(); // Atura l'execució del programa
}