# PaisaPal - Personal Expense & Budget Coach

An AI agent that lets users log expenses in plain English and get monthly spending summaries.
Built with Node.js, LangChain, Groq LLM and SQLite.

## What it does
- add_transaction: turns text like "spent 250 on pizza yesterday" into a database entry (amount, category, date)
- get_spending_summary: gives category-wise spending and the grand total for a month

## How to run
1. npm install
2. Replace YOUR_API_KEY in agent.js with your own Groq API key
3. node db.js
4. node agent.js

## Example
You: spent 250 on pizza yesterday
You: how much did I spend this month?

## Design notes
- Totals are calculated by SQL and code, not by the LLM
- Categories come from a fixed list (enum) so the data stays consistent

## Not built yet (due to time)
set_budget, check_budget_status, list_transactions, delete_transaction
