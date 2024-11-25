<?php
// https://adminbbdd.dondominio.com/index.php?route=/&route=%2F&db=ddb238704
// user: ddb238704
// pass: )Tsnuolu8d#fsY

class Database {
    private static $instance = null;
    private $conn;
    private $config;

    private function __construct() {
        $this->config = require_once __DIR__ . '/../config/env.php';
        $this->connect();
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function connect() {
        try {
            $dsn = "mysql:host={$this->config['DB_HOST']};dbname={$this->config['DB_NAME']};charset={$this->config['DB_CHARSET']}";
            
            $this->conn = new PDO(
                $dsn, 
                $this->config['DB_USERNAME'], 
                $this->config['DB_PASSWORD']
            );
            
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Importante: configurar para permitir múltiples consultas
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $this->conn->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
        } catch (PDOException $e) {
            throw new Exception("Error de conexión: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->conn;
    }

}

// Crear una instancia global de la conexión para mantener compatibilidad con el código existente
try {
    $conn = Database::getInstance()->getConnection();
} catch (Exception $e) {
    echo $e->getMessage();
    die();
}