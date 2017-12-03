/* jshint esversion: 6 */

module.exports = content => `
<html>

<head>
  <title>Lightfaden</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb"
    crossorigin="anonymous">
</head>

<body>

  <div class="container">
    <div class="row">

      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
              aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Lightfaden</a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li><a href="#">Link</a></li>
            </ul>
          </div>
        </div>
      </nav>

    </div>

    <div class="row">
      <div class="col-md-12">
        ${content}
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <hr>
        <small>Lightfaden.io 2017</small>
      </div>
    </div>
  </div>


</body>

</html>
`;