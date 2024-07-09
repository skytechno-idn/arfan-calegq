import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

const defaultForm = {
  nama_admin: "",
  email_admin: "",
  telp_admin: "",
  password: "",
};
export const useAdminStore = create<any>()(
  devtools(
    (set, get) => ({
      processing: false,
      rowSelected: null,
      page: 1,
      pageSize: 10,
      defaultFormValues: defaultForm,
      modals: {
        form: false,
        alertDelete: false,
      },
      columns: [
        { name: "NAMA LENGKAP", uid: "nama_admin" },
        { name: "NOMOR TELEPON", uid: "telp_admin" },
        { name: "EMAIL", uid: "email_admin" },
        { name: "CREATED", uid: "createdAt" },
        { name: "UPDATED", uid: "updatedAt" },
        { name: "ACTIONS", uid: "actions" },
      ],

      handleModalsTrigger: (type: string, item?: any) =>
        set((state: any) => ({
          rowSelected: item !== null ? item : null,

          modals: {
            ...state.modals,
            [type]: !state.modals[type],
          },
        })),
      setProcessing: (boolean: boolean) =>
        set(() => ({
          processing: boolean,
        })),
      handleRowSelected: (data: any) =>
        set((state: any) => ({
          rowSelected: data,
        })),
    }),
    {
      name: "admin-storage",
    }
  )
);
