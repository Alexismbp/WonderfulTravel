
<?php

class TravelValidator {
    public static function validate(array $travel): array {
        $errors = [];
        
        if (!self::isValidName($travel['nom'])) {
            $errors[] = "El nombre no és vàlid";
        }
        
        if (!self::isValidPhone($travel['telefon'])) {
            $errors[] = "El número de telèfon no és vàlid";
        }
        
        if (!self::isValidDate($travel['data'])) {
            $errors[] = "La data no pot ser anterior a avui";
        }
        
        if (!self::isValidNumPeople($travel['num_persones'])) {
            $errors[] = "El número de persones ha d'estar entre 1 i 50";
        }
        
        return $errors;
    }

    private static function isValidName(string $name): bool {
        return preg_match('/^[A-Za-zÀ-ÿ\s]{2,50}$/', $name);
    }

    private static function isValidPhone(string $phone): bool {
        return preg_match('/^\+?[0-9]{8,15}$/', $phone);
    }

    private static function isValidDate(string $date): bool {
        $fecha = new DateTime($date);
        $hoy = new DateTime('today');
        return $fecha >= $hoy;
    }

    private static function isValidNumPeople(int $numPeople): bool {
        return $numPeople >= 1 && $numPeople <= 50;
    }
}