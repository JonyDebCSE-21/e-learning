import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Dashboard = ({ children }) => {
  return <DashboardLayout></DashboardLayout>;
};

export default Dashboard;
