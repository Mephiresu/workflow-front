import 'pinia'
import { Router } from 'vue-router'
import Toaster from '@meforma/vue-toaster'

declare module '@meforma/vue-toaster' {
  // eslint-disable-next-line @typescript-eslint/ban-types
  export const install: PluginFunction<{}>

  export interface ToasterOptions {
    message?: string
    type?: 'default' | 'success' | 'info' | 'warning' | 'error'
    position?:
      | 'top'
      | 'bottom'
      | 'top-right'
      | 'bottom-right'
      | 'top-left'
      | 'bottom-left'
    duration?: number
    dismissible?: boolean
    onClick?(): void
    onClose?(): void
    queue?: boolean
    pauseOnHover?: boolean
    useDefaultCss?: boolean
  }
  export = class Toaster {
    clear(): void

    show(message: string, options?: ToasterOptions): void
    success(message: string, options?: ToasterOptions): void
    error(message: string, options?: ToasterOptions): void
    info(message: string, options?: ToasterOptions): void
    warning(message: string, options?: ToasterOptions): void
  }
}

interface ToasterOptions {
  message?: string
  type?: 'default' | 'success' | 'info' | 'warning' | 'error'
  position?:
    | 'top'
    | 'bottom'
    | 'top-right'
    | 'bottom-right'
    | 'top-left'
    | 'bottom-left'
  duration?: number
  dismissible?: boolean
  onClick?(): void
  onClose?(): void
  queue?: boolean
  pauseOnHover?: boolean
  useDefaultCss?: boolean
}

declare module 'pinia' {
  export interface PiniaCustomProperties<S> {
    $router: Router
    $toaster: {
      clear(): void

      show(message: string, options?: ToasterOptions): void
      success(message: string, options?: ToasterOptions): void
      error(message: string, options?: ToasterOptions): void
      info(message: string, options?: ToasterOptions): void
      warning(message: string, options?: ToasterOptions): void
    }
  }
}
