package org.ufomatics.archipelago.model;

import org.ufomatics.archipelago.model.MetaType;
import org.ufomatics.archipelago.model.MetaField;
import org.ufomatics.archipelago.model.MetaFunction;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;

/**
 * @author <a href="mailto:rr0@rr0.org">Jerome Beau</a>
 * @version $revision$
 */
public class MetaFunctionImpl implements MetaFunction, Serializable {
    private String name;
    private Set<MetaField> parameters = new HashSet<MetaField>();
    private MetaType returnType;

    public MetaFunctionImpl() {
    }

    public void setName(String name) {
        this.name = name;
    }

    public void addParameter(MetaField metaField) {
        parameters.add (metaField);
    }

    public MetaField createParameter() {
        return new MetaFieldImpl();
    }

    public String getName() {
        return name;
    }

    public void add(MetaField field) {
        parameters.add (field);
    }

    public void setParameters(Set<MetaField> parameters) {
        this.parameters = parameters;
    }

    public Set<MetaField> getParameters() {
        return parameters;
    }

    public MetaType getReturnType() {
        return returnType;
    }

    public void setReturnType(MetaType returnType) {
        this.returnType = returnType;
    }

    public String toString() {
        return getName() + ": " + getReturnType();
    }
}
