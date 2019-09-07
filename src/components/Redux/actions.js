import { ADD_INSTITUTE_ADMIN, ADD_SUPER_ADMIN } from "./constants";

export const addSuperAdmin = instance => (
     {     
        type: ADD_SUPER_ADMIN,
        instance     // action payload
     }
);

export const addInstitute = instance => (
   {     
      type: ADD_INSTITUTE_ADMIN,
      instance     // action payload
   }
);