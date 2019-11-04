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
  typeInfos

  constructor() {
    this.sourceList = []
    this.displayList = this.sourceList

    this.typeInfos = [
      { typeName: 'Total', count: 0 },
      { typeName: 'Space Debris', count: 0 },
      { typeName: 'Communication', count: 0 },
      { typeName: 'Probe', count: 0 },
      { typeName: 'Positioning', count: 0 },
      { typeName: 'Space Station', count: 0 },
      { typeName: 'Telescope', count: 0 },
    ]

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
          // console.log(this.sourceList)

          for (const typeInfo of this.typeInfos) {
            if (typeInfo.typeName === curSatellite.type) {
              typeInfo.count++
              // Increment total
              this.typeInfos[0].count++
            }
          }
        }
        // console.log(this.typeInfos)
      }.bind(this))
    }.bind(this))
  }

  search(searchTerm: string): void {
    const matchingSatellites: Satellite[] = []
    const searchTermClean = searchTerm.toLowerCase()
    // console.log(searchTermClean)
    for (const satellite of this.sourceList) {
      const name = satellite.name.toLowerCase()
      if (name.indexOf(searchTermClean) >= 0) {
        matchingSatellites.push(satellite)
      }
      const orbitType = satellite.orbitType.toLowerCase()
      if (orbitType.indexOf(searchTermClean) >= 0 && !matchingSatellites.includes(satellite)) {
        matchingSatellites.push(satellite)
      }
      const type = satellite.type.toLowerCase()
      if (type.indexOf(searchTermClean) >= 0 && !matchingSatellites.includes(satellite)) {
        matchingSatellites.push(satellite)
      }
    }
    this.displayList = matchingSatellites

    // Type count display code
    this.typeInfos = [
      { typeName: 'Total', count: 0 },
      { typeName: 'Space Debris', count: 0 },
      { typeName: 'Communication', count: 0 },
      { typeName: 'Probe', count: 0 },
      { typeName: 'Positioning', count: 0 },
      { typeName: 'Space Station', count: 0 },
      { typeName: 'Telescope', count: 0 },
    ]

    for (const satellite of this.displayList) {
      for (const typeInfo of this.typeInfos) {
        if (typeInfo.typeName === satellite.type) {
          typeInfo.count++
          // Increment total
          this.typeInfos[0].count++
        }
      }
    }
  }
}
