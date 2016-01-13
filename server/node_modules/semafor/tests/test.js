import semafor from '../lib/';

describe("semafor tests", () => {
 
  let oldLog;
  beforeEach("prepare console.log", () => {
    oldLog = console.log;
  })

  afterEach("remove test console.log", () => {
    console.log = oldLog;
  })

  it("should set fail message", (done) => {
    let log = semafor();
    console.log = function(msg) {
      if(msg.indexOf("This is an error") != -1) {
        if(msg.indexOf("✗") != -1) {
          done();
        }else{
          throw new Error("Error setting fail message");
        }
      }else{
        oldLog.apply(console, arguments);
      }
    }
    log.fail("This is an error");
  });

  it("should set warn message", (done) => {
    let log = semafor();
    console.log = function(msg) {
      if(msg.indexOf("This is a warning") != -1) {
        if(msg.indexOf("!") != -1) {
          done();
        }else{
          throw new Error("Error setting warning message");
        }
      }else{
        oldLog.apply(console, arguments);
      }
    }
    log.warn("This is a warning");
  });

  it("should set ok message", (done) => {
    let log = semafor();
    console.log = function(msg) {
      if(msg.indexOf("This is success") != -1) {
        if(msg.indexOf("✓") != -1) {
          done();
        }else{
          throw new Error("Error setting success message");
        }
      }else{
        oldLog.apply(console, arguments);
      }
    }
    log.ok("This is success");
  });

  it("should set simple message", (done) => {
    let log = semafor();
    console.log = function(msg) {
      if(msg.indexOf("This is sparta") != -1) {
        if(msg == "This is sparta") {
          done();
        }else{
          throw new Error("Error setting simple message");
        }
      }else{
        oldLog.apply(console, arguments);
      }
    }
    log.log("This is sparta");
  });

});
