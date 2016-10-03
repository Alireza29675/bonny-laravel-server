const child_process = require('child_process');
const fs = require('fs');
const cli = require('bonny-cli-renderer');

const exec = child_process.exec;
const spawn = child_process.spawn;

class BonnyLaravel {

  constructor() {
    cli.log(`<title>🏁 The <highlight>Bonny Laravel Server</highlight> is starting...</title>`);
    this.setupVendors();
  }

  setupVendors() {
    const that = this;
    try {
        fs.accessSync("./vendor/", fs.F_OK);
        that.artisanServe()
    } catch (e) {
      cli.log(`
        <message>unzipping the vendor.zip...</message>
      `);
      exec('unzip vendor.zip', {
        encoding: 'utf8',
        maxBuffer: 1000*1024
      }, (error, stdout, stderr) => {
          if (error) {
            cli.log(`<error> ${error} </error>`);
            return;
          }
          cli.log(`<success>unzipping completed </success>`);
          that.artisanServe();
      });
    }
  }

  artisanServe() {

    this.artisanGenerateKey();

    const serve = spawn('php', ['artisan', 'serve']);

    serve.stdout.on('data', (data) => {
      cli.log(`<message>${data}</message>`);
    });

    serve.stderr.on('data', (data) => {
      cli.log(`<error> ${data} </error>`);
    });
  }

  artisanGenerateKey() {
    exec('php artisan key:generate');
    cli.log(`<success>New Security Key Generated! 🔐</success>`);
  }

}

const app = new BonnyLaravel();
