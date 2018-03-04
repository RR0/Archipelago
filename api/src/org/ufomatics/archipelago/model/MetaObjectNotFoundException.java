package org.ufomatics.archipelago.model;

/**
 * @author <a href="mailto:rr0@rr0.org">Jerome Beau</a>
 * @version $revision$
 */
public class MetaObjectNotFoundException extends MetaException {
    private MetaObject object;
    private MetaDataSource database;

    public MetaObjectNotFoundException() {
    }

    public MetaObjectNotFoundException(MetaObject object, MetaDataSource database) {
        this.object = object;
        this.database = database;
    }

    public MetaObjectNotFoundException(Throwable cause) {
        super(cause);
    }

    public MetaObjectNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public String getMessage() {
        return "Data for " + object + " could not be found in database " + database;
    }
}
