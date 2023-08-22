<?php
$codice = $_POST["codice"];

include_once('connessione.php');


$sql = "SELECT Libro.CodLibro, Libro.Titolo, Libro.ISBN, Libro.Lingua, Libro.AnnoPubb, Libro.CodDip
	FROM Libro, Autore, Scrivere
	WHERE Autore.CodAutore = '$codice' AND Autore.CodAutore = Scrivere.CodAutore AND Scrivere.CodLibro = Libro.CodLibro
	ORDER BY AnnoPubb;
	";

$sql1 = "SELECT CONCAT(Autore.Nome,' ',Autore.Cognome) AS Nome_cognome
    FROM Autore
	WHERE Autore.CodAutore = '$codice'
    ";

$result = mysqli_query($link, $sql);
$result1 = mysqli_query($link, $sql1);

$Html = "";
$autore = "";

while ($row = mysqli_fetch_array($result)) {
    $Html =  $Html . "<tr> <td>$row[1]</td> <td>$row[2]</td><td>$row[3]</td><td>$row[4]</td></tr>";
}

while ($row = mysqli_fetch_array($result1)) {
    $autore =  $row["Nome_cognome"];
}

mysqli_close($link);
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8">

    <title>Libri per autore</title>

    <style>
        table,
        td,
        th {
            text-align: center;
            vertical-align: middle;
        }

        .centerLink {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>

<body>

    <div style="text-align: center;"><a href="../index.html"><img src="../immagini/logo_unife.png" height="100px" width="200px"></a></div>
    <h1 style="text-align: center;">Gestione Biblioteca UNIFE - Bibliografia di <?php echo $autore ?></h1>

    <hr><br>

    <fieldset>

        <p style="text-align: center">
            Visualizzazione di tutti i libri di un determinato autore,
            eventualmente suddivisi per anno di pubblicazione
        </p>
    </fieldset>

    <br>

    <table style="width:100%">
        <tr>
            <th>Titolo</th>
            <th>ISBN</th>
            <th>Lingua</th>
            <th>Anno pubblicazione</th>
        </tr>
        <?php echo $Html ?>

    </table>

    <br>

    <div class="centerLink"><a href="../index.html" style="text-align:center;">Torna alla homepage</a></div>

    <br>
    <hr>

    <footer style="text-align: center;">
        <p>Basi di dati 2022/23 - Progetto di <a href="mailto:gaia.marzola@edu.unife.it?subject=Progetto basi di dati 2022/23">Gaia Marzola</a>
            e <a href="mailto:solomonolamide.taiwo@edu.unife.it?subject=Progetto basi di dati 2022/23">Solomon Olamide
                Taiwo</a>
            (Gruppo n. 6)</p>
    </footer>

</body>

</html>