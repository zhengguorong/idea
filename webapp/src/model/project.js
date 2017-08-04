export default class Project {
  constructor (project = {}) {
    this.title = project.title || ''
    this.author = project.author || ''
    this.state = project.state || 'CREATE'
    this.detail = project.detail || ''
    this.charge = project.charge || ''
    this.developer = project.developer || []
    this.startDate = project.startDate || new Date()
    this.endDate = project.endDate
    this.platform = project.platform || []
  }
}
