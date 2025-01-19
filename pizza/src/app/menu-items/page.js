"use client";

import AdminTabs from "@/components/layout/AdminTabs";
import { useProfile } from "@/components/useProfile";

export default function MenuItemsPage() {

   const {loading, data} = useProfile();

   if(loading){
    return 'Loading Admin Info...';
   }

   if(!data?.admin){
    return 'You are not an admin!';
   }

   return (
    <section className="mt-8">
       <AdminTabs isAdmin={true}/>
    </section>

   );
}