package org.ufomatics.archipelago.control;

import org.ufomatics.archipelago.model.*;
import org.ufomatics.archipelago.util.Localizer;

import java.util.Set;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @author Jérôme Beau
 * @version 7 mai 2006 16:56:21
 */
public interface UFOPlatformController {
    Localizer getLocalizer();

    Set<DatabaseAdapter> getAdapters();

    void close();

    Set<Database> getDatasources();

    MetaModel getMetaModel();

    boolean hasMetaModel();

    void loadMetaMapping(String filename) throws MetaException;

    void saveMetaMapping(String filename) throws IOException;

    MetaType getDefaultFieldType();

    DatabaseAdapter getDefaultAdapter();

    void addDatasource(Database database);

    Database createDatasource();

    Set<String> getRecentFiles();
}
