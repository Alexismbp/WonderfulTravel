
<?php

class Travel {
    private $id;
    private $name;
    private $phone;
    private $numPeople;
    private $date;
    private $price;
    private $countryId;

    public function __construct(array $data) {
        $this->name = $data['nom'] ?? '';
        $this->phone = $data['telefon'] ?? '';
        $this->numPeople = $data['num_persones'] ?? 0;
        $this->date = $data['data'] ?? '';
        $this->price = $data['preu'] ?? 0;
        $this->countryId = $data['pais_id'] ?? 0;
    }

    public function toArray(): array {
        return [
            'nom' => $this->name,
            'telefon' => $this->phone,
            'num_persones' => $this->numPeople,
            'data' => $this->date,
            'preu' => $this->price,
            'pais_id' => $this->countryId
        ];
    }
}