import { EcommerceEvent } from '../interfaces/dataLayerEvents'

const handleDataLayerEvent = (eventName: string, eventData: EcommerceEvent) => {
  if (typeof window !== 'undefined') {
    ;(window.dataLayer ?? []).push({
      event: eventName,
      ecommerce: eventData,
    })
  }
}

export default handleDataLayerEvent
