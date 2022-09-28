// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// const fs = require('fs-extra')
// const path = require('path')

module.exports = (on,config) => {
    on('before:browser:launch', (browser = {}, args) => {
        if(browser.name === 'chrome'){
            args.push('--start-fullscreen')
            //args.push('--incognito') It's not necessary because by default, Cypress open a fresh instance of the browsers.
            return args
        }
        if(browser.name  === 'electron'){
            args['fullscreen'] = true
            return args
        }
    })

    // function processConfigName(on, config){
    //     const file= config.env.name || "default"
    //     return getConfigFile(file).then(function(file){
    //         //file.baseUrl = file.baseUrl + process.env.URI_ROOT
    //         return file
    //     })
    // }
    
    // function getConfigFile(file){
    //     const pathToConfigFile = path.resolve('cypress', 'config', `${file}.json`)
    //     return fs.readJson(pathToConfigFile)
    // }

    // return processConfigName(on, config)
}


Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})