<?php

class Dvd extends Product {

    public $size;

    function __construct() {
        parent::__construct();
    }

    public function setSize($size) {
        $this->size = $size;
    }

    public function getSize() {
        return $this->size;
    }
  }
?>
