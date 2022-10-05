import {AbstractDatabaseAdapter} from "archipelago/api/model/AbstractDatabaseAdapter"
import {Properties} from "archipelago/api/util/jsdk/util/Properties"
import {MetaObject} from "archipelago/api/model/MetaObject"
import {GregorianCalendar} from "archipelago/api/util/jsdk/util/GregorianCalendar"
import {Calendar} from "archipelago/api/util/jsdk/util/Calendar"
import {FRANCE, FRENCH} from "archipelago/api/util/jsdk/Locale"
import {MetaException} from "archipelago/api/model/MetaException"
import {MetaObjectNotFoundException} from "archipelago/api/model/MetaObjectNotFoundException"


export class OVNIFranceDatabaseAdapter extends AbstractDatabaseAdapter {
  static readonly FIELD_NAMES = ["Num cas", "Départ.", "Ville", "Latitude", "Longitude", "CR Observation", "Typ Obs", "Date", "Heure", "Nbre Objets", "Type Objet", "Couleur", "Brillance", "Effetvisuel", "Disp inst", "Type Entité", "Effets témoin", "Effet Physique", "Nbre Témoins", "Enq Off", "", "Météo", "Année", "Atter"]
  static readonly DESCRIPTION_FIELD_INDEX = 5
  static readonly DATE_FIELD_INDEX = 7
  static readonly HOUR_FIELD_INDEX = 8
  private static readonly DEFAULT_URL = "http://ovnifrance.free.fr"
  private baseUrl: URL
  private csvDelimiter = "&"

  public OVNIFranceDatabaseAdapter() {
  }

  init(setupProperties: Properties): void {
    let spec = setupProperties.getProperty("archipelago:ovnifrance:url")
    if (spec == null) {
      spec = OVNIFranceDatabaseAdapter.DEFAULT_URL
    }
    try {
      this.baseUrl = new URL(spec)
    } catch (err) {
      throw new MetaException("Could not initialize OVNI France Adapter because of wrong URL", err)
    }
  }

  getName(): string {
    return "OVNI France adapter"
  }

  read(sighting: MetaObject): void {
    try {
      const moment = sighting.get("moment")
      const calendar = this.getCalendar(moment)
      const year = calendar.get(1)
      const requestUrl = this.baseUrl + "/ficreq.php?req=where%20annee%20LIKE%20" + year
      const webPageParser = new Parser(requestUrl)
      const nodes = webPageParser.extractAllNodesThatMatch(new NodeClassFilter(LinkTag.class))
      let retrieveUrl = null

      for (let i = 0; i < nodes.size(); ++i) {
        const node = nodes.elementAt(i) as LinkTag
        const linkUrl = node.getLink()
        if (linkUrl.startsWith(this.baseUrl + "/attente/")) {
          retrieveUrl = linkUrl
          break
        }
      }

      if (null == retrieveUrl) {
        throw new MetaException("Could not find retrieval link in " + retrieveUrl)
      } else {
        const retrieve = new URL(retrieveUrl)
        const inputStream = retrieve.openStream()
        const csvParser = new CSVParser(inputStream, this.csvDelimiter)
        const values = csvParser.getAllValues()
        const dateFormat = new SimpleDateFormat("dd-MM-yyyy", FRANCE)
        const dateToFind = dateFormat.format(calendar.getTime())

        let lineNumber
        for (lineNumber = 0; lineNumber < values.length; ++lineNumber) {
          const line = values[lineNumber]
          if (dateToFind.equals(line[OVNIFranceDatabaseAdapter.DATE_FIELD_INDEX])) {
            const description = line[OVNIFranceDatabaseAdapter.DESCRIPTION_FIELD_INDEX]
            sighting.set("content", description, this)
            break
          }
        }
        if (lineNumber == values.length) {
          throw new MetaObjectNotFoundException(sighting, this)
        }
      }
    } catch (err) {
      throw new MetaException(err)
    }
  }

  close(): void {
  }

  private getCalendar(moment: any): Calendar {
    const calendar = GregorianCalendar.getInstance(FRENCH)
    calendar.setTime(moment as Date)
    return calendar
  }
}
