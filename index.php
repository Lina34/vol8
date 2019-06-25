<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="./css/style.css">
  <title>Document</title>
</head>
<body>

    <h1>登録</h1>


  <form method="POST" action="./thanks.php" class="form">
    
    <div>
        IDNAME<br>
            <input type="text" name="idname">
        </div>
    
    <div>
        PASSWORD<br>
        <input type="text" name="pass">
    </div>


  <div class="henshuinput">
    <input type="submit" value="送信" id="sousin" onclick="send(this.form)" >
  </div>
  </form>


  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="./js/hikiwatasi.js"></script>
</body>
</html>