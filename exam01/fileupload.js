var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.uploadDir = "D:/tmp"; 

        form.parse(req, function (err, fields, files) {
            // console.log(JSON.stringify(files.filetoupload));

            var oldpath = files.filetoupload.path;
            var newpath = 'D:/NodeTest/' + files.filetoupload.name;

            fs.rename(oldpath, newpath, function (err) {
                
                if (err) console.log(err.message);
                else {
                    // console.log(oldpath);
                    // console.log(newpath);

                    res.write('File uploaded and moved!');
                    res.end();
                }
            });
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);
