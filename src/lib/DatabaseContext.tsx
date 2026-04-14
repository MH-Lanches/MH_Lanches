import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from './firebase';

interface DatabaseContextType {
  dbSource: 'firebase' | 'local';
  setDbSource: (source: 'firebase' | 'local') => void;
  getData: (path: string) => any;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [dbSource, setDbSourceState] = useState<'firebase' | 'local'>(() => {
    return (localStorage.getItem('mh_db_source') as 'firebase' | 'local') || 'firebase';
  });

  const setDbSource = (source: 'firebase' | 'local') => {
    setDbSourceState(source);
    localStorage.setItem('mh_db_source', source);
  };

  return (
    <DatabaseContext.Provider value={{ dbSource, setDbSource, getData: () => {} }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (!context) throw new Error('useDatabase must be used within a DatabaseProvider');
  return context;
}
