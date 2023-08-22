<?php
$nome = $_POST["nome"];
$cognome = $_POST["cognome"];
$data = $_POST["data"];
$luogo = $_POST["luogo"];

include_once('connessione.php');

$sql = "SELECT Autore.CodAutore, Autore.Nome, Autore.Cognome, Autore.DataNascita, Autore.LuogoNascita
	      FROM BibliotecaUNIFE.Autore 
	      WHERE Autore.Nome LIKE '%" . $nome . "%' AND Autore.Cognome LIKE '%" . $cognome . "%' AND Autore.DataNascita LIKE '%" . $data . "%' AND Autore.LuogoNascita LIKE '%" . $luogo . "%'";

$result = mysqli_query($link, $sql);

$Html = "";

while ($row = mysqli_fetch_array($result)) {
  $Html =  $Html . "<tr><td>$row[1]</td> <td>$row[2]</td><td>$row[3]</td><td>$row[4]</td></tr>";
}

mysqli_close($link);
?>

<!DOCTYPE html>
<html lang="it">

<head>
  <meta charset="utf-8">

  <title>Ricerca autore</title>

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
  <h1 style="text-align: center;">Gestione Biblioteca UNIFE - Ricerca autore</h1>

  <hr><br>
  <form action="getAutore.php" method="POST">
    <fieldset>
      <p style="text-align: center">Ricerca degli autori inserendo uno o più parametri (anche parziali)</p>
      <input style="width: 100%; " type="text" name="nome" placeholder="Scrivi qui il nome dell'autore">
      <input style="width: 100%; " type="text" name="cognome" placeholder="Scrivi qui il cognome dell'autore">
      <input style="width: 100%; " type="text" name="data" placeholder="Scrivi qui la data dell'autore">
      <input style="width: 100%; " type="text" name="luogo" placeholder="Scrivi qui il luogo di nascita dell'autore">
      <input style="width: 100%; " type="submit" value="Invia" />
    </fieldset>
  </form>

  <table style="width:100%">
    <tr>
      <th>Nome</th>
      <th>Cognome</th>
      <th>Data di nascita</th>
      <th>Luogo di nascita</th>
    </tr>

    <br>

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