package org.ufomatics.archipelago.model;

import org.ufomatics.archipelago.model.MetaField;
import org.ufomatics.archipelago.model.MetaType;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * @author <a href="mailto:rr0@rr0.org">Jerome Beau</a>
 * @version $revision$
 */
public class MetaTypeImpl implements MetaType, Serializable  {
    private String name;
    private Set<MetaField> fields = new HashSet<MetaField>();

    public MetaTypeImpl() {
    }

    public MetaTypeImpl(String name) {
        setName(name);
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addField(MetaField metaField) {
        fields.add (metaField);
    }

    public MetaField createField() {
        return new MetaFieldImpl();
    }

    public String getName() {
        return name;
    }

    public void add(MetaField field) {
        fields.add (field);
    }

    public void setFields(Set<MetaField> fields) {
        this.fields = fields;
    }

    public Set<MetaField> getFields() {
        return fields;
    }

    public String toString() {
        return getName();
    }
}
