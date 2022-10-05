package org.rr0.im.business.investigation;

import junit.framework.TestCase;
import org.rr0.database.model.report.*;
import org.rr0.database.model.actor.HumanBeingImpl;
import org.rr0.database.model.actor.HumanBeing;
import org.rr0.database.model.actor.Identity;
import org.rr0.database.model.actor.IdentityImpl;
import org.rr0.database.model.event.*;
import org.rr0.database.model.event.circumstance.PreciseMomentImpl;
import org.rr0.database.model.event.circumstance.PreciseMoment;
import org.rr0.database.model.event.circumstance.IntervalMomentImpl;
import org.rr0.database.model.event.circumstance.Moment;
import org.rr0.database.model.investigation.Investigation;
import org.rr0.database.model.investigation.InvestigationImpl;
import org.rr0.database.model.evidence.BroadcastImpl;

/**
 * A test case about building a questionnaire.
 *
 * @author J�r�me Beau
 * @version 21 avr. 2003 16:18:28
 */
public class JulienTest extends TestCase {
    public JulienTest(String someTestName) {
        super(someTestName);
    }

    protected void setUp() throws InstantiationException, IllegalAccessException, ClassNotFoundException {
        Case julienCase = new CaseImpl("The Julien case");

        Identity malouIdentity = new IdentityImpl("Marie-Ren�e Lauret");
        malouIdentity.addEmail("malou.lauret@wanadoo.fr");
        HumanBeing malou = new HumanBeingImpl(malouIdentity);

        Identity dominiqueJulienIdentity = new IdentityImpl("Dominique Julien");
        dominiqueJulienIdentity.addEmail("d.julien@ool.fr");
        dominiqueJulienIdentity.addEmail("natsarraute@yahoo.fr");
        HumanBeing dominiqueJulien = new HumanBeingImpl(dominiqueJulienIdentity);

        Identity eveIdentity = new IdentityImpl("Eve Marchal");
        HumanBeing eve = new HumanBeingImpl(eveIdentity);

        Identity julienIdentity = new IdentityImpl("Eric Julien");
        julienIdentity.addEmail("eric.julien5@wanadoo.fr");
        HumanBeing ericJulien = new HumanBeingImpl(julienIdentity);
        Identity edermanIdentity = new IdentityImpl("Jean Ederman");
    ;
        edermanIdentity.addEmail("jean.ederman@softhome.net");
        ericJulien.addIdentity(edermanIdentity);
        ericJulien.addIdentity(malouIdentity);

        TimeLine julienHistory = ericJulien.getHistory();
        Relationship liveWithMalou = new RelationshipImpl("");
        julienHistory.add(liveWithMalou);

        PreciseMoment leavingReunionMoment = new PreciseMomentImpl(2003, 6, 1);
        PreciseMoment defrichageMoment = new PreciseMomentImpl(2003, 8, 1);
        Moment meetWithJulienMoment = new IntervalMomentImpl(leavingReunionMoment, defrichageMoment);
        Event meetWithJulien = new EventImpl("Meet with Julien", meetWithJulienMoment);
        eve.getHistory().add(meetWithJulien);
        Source eveClaimOfJulienDisapearanceonRIM = new BroadcastImpl("Eve's claim of Julien disapearance on RIM", eve);
        Account eveClaimOfJulienDisapearance = new EventsAccountImpl("Eve's claim of Julien disapearance on RIM", eveClaimOfJulienDisapearanceonRIM);
        julienCase.getAccounts().add(eveClaimOfJulienDisapearance);
        Investigation julienInvestigation = new InvestigationImpl(julienCase);
    }

    public void testWordCount() {
    }

    protected void tearDown() {
        // Nettoyage fin de test
    }
}
