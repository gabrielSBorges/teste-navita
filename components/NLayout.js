export default {
  template: /*html*/`
    <div>
      <v-app-bar app clipped-left dense id="header">
        <span class="primary--text ml-3">Navita</span>
      </v-app-bar>
  
      <v-main class="mb-12">
        <v-container class="pt-5">
          <slot />
        </v-container>
      </v-main>
  
      <v-footer app padless>
        <v-card flat tile class="flex text-center">
          <v-card-text>Copyright &copy Navita 2020</v-card-text>
        </v-card>
      </v-footer>
    </div>
  `
}