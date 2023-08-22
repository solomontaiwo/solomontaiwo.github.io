<?php

$nome = $_POST["Nome"];
$cognome = $_POST["Cognome"];
$matricola = $_POST["NMatricola"];

include_once ('connessione.php');

if (empty($matricola)) {
    $sql = "SELECT *
	        FROM BibliotecaUNIFE.Utente
	        WHERE Utente.Nome LIKE '%" . $nome . "%' AND Utente.Cognome LIKE '%" . $cognome . "%'";
} else {
    $sql = "SELECT *
		    FROM BibliotecaUNIFE.Utente
		    WHERE Utente.NMatricola = '$matricola' AND Utente.Nome LIKE '%" . $nome . "%' AND Utente.Cognome LIKE '%" . $cognome . "%'";
}

$result = mysqli_query($link, $sql);

$Html = "";
$TotTupleT = 0;

while ($row = mysqli_fetch_array($result)) {
    $TotTupleT++;
    $Html = $Html . "<tr><td>$row[0]</td> <td>$row[1]</td> <td>$row[2]</td> <td>$row[3]</td> <td>$row[4]</td> <td>$row[5]</td> <td>$row[6]</td> <td>$row[7]</td> 
        <td><form action='getPrestiti.php' method='POST'>
		<input type='hidden' value='$row[0]' name='matricola'><input type='submit' style=' width: 100%;' value='Prestiti'>
		</form></td></tr>";
}

mysqli_close($link);
?>

<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="utf-8">

    <title>Ricerca utente e storico</title>

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
    <h1 style="text-align: center;">Gestione Biblioteca UNIFE - Ricerca utente e storico</h1>

    <hr><br>

    <form action="getStorico.php" method="POST">
        <fieldset>

            <p style="text-align: center">
                Ricerca di un utente della biblioteca e il suo storico dei prestiti
                (compresi quelli in corso)
            </p>

            <input style="width:100%" type="text" name="Nome" placeholder="Scrivi qui il nome dell'utente">
            <input style="width:100%" type="text" name="Cognome" placeholder="Scrivi qui il cognome dell'utente">
            <input style="width:100%" type="text" name="NMatricola" placeholder="Scrivi qui la matricola dell'utente">
            <input style="width:100%; " type="submit" value="Invia" />

            <br>

        </fieldset>
    </form>
    <h3>Totale risultati trovati: <?php echo $TotTupleT; ?></h3>

    <table style="width:100%">
        <tr>
            <th>Matricola</th>
            <th>Nome</th>
            <th>Cognome</th>
            <th>Indirizzo</th>
            <th>N. Civico</th>
            <th>Cap</th>
            <th>Città</th>
            <th>Numero di telefono</th>
            <th>Storico prestiti</th>
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