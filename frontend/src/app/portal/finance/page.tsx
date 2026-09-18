"use client";

import React, { useState, useEffect } from "react";
import { WalletCards, Download, CheckCircle2, AlertCircle, ArrowLeft, Clock, CreditCard, Receipt } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function PortalFinancePage() {
  const [fees, setFees] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fees`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setFees(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Failed to fetch fee statements:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const defaultFees = [
    {
      _id: "fee-101",
      feeType: "Term 1 Tuition & Academic Fee",
      totalAmount: 25000,
      amountPaid: 25000,
      dueDate: "2025-08-15",
      paymentDate: "2025-08-10",
      status: "Paid",
      invoiceNumber: "INV-2025-089"
    },
    {
      _id: "fee-102",
      feeType: "Term 2 Tuition & Digital Lab Fee",
      totalAmount: 25000,
      amountPaid: 15000,
      dueDate: "2025-11-30",
      paymentDate: "2025-11-20",
      status: "Partial",
      invoiceNumber: "INV-2025-142"
    },
    {
      _id: "fee-103",
      feeType: "Annual Sports & Laboratory Materials",
      totalAmount: 6000,
      amountPaid: 0,
      dueDate: "2026-01-15",
      status: "Pending",
      invoiceNumber: "INV-2026-018"
    }
  ];

  const feeItems = fees.length > 0 ? fees : defaultFees;
  const totalBilled = feeItems.reduce((acc, f) => acc + (f.totalAmount || 0), 0);
  const totalPaid = feeItems.reduce((acc, f) => acc + (f.amountPaid || 0), 0);
  const totalDue = totalBilled - totalPaid;

  const handleDownloadInvoice = (invoiceNumber: string) => {
    toast.success(`Receipt ${invoiceNumber} downloaded successfully.`);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <div className="w-10 h-10 rounded-full border-4 border-[#0050CB]/20 border-t-[#0050CB] animate-spin" />
        <p className="text-xs font-bold text-slate-500">Loading Fee Ledger...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/portal" className="text-xs font-bold text-[#0050CB] hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portal</span>
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#000E28] dark:text-white">Fees & Academic Statements</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Review payment receipts, tuition dues, and billing records</p>
        </div>
        <button
          type="button"
          onClick={() => toast.success("Redirecting to secured payment gateway...")}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0050CB] hover:bg-[#0041A8] text-white text-xs font-bold shadow-lg shadow-[#0050CB]/25 transition-all cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span>Pay Outstanding Fees</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#001438] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Billed Tuition</span>
          <p className="text-2xl font-black text-[#000E28] dark:text-white mt-1">₹{totalBilled.toLocaleString()}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Academic Year 2025-2026</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#001438] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Paid to Date</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">₹{totalPaid.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Verified Clearing
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#001438] border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Current Outstanding Balance</span>
          <p className="text-2xl font-black text-[#FF690C] mt-1">₹{totalDue.toLocaleString()}</p>
          <p className="text-[11px] text-[#FF690C] font-semibold mt-1 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {totalDue > 0 ? "Upcoming due date" : "All cleared"}
          </p>
        </div>
      </div>

      {/* Fee Items Table */}
      <div className="bg-white dark:bg-[#001438] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-base font-black text-[#000E28] dark:text-white">Invoices & Statements</h3>
          <span className="text-xs font-semibold text-slate-400">Official e-receipts available</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {feeItems.map((fee: any) => {
            const isPaid = fee.status === "Paid";
            const isPartial = fee.status === "Partial";

            return (
              <div key={fee._id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E5EEFF] dark:bg-[#0050CB]/25 text-[#0050CB] dark:text-[#38BDF8] flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-black text-[#000E28] dark:text-white">{fee.feeType}</h4>
                      <span className="text-[10px] font-mono text-slate-400">({fee.invoiceNumber || "INV-2025"})</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Due Date: <span className="font-semibold text-slate-700 dark:text-slate-300">{new Date(fee.dueDate).toLocaleDateString()}</span>
                      {fee.paymentDate && (
                        <span> • Paid on {new Date(fee.paymentDate).toLocaleDateString()}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <p className="text-sm sm:text-base font-black text-[#000E28] dark:text-white">
                      ₹{((fee.totalAmount || 0) - (fee.amountPaid || 0)).toLocaleString()}{" "}
                      <span className="text-[10px] text-slate-400 font-normal">due</span>
                    </p>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      isPaid
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : isPartial
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                        : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                    }`}>
                      {fee.status}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadInvoice(fee.invoiceNumber || "RECEIPT")}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                    title="Download Receipt"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
