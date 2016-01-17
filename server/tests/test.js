import webdriver from 'selenium-webdriver'
import path from 'path'
import chrome from 'selenium-webdriver/chrome'
import io from 'socket.io-client'
import colors from 'colors'

describe("Test logcatIO server", () => {
  let socket = io("http://localhost:5000")
  let By = webdriver.By, until = webdriver.until
  let driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build()
  
  let options = {
    "? undefined:undefined ?" : "",
    "action" : "Action",
    "brand" : "Brand",
    "model" : "Model",
    "manufacturer" : "Manufacturer",
    "sdk" : "SDK",
    "serial" : "Serial"
  }

  let titles = {
    'title-action' : "Action",
    'title-brand' : "Brand",
    'title-model' : "Model",
    'title-manufacturer' : "Manufacturer",
    'title-sdk' : "SDK",
    'title-serial' : "Serial",
    'title-log' : "Log"
  }

  let err = (actual, expected) => {
    throw new Error("Assert error\n+++actual "+actual+"\n---expected ".green+expected.green)
  }

  it("test", (done) => {
    driver.get("http://localhost:5000")
    driver
      .findElement(By.name('q'))
    driver
      .findElement(By.name('field'))
      .findElements(By.tagName('option'))
      .then( (els) => {
        for(let i=0; i<els.length; i++){
          let el = els[i]
          el.getAttribute("value").then( (val) => {
            let textShouldBe = options[val]
            el.getText().then( (text) => {
              if(text != textShouldBe) 
                err(textShouldBe, text)
            })
          })
        }
      })
    for(let i in titles) {
      let className = i
      let title = titles[i]
      driver
        .findElement(By.className(className))
        .getText()
        .then( (text) => {
          if(title != text)
            err(title, text)
        })
    }
    let card = {
      "brand" : "google",
      "model" : "Nexus 5",
      "manufacturer" : "lg",
      "sdk" : "23",
      "serial" : "07042e0e13cca2d0"
    }
    let otherCard = {
      "brand" : "samsung",
      "model" : "Galaxy S5",
      "manufacturer" : "samsung",
      "sdk" : "21",
      "serial" : "07042e0e13cca2d1"
    }
    driver
      .findElement(By.tagName("tbody"))
      .then( (el) => {
        socket.emit("greetings", card)
      })
    driver
      .wait(until.elementLocated(By.className("log-emit")), 5000)
      .then( (el) => {
        el
        .findElement(By.className("log-action"))
        .getText()
        .then( (text) => {
          if(text != "connected")
            err("connected", text)
        })
        el
        .findElement(By.className("log-brand"))
        .getText()
        .then( (text) => {
          if(text != card["brand"])
            err(card["brand"], text)
        })
        el
        .findElement(By.className("log-model"))
        .getText()
        .then( (text) => {
          if(text != card["model"])
            err(card["model"], text)
        })
        el
        .findElement(By.className("log-manufacturer"))
        .getText()
        .then( (text) => {
          if(text != card["manufacturer"])
            err(card["manufacturer"], text)
        })
        el
        .findElement(By.className("log-sdk"))
        .getText()
        .then( (text) => {
          if(text != card["sdk"])
            err(card["sdk"], text)
        })
        el
        .findElement(By.className("log-serial"))
        .getText()
        .then( (text) => {
          if(text != card["serial"])
            err(card["serial"], text)
        })
        el
        .findElement(By.className("log-log"))
        .getText()
        .then( (text) => {
          if(text != "")
            err("", text)
        })
      })
    driver
      .findElement(By.className('log-emit'))
      .then( (el) => {
        otherCard["log"] = "some log"
        socket.emit("dump", otherCard)
      })
    driver
      .findElements(By.className('log-emit'))
      .then( (els) => {
        let el = els[1]
         el
        .findElement(By.className("log-action"))
        .getText()
        .then( (text) => {
          if(text != "log")
            err("log", text)
        })
        el
        .findElement(By.className("log-brand"))
        .getText()
        .then( (text) => {
          if(text != otherCard["brand"])
            err(otherCard["brand"], text)
        })
        el
        .findElement(By.className("log-model"))
        .getText()
        .then( (text) => {
          if(text != otherCard["model"])
            err(otherCard["model"], text)
        })
        el
        .findElement(By.className("log-manufacturer"))
        .getText()
        .then( (text) => {
          if(text != otherCard["manufacturer"])
            err(otherCard["manufacturer"], text)
        })
        el
        .findElement(By.className("log-sdk"))
        .getText()
        .then( (text) => {
          if(text != otherCard["sdk"])
            err(otherCard["sdk"], text)
        })
        el
        .findElement(By.className("log-serial"))
        .getText()
        .then( (text) => {
          if(text != otherCard["serial"])
            err(otherCard["serial"], text)
        })
        el
        .findElement(By.className("log-log"))
        .getText()
        .then( (text) => {
          if(text != otherCard["log"])
            err(otherCard["log"], text)
        })
      })
    driver
      .findElement(By.className('log-emit'))
      .then( (el) => {
        socket.disconnect()
      })
    driver
      .findElements(By.className('log-emit'))
      .then( (els) => {
        let el = els[2]
         el
        .findElement(By.className("log-action"))
        .getText()
        .then( (text) => {
          if(text != "disconnect")
            err("disconnect", text)
        })
        el
        .findElement(By.className("log-brand"))
        .getText()
        .then( (text) => {
          if(text != card["brand"])
            err(card["brand"], text)
        })
        el
        .findElement(By.className("log-model"))
        .getText()
        .then( (text) => {
          if(text != card["model"])
            err(card["model"], text)
        })
        el
        .findElement(By.className("log-manufacturer"))
        .getText()
        .then( (text) => {
          if(text != card["manufacturer"])
            err(card["manufacturer"], text)
        })
        el
        .findElement(By.className("log-sdk"))
        .getText()
        .then( (text) => {
          if(text != card["sdk"])
            err(card["sdk"], text)
        })
        el
        .findElement(By.className("log-serial"))
        .getText()
        .then( (text) => {
          if(text != card["serial"])
            err(card["serial"], text)
        })
        el
        .findElement(By.className("log-log"))
        .getText()
        .then( (text) => {
          if(text != "")
            err("", text)
        })
      })
    driver
      .findElement(By.name("field"))
      .then( (el) => {
        el
        .findElements(By.tagName("option"))
        .then( (els) => {
          for(let i=0; i<els.length; i++) {
            let el = els[i]
            el
            .getAttribute("value")
            .then( (val) => {
              if(val == "action")
                el.click()
            })
          }
        })
      })
    driver
      .findElement(By.name("q"))
      .sendKeys("connected")
    driver
      .findElements(By.className("log-action"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != "connected")
                err(text, "connected")
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("q"))
      .sendKeys("log")
    driver
      .findElements(By.className("log-action"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != "log")
                err(text, "log")
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("q"))
      .sendKeys("disconnect")
    driver
      .findElements(By.className("log-action"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != "disconnect")
                err(text, "disconnect")
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("field"))
      .then( (el) => {
        el
        .findElements(By.tagName("option"))
        .then( (els) => {
          for(let i=0; i<els.length; i++) {
            let el = els[i]
            el
            .getAttribute("value")
            .then( (val) => {
              if(val == "brand")
                el.click()
            })
          }
        })
      })
    driver
      .findElement(By.name("q"))
      .sendKeys(card["brand"])
    driver
      .findElements(By.className("log-brand"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != card["brand"])
                err(text, card["brand"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("q"))
      .sendKeys(otherCard["brand"])
    driver
      .findElements(By.className("log-brand"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != otherCard["brand"])
                err(text, otherCard["brand"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("field"))
      .then( (el) => {
        el
        .findElements(By.tagName("option"))
        .then( (els) => {
          for(let i=0; i<els.length; i++) {
            let el = els[i]
            el
            .getAttribute("value")
            .then( (val) => {
              if(val == "model")
                el.click()
            })
          }
        })
      })
    driver
      .findElement(By.name("q"))
      .sendKeys(card["model"])
    driver
      .findElements(By.className("log-model"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != card["model"])
                err(text, card["model"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("q"))
      .sendKeys(otherCard["model"])
    driver
      .findElements(By.className("log-model"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != otherCard["model"])
                err(text, otherCard["model"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("field"))
      .then( (el) => {
        el
        .findElements(By.tagName("option"))
        .then( (els) => {
          for(let i=0; i<els.length; i++) {
            let el = els[i]
            el
            .getAttribute("value")
            .then( (val) => {
              if(val == "manufacturer")
                el.click()
            })
          }
        })
      })
    driver
      .findElement(By.name("q"))
      .sendKeys(card["manufacturer"])
    driver
      .findElements(By.className("log-manufacturer"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != card["manufacturer"])
                err(text, card["manufacturer"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("q"))
      .sendKeys(otherCard["manufacturer"])
    driver
      .findElements(By.className("log-manufacturer"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != otherCard["manufacturer"])
                err(text, otherCard["manufacturer"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("field"))
      .then( (el) => {
        el
        .findElements(By.tagName("option"))
        .then( (els) => {
          for(let i=0; i<els.length; i++) {
            let el = els[i]
            el
            .getAttribute("value")
            .then( (val) => {
              if(val == "sdk")
                el.click()
            })
          }
        })
      })
    driver
      .findElement(By.name("q"))
      .sendKeys(card["sdk"])
    driver
      .findElements(By.className("log-sdk"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != card["sdk"])
                err(text, card["sdk"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("q"))
      .sendKeys(otherCard["sdk"])
    driver
      .findElements(By.className("log-sdk"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != otherCard["sdk"])
                err(text, otherCard["sdk"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("field"))
      .then( (el) => {
        el
        .findElements(By.tagName("option"))
        .then( (els) => {
          for(let i=0; i<els.length; i++) {
            let el = els[i]
            el
            .getAttribute("value")
            .then( (val) => {
              if(val == "serial")
                el.click()
            })
          }
        })
      })
    driver
      .findElement(By.name("q"))
      .sendKeys(card["serial"])
    driver
      .findElements(By.className("log-serial"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != card["serial"])
                err(text, card["serial"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
    driver
      .findElement(By.name("q"))
      .sendKeys(otherCard["serial"])
    driver
      .findElements(By.className("log-serial"))
      .then( (els) => {
        for(let i=0; i<els.length; i++) {
          let el = els[i]
          el
          .getText()
          .then( (text) => {
            if(text != "") {
              if(text != otherCard["serial"])
                err(text, otherCard["serial"])
            }
          })
        }
      })
    driver
      .findElement(By.name("q"))
      .clear()
      .then( () => {
        done()
      })
  })

  after( () => {
    return driver.quit()
  })
})
