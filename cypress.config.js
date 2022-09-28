const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    video: true,
    screenshotsFolder: "cypress/screenshotsForFails",
    baseUrl: "http://eaapp.somee.com",
    excludeSpecPattern: [ "**/1-getting-started/**.js", "**/2-advanced-examples/**.js" ],
    env:{
      username: "admin"
    },
    reporter: 'mochawesome',
    reporterOptions: {
      "charts": true,
      "html": true,
      "json": true,
      "reportDir": "cypress/reports",
      "reportFilename": "report",
      "quiet": true, 
      "overwrite": false
    }
  },
});
