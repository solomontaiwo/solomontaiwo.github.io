<?php

include_once('connessione.php');
$nomeLibro = $_POST["nomeLibro"];

$sql = "SELECT L.CodLibro, L.Titolo, D.Nome, P.Restituzione
    	FROM Libro L, Dipartimento D, Prestito P
    	WHERE Titolo LIKE '%" . $nomeLibro . "%' /*L.Titolo = '$nomeLibro'*/ AND L.CodLibro = P.CodLibro AND P.CodLibro = L.CodLibro AND L.CodDip = D.CodDip";

$result = mysqli_query($link, $sql);

$Html = "";

while ($row = mysqli_fetch_array($result)) {

	if ($row[3] == 0) {
		$state = "Non restituito";
	}

	if ($row[3] == 1) {
		$state = "Restituito";
	}

    $Html = $Html . "<tr><td>$row[1]</td> <td>$row[2]</td> <td>$state</td></tr>";
}

mysqli_close($link);
?>

<!DOCTYPE html>
<html lang="it">

<head>
	<meta charset="utf-8">

	<title>Disponibilità libro</title>

    <style>
		body {
			max-width: 100%;
		}

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
	<h1 style="text-align: center;">Gestione Biblioteca UNIFE - Disponibilità libro</h1>

	<hr><br>

    <form action="query9.php" method="POST">
		<fieldset>
			<p style="text-align: center">
				Verifica presenza del libro richiesto ed ubicazione
			</p>
			<input style="width: 100%;" type="text" name="nomeLibro" placeholder="Scrivi qui il nome del libro">
			<input style="width: 100%;" type="submit" value="Invia" />
		</fieldset>
	</form>

	<br>

	<table style="width:100%">
		<tr>
			<th>Titolo</th>
			<th>Dipartimento</th>
			<th>Disponibilità</th>
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
