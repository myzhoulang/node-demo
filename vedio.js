const express = require('express');
const fs = require('fs');
const app = express();

app.get('/video', (req, res) => {
  const video = `./video2.mp4`
  let stat
  try {
    stat = fs.statSync(video);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize - 1;

      const chunksize = (end - start) + 1
      const file = fs.createReadStream(video, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(video).pipe(res)
    }
  } catch (e) {
    console.log(e)
    if (e.code === 'ENOENT') {
      res.status(404).send('没有这个文件')
    } else {
      res.status(500).send('Server Error')
    }
  }
});

app.listen(3009);