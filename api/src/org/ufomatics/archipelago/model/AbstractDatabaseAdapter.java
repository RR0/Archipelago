package org.ufomatics.archipelago.model;

import java.util.Properties;

/**
 * @author <a href="mailto:rr0@rr0.org">Jerome Beau</a>
 * @version $revision$
 */
public abstract class AbstractDatabaseAdapter implements DatabaseAdapter {
    private Properties properties;

    protected AbstractDatabaseAdapter() {
    }

    protected abstract void init(Properties setupProperties) throws MetaException;

    public Properties getProperties() {
        return properties;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
        try {
            init (properties);
        } catch (MetaException e) {
            e.printStackTrace();
        }
    }

    public MetaObject visit(MetaObject original) throws MetaException {
        MetaObject readObject = new MetaObjectImpl(original.getType());
        readObject.setValues(original.getValues(), this);
        read(readObject);
        return readObject;
    }

    public abstract void read(MetaObject readObject) throws MetaException;
}
