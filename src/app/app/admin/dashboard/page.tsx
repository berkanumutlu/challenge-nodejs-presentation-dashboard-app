import { Metadata } from "next";
import DashboardPageClient from "./page-client";

export const metadata: Metadata = {
    title: 'Dashboard'
};

export default function Dashboard() {
    return (<DashboardPageClient />)
}