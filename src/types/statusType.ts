interface status {
  config: {
    slug: string
    title: string
    deescription: string
    icon: string
    theme: string
    published: boolean
    showTags: boolean
    customCSS: string
    footerText: string
    showPoweredBy: boolean
    googleAnalyticsId: unknown
  }
  incident: {
    id: number
    style: string
    title: string
    content: string
    pin: number
    createData: string
    lastUpdatedDate: null | string
  }
  publicGroupList: [
    {
      id: number
      name: string
      weight: number
      monitorList: [
        {
          id: string
          name: string
          sendUrl: number
        }
      ]
    }
  ]
  maintenanceList: []
}

export default status
