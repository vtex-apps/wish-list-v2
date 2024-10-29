const handleDataLayerEvent = (eventName: string, eventData: unknown[]) => {
  if (typeof window !== 'undefined') {
    ;(window.dataLayer ?? []).push({
      event: eventName,
      items: eventData,
    })
  }
}

export default handleDataLayerEvent
