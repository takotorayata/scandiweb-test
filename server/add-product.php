<?php
require 'connection.php';
require 'headers.php';

$c = new Connection();
$rest_json = file_get_contents("php://input");
$_POST = json_decode(trim($rest_json), true);
$pr = array();
foreach ($_POST as $key=>$value) {
    $pr[$key]=$value;
}
echo $pr['name'];
$c->insert($pr);

?>
