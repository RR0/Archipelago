package org.rr0.database.archipelago;

import java.net.MalformedURLException;
import java.net.URL;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.Locale;
import java.util.Properties;
import org.htmlparser.Node;
import org.htmlparser.NodeFilter;
import org.htmlparser.Parser;
import org.htmlparser.StringNodeFactory;
import org.htmlparser.Text;
import org.htmlparser.filters.AndFilter;
import org.htmlparser.filters.HasParentFilter;
import org.htmlparser.filters.NodeClassFilter;
import org.htmlparser.filters.OrFilter;
import org.htmlparser.filters.StringFilter;
import org.htmlparser.lexer.Page;
import org.htmlparser.nodeDecorators.AbstractNodeDecorator;
import org.htmlparser.tags.Bullet;
import org.htmlparser.tags.Span;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;
import org.htmlparser.util.SimpleNodeIterator;
import org.rr0.im.business.actor.Actor;
import org.rr0.im.business.evidence.Article;
import org.rr0.im.business.evidence.ArticleImpl;
import org.rr0.im.business.report.Source;
import org.rr0.im.meta.MetaField;
import org.rr0.im.meta.MetaModel;
import org.rr0.im.meta.MetaObject;
import org.rr0.im.meta.MetaType;
import org.ufomatics.archipelago.model.AbstractDatabaseAdapter;
import org.ufomatics.archipelago.model.MetaException;
import org.ufomatics.archipelago.model.MetaObjectNotFoundException;
import org.ufomatics.archipelago.model.MetaTypeImpl;

public class RR0DatabaseAdapter extends AbstractDatabaseAdapter {
  private URL baseUrl;
  private static final String DEFAULT_URL = "http://rr0.org";

  public RR0DatabaseAdapter() {
  }

  public void init(Properties setupProperties) throws MetaException {
    String spec = setupProperties.getProperty("archipelago:ovnifrance:url");
    if (spec == null) {
      spec = DEFAULT_URL;
    }

    try {
      this.baseUrl = new URL(spec);
    } catch (MalformedURLException var12) {
      throw new MetaException("Could not initialize RR0 Adapter because of wrong URL", var12);
    }

    MetaModel dataModel = this.getDataModel();
    MetaType dateType = dataModel.createType();
    dateType.setName("Date");
    dataModel.addMetaType(dateType);
    MetaField dayOfMonth = dateType.createField();
    dayOfMonth.setType(MetaTypeImpl.NUMBER);
    dayOfMonth.setName("month");
    dateType.addField(dayOfMonth);
    MetaField month = dateType.createField();
    month.setType(MetaTypeImpl.TEXT);
    month.setName("month");
    dateType.addField(month);
    MetaField year = dateType.createField();
    year.setType(MetaTypeImpl.NUMBER);
    year.setName("year");
    dateType.addField(year);
    MetaType caseType = dataModel.createType();
    caseType.setName("Case");
    dataModel.addMetaType(caseType);
    MetaField dateField = caseType.createField();
    dateField.setName("date");
    dateField.setType(dateType);
    caseType.addField(dateField);
    MetaField descriptionField = caseType.createField();
    descriptionField.setName("description");
    descriptionField.setType(MetaTypeImpl.TEXT);
    caseType.addField(descriptionField);
    MetaField sourceField = caseType.createField();
    sourceField.setName("source");
    sourceField.setType(MetaTypeImpl.TEXT);
    caseType.addField(sourceField);
  }

  public String getName() {
    return "R.R.0 adapter";
  }

  Collection getBeanClasses() {
    MetaTypeImpl sighting = new MetaTypeImpl("Sighting");
    Collection beanClasses = new HashSet();
    beanClasses.add(sighting);
    return beanClasses;
  }

  public void read(MetaObject sighting) throws MetaException {
    try {
      Object moment = sighting.get("moment");
      Calendar calendar = this.getCalendar(moment);
      Parser webPageParser = new Parser(this.baseUrl + "/" + calendar.get(1) + ".html");
      StringNodeFactory nodeFactory = new StringNodeFactory() {
        public Text createStringNode(Page page, int start, int end) {
          Text node = super.createStringNode(page, start, end);
          if (node instanceof AbstractNodeDecorator) {
            StringBuffer buffer = new StringBuffer(node.toPlainTextString());

            for(int i = 0; i < buffer.length() - 1; ++i) {
              char c = buffer.charAt(i);
              if (c == ' ' && buffer.charAt(i + 1) == ' ') {
                buffer.delete(i, i + 1);
                --i;
              }
            }

            node.setText(buffer.toString());
          }

          return node;
        }
      };
      nodeFactory.setConvertNonBreakingSpaces(true);
      nodeFactory.setDecode(true);
      nodeFactory.setRemoveEscapes(true);
      webPageParser.setNodeFactory(nodeFactory);
      NodeFilter isListItemFilter = new HasParentFilter(new NodeClassFilter(Bullet.class));
      DateFormat dateInMonthFormat = new SimpleDateFormat("d MMMM", Locale.FRANCE);
      String dateString1 = dateInMonthFormat.format(calendar.getTime()) + " :";
      StringFilter dateFilter1 = new StringFilter(dateString1);
      dateFilter1.setCaseSensitive(false);
      DateFormat dateWithDayOfMonthFormat = new SimpleDateFormat("EEEE d MMMM", Locale.FRANCE);
      String dateString2 = dateWithDayOfMonthFormat.format(calendar.getTime()) + " :";
      StringFilter dateFilter2 = new StringFilter(dateString2);
      dateFilter1.setCaseSensitive(false);
      NodeFilter dateFilter = new OrFilter(dateFilter1, dateFilter2);
      NodeFilter nodeFilter = new AndFilter(isListItemFilter, dateFilter);
      NodeList nodeList = webPageParser.parse(nodeFilter);
      SimpleNodeIterator simpleNodeIterator = nodeList.elements();
      if (!simpleNodeIterator.hasMoreNodes()) {
        throw new MetaObjectNotFoundException(sighting, this);
      } else {
        Node node = simpleNodeIterator.nextNode();
        SimpleNodeIterator parentNodeIterator = node.getParent().getChildren().elements();

        while(parentNodeIterator.hasMoreNodes()) {
          Node subNode = parentNodeIterator.nextNode();
          if (subNode.equals(node)) {
            parentNodeIterator.nextNode();
            StringBuffer text = new StringBuffer();

            do {
              Node descnode = parentNodeIterator.nextNode();
              this.append(descnode, text, sighting);
            } while(parentNodeIterator.hasMoreNodes());

            String contentValue = text.toString().trim();
            sighting.set("content", contentValue, this);
            break;
          }
        }

      }
    } catch (ParserException var22) {
      throw new MetaException(var22);
    }
  }

  private Calendar getCalendar(Object moment) {
    Calendar calendar = GregorianCalendar.getInstance(Locale.FRENCH);
    calendar.setTime((Date)moment);
    return calendar;
  }

  private void append(Node descnode, StringBuffer text, MetaObject sighting) {
    Node parent = descnode.getParent();
    if (parent instanceof Span) {
      String attribute = ((Span)parent).getAttribute("class");
      if ("source".equals(attribute)) {
        Source sourceValue = (Source)sighting.get("source");
        if (null == sourceValue) {
          text = new StringBuffer();
          Source sourceValue = new ArticleImpl(text.toString(), (Actor)null);
          sighting.set("source", sourceValue, this);
        } else {
          String sourcetxt = ((Article)sourceValue).getText(Locale.getDefault());
          sourcetxt = sourcetxt + descnode.getText();
          ((Article)sourceValue).setText(sourcetxt, Locale.getDefault());
        }
      }
    } else if (descnode instanceof AbstractNodeDecorator) {
      text.append(descnode.getText());
    }

    NodeList children = descnode.getChildren();
    if (null != children) {
      SimpleNodeIterator simpleNodeIterator = children.elements();

      while(simpleNodeIterator.hasMoreNodes()) {
        Node node = simpleNodeIterator.nextNode();
        this.append(node, text, sighting);
      }
    }

  }

  public void close() {
  }
}
