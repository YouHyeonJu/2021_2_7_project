<?php 

$option = array(PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ);
$db = new PDO("mysql:host=localhost;dbname=mydb;charset=utf8;","root","",$option);
$db->exec("SET CHARACTER SET utf8");

session_start();
?>