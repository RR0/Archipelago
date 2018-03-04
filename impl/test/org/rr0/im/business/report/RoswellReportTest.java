package org.rr0.im.business.report;

import junit.framework.TestCase;
import org.rr0.database.model.report.Case;
import org.rr0.database.model.report.CaseImpl;
import org.rr0.database.model.report.Source;
import org.rr0.database.model.event.circumstance.*;
import org.rr0.database.model.event.SightingImpl;
import org.rr0.database.model.event.Event;
import org.rr0.database.model.actor.*;
import org.rr0.database.model.evaluation.classification.Category;
import org.rr0.database.model.evaluation.AbstractFunction;

/**
 * A test for describing the Roswell case using the RR0 Information Model.
 *
 * @author Jérôme Beau
 * @version 21 avr. 2003 16:18:28
 */
public class RoswellReportTest extends TestCase {

    public RoswellReportTest(String someTestName) {
        super(someTestName);
    }

    protected void setUp() throws InstantiationException, IllegalAccessException, ClassNotFoundException {

        // The case in itself
        Case roswellCase = new CaseImpl("The Roswell Incident");

        // Case's actors
        Identity brazelIdentity = new IdentityImpl("William W. Brazel");
        HumanBeing brazel = new HumanBeingImpl(brazelIdentity);
        Identity usafIdentity = new IdentityImpl("United States Air Force");
        Organization usaf = new OrganizationImpl(usafIdentity);

        // First case's event : deflagration
        Moment firstDeflagrationMoment = new PreciseMomentImpl(1947, 7, 2, 21, 50);
        EarthLocation roswellCityLocation = new EarthLocationImpl(43, OrientationImpl.NORTH, 142, OrientationImpl.WEST);
        Place roswellCity = new PlaceImpl("Roswell", roswellCityLocation);
        Location ranchLocation = new DeltaLocationImpl(roswellCity.getLocation(), OrientationImpl.NORTH_WEST, LengthImpl.UNKNOWN);
        Place brazelRanch = new PlaceImpl("Brazel's ranch", ranchLocation);
        Clouds firstDeflagrationClouds = new CloudsImpl(0);
        Temperature firstDeflagrationTemperature = new TemperatureImpl(15);
        Wind firstDeflagrationWind = new WindImpl(10);
        Category windCategory = (Category) AbstractFunction.getFunction("ViolentWind");
        Precipitations firstDeflagrationPrecipitations = new PrecipitationsImpl(0);
        WeatherCondition weatherCondition = new WeatherConditionImpl(firstDeflagrationClouds, firstDeflagrationTemperature, firstDeflagrationWind, firstDeflagrationPrecipitations);

        Source source = null;
        Event firstDeflagation = new SightingImpl("Brazel heards a deflagration", firstDeflagrationMoment, brazelRanch, brazel, source);
        roswellCase.getAccounts().add(firstDeflagation);

        // Second case's event : Mac brazel
    }

    public void test1() {

    }

    protected void tearDown() {
        // Nettoyage fin de test
    }
}
