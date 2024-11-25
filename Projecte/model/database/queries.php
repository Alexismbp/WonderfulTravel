
<?php

class DatabaseQueries {
    private PDO $conn;

    public function __construct(PDO $conn) {
        $this->conn = $conn;
    }

    public function getContinents(): array {
        try {
            $stmt = $this->conn->prepare("SELECT id, nom_continent FROM continents");
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getCountries(int $continentId): array {
        $stmt = $this->conn->prepare("SELECT id, nom_pais FROM paisos WHERE continent_id = :continent_id");
        $stmt->bindParam(':continent_id', $continentId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getCountryPrice(int $countryId): float {
        $stmt = $this->conn->prepare("SELECT preu FROM paisos WHERE id = :pais_id");
        $stmt->bindParam(':pais_id', $countryId);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result['preu'] ?? 0;
    }

    public function getAllTravels(string $orderBy = 'data'): array {
        $orderColumn = ($orderBy === 'desti') ? 'p.nom_pais' : 'v.data';
        $sql = "SELECT v.*, p.nom_pais 
                FROM viatges v 
                JOIN paisos p ON v.pais_id = p.id 
                ORDER BY {$orderColumn} ASC";
        
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function insertTravel(Travel $travel): bool {
        $sql = "INSERT INTO viatges (nom, telefon, num_persones, data, preu, pais_id) 
                VALUES (:nom, :telefon, :num_persones, :data, :preu, :pais_id)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute($travel->toArray());
    }

    public function deleteTravel(int $travelId): bool {
        $stmt = $this->conn->prepare("DELETE FROM viatges WHERE id = :id");
        $stmt->bindParam(':id', $travelId, PDO::PARAM_INT);
        return $stmt->execute();
    }
}