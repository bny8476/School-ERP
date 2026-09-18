"use client";

import React, { useState, useEffect } from "react";
import { Settings, User, Bell, Shield, ArrowLeft, Check, Phone, Mail, Save } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function PortalSettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState({
    smsAlerts: true,
    emailReceipts: true,
    whatsAppUpdates: true,
    diaryNotifications: true,
  });

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {}
    }
  }, []);

  const handleSave = () => {
    toast.success("Preferences updated successfully.");
  };

  const displayName = user?.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : "Patty Parent";
  const displayEmail = user?.email || "parent@school.com";

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/portal" className="text-xs font-bold text-[#0050CB] hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portal</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000E28] dark:text-white">Portal Settings & Profile</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Manage account information, contact numbers, and communication preferences</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-[#001438] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <h3 className="text-base font-black text-[#000E28] dark:text-white mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-[#0050CB]" />
          <span>Parent Account Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Parent Full Name</label>
            <input
              type="text"
              readOnly
              value={displayName}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-[#000E28] dark:text-white cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Primary Email Address</label>
            <input
              type="email"
              readOnly
              value={displayEmail}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-[#000E28] dark:text-white cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Emergency Mobile Number</label>
            <input
              type="text"
              defaultValue="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#000E28] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-[#000E28] dark:text-white focus:outline-none focus:border-[#0050CB]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">WhatsApp Updates Number</label>
            <input
              type="text"
              defaultValue="+91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#000E28] border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-medium text-[#000E28] dark:text-white focus:outline-none focus:border-[#0050CB]"
            />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-[#001438] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <h3 className="text-base font-black text-[#000E28] dark:text-white mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#0050CB]" />
          <span>Notification & Communication Channels</span>
        </h3>

        <div className="space-y-3.5">
          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 cursor-pointer">
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#000E28] dark:text-white">Daily Diary & Attendance SMS</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Receive instant alerts when attendance or classroom diaries are recorded</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.smsAlerts}
              onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-[#0050CB] focus:ring-[#0050CB]/30 accent-[#0050CB]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 cursor-pointer">
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#000E28] dark:text-white">Fee Billing & Receipt Emails</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Official PDF invoice attachments sent upon fee clearance</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.emailReceipts}
              onChange={(e) => setNotifications({ ...notifications, emailReceipts: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-[#0050CB] focus:ring-[#0050CB]/30 accent-[#0050CB]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 cursor-pointer">
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#000E28] dark:text-white">WhatsApp Academic Updates</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">School event reminders, exam timetables, and emergency notifications</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.whatsAppUpdates}
              onChange={(e) => setNotifications({ ...notifications, whatsAppUpdates: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-[#0050CB] focus:ring-[#0050CB]/30 accent-[#0050CB]"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0050CB] hover:bg-[#0041A8] text-white text-xs font-bold shadow-md shadow-[#0050CB]/25 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
}
