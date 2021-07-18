/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
   createContext,
   useCallback,
   useContext,
   useEffect,
   useState,
} from "react";
import { Alert } from "react-native";
import { api } from "../services/api";

interface User {
   id: string;
   nome: string;
   telefone: number;
   email: string;
   work_init: string;
   work_and: string;
   funcao: string;
   avatar: string;
}

interface SignInCred {
   email: string;
   senha: string;
}

interface AuthContexData {
   prestador: User;
   loading: boolean;
   signIn(credential: SignInCred): Promise<void>;
   signOut(): void;
   updateUser(prestador: User): Promise<void>;
}

interface AuthState {
   token: string;
   prestador: User;
}

export const AuthContext = createContext<AuthContexData>({} as AuthContexData);

export const AuthProvider: React.FC = ({ children }) => {
   const [data, seData] = useState<AuthState>({} as AuthState);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function loadStorageData(): Promise<void> {
         const [token, prestador] = await AsyncStorage.multiGet([
            "@wil:token",
            "@wil:prestador",
         ]);

         if (token[1] && prestador[1]) {
            api.defaults.headers.authorization = `Bearer ${token[1]}`;

            seData({ token: token[1], prestador: JSON.parse(prestador[1]) });
         }
         setLoading(false);
      }

      loadStorageData();
   }, []);

   const signIn = useCallback(async ({ email, senha }) => {
      const response = await api.post("/prestador/session", {
         email,
         senha,
      });
      console.log(response.data);

      const { token, prestador } = response.data;

      await AsyncStorage.multiSet([
         ["@wil:token", token],
         ["@wil:prestador", JSON.stringify(prestador)],
      ]);

      api.defaults.headers.authorization = `Bearer ${token}`;

      seData({ token, prestador });
   }, []);

   const signOut = useCallback(async () => {
      await AsyncStorage.multiRemove(["@wil:prestador", "@wil:token"]);

      seData({} as AuthState);
   }, []);

   const updateUser = useCallback(
      async (prestador: User) => {
         await AsyncStorage.setItem(
            "@wil:prestador",
            JSON.stringify(prestador)
         );

         seData({
            token: data.token,
            prestador,
         });
      },
      [seData, data.token]
   );

   return (
      <AuthContext.Provider
         value={{
            prestador: data.prestador,
            loading,
            signIn,
            signOut,
            updateUser,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export function useAuth(): AuthContexData {
   const context = useContext(AuthContext);

   if (!context) {
      throw new Error("useAuth must be used with ..");
   }

   return context;
}
