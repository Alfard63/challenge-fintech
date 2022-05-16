<?php
session_start();

var_dump(session_start());

if(isset($_POST['email']) && isset($_POST['password']))
{
     // connexion à la base de données
    
    $servername = "mysql.hostinger.com";
    $database = "u933389189_transroad_user"; 
    $username = "u933389189_transroad";
    $password = "Findeveleven_11";
    $sql = "mysql:host=$servername;dbname=$database;";
    $dsn_Options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
    
    try { 
        $my_Db_Connection = new PDO($sql, $username, $password, $dsn_Options);
        echo "Connected successfully <br>";
    } catch (PDOException $error) {
        echo 'Connection error: ' . $error->getMessage();
        die('could not connect to database');
    }

    
    // insert data sets
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    if($email !== "" && $password !== "")
        {
            // **************** A revoir **********************************
            // prepare SQL statement
            $sql = "SELECT username, surname, email, password FROM users WHERE username='John' ";
            
            /*
            $statement = $my_Db_Connection->prepare("SELECT password, username 
                FROM users 
                WHERE username = :email ") ;
           
            
            // bind parameter
            $statement ->bindParam(':email', $email);
            $statement ->bindParam(':password', $password);
             */
                     
            // **************** A revoir **********************************

            // $reponse  = $statement->fetch(PDO::FETCH_BOTH);
            foreach ($my_Db_Connection->query($sql) as $row) {
                if ($row['email']==$email && $row['password']==$password)
                {
                    $_SESSION['username'] = "John";
                   var_dump($_SESSION["username"]);
                   header('Location: ../index.html');
                }else
                {
                    if($row['email']==$email){
                        echo "password incorrect";
                    }
                    else{
                        echo "email incorrect";
                    }
                header('Location: login_page.php?erreur=2');
                }
            }
    
        }
}
else
{
   header('Location: login_page.php');
}

?> 

