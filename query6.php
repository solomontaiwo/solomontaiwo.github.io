<?php

include_once('php/connessione.php');

$sql = "SELECT Utente.NMatricola, Utente.Nome, Utente.Cognome, Libro.Titolo, Libro.ISBN, Prestito.DataUscita, Prestito.Restituzione, Dipartimento.Nome, Dipartimento.Via, Dipartimento.NCivico, Dipartimento.Cap, Dipartimento.Città
		FROM Utente, Prestito, Libro, Dipartimento
		WHERE Utente.NMatricola = Prestito.NMatricola AND Libro.CodLibro = Prestito.CodLibro AND Libro.CodDip = Dipartimento.CodDip
		ORDER BY Prestito.DataUscita DESC";

$result = mysqli_query($link, $sql);
$TotTupleT = 0;

$Html = "";

while ($row = mysqli_fetch_array($result)) {
	$TotTupleT++;

	if ($row[6] == 0) {
		$state = "Non restituito";
	}

	if ($row[6] == 1) {
		$state = "Restituito";
	}

	$Html = $Html . "<tr><td>$row[0]</td> <td>$row[1]</td> <td>$row[2]</td><td>$row[3]</td>
		<td>$row[4]</td><td>$row[5]</td><td>$state</td>
		<td>$row[7]</td><td>$row[8], N.$row[9], $row[11], $row[10]</td></tr>";
}

mysqli_close($link);
?>

<!DOCTYPE html>
<html lang="it">

<head>
	<meta charset="utf-8">

	<title>Storico prestiti</title>

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
	<h1 style="text-align: center;">Gestione Biblioteca UNIFE - Storico prestiti con informazioni utente</h1>

	<hr><br>

	<h3 type="des">Totale prestiti trovati:
		<?php echo $TotTupleT; ?>
	</h3>

	<table style="width:100%;">
		<tr>
			<th>Matricola</th>
			<th>Nome</th>
			<th>Cognome</th>
			<th>Titolo Libro</th>
			<th>ISBN</th>
			<th>Data del prestito</th>
			<th>Stato</th>
			<th>Nome del dipartimento</th>
			<th>Indirizzo del dipartimento</th>
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