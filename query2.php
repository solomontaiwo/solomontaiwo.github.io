<?php

include_once('php/connessione.php');

$sql = "SELECT Autore.CodAutore, Autore.Nome, Autore.Cognome, Autore.DataNascita, Autore.LuogoNascita 
        FROM BibliotecaUNIFE.Autore";

$result = mysqli_query($link, $sql);

$Html = "";

while ($row = mysqli_fetch_array($result)) {
    $Html = $Html . "<tr><td>$row[1]</td> <td>$row[2]</td><td>$row[3]</td><td>$row[4]</td><td>
    <form action='php/getLibriBibliografia.php' method='POST'>
    <input type='hidden' value='$row[0]' name='codice'><input style=' width: 100%;' type='submit' value='Vedi libri'>
    </form></td></tr>";
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

    <div style="text-align: center;"><a href="index.html"><img src="immagini/logo_unife.png" height="100px" width="200px"></a></div>
    <h1 style="text-align: center;">Gestione Biblioteca UNIFE - Bibliografia autore</h1>

    <hr>

    <p style="text-align: center">
        Visualizzazione di tutti i libri di un determinato autore,
        eventualmente suddivisi per anno di pubblicazione
    </p>

    <table style="width: 100%;">
        <tr>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Data di nascita</th>
            <th>Luogo di nascita</th>
            <th>Bibliografia</th>
        </tr>
        <?php echo $Html ?>

    </table>

    <br>

    <div class="centerLink"><a href="index.html" style="text-align:center;">Torna alla homepage</a></div>

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