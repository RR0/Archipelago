package org.ufomatics.archipelago.control;

import org.ufomatics.archipelago.model.*;
import org.ufomatics.archipelago.util.Localizer;
import sun.misc.Launcher;

import java.beans.XMLDecoder;
import java.beans.XMLEncoder;
import java.io.*;
import java.lang.reflect.Modifier;
import java.net.URL;
import java.util.HashSet;
import java.util.Properties;
import java.util.Set;
import java.util.StringTokenizer;
import java.util.prefs.BackingStoreException;
import java.util.prefs.Preferences;

/**
 * @author Jérôme Beau
 * @version 7 mai 2006 16:57:19
 */
public class UFOPlatformControllerImpl implements UFOPlatformController {
    private Localizer localizer;
    private Set<DatabaseAdapter> adapters = new HashSet<DatabaseAdapter>();
    private MetaMapping metaMapping = new MetaMappingImpl();
    private Preferences preferences = Preferences.userNodeForPackage(getClass());

    public UFOPlatformControllerImpl(Localizer localizer) {
        this.localizer = localizer;
        initAdapters();
        initMetaMapping();
    }

    private void initMetaMapping() {
        metaMapping = new MetaMappingImpl();
    }

    public MetaModel getMetaModel() {
        return metaMapping.getMetaModel();
    }

    public boolean hasMetaModel() {
        return metaMapping.getMetaModel() != null && !metaMapping.getMetaModel().isEmpty();
    }

    public void loadMetaMapping(String name) throws MetaException {
        System.out.println("Loading " + name);
        try {
            FileInputStream fileInputStream = new FileInputStream(name);
            InputStream inputStream = new BufferedInputStream(fileInputStream);
            XMLDecoder xmlDecoder = new XMLDecoder(inputStream);
            try {
                Object o = xmlDecoder.readObject();
                if (o == null) {
                    throw new MetaException("Could not resolve content of file " + name);
                }
                if (o instanceof MetaModel) {
                    metaMapping.setMetaModel((MetaModel) o);
                } else {
                    metaMapping = (MetaMapping) o;
                }
                Set<String> recentFiles = getRecentFiles();
                recentFiles.add(name);
                try {
                    preferences.flush();
                } catch (BackingStoreException e) {
                    e.printStackTrace();
                }
            } finally {
                xmlDecoder.close();
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            throw new MetaException("Could not find file " + name, e);
        }
    }

    public Set<String> getRecentFiles() {
        Set<String> recentFiles = new HashSet<String>();
        String recentFilesStr = preferences.get("recentFiles", "");
        StringTokenizer st = new StringTokenizer(recentFilesStr, ";");
        while (st.hasMoreTokens()) {
            String s = st.nextToken();
            recentFiles.add(s);
        }
        return recentFiles;
    }

    public void saveMetaMapping(String filename) throws IOException {
        OutputStream outputStream = new BufferedOutputStream(new FileOutputStream(filename));
        XMLEncoder xmlEncoder = new XMLEncoder(outputStream);
        try {
            xmlEncoder.writeObject(metaMapping);
        } finally {
            xmlEncoder.close();
        }
    }

    public MetaType getDefaultFieldType() {
        return MetaTypeImpl.TEXT;
    }

    public DatabaseAdapter getDefaultAdapter() {
        return adapters.isEmpty() ? null : adapters.iterator().next();
    }

    private void initAdapters() {
        Set<Class> adapterClasses = find(DatabaseAdapter.class);
        Properties properties = new Properties();
        for (Class adapterClass : adapterClasses) {
            try {
                DatabaseAdapter adapter = (DatabaseAdapter) adapterClass.newInstance();
                adapter.setProperties(properties);
                adapters.add(adapter);
            } catch (InstantiationException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }
    }

    public static Set<Class> find(Class tosubclass) {
        Set<Class> classes = new HashSet<Class>();
        Package[] pcks = Package.getPackages();
        for (Package pck : pcks) {
            classes.addAll(find(pck.getName(), tosubclass));
        }
        return classes;
    }

    public static Set<Class> find(String pckgname, Class toSubClass) {
        Set<Class> classes = new HashSet<Class>();
        String name = new String(pckgname);
        if (!name.startsWith("/")) {
            name = "/" + name;
        }

        name = name.replace('.', '/');

        // Get a File object for the package
        URL url = Launcher.class.getResource(name);
        if (url != null) {
            File directory = new File(url.getFile());

            if (directory.exists()) {
                // Get the list of the files contained in the package
                String[] files = directory.list();
                for (String file : files) {
                    // we are only interested in .class files
                    if (file.endsWith(".class")) {
                        // removes the .class extension
                        String classname = file.substring(0, file.length() - 6);
                        try {
                            // Try to create an instance of the object
                            Class aClass = Class.forName(pckgname + "." + classname);
                            if (((aClass.getModifiers() & Modifier.ABSTRACT) == 0) && toSubClass.isAssignableFrom(aClass)) {
                                classes.add(aClass);
                            }
                        } catch (ClassNotFoundException cnfex) {
                            System.err.println(cnfex);
                        }
                    }
                }
            }
        }
        return classes;
    }

    public Localizer getLocalizer() {
        return localizer;
    }

    public Set<DatabaseAdapter> getAdapters() {
        return adapters;
    }

    public void close() {
        for (DatabaseAdapter adapter : adapters) {
            adapter.close();
        }
    }

    public Set<Database> getDatasources() {
        return metaMapping.getDatasources();
    }

    public void addDatasource(Database database) {
        metaMapping.getDatasources().add(database);
    }

    public Database createDatasource() {
        return new DatabaseImpl();
    }
}
