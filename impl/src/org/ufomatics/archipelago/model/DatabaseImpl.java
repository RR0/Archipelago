package org.ufomatics.archipelago.model;

import org.ufomatics.archipelago.model.Database;
import org.ufomatics.archipelago.model.DatabaseAdapter;
import org.ufomatics.archipelago.model.MetaModel;

/**
 * @author <a href="mailto:rr0@rr0.org">Jerome Beau</a>
 * @version $revision$
 */
public class DatabaseImpl implements Database {
    private String name;
    private DatabaseAdapter adapter;
    private boolean enabled = true;

    public DatabaseImpl() {
    }

    public String getName() {
        return name;
    }

    public MetaModel getDataModel() {
        return adapter.getDataModel();
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAdapter(DatabaseAdapter adapter) {
        this.adapter = adapter;
    }

    public DatabaseAdapter getAdapter() {
        return adapter;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String toString() {
        return name + " (" + adapter + ')';
    }
}
