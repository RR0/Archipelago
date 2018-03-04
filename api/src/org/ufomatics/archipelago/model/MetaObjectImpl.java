package org.ufomatics.archipelago.model;

import java.util.Map;
import java.util.Iterator;
import java.util.HashMap;

/**
 * A Meta Object instance.
 *
 * @author <a href="mailto:rr0@rr0.org">Jerome Beau</a>
 * @version $revision$
 */
public class MetaObjectImpl implements MetaObject {

    private MetaType type;

    /**
     * The values' sources
     */
    private Map sources = new HashMap();
    private Map values = new HashMap();

    /**
     * Creates a meta object instance.
     *
     * @param metaType The type of the meta object.
     */
    public MetaObjectImpl(MetaType metaType) {
        this.type = metaType;
    }

    public MetaType getType() {
        return type;
    }

    /**
     * Ask this meta object to accept a visit.
     *
     * @param visitor The visitor
     * @throws MetaException
     * @return The resulting MetaObject (original modified)
     */
    public MetaObject accept(MetaObjectVisitor visitor) throws MetaException {
        return visitor.visit(this);
    }

    public Map getValues() {
        return values;
    }

    /**
     * Set a set for values.
     */
    public void setValues(Map results, MetaDataSource source) {
        Iterator iterator = results.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry entry = (Map.Entry) iterator.next();
            String propertyName = (String) entry.getKey();
            Object propertyValue = entry.getValue();
            set(propertyName, propertyValue, source);
        }
    }

    public Object get(String fieldName) {
        return values.get(fieldName);
    }

    /**
     * Set a given property to a given value.
     *
     * @param propertyName
     * @param propertyValue
     */
    public void set(String propertyName, Object propertyValue, MetaDataSource source) {
        values.put (propertyName, propertyValue);
        sources.put (propertyName, source);
    }

    public String toString() {
        StringBuffer sb = new StringBuffer (getType().getName()).append (" { \n");
        Iterator iterator = values.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry entry = (Map.Entry) iterator.next();
            String fieldName = (String) entry.getKey();
            Object value = entry.getValue();
            Object source = getSource(fieldName);
            sb.append ("  ").append (fieldName).append ('=').append(value).append(" [").append (source).append ("]\n");
        }
        return sb.append ("}").toString();
    }

    public MetaDataSource getSource(String fieldName) {
        return (MetaDataSource) sources.get(fieldName);
    }
}
