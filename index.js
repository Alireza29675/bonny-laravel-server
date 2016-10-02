const child_process = require('child_process');
const fs = require('fs');
const RenderKid = require('renderkid');

const r = new RenderKid();
const exec = child_process.exec;
const spawn = child_process.spawn;

r.style({
  "title": {
    display: "block",
    margin: "1 0 1"
  },

  "highlight": {
    marginRight: "1",
    marginLeft: "1",
    color: "bright-yellow"
  },

  "error": {
    display: "block",
    color: "black",
    background: "red",
    bullet: '"  ❌ "'
  },

  "message": {
    display: "block",
    color: "bright-cyan",
    bullet: '"  👉 "',
    margin: "0 3 1"
  },

  "success": {
    display: "block",
    color: "bright-green",
    bullet: '"  ✅ "',
    margin: "0 3 1"
  }
});

class BonnyLaravel {

  constructor() {
    console.log(r.render(`
      <title>
        🏁 The <highlight>Bonny Laravel Server</highlight> is starting...
      </title>
    `));
    this.setupVendors();
  }

  setupVendors() {
    const that = this;
    try {
        fs.accessSync("./vendor/", fs.F_OK);
        that.artisanServe()
    } catch (e) {
      console.log(r.render(`
        <message>unzipping the vendor.zip...</message>
      `));
      exec('unzip vendor.zip', {
        encoding: 'utf8',
        maxBuffer: 1000*1024
      }, (error, stdout, stderr) => {
          if (error) {
            console.log(r.render(`
              <error> ${error} </error>
            `));
            return;
          }
          console.log(r.render(`
            <success>unzipping completed </success>
          `));
          that.artisanServe();
      });
    }
  }

  artisanServe() {

    this.artisanGenerateKey();

    const serve = spawn('php', ['artisan', 'serve']);

    serve.stdout.on('data', (data) => {
      console.log(r.render(`<message>${data}</message>`));
    });

    serve.stderr.on('data', (data) => {
      console.log(r.render(`<error> ${data} </error>`));
    });
  }

  artisanGenerateKey() {
    exec('php artisan key:generate');
    console.log(r.render(`<success>New Security Key Generated! 🔐</success>`));
  }

}

const app = new BonnyLaravel();
