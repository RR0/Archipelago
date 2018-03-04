package org.ufomatics.archipelago.model;

import org.ufomatics.archipelago.model.MetaModel;
import org.ufomatics.archipelago.model.MetaType;
import org.ufomatics.archipelago.model.MetaFunction;

import java.util.Set;
import java.util.HashSet;
import java.io.Serializable;

/**
 * @author Jérôme Beau
 * @version 8 mai 2006 01:53:57
 */
public class MetaModelImpl implements MetaModel, Serializable {
    private Set<MetaType> classes = new HashSet<MetaType>();
    private Set<MetaFunction> functions = new HashSet<MetaFunction>();

    public MetaModelImpl() {
        addMetaType(MetaType.TEXT);
        addMetaType(MetaType.NUMBER);
        addMetaType(MetaType.IMAGE);
    }

    public Set<MetaType> getClasses() {
        return classes;
    }

    public void setClasses(Set<MetaType> classes) {
        this.classes = classes;
    }

    public boolean isEmpty() {
        return classes.isEmpty() && functions.isEmpty();
    }

    public void addMetaType(MetaType metaType) {
        classes.add (metaType);
    }

    public void addFunction(MetaFunction metaFunction) {
        functions.add (metaFunction);
    }

    public Set<MetaFunction> getFunctions() {
        return functions;
    }

    public void setFunctions(Set<MetaFunction> functions) {
        this.functions = functions;
    }

    public MetaType createType() {
        return new MetaTypeImpl();
    }

    public MetaFunction createFunction() {
        return new MetaFunctionImpl();
    }

    public MetaType getType (String typeName) {
        for (MetaType aClass : classes) {
            if (aClass.getName().equals (typeName)) {
                return aClass;
            }
        }
        return null;
    }
}
