<?php

class Product {

    protected $sku;
    protected $name;
    protected $price;
    protected $type;

    public function __construct() {
    }

    public function setSku(int $sku) {
        $this->sku = $sku;
    }

    public function getSku() {
        return $this->sku;
    }

    public function setName(string $name) {
        $this->name = $name;
    }

    public function getName() {
        return $this->name;
    }

    public function setPrice(float $price) {
        $this->price = $price;
    }

    public function getPrice() {
        return $this->price;
    }

    public function setType(string $type) {
        $this->type = $type;
    }

    public function getType() {
        return $this->type;
    }
  }
?>
