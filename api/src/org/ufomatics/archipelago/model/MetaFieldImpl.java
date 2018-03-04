package org.ufomatics.archipelago.model;

import org.ufomatics.archipelago.model.MetaField;
import org.ufomatics.archipelago.model.MetaType;

import java.io.Serializable;

/**
 * @author <a href="mailto:rr0@rr0.org">Jerome Beau</a>
 * @version $revision$
 */
public class MetaFieldImpl implements MetaField, Serializable {
    private MetaType owner;
    private String name;
    private MetaType type;

    public MetaFieldImpl() {
    }

    public MetaFieldImpl(final String someName, MetaType someType) {
        name = someName;
        type = someType;
    }

    public MetaType getOwner() {
        return owner;
    }

    public MetaType getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(MetaType type) {
        this.type = type;
    }

    public void setOwner(MetaType owner) {
        this.owner = owner;
    }

    public void retrieve(Object databaseMappings) {
/*
        Iterator iterator = mappings.iterator();
        while (iterator.hasNext()) {
            FieldMapping fieldMapping = (FieldMapping) iterator.next();
            fieldMapping.getDatabase();
        }
*/
    }

    public String toString() {
        return getName() + ": " + type;
    }
}
