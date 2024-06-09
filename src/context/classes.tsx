import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState
} from "react";

interface ClassesProviderProps {
  children: ReactNode;
}

interface ClassesContextData {
  classes: ClassEntity[];
  setClasses: Dispatch<SetStateAction<ClassEntity[]>>;
}

const ClassesContext = createContext({} as ClassesContextData);

export interface ClassEntity {
  name: string;
  teamA: string[];
  teamB: string[];
}

export const ClassesProvider = ({ children }: ClassesProviderProps) => {
  const [classes, setClasses] = useState<ClassEntity[]>([]);

  return (
    <ClassesContext.Provider
      value={{
        classes,
        setClasses
      }}
    >
      {children}
    </ClassesContext.Provider>
  );
};

export const useClasses = () => {
  return useContext(ClassesContext);
};
