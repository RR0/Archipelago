import {Properties} from "archipelago/api/util/jsdk/util/Properties"
import {MetaType, NUMBER, TEXT} from "archipelago/api/model/MetaType"
import {AbstractDatabaseAdapter} from "archipelago/api/model/AbstractDatabaseAdapter"
import {MetaTypeImpl} from "archipelago/api/model/MetaTypeImpl"
import {MetaObject} from "archipelago/api/model/MetaObject"
import {MetaException} from "archipelago/api/model/MetaException"
import {FRANCE, FRENCH, Locale} from "archipelago/api/util/jsdk/Locale"
import {Calendar} from "archipelago/api/util/jsdk/util/Calendar"
import {GregorianCalendar} from "archipelago/api/util/jsdk/util/GregorianCalendar"
import {MetaObjectNotFoundException} from "archipelago/api/model/MetaObjectNotFoundException"

export class RR0ArchipelagoAdapter extends AbstractDatabaseAdapter {
  private static readonly DEFAULT_URL = "http://rr0.org"
  private baseUrl: URL | undefined

  init(setupProperties: Properties): void {
    let spec = setupProperties.getProperty("archipelago:ovnifrance:url")
    if (spec == null) {
      spec = RR0ArchipelagoAdapter.DEFAULT_URL
    }
    try {
      this.baseUrl = new URL(spec)
    } catch (var12) {
      throw new MetaException("Could not initialize RR0 Adapter because of wrong URL", var12 as Error)
    }

    const dataModel = this.getDataModel()
    const dateType = dataModel.createType()
    dateType.setName("Date")
    dataModel.addMetaType(dateType)
    const dayOfMonth = dateType.createField()
    dayOfMonth.setType(NUMBER)
    dayOfMonth.setName("month")
    dateType.addField(dayOfMonth)
    const month = dateType.createField()
    month.setType(TEXT)
    month.setName("month")
    dateType.addField(month)
    const year = dateType.createField()
    year.setType(NUMBER)
    year.setName("year")
    dateType.addField(year)
    const caseType = dataModel.createType()
    caseType.setName("Case")
    dataModel.addMetaType(caseType)
    const dateField = caseType.createField()
    dateField.setName("date")
    dateField.setType(dateType)
    caseType.addField(dateField)
    const descriptionField = caseType.createField()
    descriptionField.setName("description")
    descriptionField.setType(TEXT)
    caseType.addField(descriptionField)
    const sourceField = caseType.createField()
    sourceField.setName("source")
    sourceField.setType(TEXT)
    caseType.addField(sourceField)
  }

  public getName(): string {
    return "R.R.0 adapter"
  }

  getBeanClasses(): Set<MetaType> {
    const sighting = new MetaTypeImpl("Sighting")
    const beanClasses = new Set<MetaType>()
    beanClasses.add(sighting)
    return beanClasses
  }

  read(sighting: MetaObject): void {
    try {
      const moment = sighting.get("moment")
      const calendar = this.getCalendar(moment)
      const webPageParser = new Parser(this.baseUrl + "/" + calendar.get(1) + ".html")
      const nodeFactory = new class extends StringNodeFactory {
        public createStringNode(page: Page, start: number, end: number): Text {
          const node = super.createStringNode(page, start, end)
          if (node instanceof AbstractNodeDecorator) {
            let buffer = node.toPlainTextString()

            for (let i = 0; i < buffer.length() - 1; ++i) {
              const c = buffer.charAt(i)
              if (c == " " && buffer.charAt(i + 1) == " ") {
                buffer.delete(i, i + 1)
                --i
              }
            }

            node.setText(buffer.toString())
          }

          return node
        }
      }()
      nodeFactory.setConvertNonBreakingSpaces(true)
      nodeFactory.setDecode(true)
      nodeFactory.setRemoveEscapes(true)
      webPageParser.setNodeFactory(nodeFactory)
      const isListItemFilter = new HasParentFilter(new NodeClassFilter(Bullet.class))
      const dateInMonthFormat = new SimpleDateFormat("d MMMM", FRANCE)
      const dateString1 = dateInMonthFormat.format(calendar.getTime()) + " :"
      const dateFilter1 = new StringFilter(dateString1)
      dateFilter1.setCaseSensitive(false)
      const dateWithDayOfMonthFormat = new SimpleDateFormat("EEEE d MMMM", FRANCE)
      const dateString2 = dateWithDayOfMonthFormat.format(calendar.getTime()) + " :"
      const dateFilter2 = new StringFilter(dateString2)
      dateFilter1.setCaseSensitive(false)
      const dateFilter = new OrFilter(dateFilter1, dateFilter2)
      const nodeFilter = new AndFilter(isListItemFilter, dateFilter)
      const nodeList = webPageParser.parse(nodeFilter)
      const simpleNodeIterator = nodeList.elements()
      if (!simpleNodeIterator.hasMoreNodes()) {
        throw new MetaObjectNotFoundException(sighting, this)
      } else {
        const node = simpleNodeIterator.nextNode()
        const parentNodeIterator = node.getParent().getChildren().elements()

        while (parentNodeIterator.hasMoreNodes()) {
          const subNode = parentNodeIterator.nextNode()
          if (subNode.equals(node)) {
            parentNodeIterator.nextNode()
            const text = ""

            do {
              const descnode = parentNodeIterator.nextNode()
              this.append(descnode, text, sighting)
            } while (parentNodeIterator.hasMoreNodes())

            const contentValue = text.toString().trim()
            sighting.set("content", contentValue, this)
            break
          }
        }
      }
    } catch (e) {
      throw new MetaException(e as Error)
    }
  }

  append(descnode: Node, text: string, sighting: MetaObject): void {
    const parent = descnode.getParent()
    if (parent instanceof Span) {
      const attribute = (parent as Span).getAttribute("class")
      if ("source".equals(attribute)) {
        const sourceValue = sighting.get("source") as Source
        if (null == sourceValue) {
          let text = ""
          const sourceValue = new ArticleImpl(text.toString(), null as Actor)
          sighting.set("source", sourceValue, this)
        } else {
          const sourcetxt = (sourceValue as Article).getText(Locale.getDefault())
          sourcetxt = sourcetxt + descnode.getText();
          (sourceValue as Article).setText(sourcetxt, Locale.getDefault())
        }
      }
    } else if (descnode instanceof AbstractNodeDecorator) {
      text.append(descnode.getText())
    }

    const children = descnode.getChildren()
    if (null != children) {
      const simpleNodeIterator = children.elements()

      while (simpleNodeIterator.hasMoreNodes()) {
        const node = simpleNodeIterator.nextNode()
        this.append(node, text, sighting)
      }
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
