package org.ufomatics.archipelago.model;

/**
 * @author Jerome Beau
 * @version 11 mai 2003 16:10:34
 */
public interface User extends MetaDataSource {
    String getLogin();

    boolean isPasswordValid(String somePassword);

    Identity getIdentity();
}
