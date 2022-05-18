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
    // insert data sets
    $email = $_POST['email'];
    $password = $_POST['password'];


    if($email !== "" && $password !== "")
        {
            // **************** A revoir **********************************
            // prepare SQL statement
            // $sql = "SELECT username, surname, email, password FROM users WHERE username='John' ";            
            $statement = $my_Db_Connection->prepare("SELECT username, surname, email, password 
                FROM users 
                WHERE email = :email ") ;
           
           // bind parameter
            $statement ->bindParam(':email', $email_db);
                        
            $email_db = $_POST['email'];

            $statement->execute();
            $arr = $statement->fetchAll();  //recup of the value given by $statement (array with username, surname, email and password)

            foreach ($arr as $row) {
                if ($row['email']==$email && $row['password']==$password)
                {
                    $_SESSION['username'] = $row['username'];
                    $_SESSION['surname'] = $row['surname'];                    
                   header('Location: ../index.html');
                }else
                {
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

