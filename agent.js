import { ChatGroq } from "@langchain/groq";
import { createAgent } from "langchain";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { MemorySaver } from "@langchain/langgraph";
import { addTransactionTool, getSpendingSummaryTool } from "./tools.js";

const checkpointer = new MemorySaver();
const rl = readline.createInterface({ input, output });

const agent = async () => {
    const brain = new ChatGroq({
        model: "openai/gpt-oss-20b",
        apiKey: "MY_API"
    });

    const myAgent = createAgent({
        model: brain,
        tools: [addTransactionTool, getSpendingSummaryTool],
        checkpointer: checkpointer,
        systemPrompt: `You are PaisaPal, an expense tracker. Today's date is ${new Date().toISOString().slice(0, 10)}. Convert relative dates like yesterday into YYYY-MM-DD. The current month is ${new Date().toISOString().slice(0, 7)}. When the user asks about spending, you must call get_spending_summary ... Never say there are no records without calling the tool first.`
    });
    while (true) {
        const userInput = await rl.question("You: ");

        if (userInput === "bye") {
            break;
        }

        const response = await myAgent.invoke(
            {
                messages: [
                    {
                        role: "user",
                        content: userInput
                    }
                ]
            },
            {
                configurable: {
                    thread_id: "1"
                }
            }
        );

        console.log(
            "ai response---->",
            response.messages[response.messages.length - 1].content
        );
    }

    // ask question from your model
    rl.close();
};

agent();