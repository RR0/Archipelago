package org.rr0.database.archipelago;

import com.Ostermiller.util.CSVParser;
import org.htmlparser.Parser;
import org.htmlparser.filters.NodeClassFilter;
import org.htmlparser.tags.LinkTag;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;
import org.rr0.im.meta.MetaObject;
import org.ufomatics.archipelago.model.AbstractDatabaseAdapter;
import org.ufomatics.archipelago.model.MetaException;
import org.ufomatics.archipelago.model.MetaObjectNotFoundException;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

public class OVNIFranceDatabaseAdapter extends AbstractDatabaseAdapter {
  static final String[] FIELD_NAMES = new String[]{"Num cas", "Départ.", "Ville", "Latitude", "Longitude", "CR Observation", "Typ Obs", "Date", "Heure", "Nbre Objets", "Type Objet", "Couleur", "Brillance", "Effetvisuel", "Disp inst", "Type Entité", "Effets témoin", "Effet Physique", "Nbre Témoins", "Enq Off", "", "Météo", "Année", "Atter"};
  int DESCRIPTION_FIELD_INDEX = 5;
  int DATE_FIELD_INDEX = 7;
  int HOUR_FIELD_INDEX = 8;
  private URL baseUrl;
  private char csvDelimiter = '&';
  private static final String DEFAULT_URL = "https://baseovnifrance.free.fr";

  public OVNIFranceDatabaseAdapter() {
  }

  public void init(Properties setupProperties) throws MetaException {
    String spec = setupProperties.getProperty("archipelago:ovnifrance:url");
    if (spec == null) {
      spec = DEFAULT_URL;
    }

    try {
      this.baseUrl = new URL(spec);
    } catch (MalformedURLException var4) {
      throw new MetaException("Could not initialize OVNI France Adapter because of wrong URL", var4);
    }
  }

  public String getName() {
    return "OVNI France adapter";
  }

  public void read(MetaObject sighting) throws MetaException {
    try {
      Object moment = sighting.get("moment");
      Calendar calendar = this.getCalendar(moment);
      int year = calendar.get(1);
      String requestUrl = this.baseUrl + "/ficreq.php?req=where%20annee%20LIKE%20" + year;
      Parser webPageParser = new Parser(requestUrl);
      NodeList nodes = webPageParser.extractAllNodesThatMatch(new NodeClassFilter(LinkTag.class));
      String retrieveUrl = null;

      for (int i = 0; i < nodes.size(); ++i) {
        LinkTag node = (LinkTag) nodes.elementAt(i);
        String linkUrl = node.getLink();
        if (linkUrl.startsWith(this.baseUrl + "/attente/")) {
          retrieveUrl = linkUrl;
          break;
        }
      }

      if (null == retrieveUrl) {
        throw new MetaException("Could not find retrieval link in " + retrieveUrl);
      } else {
        URL retrieve = new URL(retrieveUrl);
        InputStream inputStream = retrieve.openStream();
        CSVParser csvParser = new CSVParser(inputStream, this.csvDelimiter);
        String[][] values = csvParser.getAllValues();
        DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy", Locale.FRANCE);
        String dateToFind = dateFormat.format(calendar.getTime());

        int lineNumber;
        for (lineNumber = 0; lineNumber < values.length; ++lineNumber) {
          String[] line = values[lineNumber];
          if (dateToFind.equals(line[this.DATE_FIELD_INDEX])) {
            String description = line[this.DESCRIPTION_FIELD_INDEX];
            sighting.set("content", description, this);
            break;
          }
        }

        if (lineNumber == values.length) {
          throw new MetaObjectNotFoundException(sighting, this);
        }
      }
    } catch (ParserException var18) {
      throw new MetaException(var18);
    } catch (MalformedURLException var19) {
      throw new MetaException(var19);
    } catch (IOException var20) {
      throw new MetaException(var20);
    }
  }

  private Calendar getCalendar(Object moment) {
    Calendar calendar = GregorianCalendar.getInstance(Locale.FRENCH);
    calendar.setTime((Date) moment);
    return calendar;
  }

  public void close() {
  }
}
