<?php

$idname = htmlspecialchars($_POST['idname']);
$pass = htmlspecialchars($_POST['pass']);
$save = htmlspecialchars($_POST['save']);


// データベースに接続する
$dsn = 'mysql:dbname=lastweek;host=localhost';
$user = 'root';
$password='';
// データベース接続
$dbh = new PDO($dsn, $user, $password);
// エラーを画面に出す設定
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// DBを操作するときの文字コードを設定
$dbh->query('SET NAMES utf8');







$sql = 'INSERT INTO lastweek(idname,pass,save) VALUES(:idname,:pass,:save)';
// SQL準備
$stmt = $dbh->prepare($sql);
// $stmt->bindParam(':title', $title, PDO::PARAM_STR);
// $stmt->bindParam(':content', $content, PDO::PARAM_STR);
$stmt->bindparam(":idname", $idname, PDO::PARAM_STR);
$stmt->bindparam(":pass", $pass, PDO::PARAM_STR);
$stmt->bindparam(":save", $save, PDO::PARAM_STR);
// 実行
$stmt->execute();

// $stmt->debugDumpParams();

header("Location: game.php");

?>






