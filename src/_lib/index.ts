import { App } from 'vue'
import TextBox from './TextBox.vue'
import AppButton from './AppButton.vue'

export function registerLib(app: App) {
  app.component('AppButton', AppButton).component('TextBox', TextBox)
}
