<?php

require 'connection.php';

$c = new Connection();
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$ids;
foreach ($_POST['info'] as $key=>$value) {
    if($key == 0) {
        $ids = $value;
    } else {
        $ids = $ids.",".$value;
    }
}

$c->delete($ids);

?>
