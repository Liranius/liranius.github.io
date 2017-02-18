<?php
/**
 * Created by PhpStorm.
 * User: Liranius
 * Date: 2017/1/5
 * Time: 22:24
 */

//read private key
$fp = fopen($_SERVER["DOCUMENT_ROOT"] . "/libs/ssl/server_private_key.pem", "r") or exit("Unable to open file!");
$rsaDKey = fread($fp, 8192);
fclose($fp);
//var_dump($rsaDKey);

//read public key
$fp = fopen($_SERVER["DOCUMENT_ROOT"] . "/libs/ssl/server_public_key.pem", "r") or exit("Unable to open file!");
$rsaPKey = fread($fp, 8192);
fclose($fp);
//var_dump($rsaPKey);
