classDiagram

    %% Clases del Modelo
    class Database {
        -static instance: Database
        -conn: PDO
        -config: array
        -__construct()
        +getInstance(): Database
        -connect(): void
        +getConnection(): PDO
    }

    class DatabaseQueries {
        -conn: PDO
        +getContinents(): array
        +getCountries(continentId: int): array
        +getCountryPrice(countryId: int): float
        +getAllTravels(orderBy: string): array
        +insertTravel(travelData: array): bool
        +deleteTravel(travelId: int): bool
    }

    class Travel {
        -id: int
        -nom: string
        -telefon: string
        -num_persones: int
        -data: Date
        -preu: float
        -pais_id: int
        +__construct(travelData: array)
        +getId(): int
        +getNom(): string
        +getTelefon(): string
        +getNumPersones(): int
        +getData(): Date
        +getPreu(): float
        +getPaisId(): int
    }

    %% Clases del Controlador
    class TravelHandler {
        +handleInsertTravel(conn: PDO): array
        +handleGetAllTravels(conn: PDO, orderBy: string): array
        +handleDeleteTravel(conn: PDO, travelId: int): array
        -prepareTravelData(conn: PDO): array
    }

    class TravelValidator {
        +static validate(travelData: array): array
        -static validateName(name: string): bool
        -static validatePhone(phone: string): bool
        -static validateDate(date: string): bool
        -static validatePersons(persons: int): bool
    }

    %% Clases JavaScript
    class TravelManager {
        +loadTravels(retryCount: int): Promise
        +deleteTravel(travelId: int): Promise
        +initializeOrderSelect(): void
    }

    class FormManager {
        +initializeForm(): void
        -setupDatePicker(): void
        -setupPriceCalculator(): void
        -setupFormValidation(): void
        -handleSubmit(event: Event): void
    }

    class AnalogClock {
        -hourHand: Element
        -minuteHand: Element
        -secondHand: Element
        +initAnalogClock(): void
        -updateClock(): void
    }

    %% Relaciones
    Database "1" --> "1" DatabaseQueries : usa
    DatabaseQueries "1" --> "*" Travel : gestiona
    TravelHandler --> TravelValidator : usa
    TravelHandler --> DatabaseQueries : usa
    FormManager --> TravelValidator : usa
    FormManager --> TravelManager : usa
    TravelManager --> DatabaseQueries : usa via AJAX

    %% Tablas de Base de Datos
    class Continents {
        +id: int
        +nom_continent: string
    }

    class Paisos {
        +id: int
        +nom_pais: string
        +preu: int
        +continent_id: int
    }

    class Viatges {
        +id: int
        +nom: string
        +telefon: int
        +num_persones: int
        +data: date
        +preu: int
        +pais_id: int
    }

    Continents "1" --> "*" Paisos : tiene
    Paisos "1" --> "*" Viatges : contiene