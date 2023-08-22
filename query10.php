<?php

include_once('php/connessione.php');

$sql = "SELECT Libro.CodLibro, Libro.Titolo, Dipartimento.Nome, Libro.Lingua, COUNT(Prestito.CodLibro) AS NumeroPrestiti
        FROM Libro
        JOIN Prestito ON Libro.CodLibro = Prestito.CodLibro
        JOIN Dipartimento ON Libro.CodDip = Dipartimento.CodDip
        GROUP BY Libro.CodLibro, Libro.Titolo, Dipartimento.Nome, Libro.Lingua
        ORDER BY NumeroPrestiti DESC
        LIMIT 1";

$result = mysqli_query($link, $sql);

$Html = "";

while ($row = mysqli_fetch_array($result)) {
    $Html =  $Html . "<tr><td>$row[0]</td> <td>$row[1]</td> <td>$row[2]</td> <td>$row[3]</td> <td>$row[4]</td></tr>";
}

mysqli_close($link);

?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8">

    <title>Libro con maggiori prestiti</title>

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
    <h1 style="text-align: center;">Gestione Biblioteca UNIFE - Libro con maggiori prestiti</h1>

    <hr>

    <p style="text-align: center">
        Trova il libro con il maggior numero di prestiti eseguiti, in modo che il dipartimento
        possa eventualmente ordinarne altre copie
    </p>

    <table style="width:100%;">
        <tr>
            <th>Codice libro</th>
            <th>Nome</th>
            <th>Dipartimento</th>
            <th>Lingua</th>
            <th>Numero prestiti</th>
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