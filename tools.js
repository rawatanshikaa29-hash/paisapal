import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { addTransaction, getSpendingSummary } from "./functions.js";

export const addTransactionTool = tool(
    (args) => {
        return addTransaction({ userId: 1, ...args });
    },
    {
        name: "add_transaction",
        description: "Use this when the user mentions spending or earning money",
        schema: z.object({
            type: z.enum(["expense", "income"]),
            amount: z.number(),
            category: z.enum(["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Education", "Other"]),
            description: z.string(),
            date: z.string().describe("YYYY-MM-DD")
        })
    }
);


export const getSpendingSummaryTool = tool(
    (args) => {
        const rows = getSpendingSummary({ userId: 1, ...args });

        let total = 0;
        for (const r of rows) {
            total = total + r.total;
        }

        return JSON.stringify({ breakdown: rows, grandTotal: total });
    },

    {
        name: "get_spending_summary",
        description: "Use this when the user asks how much they spent, or wants a spending total or breakdown for a month",
        schema: z.object({
            month: z.string().describe("Month in YYYY-MM format, like 2026-10")
        })
    }
);

