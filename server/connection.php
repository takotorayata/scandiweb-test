<?php
require 'headers.php';
require 'model/models.php';

class Connection {

        private  $conn = null;
        private  $result = array();
        private  $user = 'id17835727_swshuser';
        private  $password = 'l]VO[UcMxP6!^%GQ';
        private  $host = 'localhost';
        private  $db = 'id17835727_swsh';

// create connection
       public function __construct(){
            $this->conn = new mysqli($this->host, $this->user, $this->password, $this->db);
        if ($this->conn->connect_error) {
          die("Connection failed: " . $this->conn->connect_error);
        }
       }

        public function insertBook($product_sku, $pr) {
            $b = new Book();
            $b->setWeight($pr['weight']);
            $weight =  $b->getWeight();
            $sql = "INSERT INTO book_details (weight, book_sku) VALUES ($weight, $product_sku)";
            mysqli_query($this->conn, $sql);

        }
        public function insertDvd($product_sku, $pr) {
            $d = new Dvd();
            $d->setSize($pr['size']);
            $size = $d->getSize();
            $sql = "INSERT INTO dvd_details (size, dvd_sku) VALUES ($size, $product_sku)";
            mysqli_query($this->conn, $sql);
        }
        public function insertFurniture($product_sku, $pr) {
            $f = new Furniture();
            $f->setHeight($pr['height']);
            $f->setWidth($pr['width']);
            $f->setLength($pr['length']);
            $height = $f->getHeight();
            $width = $f->getWidth();
            $length = $f->getLength();
            $sql = "INSERT INTO furniture_details (height, width, length, furniture_sku) VALUES ($height, $width, $length, $product_sku)";
            mysqli_query($this->conn, $sql);
        }

 // Add a product
       public function insert($pr){

           // creating main type
           $p = new Product();
           $p->setName($pr['name']);
           $p->setPrice($pr['price']);
           $p->setType($pr['type']);

           // insert into product table
           $name = $p->getName();
           $price = $p->getPrice();
           $type =  $p->getType();
           $sql = "INSERT INTO product (name, price,type) VALUES ('$name', $price, '$type')";
           mysqli_query($this->conn, $sql);
           // retrieve last id
           $product_sku = mysqli_insert_id($this->conn);

           $method = "insert".$type;
           $this->$method($product_sku, $pr);

           $this->conn->close();
       }

// Delete a product
       public function delete($ids){
          $sql = "DELETE FROM product WHERE sku IN ($ids)";
          $result = mysqli_query($this->conn, $sql);
          $this->conn->close();
       }

       public function selectNextSku(){
           $sql = "SELECT T.AUTO_INCREMENT
                   FROM information_schema.TABLES T
                   WHERE T.TABLE_SCHEMA = 'id17835727_swsh'
                     AND T.TABLE_NAME = 'product'";

           $result = mysqli_query($this->conn, $sql);
           $sku   = mysqli_fetch_row($result);
           echo json_encode(["sku" => $sku]);
           $this->conn->close();
       }

       public function getFurniture(){
            $sql = "SELECT p.*, f.height, f.width, f.length
                    FROM product p
                    JOIN furniture_details f
                        ON p.sku = f.furniture_sku";

           $allFurniture = mysqli_query($this->conn, $sql);
           $allF = array();
           if (mysqli_num_rows($allFurniture) > 0) {
           // creating Furniture objects
                while ($f = $allFurniture->fetch_object()) {
                    array_push($allF, $f);
                }
                return $allF;
           } else {
               echo json_encode(["success" => 0]);
           }
       }

       public function getDvds(){
            $sql = "SELECT p.*, d.size
                    FROM product p
                    JOIN dvd_details d
                        ON p.sku = d.dvd_sku";
            $allDvds = mysqli_query($this->conn, $sql);
            $allD = array();
            if (mysqli_num_rows($allDvds) > 0) {
            // creating Dvd objects
                while ($d = $allDvds->fetch_object()) {
                    array_push($allD, $d);
                }
                return $allD;
            } else {
                echo json_encode(["success" => 0]);
            }
       }

       public function getBooks(){
            $sql = "SELECT p.*, b.weight
                    FROM product p
                   	JOIN book_details b
                   		ON p.sku = b.book_sku";

            $allBooks = mysqli_query($this->conn, $sql);
            $allB = array();
            if (mysqli_num_rows($allBooks) > 0) {
            // creating Book objects
                while ($b = $allBooks->fetch_object()) {
                    array_push($allB, $b);
                }
               return $allB;
            } else {
               echo json_encode(["success" => 0]);
            }
       }

// Select all products
       public function select(){
           $books = $this->getBooks();
           $dvds = $this->getDvds();
           $furniture = $this->getFurniture();
           $products = array_merge($books, $dvds, $furniture);
           usort($products, array('Connection', 'sortBySku'));
           echo json_encode(["success" => 1, "products" => $products, "b" => $books, "f" => $furniture]);
           $this->conn->close();
       }

       private static function sortBySku($a, $b){
           return $a->sku > $b->sku;
       }

// Select all products
       public function select2(){
           $sql = "SELECT p.*, b.weight, d.size, f.height, f.width, f.length
                   FROM product p
                   	LEFT JOIN book_details b
                   		ON p.sku = b.book_sku
                   	LEFT JOIN dvd_details d
                   		ON p.sku = d.dvd_sku
                   	LEFT JOIN furniture_details f
                   		ON p.sku = f.furniture_sku
                   	ORDER BY p.sku";

           $allProducts = mysqli_query($this->conn, $sql);
           if (mysqli_num_rows($allProducts) > 0) {
               $all_products = mysqli_fetch_all($allProducts, MYSQLI_ASSOC);
               echo json_encode(["success" => 1, "products" => $all_products]);
           } else {
               echo json_encode(["success" => 0]);
           }
           $this->conn->close();
       }
    }
?>
