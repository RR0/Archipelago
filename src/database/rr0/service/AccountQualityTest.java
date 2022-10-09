package org.rr0.im.service;

import junit.framework.TestCase;
import org.rr0.database.model.actor.HumanBeing;
import org.rr0.database.model.actor.HumanBeingImpl;
import org.rr0.database.model.actor.Identity;
import org.rr0.database.model.actor.IdentityImpl;
import org.rr0.database.model.evidence.AffidavitImpl;
import org.rr0.database.model.report.*;
import org.rr0.database.model.investigation.*;
import org.rr0.database.model.event.circumstance.PreciseMomentImpl;
import org.rr0.database.model.event.TimeLine;
import org.rr0.database.model.evaluation.AccountQuality;
import org.rr0.database.model.evaluation.AccountQualityImpl;

/**
 * Test case for Account quality index computation.
 *
 * @author J�r�me Beau
 * @version 15 juin 2003 15:27:03
 */
public class AccountQualityTest extends TestCase {
    public AccountQualityTest(String someTestName) {
        super(someTestName);
    }

    protected void setUp() {
    }

    public void testPoorAccount() {
        Identity johnIdentity = new IdentityImpl("John Walker Smith");
        HumanBeing someOne = new HumanBeingImpl(johnIdentity);
        Source source = new AffidavitImpl("I swear I saw this thing", someOne);
        String accountText = "I saw a bright light";
        Account account = new TextAccountImpl("Poor account", source, accountText);
        AccountQuality accountQuality = new AccountQualityImpl();
        double accountQualityIndex = accountQuality.getValue(account);
        assertTrue("accountQualityIndex = " + accountQualityIndex, accountQualityIndex == 0.0);
    }

    public void testVeryGoodAccount() {
        Case sampleCase = new CaseImpl("Sample case");
        Investigation investigation = new InvestigationImpl(sampleCase);
        Interview interview = new FaceToFaceInterviewImpl("First interview");
        investigation.getActs().add(interview);
        String accountText = "I saw a bright light";
        Account account = new TextAccountImpl("Very good account", investigation, accountText);
        AccountQuality accountQuality = new AccountQualityImpl();
        double accountQualityIndex = accountQuality.getValue(account);
        assertTrue("accountQualityIndex = " + accountQualityIndex, accountQualityIndex == 0.3);
    }

    public void testMcMinnville() {
        Case sampleCase = new CaseImpl("McMinnville");
        Investigation powellInvestigation = new InvestigationImpl(sampleCase);
        Interview powellInterview = new FaceToFaceInterviewImpl("Powell interview");
        TimeLine powellQuestions = powellInterview.getQuestions();
        FreeTextQuestionImpl powellQuestion = new FreeTextQuestionImpl("1st question", new PreciseMomentImpl(1950, 06, 07));
        powellQuestions.add(powellQuestion);
        powellInvestigation.getActs().add(powellInterview);
        String account1 = "�taient dehors derri�re la maison, et tous 2... le virent au m�me moment"
                + "l'objet venait vers nous et semblait �tre un peu inclin� vers le haut. Il �tait tr�s brillant � presque argent� � et il n'y avait pas de bruit ou de fum�e"
                + "tr�s brillant - presque argent�"
                + "Le Telephone Register ne se professe pas lui-m�me expert dans le domaines des soucoupes volantes. Cependant, au regard de la vari�t� d'opinions et de rapports attendant aux soucoupes durant les 2 derni�res ann�es, tout effort a �t� fait pour v�rifier l'authenticit� des photos des Trent. Des experts photographes ont d�clar� qu'il n'y avait eu aucune modification des n�gatifs. Les photos d'origine furent d�velopp�es par une compagnie locale. Apr�s un examen attentif, il n'appara�t aucune possibilit� de canular ou d'hallucination li� aux photos. Par cons�quent le Telephone Register les consid�re authentiques";
        String account2 = "non ondulant ou ni en rotation, juste une \"sorte de glissement\""
                + "s'�vanouissant faiblement vers l'Ouest"
                + "brillamment m�tallique, de couleur argent ou aluminum, avec une touche de bronze... apparut avoir une sorte de superstructure... \"comme une canop�e de parachute de bonne taille sans les filins, seulement brillant-argent� m�l� � du bronze\""
                + "il y eut une brise alors qu'il passa au-dessus... qui s'apaisa par la suite"
                + "pr�s de vous assommer"
                + "en �tre un peu effray�"
                + "craindre d'avoir des ennuis avec le \"gouvernement\" et ne pas vouloir �tre ennuy� par de la publicit�"
                + "sur le sol sous un secr�taire o� les enfants des t�moins jouaient avec";
        String account3 = "[le t�moin 2] �labora, \"Il n'y avait aucune flamme et il se d�pla�ait plut�t lentement. C'est alors que je prenais la 1�re photo. Il se d�pla�a un peu plus � gauche et je me d�pla�ais sur la droite pour prendre une autre photo.\""
                + "vous entendez tellement de trucs � propos de ces choses... Je ne croyais pas toutes ces histoires sur les soucoupes volantes avant, mais maintenant j'ai l'id�e que l'Arm�e sait ce qu'elles sont"
                + "en �tre un peu effray�";
        String account6 = "terriblement beau";
        Account account = new TextAccountImpl("McMinville account", powellInvestigation, account1);
        AccountQuality accountQuality = new AccountQualityImpl();
        double accountQualityIndex = accountQuality.getValue(account);
        System.out.println("McMinnville accountQualityIndex = " + accountQualityIndex);
        assertTrue("accountQualityIndex = " + accountQualityIndex, accountQualityIndex == 0.3);
        //        assertTrue ("accountQualityIndex = " + accountQualityIndex, accountQualityIndex == 0.3);
    }

    protected void tearDown() {
        // Nettoyage fin de test
    }
}
