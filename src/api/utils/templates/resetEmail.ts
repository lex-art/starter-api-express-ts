export default (url: string) => `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="UTF-8">
   
    <title></title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet"
        type="text/css">
    <style type="text/css">
        @font-face {
            font-family: "Montserrat";
            src: "https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap"rel="stylesheet"type="text/css";
        }

        * {
            font-family: "Montserrat", sans-serif;
        }

        body {
            width: 100vw;
            height: 100vh;
            margin: 0 !important;
            padding: 0 !important;
            background: #152247;
            color: white;
            box-sizing: border-box;
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            align-items: center;
        }

        .card {
            background-color: white;
            width: 450px !important;
            height: auto !important;
            padding: 1.5em 0 !important;
            word-wrap: break-word;
            border-radius: 10px;
            color: #262626;
            box-shadow: 5px 1px 10px rgb(0 0 0 / 50%);
        }

        .body-card {
            display: flex;
            flex-flow: row wrap;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .contain-logo-text {
            text-align: center;
        }

        .container-logo-login {
            max-width: 100%;
            margin: 0 auto;
            text-align: center;
        }

        .logo-d12 {
            width: 60%;
            max-width: 70%;
            margin: 0 auto;
        }
    </style>
</head>

<body>
    <div class="card">
        <div class="contain-logo-text">
            <div class="container-logo-login">
                <img class="logo-d12" style="width: 200px; height: 75px;" src="https://demo-registro-be.herokuapp.com/public/logo_D12%20_oficina_de_registro_color.png" alt="logo-d12">
            </div>
            <h1>Reestablecer contraseña</h1>
        </div>
        <div class="body-card">
            <label>Has recibido este correo porque has solicitado el reestablecimiento de tu cuenta de registro/label>

                <p>Visitar el siguiente enlace:</p>
                <a href="${url}" target="_blank">Has click aquí</a>

                <p>Este correo solo tiene validez de 30 minutos</p>
        </div>
    </div>
</body>

</html>`