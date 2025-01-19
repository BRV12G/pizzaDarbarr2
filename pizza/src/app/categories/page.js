"use client";
import AdminTabs from "@/components/layout/AdminTabs";
import { useProfile } from "@/components/useProfile";
import { useEffect } from "react";
import { useState } from "react";

export default function CategoriesPage() {
    // const [isAdmin, setIsAdmin] = useState(false);
    // const [adminInfoLoading, setAdminInfoLoading] = useState(true);
    // useEffect(() => {
    //     setAdminInfoLoading(true);
    //     fetch('/api/profile').then(response => {
    //         response.json().then(data => {
    //              setIsAdmin(data.admin);
    //              setAdminInfoLoading(false);
    //         });
    //     })
    // }, []);

    // if (adminInfoLoading) {
    //     return 'Loading Admin Info...';
    // }

    // if(!isAdmin) {
    //     return 'Not Admin!'
    // }
    const {loading:profileLoading, data:profileData} = useProfile();
    if (profileLoading) {
        return 'Loading Admin Info...';
    }

    if(!profileData.admin) {
        return 'Not Admin!';
    }
    return (
        <section className="mt-8 max-w-lg mx-auto">
            <AdminTabs isAdmin = {true} />
            categories
        </section>
    );
}