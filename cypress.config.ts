// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });



// import { defineConfig } from 'cypress'

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       require('@cypress/code-coverage/task')(on, config)
//       // include any other plugin code...
//       return config
//     },
//     // Other Cypress configuration...
//   },
// })



import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      // other setup code...
      return config
    },
  },
})

