const fs = require('fs');
const cli = require('bonny-cli-renderer');

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
      cli.log(`<message>unzipping the vendor.zip...</message>`);
      cli.exec('unzip vendor.zip', ()=>{
        cli.log(`<success> unzipping vendor.zip completed</success>`);
        that.artisanServe();
      });
    }
  }

  artisanServe() {
    this.artisanGenerateKey();
    cli.runtimeExec('php artisan serve');
  }

  artisanGenerateKey() {
    cli.exec('php artisan key:generate', ()=>{
      cli.log(`<success>New Security Key Generated! 🔐</success>`);
    });
  }

}

const app = new BonnyLaravel();
