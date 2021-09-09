import React, { useContext, useEffect } from "react";

import BodyWrapper from "./BodyWrapper";
import SidebarContent from "./SidebarContent";
import MobileSidebar from "./MobileSidebar";
import { SidebarContext } from "./SidebarContext";
import { useLocation } from "react-router-dom";
import Header from "./Header";

export const DashboardLayout = ({ children }) => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext)
    let location = useLocation()

    useEffect(() => {
        closeSidebar()
    }, [location])
    return (
        <BodyWrapper>
            <div className="flex h-screen bg-gray-200 " >

                <div
                    className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${isSidebarOpen && 'overflow-hidden'}`}
                >
                    <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 lg:block">
                        <SidebarContent />
                    </aside>
                    <MobileSidebar /></div>
                <div className="flex flex-col flex-1 overflow-hidden">
                    <Header />
                    <main className="content">
                        <section className="sm:flex-row flex flex-col flex-1">
                            <div
                                className="content-box"
                                style={{ flexGrow: 2, flexBasis: "0%" }}
                            >
                                {children}
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </BodyWrapper>
    );
};
