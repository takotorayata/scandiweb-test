<?php

require 'product.php';

class Book extends Product {

    private $weight;

    function __construct() {
        parent::__construct();
    }

    public function setWeight($weight) {
        $this->weight = $weight;
    }

    public function getWeight() {
        return $this->weight;
    }
  }
?>
