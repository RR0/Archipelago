package org.ufomatics.archipelago.model;

import org.ufomatics.archipelago.model.MetaMapping;
import org.ufomatics.archipelago.model.MetaModel;
import org.ufomatics.archipelago.model.Database;

import java.util.Set;
import java.util.HashSet;
import java.io.Serializable;

/**
 * @author Jérôme Beau
 * @version 10 juin 2006 18:49:46
 */
public class MetaMappingImpl implements MetaMapping, Serializable {
    private MetaModel metaModel = new MetaModelImpl();
    private Set<Database> datasources = new HashSet<Database>();

    public MetaModel getMetaModel() {
        return metaModel;
    }

    public Set<Database> getDatasources() {
        return datasources;
    }

    public void setMetaModel(MetaModel metaModel) {
        this.metaModel = metaModel;
    }

    public void setDatasources(Set<Database> datasources) {
        this.datasources = datasources;
    }
}
