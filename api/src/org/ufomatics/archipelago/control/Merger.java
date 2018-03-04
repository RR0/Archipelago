package org.ufomatics.archipelago.control;

import org.ufomatics.archipelago.model.MetaObject;

/**
 * A Meta Object Merger
 *
 * @author Jerome Beau
 * @version $revision$
 */
public interface Merger {

    /**
     * Merge two Meta Objects.
     *
     * @param firstObject The first object to merge.
     * @param secondObject The second object to merge.
     * @return The resulting merged object.
     */
    MetaObject merge(MetaObject firstObject, MetaObject secondObject);
}
