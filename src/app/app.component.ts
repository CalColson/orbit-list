import { Component } from '@angular/core'
import { Satellite } from './satellite'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report'
  sourceList: Satellite[]
  displayList: Satellite[]

  constructor() {
    this.sourceList = []
    this.displayList = this.sourceList
    const satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json'

    window.fetch(satellitesUrl).then(function(response: Response) {
      response.json().then(function(data) {
        // console.log(data)

        const fetchedSatellites = data.satellites
        // TODO: loop over satellites
        for (const satellite of fetchedSatellites) {
          // TODO: create a Satellite object using new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
          const curSatellite = new Satellite(satellite.name, satellite.type, satellite.launchDate, satellite.orbitType, satellite.operational)
          // TODO: add the new Satellite object to sourceList using: this.sourceList.push(satellite);
          this.sourceList.push(curSatellite)
        }
        // console.log(this.sourceList)
      }.bind(this))
    }.bind(this))
  }

  search(): void {
    const matchingSatellites: Satellite[] = []
    const searchTerm = document.querySelector('input').value.toLowerCase()
    for (const satellite of this.sourceList) {
      const name = satellite.name.toLowerCase()
      if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(satellite)
      }
    }
    this.displayList = matchingSatellites
  }
}
