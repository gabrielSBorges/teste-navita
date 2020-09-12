export default {
  template: /*html*/`
    <div>
      <v-app-bar app dense id="header">
        <v-container>
          <span class="primary--text">Navita</span>
        </v-container>
      </v-app-bar>
  
      <v-main class="mb-12">
        <v-container class="pt-5">
          <slot />
        </v-container>
      </v-main>
  
      <v-footer padless absolute bottom>
        <v-card flat tile class="flex text-center">
          <v-card-text>Copyright &copy Navita 2020</v-card-text>
        </v-card>
      </v-footer>
    </div>
  `
}