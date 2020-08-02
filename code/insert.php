<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php 
        $ime=$_GET["imeDela"];
        $opis=$_GET["opis"];

        mysql_connect("localhost", "root", "");
        mysql_select_db("testing");
        mysql_query("insert into test values('$ime', '$opis')");
    ?>
</body>
</html>