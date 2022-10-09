package org.rr0.im.business;

import junit.framework.TestCase;
import org.apache.commons.validator.Validator;
import org.apache.commons.validator.ValidatorResources;
import org.rr0.database.archipelago.OVNIFranceDatabaseAdapter;
import org.rr0.database.archipelago.RR0DatabaseAdapter;
import org.ufomatics.archipelago.control.Merger;
import org.ufomatics.archipelago.control.MergerImpl;
import org.ufomatics.archipelago.model.*;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

/**
 * A test for describing the Roswell case using the RR0 Information Model.
 *
 * @author Jérôme Beau
 * @version 21 avr. 2003 16:18:28
 */
public class MetaObjectTest extends TestCase {
  private DatabaseAdapter rr0Adapter = (DatabaseAdapter) new RR0DatabaseAdapter();
  private DatabaseAdapter ovniFranceAdapter;
  private MetaType sightingMetaType;
  private static final String SIGHTING_CONTENT_1 = "Un témoin, scientifique a observé pendant une à 19 minutes un objet de forme ronde. Son diamètre apparant a été estimé à 15 minute d'arc sa couleur etait orangé, émettant une lumière plutôt fluorescente. L'objet était animé d'un mouvement de rotation. Il a parcouru sa trajectoire au zénit à une vitesse estimée de 1000 à 1500 km/h, pour une distance au témoin de 1 à 3 km. Il faisait des virages brusques.";
  private static final String SIGHTING_CONTENT_2 = "Un scientifique observe pendant 19 mn un objet rond, de diamètre apparent estimé à 15 mn d'arc, de couleur orangée, émettant une lumière plutôt fluorescente. L'objet était animé d'un mouvement de rotation. Il a parcouru sa trajectoire au zénith à une vitesse estimée de 1000 à 1500 km/h, pour une distance au témoin de 1 à 3 km. Il faisait des virages brusques";
  private Database ovniFranceDatabase;
  private Database rr0Database;
  private MetaDataSource dummyUser;

  public MetaObjectTest(final String someTestName) {
    super(someTestName);
  }

  protected void setUp() throws IOException, SAXException, MetaException {
    Properties ovniFranceProperties = new Properties();
        ovniFranceProperties.setProperty("archipelago:ovnifrance:url", "http://baseovnifrance.free.fr");
        ovniFranceAdapter = new OVNIFranceDatabaseAdapter();
        ovniFranceAdapter.setProperties(ovniFranceProperties);

        Properties rr0Properties = new Properties();
        rr0Properties.setProperty("archipelago:rr0:url", "http://rr0.org");
        rr0Adapter.setProperties(rr0Properties);

        Identity userIdentity = new IdentityImpl("Dummy User");
        dummyUser = new UserImpl(Locale.getDefault(), "dummyUser", "dummyPassword", userIdentity);

        InputStream validatorsDefinitions = getClass().getResource("validator-rules.xml").openStream();
        InputStream validationRules = getClass().getResource("validation.xml").openStream();
        InputStream[] validatorStreams = { validatorsDefinitions, validationRules };
        ValidatorResources validatorResources = new ValidatorResources(validatorStreams);
        Validator yearValidator = new Validator(validatorResources);

        MetaType momentMetaType = new MetaTypeImpl("PreciseMoment");
        MetaTypeImpl integerType = new MetaTypeImpl("Integer");
        momentMetaType.add(new MetaFieldImpl("year", integerType));
        momentMetaType.add(new MetaFieldImpl("month", integerType));
        momentMetaType.add(new MetaFieldImpl("dayOfMonth", integerType));
        sightingMetaType = new MetaTypeImpl("Sighting");
    }

    public void testMerge() throws MetaException {

        Calendar moment = GregorianCalendar.getInstance();
        moment.set(GregorianCalendar.YEAR, 1951);
        moment.set(GregorianCalendar.MONTH, GregorianCalendar.JULY);
        moment.set(GregorianCalendar.DAY_OF_MONTH, 14);

        MetaObject object1 = new MetaObjectImpl(sightingMetaType);
        object1.set("moment", moment.getTime(), rr0Database);
        String content1 = SIGHTING_CONTENT_1;
        object1.set("content", content1, rr0Database);
        System.out.println("object1 = " + object1);

        MetaObject object2 = new MetaObjectImpl(sightingMetaType);
        object1.set("moment", moment.getTime(), ovniFranceDatabase);    // Same date
        String content2 = SIGHTING_CONTENT_2;
        object2.set("content", content2, ovniFranceDatabase);
        System.out.println("object2 = " + object2);

        Merger merger = new MergerImpl();
        MetaObject mergedObject = merger.merge(object1, object2);
        System.out.println("mergedObject = " + mergedObject);

        Date mergedMomentDate = (Date) mergedObject.get("moment");
        Calendar mergedMoment = GregorianCalendar.getInstance();
        mergedMoment.setTime(mergedMomentDate);

        // Same field values result in a single unchanged value
        assertEquals(1951, mergedMoment.get(GregorianCalendar.YEAR));
        assertEquals(GregorianCalendar.JULY, mergedMoment.get(GregorianCalendar.MONTH));
        assertEquals(14, mergedMoment.get(GregorianCalendar.DAY_OF_MONTH));

        // Different field values result in different fields
        Object mergedContent = mergedObject.get("content");
        assertNull(mergedContent);
        Object mergedContent1 = mergedObject.get("content_1");
        assertEquals(SIGHTING_CONTENT_1, mergedContent1);
        Object mergedContent2 = mergedObject.get("content_2");
        assertEquals(SIGHTING_CONTENT_2, mergedContent2);
    }

    public void testRetrievePlainSighting() throws MetaException {

        // Retrieves sighting data of February 4, 1997 from RR0 website
        {
            Calendar moment = GregorianCalendar.getInstance();
            moment.set(GregorianCalendar.YEAR, 1897);
            moment.set(GregorianCalendar.MONTH, GregorianCalendar.FEBRUARY);
            moment.set(GregorianCalendar.DAY_OF_MONTH, 4);
            MetaObject sighting = new MetaObjectImpl(sightingMetaType);
            sighting.set("moment", moment.getTime(), dummyUser);
            sighting.accept(rr0Adapter);
            String content = (String) sighting.get("content");
          assertEquals("A Inavale, à environ 60 km au Sud de Hastings, une douzaine de personnes qui reviennent de l'église sont survolées par un aéronef mystérieux de forme conique, d'une longueur évaluée à 10 m environ. 2 paires d'ailes dépassent des flancs de l'engin qui se termine par un gouvernail. Un projecteur est fixé à sa proue et on distingue 6 lumières plus petites. D'après les témoins, on peut entendre comme des voix et des rires venant du ciel.", content);
        }

        // Change database
        {
            Calendar moment = GregorianCalendar.getInstance();
            moment.set(GregorianCalendar.YEAR, 1951);
            moment.set(GregorianCalendar.MONTH, GregorianCalendar.JULY);
            moment.set(GregorianCalendar.DAY_OF_MONTH, 14);
            MetaObject sighting = new MetaObjectImpl(sightingMetaType);
            sighting.set("moment", moment.getTime(), dummyUser);
            sighting.accept(ovniFranceAdapter);
            String content = (String) sighting.get("content");
            assertEquals(SIGHTING_CONTENT_1, content);
            MetaObject source = (MetaObject) sighting.get("source");
//            assertEquals("Hynek, 1979", source.get("title"));
        }

        // Change year/HTML file
        {
            Calendar moment = GregorianCalendar.getInstance();
            moment.set(GregorianCalendar.YEAR, 1947);
            moment.set(GregorianCalendar.MONTH, GregorianCalendar.AUGUST);
            moment.set(GregorianCalendar.DAY_OF_MONTH, 12);
            MetaObject sighting = new MetaObjectImpl(sightingMetaType);
            sighting.set("moment", moment.getTime(), dummyUser);
            sighting.accept(rr0Adapter);
            String content = (String) sighting.get("content");
          assertEquals("A Las Vegas (Nevada), un objet rond orange descend par 2 fois au faîte des arbres.", content);
            MetaObject source = (MetaObject) sighting.get("source");
            assertEquals("Hynek, 1979", source.get("title"));
        }
    }

    public void testRetrieveSightingWithQuote() throws MetaException {
        {
            Calendar moment = GregorianCalendar.getInstance();
            moment.set(GregorianCalendar.YEAR, 1897);
            moment.set(GregorianCalendar.MONTH, GregorianCalendar.APRIL);
            moment.set(GregorianCalendar.DAY_OF_MONTH, 10);
            MetaObject sighting = new MetaObjectImpl(sightingMetaType);
            sighting.set("moment", moment.getTime(), dummyUser);
            sighting.accept(rr0Adapter);
            String content = (String) sighting.get("content");
          assertEquals("Observation d'un \"navire\" planant et jettant des \"sondes\" sur Newton (Iowa). En plusieurs endroits, cette chose merveilleuse fut observée par plusieurs personnes équipées de petites télescopes ou de jumelles (...). D'après ces personnes, le corps principal de l'objet volant nocturne doit avoir 20 m de longueur, il est de proportions agréable et semble être construit très fragilement. A ce corps est attaché un projecteur et d'autres lumières. Quelques observateurs affirment avoir vu, à peu de distance au-dessus de ce corps principal, comme des structures latérales ressemblant à des ailes ou à des voiles. Ces dernières devaient avoir 6 m de largeur [Chicago Chronicle].", content);
        }
    }
}
